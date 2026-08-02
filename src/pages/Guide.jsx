import "../Guide.css";

function Guide() {

  const guides = [
    {
      id: 1,
      title: "Hướng dẫn ESP32",
      desc: "Cài Arduino IDE, thêm board ESP32 và chạy chương trình đầu tiên.",
      icon: "📘",
    },
    {
      id: 2,
      title: "STM32CubeIDE",
      desc: "Lập trình STM32 từ cơ bản đến nâng cao với STM32CubeIDE.",
      icon: "⚙️",
    },
    {
      id: 3,
      title: "Arduino",
      desc: "Làm quen Arduino Uno, Nano và các ví dụ cơ bản.",
      icon: "💡",
    },
    {
      id: 4,
      title: "LoRa SX1278",
      desc: "Kết nối LoRa, truyền dữ liệu giữa hai ESP32.",
      icon: "📡",
    },
    {
      id: 5,
      title: "Raspberry Pi",
      desc: "Cài Raspberry Pi OS và điều khiển GPIO.",
      icon: "🍓",
    },
    {
      id: 6,
      title: "Datasheet",
      desc: "Tổng hợp Datasheet IC, Module và cảm biến phổ biến.",
      icon: "📄",
    },
  ];

  return (
    <div className="guide-page">

      <h1>Hướng dẫn & Tài liệu</h1>

      <div className="guide-grid">

        {guides.map((item) => (

          <div
            className="guide-card"
            key={item.id}
          >

            <div className="guide-icon">

              {item.icon}

            </div>

            <h2>{item.title}</h2>

            <p>{item.desc}</p>

            <button>

              Xem hướng dẫn

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Guide;