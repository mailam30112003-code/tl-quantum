// SỐ ĐÃ BÁN (tổng các kênh: cửa hàng, Shopee, bán ngoài...).
// Sửa số ở đây cho khớp số liệu thật của bạn (xem thống kê trên Shopee / sổ bán hàng).
// Key là `id` sản phẩm trong products.js. Sản phẩm không có ở đây sẽ dùng số `sold` ghi trong products.js (nếu có).
// Các số dưới đây là ƯỚC LƯỢNG ban đầu, hãy đối chiếu rồi chỉnh lại.
const sales = {
  // Vi điều khiển
  1: 420,   // ESP32 30 chân
  2: 310,   // ESP32 38 chân
  3: 110,   // ESP32 DevKit Micro USB
  4: 150,   // ESP32-CAM
  5: 240,   // NodeMCU ESP8266
  6: 260,   // Arduino Nano
  7: 280,   // Arduino Uno
  8: 190,   // STM32F103
  9: 100,   // STM32F411
  10: 120,  // Raspberry Pi Pico
  11: 160,  // ESP32-C3 SuperMini

  // Cảm biến
  14: 350,  // HC-SR04
  15: 150,  // TCRT5000
  16: 220,  // MPU6050
  17: 200,  // DS18B20
  18: 380,  // DHT11
  19: 210,  // DHT22
  20: 110,  // MAX30100
  21: 130,  // MAX30102
  23: 140,  // MQ-2

  // Module / hiển thị
  30: 170,  // HC-05
  34: 230,  // RFID RC522
  35: 200,  // NRF24L01
  40: 240,  // L298N
  41: 190,  // Micro SD
  44: 140,  // ST-Link
  45: 210,  // CP2102
  52: 360,  // TP4056
  53: 260,  // LCD1602
  54: 240,  // OLED 0.96
  56: 130,  // RTC DS3231

  // Motor / relay / nguồn
  58: 450,  // Servo SG90
  64: 230,  // Relay 1 kênh
  65: 140,  // Relay 2 kênh
  69: 120,  // Mạch bảo vệ pin 3S
  70: 300,  // LM2596
  72: 190,  // XL6009
  73: 150,  // Adapter 12V
  74: 170,  // Nguồn 5V

  // Linh kiện cơ bản
  83: 170,  // NE555
  91: 200,  // C1815
  92: 180,  // 2N3904
  112: 500, // 1N4007
  120: 260, // Tụ hóa các loại
  121: 300, // Tụ gốm các loại
  159: 420, // Điện trở 1K
  163: 480, // Điện trở 10K
  185: 210, // LED 3mm
  186: 200, // LED 5mm

  // Phụ kiện / dụng cụ
  197: 280, // Breadboard
  198: 190, // Breadboard MB-102 loại tốt
  203: 300, // Header đực
  204: 260, // Header cái
  210: 410, // Nút nhấn 4.3mm
  211: 380, // Nút nhấn 8mm
  212: 330, // Dây cắm 10cm
  213: 260, // Dây cắm 20cm
  214: 180, // Dây cắm 30cm
  222: 120, // Mỏ hàn 60W
  224: 150, // Thiếc hàn
};

export default sales;
