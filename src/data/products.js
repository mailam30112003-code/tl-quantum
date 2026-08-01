import esp3230 from "../assets/esp32-30.webp";
import esp3238 from "../assets/esp32-38.jpg";
import esp32micro from "../assets/esp32-micro-usb.jpg";
import arduinoNano from "../assets/arduino-nano-v3.jpg";
import arduinoUno from "../assets/arduino-uno-r3-ch340.webp";
import stm32f103 from "../assets/stm32f103c8t6.webp";
import stm32f411 from "../assets/stm32f411ceu6.jpg";
import raspberryPico from "../assets/raspberry-pi-pico.avif";
import loraRa02 from "../assets/lora-ra02.jpg";
import hc05 from "../assets/hc05.jpg";
import rfidRc522 from "../assets/rfid-rc522.webp";
import cp2102 from "../assets/cp2102.jpg";
import stlinkv2 from "../assets/st-link-v2.webp";
import breadboard from "../assets/breadboard.jpg";
import jumper10 from "../assets/jumper-wire-10cm.png";
import jumper20 from "../assets/jumper-wire-20cm.jpg";
import jumper30 from "../assets/jumper-wire-30cm.jpg";
import oled096 from "../assets/oled-096.jpg";
import oled3color from "../assets/oled-3color.jpg";
import lcd1602 from "../assets/lcd1602-i2c.jpg";
import rtcds3231 from "../assets/rtc-ds3231.jpg";
import hcsr04 from "../assets/hc-sr04.jpg";
import tcrt5000 from "../assets/tcrt5000.webp";
import mpu6050 from "../assets/mpu6050.jpg";
import ds18b20 from "../assets/ds18b20.jpg";
import relay1ch from "../assets/relay-1ch.jpg";
import relay2ch from "../assets/relay-2ch.jpg";
import relay4ch from "../assets/relay-4ch.jpg";
import servoSg90 from "../assets/servo-sg90.jpg";

import servoMg90s from "../assets/servo-mg90s.webp";
import dht11 from "../assets/dht11.webp";
import dht22 from "../assets/dht22.webp";
import l298n from "../assets/l298n.jpg";
import lm2596 from "../assets/lm2596.jpg";
import tp4056 from "../assets/tp4056-typec.jpg";

import solderingIron60w from "../assets/soldering-iron-60w.jpg";
import solderingTip from "../assets/soldering-tip.jpg";
import solderWire from "../assets/solder-wire.jpg";
import rosin from "../assets/rosin.webp";
import desolderPump from "../assets/desolder-pump.jpg";
import cuttingPlier from "../assets/cutting-plier.jpg";
import screwdriverSet from "../assets/mini-screwdriver-set.jpg";
import awg20Wire from "../assets/awg20-wire.jpg";

import lm358p from "../assets/lm358p.jpg";
import uln2803 from "../assets/uln2803apg.jpg";

import a1015 from "../assets/a1015.webp";
import c1815 from "../assets/c1815.jpg";
import pn2n3904 from "../assets/2n3904.png";
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
  image: arduinoUno,
},

{
  id: 6,
  sku: "STM32-001",
  category: "STM32",
  name: "STM32F103C8T6",
  price: 52000,
  stock: 15,
  image: stm32f103,
},

{
  id: 7,
  sku: "STM32-002",
  category: "STM32",
  name: "STM32F411CEU6",
  price: 145000,
  stock: 5,
  image: stm32f411,
},

{
  id: 8,
  sku: "RPI-001",
  category: "Raspberry Pi",
  name: "Raspberry Pi Pico",
  price: 120000,
  stock: 5,
  image: raspberryPico,
},

  // ===========================
  // LoRa
  // ===========================

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
  image: loraRa02,
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
  image: hc05,
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
  image: rfidRc522,
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
  image: cp2102,
},

{
  id: 13,
  sku: "STLINK-001",
  category: "Module",
  name: "ST-Link V2",
  price: 39000,
  stock: 5,
  image: stlinkv2,
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
  image: breadboard,
},

{
  id: 15,
  sku: "WIRE-001",
  category: "Phụ kiện",
  name: "Dây cắm Testboard 10cm",
  price: 12000,
  stock: 40,
  image: jumper10,
},

{
  id: 16,
  sku: "WIRE-002",
  category: "Phụ kiện",
  name: "Dây cắm Testboard 20cm",
  price: 16000,
  stock: 40,
  image: jumper20,
},

{
  id: 17,
  sku: "WIRE-003",
  category: "Phụ kiện",
  name: "Dây cắm Testboard 30cm",
  price: 20000,
  stock: 40,
  image: jumper30,
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
  image: oled096,
},

  // ===========================
// Hiển thị
// ===========================

