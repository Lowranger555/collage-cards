import { useMemo, useState } from "react";
import { prompts } from "../data/prompts";
import PromptCard from "../components/PromptCard";

function Home() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  const initialPrompt = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  }, []);

  const [currentPrompt, setCurrentPrompt] = useState(initialPrompt);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardWidth = isMobile ? 320 : 360;
  const cardHeight = isMobile ? 500 : 560;
  const stageWidth = isMobile ? 340 : 430;
  const stageHeight = isMobile ? 530 : 610;

  function getRandomPrompt(excludeId = null, excludeCategory = null) {
    let pool = prompts;

    if (excludeId !== null) {
      pool = pool.filter((item) => item.id !== excludeId);
    }

    if (excludeCategory !== null) {
      const differentCategoryPool = pool.filter(
        (item) => item.category !== excludeCategory
      );

      if (differentCategoryPool.length > 0) {
        pool = differentCategoryPool;
      }
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  function nextCard() {
    if (isChangingCard) return;

    setIsChangingCard(true);

    window.setTimeout(() => {
      const randomPrompt = getRandomPrompt(
        currentPrompt?.id ?? null,
        currentPrompt?.category ?? null
      );

      setCurrentPrompt(randomPrompt);
      setIsRevealed(false);
    }, 120);

    window.setTimeout(() => {
      setIsChangingCard(false);
    }, 260);
  }

  function flipCard() {
    if (isChangingCard) return;
    setIsRevealed((prev) => !prev);
  }

  return (
    <main
      style={{
        minHeight: "100%",
        padding: isMobile ? "20px 16px 96px" : "40px 20px 128px"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: isMobile ? "100%" : "720px",
            margin: "0 auto 28px"
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
            Колода заданий
          </div>

          <h1
            style={{
              margin: "0 0 14px 0",
              fontSize: "clamp(30px, 5vw, 54px)",
              lineHeight: 1,
              color: "white",
              whiteSpace: isMobile ? "normal" : "nowrap",
              letterSpacing: "-0.04em"
            }}
          >
            Коллажные карты
          </h1>

          <p
            style={{
              margin: "0 auto",
              maxWidth: isMobile ? "320px" : "660px",
              color: "#b9b9b9",
              fontSize: "15px",
              lineHeight: 1.6
            }}
          >
            Выбери случайную карту из колоды и получи задание для коллажа.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "28px" : "24px"
          }}
        >
          <div
            style={{
              position: "relative",
              width: `${stageWidth}px`,
              height: `${stageHeight}px`,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: "28px",
                background: "rgba(255,255,255,0.02)",
                left: "50%",
                top: "50%",
                transform: isChangingCard
                  ? isMobile
                    ? "translate(calc(-50% + 16px), calc(-50% + 10px)) rotate(4.2deg)"
                    : "translate(calc(-50% + 25px), calc(-50% + 15px)) rotate(4.2deg)"
                  : isMobile
                  ? "translate(calc(-50% + 14px), calc(-50% + 9px)) rotate(4deg)"
                  : "translate(calc(-50% + 24px), calc(-50% + 14px)) rotate(4deg)",
                transition: "transform 220ms ease",
                pointerEvents: "none"
              }}
            />

            <div
              style={{
                position: "absolute",
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: "28px",
                background: "rgba(255,255,255,0.03)",
                left: "50%",
                top: "50%",
                transform: isChangingCard
                  ? isMobile
                    ? "translate(calc(-50% + 7px), calc(-50% + 5px)) rotate(2.1deg)"
                    : "translate(calc(-50% + 11px), calc(-50% + 7px)) rotate(2.1deg)"
                  : isMobile
                  ? "translate(calc(-50% + 6px), calc(-50% + 4px)) rotate(2deg)"
                  : "translate(calc(-50% + 10px), calc(-50% + 6px)) rotate(2deg)",
                transition: "transform 220ms ease",
                pointerEvents: "none"
              }}
            />

            <div
              onClick={flipCard}
              style={{
                position: "relative",
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                cursor: isChangingCard ? "default" : "pointer",
                zIndex: 2,
                transform: isChangingCard
                  ? isMobile
                    ? "translate(2px, 3px)"
                    : "translate(4px, 6px)"
                  : "translate(0px, 0px)",
                opacity: isChangingCard ? 0.94 : 1,
                transition: "transform 220ms ease, opacity 180ms ease"
              }}
            >
              <PromptCard
                prompt={currentPrompt}
                isRevealed={isRevealed}
                showCoverTitle={true}
                width={cardWidth}
                height={cardHeight}
              />
            </div>
          </div>

          <button
            onClick={nextCard}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
              marginTop: isMobile ? "8px" : "0",
              padding: "13px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: isButtonHovered
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.04)",
              backdropFilter: isButtonHovered ? "blur(10px)" : "blur(0px)",
              WebkitBackdropFilter: isButtonHovered ? "blur(10px)" : "blur(0px)",
              color: "white",
              cursor: isChangingCard ? "default" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.01em",
              opacity: isChangingCard ? 0.7 : 1,
              transition:
                "opacity 180ms ease, background 160ms ease, backdrop-filter 160ms ease, -webkit-backdrop-filter 160ms ease"
            }}
          >
            Новая карта
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;