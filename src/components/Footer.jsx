function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        marginTop: "56px"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "18px 20px 22px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "14px",
              lineHeight: 1.5
            }}
          >
            Проект Ильи Colowgee
          </span>

          <span
            style={{
              color: "rgba(255,255,255,0.24)",
              fontSize: "14px",
              lineHeight: 1
            }}
          >
            —
          </span>

          <a
            href="https://t.me/colowgee"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "rgba(255,255,255,0.78)",
              textDecoration: "none",
              fontSize: "14px",
              lineHeight: 1.5
            }}
          >
            t.me/colowgee
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;