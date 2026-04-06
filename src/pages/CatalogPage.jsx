import { useEffect, useMemo, useState } from "react";
import { prompts } from "../data/prompts";
import PromptCard from "../components/PromptCard";

function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [revealedCards, setRevealedCards] = useState({});
  const [columns, setColumns] = useState(3);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900) {
        setColumns(1);
      } else if (window.innerWidth < 1320) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function shuffleArray(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    }

    return copy;
  }

  function interleaveByCategory(items) {
    const grouped = {};

    for (const item of items) {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    }

    const categories = shuffleArray(Object.keys(grouped));
    const queues = {};

    for (const category of categories) {
      queues[category] = shuffleArray(grouped[category]);
    }

    const result = [];
    let addedSomething = true;
    let lastCategory = null;

    while (addedSomething) {
      addedSomething = false;

      const orderedCategories = [
        ...categories.filter((category) => category !== lastCategory),
        ...categories.filter((category) => category === lastCategory)
      ];

      for (const category of orderedCategories) {
        if (queues[category] && queues[category].length > 0) {
          const nextItem = queues[category].shift();

          if (nextItem) {
            result.push(nextItem);
            lastCategory = category;
            addedSomething = true;
          }
        }
      }
    }

    return result;
  }

  const filteredPrompts = useMemo(() => {
    if (selectedCategory === "all") {
      return interleaveByCategory(prompts);
    }

    const base = prompts.filter((item) => item.category === selectedCategory);
    return shuffleArray(base);
  }, [selectedCategory]);

  function toggleCard(cardId) {
    setRevealedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 73px)",
        padding: isMobile ? "28px 16px 56px" : "40px 20px 72px"
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? "100%" : "1160px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "100%" : "720px",
            marginBottom: isMobile ? "22px" : "26px"
          }}
        >
          <div
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#8f8f8f",
              marginBottom: "12px",
              lineHeight: 1.2
            }}
          >
            Каталог
          </div>

          <h1
            style={{
              margin: "0 0 14px 0",
              fontSize: "clamp(30px, 5vw, 54px)",
              lineHeight: 1,
              color: "white",
              letterSpacing: "-0.04em"
            }}
          >
            Каталог заданий
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: isMobile ? "100%" : "660px",
              color: "#b9b9b9",
              fontSize: "15px",
              lineHeight: 1.6
            }}
          >
            Все карточки проекта в одном месте. Можно просматривать их в
            случайном порядке или выбрать конкретную категорию.
          </p>
        </div>

        <div
          style={{
            marginBottom: isMobile ? "24px" : "34px"
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#8f8f8f",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              lineHeight: 1.2
            }}
          >
            Категория
          </label>

          <div
            style={{
              position: "relative",
              width: isMobile ? "100%" : "176px",
              maxWidth: isMobile ? "320px" : "176px"
            }}
          >
            <select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
                setRevealedCards({});
              }}
              style={{
                width: "100%",
                padding: "12px 44px 12px 14px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#121212",
                color: "white",
                fontSize: "15px",
                lineHeight: 1.2,
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
                boxSizing: "border-box"
              }}
            >
              <option value="all">Все</option>
              <option value="constraint">Ограничение</option>
              <option value="composition">Композиция</option>
              <option value="portrait">Портрет</option>
              <option value="material">Материал</option>
              <option value="narrative">История</option>
              <option value="sign">Знак</option>
              <option value="mixed_media">Mixed-media</option>
            </select>

            <div
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "rgba(255,255,255,0.82)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : `repeat(${columns}, 360px)`,
            justifyContent: "center",
            gap: isMobile ? "20px" : "24px"
          }}
        >
          {filteredPrompts.map((item) => {
            const isHovered = hoveredCardId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleCard(item.id)}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                style={{
                  cursor: "pointer",
                  width: isMobile ? "100%" : "360px",
                  maxWidth: isMobile ? "360px" : "360px",
                  margin: isMobile ? "0 auto" : 0,
                  transform:
                    !isMobile && isHovered
                      ? "translateY(-4px)"
                      : "translateY(0px)",
                  transition: "transform 180ms ease"
                }}
              >
                <PromptCard
                  prompt={item}
                  isRevealed={!!revealedCards[item.id]}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Catalog;