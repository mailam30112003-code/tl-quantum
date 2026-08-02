import "../Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <h1>Liên hệ TL Quantum</h1>

      <div className="contact-container">

        {/* LEFT */}

        <div className="contact-info">

          <h2>Thông tin liên hệ</h2>

          <div className="contact-item">
            📍 <span>TP. Hồ Chí Minh, Việt Nam</span>
          </div>

          <div className="contact-item">
            📞 <span>0845 089 876</span>
          </div>

          <div className="contact-item">
            📧 <span>tlquantum@gmail.com</span>
          </div>

          <div className="contact-item">
            🌐 <span>https://tl-quantum.vercel.app</span>
          </div>

          <div className="contact-item">
            💬 <span>Zalo: 0845 089 876</span>
          </div>

        </div>

        {/* RIGHT */}

        <div className="contact-form">

          <h2>Gửi liên hệ</h2>

          <input
            type="text"
            placeholder="Họ và tên"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="text"
            placeholder="Số điện thoại"
          />

          <textarea
            rows="6"
            placeholder="Nội dung..."
          />

          <button>

            Gửi liên hệ

          </button>

        </div>

      </div>

    </div>
  );
}

export default Contact;