import esp3230 from "../assets/esp32-30.webp";
import esp3238 from "../assets/esp32-38.jpg";
import esp32micro from "../assets/esp32-micro-usb.jpg";
import arduinoNano from "../assets/arduino-nano-v3.jpg";
const products = [

  // ===========================
  // ESP32
  // ===========================

  {
    id: 1,
    sku: "ESP32-001",
    category: "ESP32",
    name: "ESP32 DEV KIT V1 30 chân",
    price: 95000,
    stock: 3,
    image: esp3230,
  },

  {
    id: 2,
    sku: "ESP32-002",
    category: "ESP32",
    name: "ESP32 DEV KIT V1 38 chân",
    price: 115000,
    stock: 4,
    image: esp3238,
  },

  {
    id: 3,
    sku: "ESP32-003",
    category: "ESP32",
    name: "ESP32-D DevKit Micro USB",
    price: 189000,
    stock: 5,
    image: esp32micro,
  },

  // ===========================
  // Arduino
  // ===========================

  {
    id: 4,
    sku: "ARD-001",
    category: "Arduino",
    name: "Arduino Nano V3",
    price: 70000,
    stock: 10,
    image: arduinoNano,
  },

  {
    id: 5,
    sku: "ARD-002",
    category: "Arduino",
    name: "Arduino Uno R3 CH340",
    price: 85000,
    stock: 10,
    image: "",
  },

  // ===========================
  // STM32
  // ===========================

  {
    id: 6,
    sku: "STM32-001",
    category: "STM32",
    name: "STM32F103C8T6",
    price: 52000,
    stock: 15,
    image: "",
  },

  {
    id: 7,
    sku: "STM32-002",
    category: "STM32",
    name: "STM32F411CEU6",
    price: 145000,
    stock: 5,
    image: "",
  },

  // ===========================
  // Raspberry Pi
  // ===========================

  {
    id: 8,
    sku: "RPI-001",
    category: "Raspberry Pi",
    name: "Raspberry Pi Pico",
    price: 120000,
    stock: 5,
    image: "",
  },

  // ===========================
  // LoRa
  // ===========================

  {
    id: 9,
    sku: "LORA-001",
    category: "LoRa",
    name: "LoRa SX1278 RA-02",
    price: 149000,
    stock: 5,
    image: "",
  },

  // ===========================
  // Bluetooth
  // ===========================

  {
    id: 10,
    sku: "BT-001",
    category: "Bluetooth",
    name: "HC-05 Bluetooth Module",
    price: 103000,
    stock: 10,
    image: "",
  },

  // ===========================
  // RFID
  // ===========================

  {
    id: 11,
    sku: "RFID-001",
    category: "RFID",
    name: "RFID RC522",
    price: 25000,
    stock: 10,
    image: "",
  },

  // ===========================
  // USB - UART
  // ===========================

  {
    id: 12,
    sku: "UART-001",
    category: "Module",
    name: "USB to TTL CP2102",
    price: 47000,
    stock: 10,
    image: "",
  },

  {
    id: 13,
    sku: "STLINK-001",
    category: "Module",
    name: "ST-Link V2",
    price: 39000,
    stock: 5,
    image: "",
  },

  // ===========================
  // Breadboard & Jumper
  // ===========================

  {
    id: 14,
    sku: "BB-001",
    category: "Phụ kiện",
    name: "Breadboard Test Board",
    price: 25000,
    stock: 20,
    image: "",
  },

  {
    id: 15,
    sku: "WIRE-001",
    category: "Phụ kiện",
    name: "Dây cắm Testboard 10cm",
    price: 12000,
    stock: 40,
    image: "",
  },

  {
    id: 16,
    sku: "WIRE-002",
    category: "Phụ kiện",
    name: "Dây cắm Testboard 20cm",
    price: 16000,
    stock: 40,
    image: "",
  },

  {
    id: 17,
    sku: "WIRE-003",
    category: "Phụ kiện",
    name: "Dây cắm Testboard 30cm",
    price: 20000,
    stock: 40,
    image: "",
  },

  // ===========================
  // Hiển thị
  // ===========================

  {
    id: 18,
    sku: "OLED-001",
    category: "Hiển thị",
    name: "OLED 0.96 I2C / SPI",
    price: 55000,
    stock: 10,
    image: "",
  },

  {
    id: 19,
    sku: "OLED-002",
    category: "Hiển thị",
    name: "OLED 3 màu 0.96 I2C",
    price: 57000,
    stock: 12,
    image: "",
  },

  {
    id: 20,
    sku: "LCD-001",
    category: "Hiển thị",
    name: "LCD1602 I2C",
    price: 65000,
    stock: 15,
    image: "",
  },

  {
    id: 21,
    sku: "RTC-001",
    category: "Hiển thị",
    name: "RTC DS3231",
    price: 69000,
    stock: 10,
    image: "",
  },
    // ===========================
  // CẢM BIẾN
  // ===========================

  {
    id: 22,
    sku: "SEN-001",
    category: "Cảm biến",
    name: "HC-SR04 Cảm biến siêu âm",
    price: 22000,
    stock: 20,
    image: "",
  },

  {
    id: 23,
    sku: "SEN-002",
    category: "Cảm biến",
    name: "TCRT5000 Cảm biến dò line",
    price: 11000,
    stock: 10,
    image: "",
  },

  {
    id: 24,
    sku: "SEN-003",
    category: "Cảm biến",
    name: "MPU6050 Gia tốc + Con quay",
    price: 58000,
    stock: 10,
    image: "",
  },

  {
    id: 25,
    sku: "SEN-004",
    category: "Cảm biến",
    name: "DS18B20 Cảm biến nhiệt độ",
    price: 30000,
    stock: 10,
    image: "",
  },

  {
    id: 26,
    sku: "SEN-005",
    category: "Cảm biến",
    name: "DHT11 Có dây",
    price: 25000,
    stock: 15,
    image: "",
  },

  {
    id: 27,
    sku: "SEN-006",
    category: "Cảm biến",
    name: "DHT22 AM2302",
    price: 49000,
    stock: 10,
    image: "",
  },

  // ===========================
  // SERVO & MOTOR
  // ===========================

  {
    id: 28,
    sku: "SERVO-001",
    category: "Motor",
    name: "Servo SG90 9G",
    price: 40000,
    stock: 10,
    image: "",
  },

  {
    id: 29,
    sku: "SERVO-002",
    category: "Motor",
    name: "Servo MG90S Kim loại",
    price: 50000,
    stock: 5,
    image: "",
  },

  // ===========================
  // RELAY
  // ===========================

  {
    id: 30,
    sku: "RELAY-001",
    category: "Relay",
    name: "Relay 1 Kênh 5V",
    price: 13000,
    stock: 10,
    image: "",
  },

  {
    id: 31,
    sku: "RELAY-002",
    category: "Relay",
    name: "Relay 2 Kênh 5V",
    price: 26000,
    stock: 10,
    image: "",
  },

  {
    id: 32,
    sku: "RELAY-003",
    category: "Relay",
    name: "Relay 4 Kênh 5V",
    price: 49000,
    stock: 5,
    image: "",
  },

  // ===========================
  // MODULE
  // ===========================

  {
    id: 33,
    sku: "MOD-001",
    category: "Module",
    name: "L298N Driver Motor",
    price: 45000,
    stock: 10,
    image: "",
  },

  {
    id: 34,
    sku: "MOD-002",
    category: "Nguồn",
    name: "LM2596 DC-DC Buck",
    price: 20000,
    stock: 10,
    image: "",
  },

  {
    id: 35,
    sku: "MOD-003",
    category: "Nguồn",
    name: "TP4056 Type-C Có bảo vệ",
    price: 12000,
    stock: 10,
    image: "",
  },

  // ===========================
  // DỤNG CỤ
  // ===========================

  {
    id: 36,
    sku: "TOOL-001",
    category: "Dụng cụ",
    name: "Mỏ hàn 60W",
    price: 72000,
    stock: 5,
    image: "",
  },

  {
    id: 37,
    sku: "TOOL-002",
    category: "Dụng cụ",
    name: "Mũi hàn thay thế",
    price: 15000,
    stock: 10,
    image: "",
  },

  {
    id: 38,
    sku: "TOOL-003",
    category: "Dụng cụ",
    name: "Thiếc hàn 1.0mm",
    price: 65000,
    stock: 10,
    image: "",
  },

  {
    id: 39,
    sku: "TOOL-004",
    category: "Dụng cụ",
    name: "Nhựa thông hàn mạch",
    price: 10000,
    stock: 10,
    image: "",
  },

  {
    id: 40,
    sku: "TOOL-005",
    category: "Dụng cụ",
    name: "Chì hút thiếc lò xo",
    price: 35000,
    stock: 5,
    image: "",
  },

  {
    id: 41,
    sku: "TOOL-006",
    category: "Dụng cụ",
    name: "Kìm cắt chân linh kiện",
    price: 25000,
    stock: 10,
    image: "",
  },

  {
    id: 42,
    sku: "TOOL-007",
    category: "Dụng cụ",
    name: "Bộ tua vít mini đa năng",
    price: 99000,
    stock: 5,
    image: "",
  },

  {
    id: 43,
    sku: "WIRE-004",
    category: "Phụ kiện",
    name: "Dây điện AWG20 Đỏ + Đen",
    price: 20000,
    stock: 10,
    image: "",
  },
    // ===========================
  // IC
  // ===========================

  {
    id: 44,
    sku: "IC-001",
    category: "IC",
    name: "LM358P",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 45,
    sku: "IC-002",
    category: "IC",
    name: "ULN2803APG",
    price: 7000,
    stock: 10,
    image: "",
  },

  // ===========================
  // TRANSISTOR
  // ===========================

  {
    id: 46,
    sku: "TR-001",
    category: "Transistor",
    name: "A1015 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 47,
    sku: "TR-002",
    category: "Transistor",
    name: "C1815 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 48,
    sku: "TR-003",
    category: "Transistor",
    name: "2N3904 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 49,
    sku: "TR-004",
    category: "Transistor",
    name: "2N3906 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 50,
    sku: "TR-005",
    category: "Transistor",
    name: "2N2907 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 51,
    sku: "TR-006",
    category: "Transistor",
    name: "C945 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 52,
    sku: "TR-007",
    category: "Transistor",
    name: "A1013 (10 con)",
    price: 7000,
    stock: 10,
    image: "",
  },

  {
    id: 53,
    sku: "TR-008",
    category: "Transistor",
    name: "A733 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 54,
    sku: "TR-009",
    category: "Transistor",
    name: "C2383 (10 con)",
    price: 7000,
    stock: 10,
    image: "",
  },

  {
    id: 55,
    sku: "TR-010",
    category: "Transistor",
    name: "2N2222 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 56,
    sku: "TR-011",
    category: "Transistor",
    name: "2N5401 (10 con)",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 57,
    sku: "TR-012",
    category: "Transistor",
    name: "BC547B (10 con)",
    price: 6000,
    stock: 10,
    image: "",
  },

  {
    id: 58,
    sku: "TR-013",
    category: "Transistor",
    name: "BC548B (10 con)",
    price: 6000,
    stock: 10,
    image: "",
  },

  {
    id: 59,
    sku: "TR-014",
    category: "Transistor",
    name: "BC549B (10 con)",
    price: 6000,
    stock: 10,
    image: "",
  },

  {
    id: 60,
    sku: "TR-015",
    category: "Transistor",
    name: "BC559B (10 con)",
    price: 6000,
    stock: 10,
    image: "",
  },

  {
    id: 61,
    sku: "TR-016",
    category: "Transistor",
    name: "B772 TO-126",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 62,
    sku: "TR-017",
    category: "Transistor",
    name: "D882 TO-126",
    price: 5000,
    stock: 10,
    image: "",
  },

  {
    id: 63,
    sku: "TR-018",
    category: "Transistor",
    name: "Cặp D718 + B688",
    price: 22000,
    stock: 10,
    image: "",
  },

  // ===========================
  // DIODE
  // ===========================

  {
    id: 64,
    sku: "DIODE-001",
    category: "Diode",
    name: "Diode 6A10",
    price: 3000,
    stock: 20,
    image: "",
  },

  {
    id: 65,
    sku: "DIODE-002",
    category: "Diode",
    name: "Diode 10A10",
    price: 4000,
    stock: 10,
    image: "",
  },

  // ===========================
  // TỤ ĐIỆN
  // ===========================

  {
    id: 66,
    sku: "CAP-001",
    category: "Tụ điện",
    name: "Tụ hóa các loại",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 67,
    sku: "CAP-002",
    category: "Tụ điện",
    name: "Tụ gốm 50V các loại (20 con)",
    price: 3000,
    stock: 200,
    image: "",
  },

  // ===========================
  // LED
  // ===========================

  {
    id: 68,
    sku: "LED-001",
    category: "LED",
    name: "LED 3mm Combo 6 màu",
    price: 12000,
    stock: 10,
    image: "",
  },

  {
    id: 69,
    sku: "LED-002",
    category: "LED",
    name: "LED 5mm Combo 6 màu",
    price: 12000,
    stock: 10,
    image: "",
  }

];

export default products;