{
  id: 19,
  sku: "OLED-002",
  category: "Hiển thị",
  name: "OLED 2 màu 0.96 I2C",
  price: 57000,
  stock: 12,
  image: oled3color,
},

{
  id: 20,
  sku: "LCD-001",
  category: "Hiển thị",
  name: "LCD1602 I2C",
  price: 65000,
  stock: 15,
  image: lcd1602,
},

{
  id: 21,
  sku: "RTC-001",
  category: "Hiển thị",
  name: "RTC DS3231",
  price: 69000,
  stock: 10,
  image: rtcds3231,
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
  image: hcsr04,
},

{
  id: 23,
  sku: "SEN-002",
  category: "Cảm biến",
  name: "TCRT5000 Cảm biến dò line",
  price: 11000,
  stock: 10,
  image: tcrt5000,
},

{
  id: 24,
  sku: "SEN-003",
  category: "Cảm biến",
  name: "MPU6050 Gia tốc + Con quay",
  price: 58000,
  stock: 10,
  image: mpu6050,
},
{
  id: 25,
  sku: "SEN-004",
  category: "Cảm biến",
  name: "DS18B20 Cảm biến nhiệt độ",
  price: 30000,
  stock: 10,
  image: ds18b20,
},

{
  id: 26,
  sku: "SEN-005",
  category: "Cảm biến",
  name: "DHT11 Có dây",
  price: 25000,
  stock: 15,
  image: dht11,
},

{
  id: 27,
  sku: "SEN-006",
  category: "Cảm biến",
  name: "DHT22 AM2302",
  price: 49000,
  stock: 10,
  image: dht22,
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
  image: servoSg90,
},

{
  id: 29,
  sku: "SERVO-002",
  category: "Motor",
  name: "Servo MG90S Kim loại",
  price: 50000,
  stock: 5,
  image: servoMg90s,
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
  image: relay1ch,
},

{
  id: 31,
  sku: "RELAY-002",
  category: "Relay",
  name: "Relay 2 Kênh 5V",
  price: 26000,
  stock: 10,
  image: relay2ch,
},

{
  id: 32,
  sku: "RELAY-003",
  category: "Relay",
  name: "Relay 4 Kênh 5V",
  price: 49000,
  stock: 5,
  image: relay4ch,
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
  image: l298n,
},

{
  id: 34,
  sku: "MOD-002",
  category: "Nguồn",
  name: "LM2596 DC-DC Buck",
  price: 20000,
  stock: 10,
  image: lm2596,
},

{
  id: 35,
  sku: "MOD-003",
  category: "Nguồn",
  name: "TP4056 Type-C Có bảo vệ",
  price: 12000,
  stock: 10,
  image: tp4056,
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
  image: solderingIron60w,
},

{
  id: 37,
  sku: "TOOL-002",
  category: "Dụng cụ",
  name: "Mũi hàn thay thế",
  price: 15000,
  stock: 10,
  image: solderingTip,
},

{
  id: 38,
  sku: "TOOL-003",
  category: "Dụng cụ",
  name: "Thiếc hàn 1.0mm",
  price: 65000,
  stock: 10,
  image: solderWire,
},

{
  id: 39,
  sku: "TOOL-004",
  category: "Dụng cụ",
  name: "Nhựa thông hàn mạch",
  price: 10000,
  stock: 10,
  image: rosin,
},

{
  id: 40,
  sku: "TOOL-005",
  category: "Dụng cụ",
  name: "Chì hút thiếc lò xo",
  price: 35000,
  stock: 5,
  image: desolderPump,
},
  {
  id: 41,
  sku: "TOOL-006",
  category: "Dụng cụ",
  name: "Kìm cắt chân linh kiện",
  price: 25000,
  stock: 10,
  image: cuttingPlier,
},

{
  id: 42,
  sku: "TOOL-007",
  category: "Dụng cụ",
  name: "Bộ tua vít mini đa năng",
  price: 99000,
  stock: 5,
  image: screwdriverSet,
},

{
  id: 43,
  sku: "WIRE-004",
  category: "Phụ kiện",
  name: "Dây điện AWG20 Đỏ + Đen",
  price: 20000,
  stock: 10,
  image: awg20Wire,
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
  image: lm358p,
},

{
  id: 45,
  sku: "IC-002",
  category: "IC",
  name: "ULN2803APG",
  price: 7000,
  stock: 10,
  image: uln2803,
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
  image: a1015,
},

{
  id: 47,
  sku: "TR-002",
  category: "Transistor",
  name: "C1815 (10 con)",
  price: 5000,
  stock: 10,
  image: c1815,
},

{
  id: 48,
  sku: "TR-003",
  category: "Transistor",
  name: "2N3904 (10 con)",
  price: 5000,
  stock: 10,
  image: pn2n3904,
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