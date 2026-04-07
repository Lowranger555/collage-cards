function PromptCard({
  prompt,
  isRevealed = false,
  showCoverTitle = true,
  width = 360,
  height = 560
}) {
  const categoryLabels = {
    constraint: "Ограничение",
    composition: "Композиция",
    portrait: "Портрет",
    material: "Материал",
    narrative: "История",
    sign: "Знак",
    mixed_media: "Mixed-media"
  };

  const difficultyLevels = {
    easy: 2,
    medium: 3,
    hard: 4
  };

  const CARD_WIDTH = width;
  const CARD_HEIGHT = height;
  const CARD_PADDING = width <= 320 ? 16 : 18;
  const isCompact = width <= 320;

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: isCompact ? "12px" : "14px",
    flexShrink: 0
  };

  const labelStyle = {
    fontSize: isCompact ? "8px" : "9px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.64)",
    lineHeight: 1.1
  };

  const coverCategoryStyle = {
    fontSize: isCompact ? "10px" : "11px",
    lineHeight: 1.1,
    color: "rgba(255,255,255,0.96)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "999px",
    padding: isCompact ? "6px 10px" : "7px 12px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    flexShrink: 0,
    fontWeight: "600",
    letterSpacing: "0.01em",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 14px rgba(0,0,0,0.16)"
  };

  const backCategoryStyle = {
    fontSize: isCompact ? "10px" : "11px",
    lineHeight: 1.1,
    color: "#E0DDD7",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "999px",
    padding: isCompact ? "6px 10px" : "7px 12px",
    background: "rgba(255,255,255,0.03)",
    flexShrink: 0,
    fontWeight: "600",
    letterSpacing: "0.01em"
  };

  const cardBaseStyle = {
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    boxSizing: "border-box",
    borderRadius: "28px",
    overflow: "visible",
    position: "relative",
    flexShrink: 0,
    perspective: "1400px"
  };

  const cardSurfaceStyle = {
    position: "absolute",
    inset: 0,
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.11), inset 0 0 0 1px rgba(255,255,255,0.02)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d"
  };

  const categoryImageMap = {
    constraint: "/images/categories/constraint.jpg",
    composition: "/images/categories/composition.jpg",
    portrait: "/images/categories/portrait.jpg",
    material: "/images/categories/material.jpg",
    narrative: "/images/categories/narrative.jpg",
    sign: "/images/categories/sign.jpg",
    mixed_media: "/images/categories/mixed-media.jpg"
  };

  const coverImage = categoryImageMap[prompt.category] || null;
  const filledDifficultyDots = difficultyLevels[prompt.difficulty] || 0;

  function DifficultyDots({ filledCount }) {
    return (
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "center"
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < filledCount;

          return (
            <span
              key={index}
              style={{
                width: isCompact ? "8px" : "9px",
                height: isCompact ? "8px" : "9px",
                borderRadius: "999px",
                display: "inline-block",
                background: isFilled ? "white" : "transparent",
                border: isFilled
                  ? "1px solid rgba(255,255,255,0.95)"
                  : "1px solid rgba(255,255,255,0.26)",
                boxSizing: "border-box"
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div style={cardBaseStyle}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <div
          style={{
            ...cardSurfaceStyle,
            background: "#101010",
            transform: "rotateY(0deg)"
          }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={categoryLabels[prompt.category] || prompt.category}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : null}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: coverImage
                ? `
                  linear-gradient(
                    180deg,
                    rgba(0,0,0,0.58) 0%,
                    rgba(0,0,0,0.22) 18%,
                    rgba(0,0,0,0.12) 42%,
                    rgba(0,0,0,0.22) 60%,
                    rgba(0,0,0,0.78) 84%,
                    rgba(0,0,0,0.92) 100%
                  )
                `
                : `
                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 30%),
                  radial-gradient(circle at 80% 30%, rgba(255,255,255,0.10), transparent 28%),
                  radial-gradient(circle at 50% 70%, rgba(255,255,255,0.08), transparent 30%),
                  linear-gradient(135deg, #2a2a2a 0%, #171717 35%, #0f0f0f 100%)
                `
            }}
          />

          {!coverImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 18%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.78) 84%, rgba(0,0,0,0.92) 100%)"
              }}
            />
          )}

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              padding: `${CARD_PADDING}px`
            }}
          >
            <div style={topRowStyle}>
              <div style={labelStyle}>Коллажная карта</div>
              <div style={coverCategoryStyle}>
                {categoryLabels[prompt.category] || prompt.category}
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: showCoverTitle ? "8px" : "6px",
                flexShrink: 0
              }}
            >
              {showCoverTitle && (
                <h2
                  style={{
                    margin: 0,
                    fontSize: isCompact ? "30px" : "38px",
                    lineHeight: 0.95,
                    letterSpacing: "-0.05em",
                    color: "white",
                    maxWidth: "92%",
                    textShadow: "0 2px 10px rgba(0,0,0,0.45)"
                  }}
                >
                  {prompt.title}
                </h2>
              )}

              <div
                style={{
                  fontSize: showCoverTitle ? (isCompact ? "10px" : "11px") : "16px",
                  lineHeight: showCoverTitle ? 1.35 : 1.25,
                  color: "rgba(255,255,255,0.86)",
                  maxWidth: showCoverTitle ? "88%" : "75%",
                  textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                  fontWeight: showCoverTitle ? "400" : "600"
                }}
              >
                {showCoverTitle
                  ? "Нажми на карту, чтобы открыть задание"
                  : "Открой задание"}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            ...cardSurfaceStyle,
            background: "linear-gradient(180deg, #151515 0%, #0f0f0f 100%)",
            transform: "rotateY(180deg)"
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              padding: `${CARD_PADDING}px`
            }}
          >
            <div style={topRowStyle}>
              <div style={labelStyle}>Коллажная карта</div>
              <div style={backCategoryStyle}>
                {categoryLabels[prompt.category] || prompt.category}
              </div>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: isCompact ? "28px" : "36px",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  color: "white",
                  maxWidth: "92%"
                }}
              >
                {prompt.title}
              </h2>

              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#d2d2d2",
                  fontSize: isCompact ? "13px" : "14px",
                  lineHeight: 1.4,
                  maxWidth: "95%"
                }}
              >
                {prompt.prompt}
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  flexShrink: 0
                }}
              >
                <div
                  style={{
                    padding: isCompact ? "12px 14px" : "14px 16px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    minHeight: isCompact ? "88px" : "98px",
                    boxSizing: "border-box"
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#7f7f7f",
                      marginBottom: "8px"
                    }}
                  >
                    Ограничение
                  </div>
                  <div
                    style={{
                      color: "#f1f1f1",
                      lineHeight: 1.4,
                      fontSize: isCompact ? "13px" : "14px"
                    }}
                  >
                    {prompt.limitation}
                  </div>
                </div>

                <div
                  style={{
                    padding: isCompact ? "12px 14px" : "14px 16px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    minHeight: isCompact ? "88px" : "98px",
                    boxSizing: "border-box"
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#7f7f7f",
                      marginBottom: "8px"
                    }}
                  >
                    Подсказка
                  </div>
                  <div
                    style={{
                      color: "#f1f1f1",
                      lineHeight: 1.4,
                      fontSize: isCompact ? "13px" : "14px"
                    }}
                  >
                    {prompt.hint}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1 }} />
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
                flexShrink: 0
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#7f7f7f",
                    marginBottom: "6px"
                  }}
                >
                  Сложность
                </div>
                <DifficultyDots filledCount={filledDifficultyDots} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#7f7f7f",
                    marginBottom: "6px"
                  }}
                >
                  Время
                </div>
                <div
                  style={{
                    color: "white",
                    fontSize: isCompact ? "14px" : "15px"
                  }}
                >
                  {prompt.duration} мин
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;