import "../Projects.css";

function Projects() {
  return (
    <div className="projects-page">

      <h1>Dự án TL Quantum</h1>

      <div className="projects-grid">

        <div className="project-card">

          <div className="project-image">
            🚑
          </div>

          <h2>RESCUE RADAR</h2>

          <p>
            Hệ thống tìm kiếm nạn nhân sử dụng
            mmWave Radar và LoRa.
          </p>

          <div className="project-tags">

            <span>ESP32</span>

            <span>LoRa</span>

            <span>LD2450</span>

            <span>GPS</span>

          </div>

          <button>
            Xem chi tiết
          </button>

        </div>

        <div className="project-card">

          <div className="project-image">
            🌱
          </div>

          <h2>Smart Agriculture</h2>

          <p>
            Hệ thống giám sát nhiệt độ, độ ẩm,
            điều khiển tưới tự động.
          </p>

          <div className="project-tags">

            <span>ESP32</span>

            <span>MQTT</span>

            <span>IoT</span>

          </div>

          <button>
            Xem chi tiết
          </button>

        </div>

        <div className="project-card">

          <div className="project-image">
            🤖
          </div>

          <h2>Robot AGV</h2>

          <p>
            Robot tự hành sử dụng cảm biến và
            điều khiển không dây.
          </p>

          <div className="project-tags">

            <span>STM32</span>

            <span>RF</span>

            <span>Motor</span>

          </div>

          <button>
            Xem chi tiết
          </button>

        </div>

      </div>

    </div>
  );
}

export default Projects;