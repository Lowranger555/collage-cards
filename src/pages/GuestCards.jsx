function GuestCards() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

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

  const bodyTextStyle = {
    margin: 0,
    color: "#b9b9b9",
    fontSize: "15px",
    lineHeight: 1.6
  };

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
            maxWidth: isMobile ? "100%" : "760px",
            marginBottom: isMobile ? "28px" : "34px"
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
            Гостевые карты
          </div>

          <h1
            style={{
              margin: "0 0 14px 0",
              color: "white",
              fontSize: "clamp(30px, 5vw, 54px)",
              lineHeight: 1,
              letterSpacing: "-0.04em"
            }}
          >
            Гостевые карты
          </h1>

          <p
            style={{
              ...bodyTextStyle,
              maxWidth: isMobile ? "100%" : "680px"
            }}
          >
            Здесь со временем появятся специальные выпуски карточек, созданные
            вместе с приглашенными художниками, коллажистами, дизайнерами и
            креаторами. Это будет отдельная линия проекта, в которой у каждого
            автора сохранится собственный взгляд, метод и визуальный характер.
          </p>
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
              Специальные подборки заданий, придуманные приглашенными авторами в
              рамках проекта «Коллажные карты».
            </p>
          </div>

          <div style={cardStyle}>
            <div style={smallLabelStyle}>Кто участвует</div>
            <p style={cardTextStyle}>
              Художники, коллажисты, дизайнеры и креаторы, у которых есть
              собственный визуальный язык и авторский подход.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={smallLabelStyle}>Зачем это нужно</div>
            <p style={cardTextStyle}>
              Чтобы расширять проект разными оптиками, методами и художественными
              интонациями, не замыкаясь в одном способе мышления.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: "18px",
            marginBottom: isMobile ? "28px" : "34px",
            alignItems: "start"
          }}
        >
          <div
            style={{
              ...cardStyle,
              borderRadius: "28px",
              padding: isMobile ? "20px" : "22px"
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
              Как это будет работать
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
                  Приглашенный автор предлагает свою мини-подборку заданий или
                  отдельную серию карт.
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
                  Каждая серия получает отдельную подачу и визуальное оформление
                  внутри проекта.
                </p>
              </div>

              <div>
                <div style={smallLabelStyle}>03</div>
                <p style={cardTextStyle}>
                  Здесь будут собираться все гостевые выпуски, чтобы их можно
                  было смотреть как отдельные авторские направления.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto auto",
              gap: "18px",
              alignContent: "start"
            }}
          >
            <div
              style={{
                ...cardStyle,
                borderRadius: "28px",
                padding: isMobile ? "18px" : "20px"
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
                Что здесь появится
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "12px"
                }}
              >
                <p style={bodyTextStyle}>Авторские выпуски</p>
                <p style={bodyTextStyle}>Специальные подборки</p>
                <p style={bodyTextStyle}>Коллаборации</p>
                <p style={bodyTextStyle}>Новые визуальные подходы</p>
              </div>
            </div>

            <div
              style={{
                ...cardStyle,
                borderRadius: "28px",
                padding: isMobile ? "18px" : "20px"
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
                Сейчас
              </h2>

              <p style={bodyTextStyle}>
                Раздел находится в подготовке. Здесь постепенно будут появляться
                первые гостевые карточки и специальные выпуски.
              </p>
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
            Почему это важно
          </h2>

          <p style={bodyTextStyle}>
            Гостевые карты помогут проекту расти не только количественно, но и
            содержательно: через новые интонации, неожиданные задания и
            авторские методы, которые расширяют поле коллажа.
          </p>
        </section>
      </div>
    </main>
  );
}

export default GuestCards;