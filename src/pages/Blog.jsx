import "../Blog.css";

function Blog() {
  const posts = [
    {
      id: 1,
      title: "ESP32 là gì?",
      desc: "Tìm hiểu về ESP32, WiFi, Bluetooth và các ứng dụng IoT.",
      image: "https://placehold.co/600x350?text=ESP32",
    },
    {
      id: 2,
      title: "STM32 hay ESP32?",
      desc: "So sánh hai dòng vi điều khiển phổ biến hiện nay.",
      image: "https://placehold.co/600x350?text=STM32",
    },
    {
      id: 3,
      title: "Hướng dẫn Arduino cho người mới",
      desc: "Làm quen Arduino IDE, nạp chương trình và kết nối LED.",
      image: "https://placehold.co/600x350?text=Arduino",
    },
  ];

  return (
    <div className="blog-page">

      <h1>Blog TL Quantum</h1>

      <div className="blog-grid">

        {posts.map((post) => (
          <div className="blog-card" key={post.id}>

            <img
              src={post.image}
              alt={post.title}
            />

            <div className="blog-content">

              <h2>{post.title}</h2>

              <p>{post.desc}</p>

              <button>
                Đọc tiếp →
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Blog;