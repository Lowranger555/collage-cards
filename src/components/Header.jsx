import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  const links = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/guest-cards", label: "Гостевые карты" },
    { to: "/about", label: "О проекте" }
  ];

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: isMobile ? "58px" : "64px",
        boxSizing: "border-box",
        background: "rgba(8, 8, 9, 0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          height: "100%",
          margin: "0 auto",
          padding: isMobile ? "10px 12px" : "12px 20px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isMobile ? (
          <nav
            style={{
              width: "100%",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {links.map((link) => {
              const active = isActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    flex: "0 0 auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    color: active ? "white" : "rgba(255,255,255,0.68)",
                    fontSize: "14px",
                    lineHeight: 1,
                    fontWeight: "600",
                    background: active
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxSizing: "border-box"
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap"
            }}
          >
            {links.map((link) => {
              const active = isActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "140px",
                    height: "40px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    color: active ? "white" : "rgba(255,255,255,0.66)",
                    fontSize: "14px",
                    lineHeight: 1,
                    fontWeight: "600",
                    background: active
                      ? "rgba(255,255,255,0.05)"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid transparent",
                    boxSizing: "border-box"
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;