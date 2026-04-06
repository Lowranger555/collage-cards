import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CatalogPage from "./pages/CatalogPage";
import GuestCards from "./pages/GuestCards";
import About from "./pages/About";

function App() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  const headerHeight = isMobile ? 0 : 64;

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "white",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Header />

        <div
          style={{
            flex: 1,
            paddingTop: `${headerHeight}px`
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/guest-cards" element={<GuestCards />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;