import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import Toast from "./Toast";
import "./Layout.css";

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();

  // Chuyển trang thì cuộn lên đầu; nếu có #hash thì cuộn tới đúng mục
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="tq-app">
      <Header />
      <main className="tq-content">{children}</main>
      <Footer />
      <MobileNav />
      <Toast />
    </div>
  );
}
