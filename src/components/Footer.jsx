import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Layout.css";

export default function Footer() {
  return (
    <footer className="tq-footer">
      <div className="tq-container tq-footer-grid">
        <div>
          <div className="tq-logo tq-logo-light">
            <img src={logo} alt="" />
            <span className="tq-logo-text">
              <strong>TL Quantum</strong>
              <small>Giải pháp linh kiện điện tử</small>
            </span>
          </div>
          <p className="tq-footer-about">
            Linh kiện điện tử, vi điều khiển, cảm biến, module và dụng cụ cho
            sinh viên, maker và kỹ sư.
          </p>
        </div>

        <div>
          <h4>Khám phá</h4>
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/projects">Dự án</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/guide">Hướng dẫn</Link>
        </div>

        <div>
          <h4>Danh mục</h4>
          <Link to="/?cat=Vi%20%C4%91i%E1%BB%81u%20khi%E1%BB%83n#catalog">Vi điều khiển</Link>
          <Link to="/?cat=C%E1%BA%A3m%20bi%E1%BA%BFn#catalog">Cảm biến</Link>
          <Link to="/?cat=Module#catalog">Module</Link>
          <Link to="/?cat=Ngu%E1%BB%93n#catalog">Nguồn</Link>
          <Link to="/?cat=D%E1%BB%A5ng%20c%E1%BB%A5#catalog">Dụng cụ</Link>
        </div>

        <div>
          <h4>Liên hệ</h4>
          <a href="tel:0845089876">📞 0845 089 876</a>
          <Link to="/contact">✉️ Gửi tin nhắn cho chúng tôi</Link>
          <span>🚚 Giao hàng toàn quốc</span>
        </div>
      </div>

      <div className="tq-footer-bottom">
        <div className="tq-container">© {new Date().getFullYear()} TL Quantum. Bảo lưu mọi quyền.</div>
      </div>
    </footer>
  );
}
