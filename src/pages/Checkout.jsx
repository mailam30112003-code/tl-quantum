import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Checkout.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    note: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

 const handleOrder = async () => {

  if (
    customer.name.trim() === "" ||
    customer.phone.trim() === "" ||
    customer.address.trim() === ""
  ) {
    alert("Vui lòng nhập đầy đủ Họ tên, SĐT và Địa chỉ.");
    return;
  }

  const BOT_TOKEN = "8745745396:AAEP_zDmtP7q9IFDi_C4XSXIUqCP7vw9fcU";
  const CHAT_ID = "8229119606";

  const message = `
🛒 ĐƠN HÀNG MỚI

👤 Khách hàng: ${customer.name}

📞 SĐT: ${customer.phone}

🏠 Địa chỉ: ${customer.address}

📧 Email: ${customer.email || "Không có"}

📝 Ghi chú: ${customer.note || "Không có"}

━━━━━━━━━━━━━━━━━━

${cart
  .map(
    (item) =>
      `• ${item.name}
SL: ${item.quantity}
Thành tiền: ${(item.price * item.quantity).toLocaleString("vi-VN")}đ`
  )
  .join("\n\n")}

━━━━━━━━━━━━━━━━━━

💰 TỔNG TIỀN: ${total.toLocaleString("vi-VN")}đ
`;

  try {

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
      }
    );

    alert("🎉 Đặt hàng thành công!");

    setCart([]);

    navigate("/");

  } catch (error) {

    console.log(error);

    alert("Không gửi được đơn hàng tới Telegram!");

  }

};

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* LEFT */}

        <div className="checkout-left">

          <h2>Thông tin khách hàng</h2>

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={customer.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={customer.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={customer.address}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            name="note"
            placeholder="Ghi chú"
            value={customer.note}
            onChange={handleChange}
          />

        </div>

        {/* RIGHT */}

        <div className="checkout-right">

          <h2>Đơn hàng của bạn</h2>

          {cart.length === 0 ? (
            <p>Chưa có sản phẩm.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="checkout-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="checkout-info">

                  <h4>{item.name}</h4>

                  <p>Số lượng: {item.quantity}</p>

                </div>

                <div className="checkout-price">

                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ

                </div>

              </div>
            ))
          )}

          <hr />

          <div className="checkout-total">

            <span>Tạm tính</span>

            <b>{total.toLocaleString("vi-VN")}đ</b>

          </div>

          <div className="checkout-total">

            <span>Phí vận chuyển</span>

            <b style={{ color: "#16a34a" }}>
              0đ
            </b>

          </div>

          <div className="checkout-final">

            <span>Tổng thanh toán</span>

            <b>{total.toLocaleString("vi-VN")}đ</b>

          </div>

          <button
            className="place-order-btn"
            onClick={handleOrder}
          >
            🛒 Đặt hàng
          </button>

          <button
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
          >
            ← Quay lại giỏ hàng
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;