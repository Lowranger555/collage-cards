import { useMemo, useRef, useState } from "react";
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
  const [nextPrompt, setNextPrompt] = useState(null);
  const [showNextCard, setShowNextCard] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const frontCardRef = useRef(null);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartedRef = useRef(false);
  const preparedNextRef = useRef(null);
  const suppressClickRef = useRef(false);

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

  function setFrontCardStyle({
    x = 0,
    rotation = 0,
    opacity = 1,
    transition = "none"
  }) {
    if (!frontCardRef.current) return;

    frontCardRef.current.style.transition = transition;
    frontCardRef.current.style.transform = `translateX(${x}px) rotate(${rotation}deg)`;
    frontCardRef.current.style.opacity = `${opacity}`;
  }

  function resetSwipeRefs() {
    currentXRef.current = 0;
    isDraggingRef.current = false;
    dragStartedRef.current = false;
    preparedNextRef.current = null;
  }

  function blockNextClickBriefly() {
    suppressClickRef.current = true;

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 350);
  }

  function nextCardDesktop() {
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
    if (isChangingCard || isDraggingRef.current) return;
    setIsRevealed((prev) => !prev);
  }

  function handleCardClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    flipCard();
  }

  function handleTouchStart(event) {
    if (!isMobile || isChangingCard) return;

    const touch = event.touches[0];

    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    currentXRef.current = 0;
    isDraggingRef.current = false;
    dragStartedRef.current = false;
    suppressClickRef.current = false;

    const preparedNext = getRandomPrompt(
      currentPrompt?.id ?? null,
      currentPrompt?.category ?? null
    );

    preparedNextRef.current = preparedNext;
    setNextPrompt(preparedNext);
    setShowNextCard(false);
  }

  function handleTouchMove(event) {
    if (!isMobile || isChangingCard) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const deltaY = touch.clientY - startYRef.current;

    if (!dragStartedRef.current) {
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        dragStartedRef.current = true;
        isDraggingRef.current = true;
        setShowNextCard(true);
      } else {
        return;
      }
    }

    const limitedX = Math.max(-280, Math.min(0, deltaX));
    currentXRef.current = limitedX;

    const rotation = limitedX * 0.03;

    setFrontCardStyle({
      x: limitedX,
      rotation,
      opacity: 1,
      transition: "none"
    });
  }

  function handleTouchEnd() {
    if (!isMobile || isChangingCard) return;

    const deltaX = currentXRef.current;
    const isTap = !dragStartedRef.current;
    const passedSwipeThreshold = deltaX < -70;

    if (isTap) {
      setNextPrompt(null);
      setShowNextCard(false);
      resetSwipeRefs();

      blockNextClickBriefly();
      flipCard();
      return;
    }

    blockNextClickBriefly();

    if (passedSwipeThreshold && preparedNextRef.current) {
      setIsChangingCard(true);

      const exitDistance =
        typeof window !== "undefined"
          ? -(window.innerWidth + cardWidth + 260)
          : -(stageWidth + cardWidth + 260);

      setFrontCardStyle({
        x: exitDistance,
        rotation: -18,
        opacity: 1,
        transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)"
      });

      window.setTimeout(() => {
        const next = preparedNextRef.current;
        if (!next) return;

        if (frontCardRef.current) {
          frontCardRef.current.style.transition = "none";
          frontCardRef.current.style.opacity = "0";
        }

        setCurrentPrompt(next);
        setIsRevealed(false);

        requestAnimationFrame(() => {
          if (frontCardRef.current) {
            frontCardRef.current.style.transition = "none";
            frontCardRef.current.style.transform = "translateX(0px) rotate(0deg)";
          }

          requestAnimationFrame(() => {
            setShowNextCard(false);
            setNextPrompt(null);
            resetSwipeRefs();

            requestAnimationFrame(() => {
              if (frontCardRef.current) {
                frontCardRef.current.style.opacity = "1";
              }

              setIsChangingCard(false);
            });
          });
        });
      }, 320);

      return;
    }

    setFrontCardStyle({
      x: 0,
      rotation: 0,
      opacity: 1,
      transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
    });

    window.setTimeout(() => {
      setShowNextCard(false);
      setNextPrompt(null);
      resetSwipeRefs();
    }, 220);
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
            gap: isMobile ? "16px" : "24px"
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
              justifyContent: "center",
              overflow: "visible"
            }}
          >
            {!isMobile && (
              <>
                <div
                  style={{
                    position: "absolute",
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    borderRadius: "28px",
                    background: "rgba(255,255,255,0.02)",
                    left: "50%",
                    top: "50%",
                    transform:
                      "translate(calc(-50% + 24px), calc(-50% + 14px)) rotate(4deg)",
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
                    transform:
                      "translate(calc(-50% + 10px), calc(-50% + 6px)) rotate(2deg)",
                    pointerEvents: "none"
                  }}
                />
              </>
            )}

            {isMobile && showNextCard && nextPrompt && (
              <div
                style={{
                  position: "absolute",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              >
                <PromptCard
                  key={`next-${nextPrompt.id}`}
                  prompt={nextPrompt}
                  isRevealed={false}
                  showCoverTitle={true}
                  width={cardWidth}
                  height={cardHeight}
                />
              </div>
            )}

            <div
              ref={frontCardRef}
              onClick={handleCardClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                position: "relative",
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                cursor: isChangingCard ? "default" : "pointer",
                zIndex: 2,
                touchAction: "pan-y",
                transform: "translateX(0px) rotate(0deg)",
                opacity: 1,
                willChange: "transform, opacity"
              }}
            >
              <PromptCard
                key={`current-${currentPrompt.id}`}
                prompt={currentPrompt}
                isRevealed={isRevealed}
                showCoverTitle={true}
                width={cardWidth}
                height={cardHeight}
              />
            </div>
          </div>

          {isMobile ? (
            <div
              style={{
                fontSize: "12px",
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.58)",
                textAlign: "center",
                letterSpacing: "0.01em"
              }}
            >
              ← Свайпни влево, чтобы достать новую карту
            </div>
          ) : (
            <button
              onClick={nextCardDesktop}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                marginTop: "8px",
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
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;