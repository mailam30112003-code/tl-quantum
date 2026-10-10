import { STORE } from "../data/shipping";
import "./ZaloButton.css";

// Nút Zalo nổi ở góc phải: bấm vào sẽ mở khung chat Zalo tới shop.
export default function ZaloButton() {
  return (
    <a
      className="tq-zalo"
      href={`https://zalo.me/${STORE.zalo}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nhắn tin Zalo cho TL Quantum"
    >
      <span className="tq-zalo-tip">Chat Zalo với shop</span>
      <span className="tq-zalo-ico">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 8C14.6 8 7 14.7 7 23c0 4.6 2.3 8.7 6 11.5-.3 1.7-1.2 3.6-2.6 5.2 3.2-.2 6.1-1.3 8.2-2.9 2.9 1 5.9 1.5 5.4 1.5C33.4 38.3 41 31.6 41 23S33.4 8 24 8z" fill="#fff" />
          <text x="24" y="27" textAnchor="middle" fontSize="11.5" fontWeight="800" fontFamily="Arial, sans-serif" fill="#0068ff">Zalo</text>
        </svg>
      </span>
    </a>
  );
}
