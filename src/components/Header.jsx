import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(8, 8, 9, 0.72)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <Link to="/" style={linkStyle}>Главная</Link>
          <Link to="/catalog" style={linkStyle}>Каталог</Link>
          <Link to="/guest-cards" style={linkStyle}>Гостевые карты</Link>
          <Link to="/about" style={linkStyle}>О проекте</Link>
        </nav>
      </div>
    </header>
  );
}

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  padding: "0 14px",
  borderRadius: "999px",
  textDecoration: "none",
  color: "rgba(255,255,255,0.82)",
  fontSize: "14px",
  fontWeight: "600",
  border: "1px solid rgba(255,255,255,0.08)"
};

export default Header;