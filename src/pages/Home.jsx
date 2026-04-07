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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchCurrentRef = useRef({ x: 0, y: 0 });
  const dragIntentRef = useRef(false);

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

  function resetDragState() {
    setDragX(0);
    setIsDragging(false);
    setIsAnimatingOut(false);
    dragIntentRef.current = false;
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
    if (isChangingCard || isDragging || isAnimatingOut) return;
    setIsRevealed((prev) => !prev);
  }

  function handleTouchStart(event) {
    if (!isMobile || isChangingCard || isAnimatingOut) return;

    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    touchCurrentRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    dragIntentRef.current = false;

    const preparedNext = getRandomPrompt(
      currentPrompt?.id ?? null,
      currentPrompt?.category ?? null
    );
    setNextPrompt(preparedNext);
  }

  function handleTouchMove(event) {
    if (!isMobile || isChangingCard || isAnimatingOut) return;

    const touch = event.touches[0];
    touchCurrentRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (!dragIntentRef.current) {
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        dragIntentRef.current = true;
        setIsDragging(true);
      } else {
        return;
      }
    }

    // Только влево
    const limitedX = Math.max(-190, Math.min(0, deltaX));
    setDragX(limitedX);
  }

  function handleTouchEnd() {
    if (!isMobile || isChangingCard || isAnimatingOut) return;

    const deltaX = touchCurrentRef.current.x - touchStartRef.current.x;
    const deltaY = touchCurrentRef.current.y - touchStartRef.current.y;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    const isTap = absX < 10 && absY < 10;
    const passedSwipeThreshold = deltaX < -80 && absX > absY;

    if (isTap) {
      setNextPrompt(null);
      resetDragState();
      flipCard();
      return;
    }

    if (passedSwipeThreshold && nextPrompt) {
      setIsChangingCard(true);
      setIsAnimatingOut(true);
      setDragX(-(stageWidth + 120));

      window.setTimeout(() => {
        setCurrentPrompt(nextPrompt);
        setNextPrompt(null);
        setIsRevealed(false);
        resetDragState();
        setIsChangingCard(false);
      }, 260);

      return;
    }

    // Возврат назад, если свайп слабый
    setDragX(0);
    setIsDragging(false);
    dragIntentRef.current = false;

    window.setTimeout(() => {
      if (!isDragging && !isAnimatingOut) {
        setNextPrompt(null);
      }
    }, 220);
  }

  const dragProgress = Math.min(Math.abs(dragX) / 140, 1);

  // Фронтальная карта: мягче и спокойнее
  const frontRotation = isMobile ? dragX * 0.035 : 0;
  const frontLift = isMobile ? -dragProgress * 2 : 0;

  const frontTransform = isMobile
    ? `translate(${dragX}px, ${frontLift}px) rotate(${frontRotation}deg)`
    : isChangingCard
    ? "translate(4px, 6px)"
    : "translate(0px, 0px)";

  const frontTransition = isMobile
    ? isDragging
      ? "none"
      : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease"
    : "transform 220ms ease, opacity 180ms ease";

  // Следующая карта: строго по центру, без бокового увода
  const backCardScale = 0.975 + dragProgress * 0.025;
  const backCardTranslateY = 10 - dragProgress * 10;
  const backCardOpacity = nextPrompt ? 0.2 + dragProgress * 0.8 : 0;

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
              overflow: "hidden"
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
                    transform: "translate(calc(-50% + 24px), calc(-50% + 14px)) rotate(4deg)",
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
                    transform: "translate(calc(-50% + 10px), calc(-50% + 6px)) rotate(2deg)",
                    transition: "transform 220ms ease",
                    pointerEvents: "none"
                  }}
                />
              </>
            )}

            {isMobile && nextPrompt ? (
              <div
                style={{
                  position: "absolute",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, calc(-50% + ${backCardTranslateY}px)) scale(${backCardScale})`,
                  opacity: backCardOpacity,
                  transition: isDragging
                    ? "none"
                    : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              >
                <PromptCard
                  prompt={nextPrompt}
                  isRevealed={false}
                  showCoverTitle={true}
                  width={cardWidth}
                  height={cardHeight}
                />
              </div>
            ) : null}

            <div
              onClick={isMobile ? undefined : flipCard}
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
                transform: frontTransform,
                opacity: isChangingCard && !isMobile ? 0.94 : 1,
                transition: frontTransition,
                willChange: "transform"
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
              ← Потяни карту влево, чтобы достать новую
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