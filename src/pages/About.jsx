function About() {
  const categories = [
    "Ограничение",
    "Композиция",
    "Портрет",
    "Материал",
    "История",
    "Знак",
    "Mixed-media"
  ];

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  const sectionLabelStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#8f8f8f",
    marginBottom: "12px",
    lineHeight: 1.2
  };

  const sectionTitleStyle = {
    margin: "0 0 14px 0",
    color: "white",
    fontSize: "clamp(30px, 5vw, 54px)",
    lineHeight: 1,
    letterSpacing: "-0.04em"
  };

  const bodyTextStyle = {
    margin: 0,
    color: "#b9b9b9",
    fontSize: "15px",
    lineHeight: 1.6
  };

  const cardStyle = {
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
    padding: isMobile ? "18px" : "20px",
    boxSizing: "border-box"
  };

  const smallLabelStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#808080",
    marginBottom: "10px",
    lineHeight: 1.2
  };

  const cardTextStyle = {
    color: "white",
    fontSize: "16px",
    lineHeight: 1.55,
    margin: 0
  };

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
                width: "9px",
                height: "9px",
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
    <main
      style={{
        minHeight: "calc(100vh - 73px)",
        padding: isMobile ? "28px 16px 56px" : "40px 20px 72px"
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto"
        }}
      >
        <section
          style={{
            maxWidth: isMobile ? "100%" : "720px",
            marginBottom: isMobile ? "28px" : "34px"
          }}
        >
          <div style={sectionLabelStyle}>О проекте</div>

          <h1 style={sectionTitleStyle}>Коллажные карты</h1>

          <p
            style={{
              ...bodyTextStyle,
              marginBottom: "18px",
              maxWidth: isMobile ? "100%" : "660px"
            }}
          >
            Коллажные карты — это колода заданий для коллажистов, дизайнеров,
            художников и креаторов. Проект помогает выйти из визуальной инерции,
            начать работу с неожиданной точки и тренировать композиционное
            мышление через ограничение, материал, образ и историю.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap"
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "15px",
                lineHeight: 1.5
              }}
            >
              Проект Ильи Colowgee
            </div>

            <a
              href="https://t.me/colowgee"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram Colowgee"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)"
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.944 4.668a1.5 1.5 0 0 0-1.64-.246L3.54 11.57a1.5 1.5 0 0 0 .113 2.796l3.76 1.296 1.296 3.76a1.5 1.5 0 0 0 2.796.113l7.148-16.764a1.5 1.5 0 0 0-.71-2.103ZM9.56 15.857l-.87-2.525 6.56-6.56-5.69 9.085Z" />
              </svg>
            </a>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: isMobile ? "28px" : "34px"
          }}
        >
          <div style={cardStyle}>
            <div style={smallLabelStyle}>Что это</div>
            <p style={cardTextStyle}>
              Колода заданий, которую можно использовать как инструмент для
              разминки, практики и поиска новых визуальных решений.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={smallLabelStyle}>Для кого</div>
            <p style={cardTextStyle}>
              Для коллажистов, дизайнеров, художников и всех, кто хочет
              развивать визуальное мышление через практику.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={smallLabelStyle}>Как использовать</div>
            <p style={cardTextStyle}>
              Открыть случайную карту на главной или выбрать задание вручную в
              каталоге, перевернуть карту и начать работу.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
            gap: "18px",
            marginBottom: isMobile ? "28px" : "34px",
            alignItems: "stretch"
          }}
        >
          <div
            style={{
              ...cardStyle,
              borderRadius: "28px",
              padding: isMobile ? "20px" : "24px",
              height: "100%"
            }}
          >
            <h2
              style={{
                margin: "0 0 14px 0",
                color: "white",
                fontSize: isMobile ? "24px" : "28px",
                lineHeight: 1,
                letterSpacing: "-0.03em"
              }}
            >
              Как работает колода
            </h2>

            <div
              style={{
                display: "grid",
                gap: "14px"
              }}
            >
              <div
                style={{
                  paddingBottom: "14px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <div style={smallLabelStyle}>01</div>
                <p style={cardTextStyle}>
                  На главной странице можно получить случайную карту из колоды.
                </p>
              </div>

              <div
                style={{
                  paddingBottom: "14px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <div style={smallLabelStyle}>02</div>
                <p style={cardTextStyle}>
                  Карта переворачивается и показывает задание, ограничение и
                  подсказку.
                </p>
              </div>

              <div>
                <div style={smallLabelStyle}>03</div>
                <p style={cardTextStyle}>
                  В каталоге можно просматривать все карточки, фильтровать их по
                  категориям и выбирать задание вручную.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto auto" : "1fr 1fr",
              gap: "18px",
              height: "100%"
            }}
          >
            <div
              style={{
                ...cardStyle,
                borderRadius: "28px",
                padding: isMobile ? "18px" : "20px",
                height: "100%"
              }}
            >
              <h2
                style={{
                  margin: "0 0 14px 0",
                  color: "white",
                  fontSize: isMobile ? "24px" : "28px",
                  lineHeight: 1,
                  letterSpacing: "-0.03em"
                }}
              >
                Категории
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px"
                }}
              >
                {categories.map((category) => (
                  <div
                    key={category}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      color: "#e8e2d8",
                      fontSize: "14px",
                      lineHeight: 1.2
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                ...cardStyle,
                borderRadius: "28px",
                padding: isMobile ? "18px" : "20px",
                height: "100%"
              }}
            >
              <h2
                style={{
                  margin: "0 0 14px 0",
                  color: "white",
                  fontSize: isMobile ? "24px" : "28px",
                  lineHeight: 1,
                  letterSpacing: "-0.03em"
                }}
              >
                Сложность
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "14px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px"
                  }}
                >
                  <div style={{ color: "#d7d2ca", fontSize: "15px", lineHeight: 1.4 }}>
                    Легко
                  </div>
                  <DifficultyDots filledCount={2} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px"
                  }}
                >
                  <div style={{ color: "#d7d2ca", fontSize: "15px", lineHeight: 1.4 }}>
                    Средне
                  </div>
                  <DifficultyDots filledCount={3} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px"
                  }}
                >
                  <div style={{ color: "#d7d2ca", fontSize: "15px", lineHeight: 1.4 }}>
                    Сложно
                  </div>
                  <DifficultyDots filledCount={4} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            maxWidth: isMobile ? "100%" : "720px"
          }}
        >
          <h2
            style={{
              margin: "0 0 14px 0",
              color: "white",
              fontSize: isMobile ? "24px" : "28px",
              lineHeight: 1,
              letterSpacing: "-0.03em"
            }}
          >
            Что будет дальше
          </h2>

          <p style={bodyTextStyle}>
            Дальше проект может развиваться как открытая система: с новыми
            выпусками, спецрубриками, приглашенными художниками и авторскими
            подборками заданий.
          </p>
        </section>
      </div>
    </main>
  );
}

export default About;