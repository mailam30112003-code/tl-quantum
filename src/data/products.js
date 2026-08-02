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
  },


  {
    id: 70,
    sku: "ESP8266-001",
    category: "ESP32",
    name: "NodeMCU V3 ESP8266",
    price: 65000,
    stock: 10,
    image: "",
  },

  {
    id: 71,
    sku: "MOD-004",
    category: "Nguồn",
    name: "XL6009 DC-DC Boost Converter",
    price: 25000,
    stock: 10,
    image: "",
  },

  {
    id: 72,
    sku: "SW-001",
    category: "Phụ kiện",
    name: "Nút nhấn 6x6x4.3mm",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 73,
    sku: "SW-002",
    category: "Phụ kiện",
    name: "Nút nhấn 6x6x8mm",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 74,
    sku: "JACK-001",
    category: "Phụ kiện",
    name: "Jack nguồn DC DC-002",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 75,
    sku: "HEADER-001",
    category: "Phụ kiện",
    name: "Header đực 40 chân",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 76,
    sku: "HEADER-002",
    category: "Phụ kiện",
    name: "Header cái 40 chân",
    price: 4000,
    stock: 100,
    image: "",
  },

  {
    id: 77,
    sku: "DC-001",
    category: "Phụ kiện",
    name: "Dây Jack DC 5.5x2.1mm",
    price: 12000,
    stock: 30,
    image: "",
  },

  {
    id: 78,
    sku: "DIODE-003",
    category: "Diode",
    name: "Diode 1N4007",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 79,
    sku: "DIODE-004",
    category: "Diode",
    name: "Diode 1N4148",
    price: 500,
    stock: 300,
    image: "",
  },

  {
    id: 80,
    sku: "POWER-001",
    category: "Nguồn",
    name: "Adapter 12V 2A",
    price: 75000,
    stock: 10,
    image: "",
  },

  {
    id: 81,
    sku: "POWER-002",
    category: "Nguồn",
    name: "Nguồn 5V 2A",
    price: 45000,
    stock: 10,
    image: "",
  },

  {
    id: 82,
    sku: "BMS-001",
    category: "Nguồn",
    name: "Mạch bảo vệ pin 3S 20A",
    price: 25000,
    stock: 10,
    image: "",
  },

  {
    id: 83,
    sku: "BAT-001",
    category: "Nguồn",
    name: "Pin vuông 9V",
    price: 25000,
    stock: 20,
    image: "",
  },

  {
    id: 84,
    sku: "HEAT-001",
    category: "Phụ kiện",
    name: "Ống gen co nhiệt",
    price: 15000,
    stock: 20,
    image: "",
  },

  {
    id: 85,
    sku: "HEAT-002",
    category: "Phụ kiện",
    name: "Bộ gen co nhiệt 328 chi tiết",
    price: 45000,
    stock: 10,
    image: "",
  },

  {
    id: 86,
    sku: "HEAT-003",
    category: "Phụ kiện",
    name: "Bộ gen co nhiệt 530 chi tiết",
    price: 70000,
    stock: 10,
    image: "",
  },

  {
    id: 87,
    sku: "SOLDER-001",
    category: "Dụng cụ",
    name: "Mỡ hàn Paste 100g",
    price: 30000,
    stock: 10,
    image: "",
  },

  {
    id: 88,
    sku: "BB-002",
    category: "Phụ kiện",
    name: "Breadboard MB-102",
    price: 35000,
    stock: 20,
    image: "",
  },

  {
    id: 89,
    sku: "PCB-001",
    category: "Phụ kiện",
    name: "Bo mạch đục lỗ PCB",
    price: 10000,
    stock: 30,
    image: "",
  },
    {
    id: 90,
    sku: "CAP-003",
    category: "Tụ điện",
    name: "Tụ hóa 10uF 16V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 91,
    sku: "CAP-004",
    category: "Tụ điện",
    name: "Tụ hóa 10uF 25V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 92,
    sku: "CAP-005",
    category: "Tụ điện",
    name: "Tụ hóa 22uF 25V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 93,
    sku: "CAP-006",
    category: "Tụ điện",
    name: "Tụ hóa 47uF 16V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 94,
    sku: "CAP-007",
    category: "Tụ điện",
    name: "Tụ hóa 47uF 25V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 95,
    sku: "CAP-008",
    category: "Tụ điện",
    name: "Tụ hóa 47uF 35V",
    price: 1000,
    stock: 100,
    image: "",
  },

  {
    id: 96,
    sku: "CAP-009",
    category: "Tụ điện",
    name: "Tụ hóa 100uF 16V",
    price: 1500,
    stock: 100,
    image: "",
  },

  {
    id: 97,
    sku: "CAP-010",
    category: "Tụ điện",
    name: "Tụ hóa 100uF 25V",
    price: 1500,
    stock: 100,
    image: "",
  },

  {
    id: 98,
    sku: "CAP-011",
    category: "Tụ điện",
    name: "Tụ hóa 100uF 35V",
    price: 2000,
    stock: 100,
    image: "",
  },

  {
    id: 99,
    sku: "CAP-012",
    category: "Tụ điện",
    name: "Tụ hóa 220uF 16V",
    price: 2000,
    stock: 100,
    image: "",
  },

  {
    id: 100,
    sku: "CAP-013",
    category: "Tụ điện",
    name: "Tụ hóa 220uF 25V",
    price: 2000,
    stock: 100,
    image: "",
  },

  {
    id: 101,
    sku: "CAP-014",
    category: "Tụ điện",
    name: "Tụ hóa 330uF 25V",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 102,
    sku: "CAP-015",
    category: "Tụ điện",
    name: "Tụ hóa 470uF 16V",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 103,
    sku: "CAP-016",
    category: "Tụ điện",
    name: "Tụ hóa 470uF 25V",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 104,
    sku: "CAP-017",
    category: "Tụ điện",
    name: "Tụ hóa 1000uF 16V",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 105,
    sku: "CAP-018",
    category: "Tụ điện",
    name: "Tụ hóa 1000uF 25V",
    price: 6000,
    stock: 100,
    image: "",
  },

  {
    id: 106,
    sku: "CAP-019",
    category: "Tụ điện",
    name: "Tụ hóa 1000uF 50V",
    price: 10000,
    stock: 50,
    image: "",
  },

  {
    id: 107,
    sku: "CAP-020",
    category: "Tụ điện",
    name: "Tụ hóa 2200uF 50V",
    price: 18000,
    stock: 30,
    image: "",
  },

  {
    id: 108,
    sku: "CAP-021",
    category: "Tụ điện",
    name: "Tụ gốm 22pF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 109,
    sku: "CAP-022",
    category: "Tụ điện",
    name: "Tụ gốm 47pF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 110,
    sku: "CAP-023",
    category: "Tụ điện",
    name: "Tụ gốm 100pF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 111,
    sku: "CAP-024",
    category: "Tụ điện",
    name: "Tụ gốm 220pF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 112,
    sku: "CAP-025",
    category: "Tụ điện",
    name: "Tụ gốm 470pF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 113,
    sku: "CAP-026",
    category: "Tụ điện",
    name: "Tụ gốm 1nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 114,
    sku: "CAP-027",
    category: "Tụ điện",
    name: "Tụ gốm 2.2nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 115,
    sku: "CAP-028",
    category: "Tụ điện",
    name: "Tụ gốm 4.7nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 116,
    sku: "CAP-029",
    category: "Tụ điện",
    name: "Tụ gốm 10nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 117,
    sku: "CAP-030",
    category: "Tụ điện",
    name: "Tụ gốm 22nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 118,
    sku: "CAP-031",
    category: "Tụ điện",
    name: "Tụ gốm 47nF",
    price: 500,
    stock: 200,
    image: "",
  },

  {
    id: 119,
    sku: "CAP-032",
    category: "Tụ điện",
    name: "Tụ gốm 100nF (104)",
    price: 500,
    stock: 300,
    image: "",
  },

  {
    id: 120,
    sku: "CAP-033",
    category: "Tụ điện",
    name: "Tụ gốm 220nF (224)",
    price: 500,
    stock: 200,
    image: "",
  },
    {
    id: 121,
    sku: "RES-005",
    category: "Điện trở",
    name: "Điện trở 1/4W 100Ω",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 122,
    sku: "RES-006",
    category: "Điện trở",
    name: "Điện trở 1/4W 220Ω",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 123,
    sku: "RES-007",
    category: "Điện trở",
    name: "Điện trở 1/4W 330Ω",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 124,
    sku: "RES-008",
    category: "Điện trở",
    name: "Điện trở 1/4W 470Ω",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 125,
    sku: "RES-009",
    category: "Điện trở",
    name: "Điện trở 1/4W 680Ω",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 126,
    sku: "RES-010",
    category: "Điện trở",
    name: "Điện trở 1/4W 1KΩ",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 127,
    sku: "RES-011",
    category: "Điện trở",
    name: "Điện trở 1/4W 2.2KΩ",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 128,
    sku: "RES-012",
    category: "Điện trở",
    name: "Điện trở 1/4W 3.3KΩ",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 129,
    sku: "RES-013",
    category: "Điện trở",
    name: "Điện trở 1/4W 4.7KΩ",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 130,
    sku: "RES-014",
    category: "Điện trở",
    name: "Điện trở 1/4W 10KΩ",
    price: 1000,
    stock: 500,
    image: "",
  },

  {
    id: 131,
    sku: "RES-015",
    category: "Điện trở",
    name: "Điện trở 1/4W 22KΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 132,
    sku: "RES-016",
    category: "Điện trở",
    name: "Điện trở 1/4W 47KΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 133,
    sku: "RES-017",
    category: "Điện trở",
    name: "Điện trở 1/4W 100KΩ",
    price: 1000,
    stock: 300,
    image: "",
  },

  {
    id: 134,
    sku: "RES-018",
    category: "Điện trở",
    name: "Điện trở 1/4W 220KΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 135,
    sku: "RES-019",
    category: "Điện trở",
    name: "Điện trở 1/4W 330KΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 136,
    sku: "RES-020",
    category: "Điện trở",
    name: "Điện trở 1/4W 470KΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 137,
    sku: "RES-021",
    category: "Điện trở",
    name: "Điện trở 1/4W 1MΩ",
    price: 1000,
    stock: 200,
    image: "",
  },

  {
    id: 138,
    sku: "RES-022",
    category: "Điện trở",
    name: "Điện trở 3W 1Ω",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 139,
    sku: "RES-023",
    category: "Điện trở",
    name: "Điện trở 3W 10Ω",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 140,
    sku: "RES-024",
    category: "Điện trở",
    name: "Điện trở 3W 100Ω",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 141,
    sku: "RES-025",
    category: "Điện trở",
    name: "Điện trở 3W 220Ω",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 142,
    sku: "RES-026",
    category: "Điện trở",
    name: "Điện trở 3W 470Ω",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 143,
    sku: "RES-027",
    category: "Điện trở",
    name: "Điện trở 3W 1KΩ",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 144,
    sku: "RES-028",
    category: "Điện trở",
    name: "Điện trở 3W 10KΩ",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 145,
    sku: "RES-029",
    category: "Điện trở",
    name: "Điện trở sứ 5W 1Ω",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 146,
    sku: "RES-030",
    category: "Điện trở",
    name: "Điện trở sứ 5W 10Ω",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 147,
    sku: "RES-031",
    category: "Điện trở",
    name: "Điện trở sứ 5W 100Ω",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 148,
    sku: "RES-032",
    category: "Điện trở",
    name: "Điện trở sứ 5W 220Ω",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 149,
    sku: "RES-033",
    category: "Điện trở",
    name: "Điện trở sứ 5W 470Ω",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 150,
    sku: "RES-034",
    category: "Điện trở",
    name: "Điện trở sứ 5W 1KΩ",
    price: 5000,
    stock: 100,
    image: "",
  },
    {
    id: 151,
    sku: "VR-001",
    category: "Module",
    name: "Biến trở tinh chỉnh 3296W 100Ω",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 152,
    sku: "VR-002",
    category: "Module",
    name: "Biến trở tinh chỉnh 3296W 1KΩ",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 153,
    sku: "VR-003",
    category: "Module",
    name: "Biến trở tinh chỉnh 3296W 10KΩ",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 154,
    sku: "VR-004",
    category: "Module",
    name: "Biến trở tinh chỉnh 3296W 100KΩ",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 155,
    sku: "VR-005",
    category: "Module",
    name: "Biến trở B10K",
    price: 8000,
    stock: 30,
    image: "",
  },

  {
    id: 156,
    sku: "VR-006",
    category: "Module",
    name: "Biến trở B100K",
    price: 8000,
    stock: 30,
    image: "",
  },

  {
    id: 157,
    sku: "XTAL-001",
    category: "Module",
    name: "Thạch anh 4MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 158,
    sku: "XTAL-002",
    category: "Module",
    name: "Thạch anh 8MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 159,
    sku: "XTAL-003",
    category: "Module",
    name: "Thạch anh 11.0592MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 160,
    sku: "XTAL-004",
    category: "Module",
    name: "Thạch anh 12MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 161,
    sku: "XTAL-005",
    category: "Module",
    name: "Thạch anh 16MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 162,
    sku: "XTAL-006",
    category: "Module",
    name: "Thạch anh 20MHz",
    price: 3000,
    stock: 50,
    image: "",
  },

  {
    id: 163,
    sku: "JACK-002",
    category: "Phụ kiện",
    name: "Jack DC cái 5.5x2.1mm",
    price: 5000,
    stock: 50,
    image: "",
  },

  {
    id: 164,
    sku: "JACK-003",
    category: "Phụ kiện",
    name: "Jack DC đực 5.5x2.1mm",
    price: 5000,
    stock: 50,
    image: "",
  },

  {
    id: 165,
    sku: "TB-001",
    category: "Phụ kiện",
    name: "Terminal Block KF301-2P",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 166,
    sku: "TB-002",
    category: "Phụ kiện",
    name: "Terminal Block KF301-3P",
    price: 4000,
    stock: 100,
    image: "",
  },

  {
    id: 167,
    sku: "SW-004",
    category: "Phụ kiện",
    name: "Công tắc gạt MTS-102",
    price: 5000,
    stock: 50,
    image: "",
  },

  {
    id: 168,
    sku: "SW-005",
    category: "Phụ kiện",
    name: "Công tắc gạt MTS-103",
    price: 6000,
    stock: 50,
    image: "",
  },

  {
    id: 169,
    sku: "FUSE-001",
    category: "Phụ kiện",
    name: "Cầu chì 5x20mm 1A",
    price: 2000,
    stock: 100,
    image: "",
  },

  {
    id: 170,
    sku: "FUSE-002",
    category: "Phụ kiện",
    name: "Cầu chì 5x20mm 2A",
    price: 2000,
    stock: 100,
    image: "",
  },

  {
    id: 171,
    sku: "FUSE-003",
    category: "Phụ kiện",
    name: "Đế cầu chì 5x20mm",
    price: 5000,
    stock: 50,
    image: "",
  },

  {
    id: 172,
    sku: "IC-003",
    category: "IC",
    name: "IC 7805",
    price: 5000,
    stock: 50,
    image: "",
  },

  {
    id: 173,
    sku: "IC-004",
    category: "IC",
    name: "IC 7812",
    price: 6000,
    stock: 50,
    image: "",
  },

  {
    id: 174,
    sku: "IC-005",
    category: "IC",
    name: "AMS1117-3.3",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 175,
    sku: "IC-006",
    category: "IC",
    name: "AMS1117-5.0",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 176,
    sku: "IC-007",
    category: "IC",
    name: "LM317T",
    price: 8000,
    stock: 50,
    image: "",
  },

  {
    id: 177,
    sku: "IC-008",
    category: "IC",
    name: "LM2576-5.0",
    price: 18000,
    stock: 30,
    image: "",
  },

  {
    id: 178,
    sku: "IC-009",
    category: "IC",
    name: "NE555 Timer",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 179,
    sku: "IC-010",
    category: "IC",
    name: "PC817 Optocoupler",
    price: 3000,
    stock: 100,
    image: "",
  },

  {
    id: 180,
    sku: "IC-011",
    category: "IC",
    name: "L293D Driver",
    price: 18000,
    stock: 30,
    image: "",
  },
    {
    id: 181,
    sku: "IC-012",
    category: "IC",
    name: "ULN2003A",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 182,
    sku: "IC-013",
    category: "IC",
    name: "74HC595",
    price: 6000,
    stock: 100,
    image: "",
  },

  {
    id: 183,
    sku: "IC-014",
    category: "IC",
    name: "74HC165",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 184,
    sku: "IC-015",
    category: "IC",
    name: "CD4017",
    price: 6000,
    stock: 100,
    image: "",
  },

  {
    id: 185,
    sku: "IC-016",
    category: "IC",
    name: "CD4026",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 186,
    sku: "IC-017",
    category: "IC",
    name: "CD4047",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 187,
    sku: "IC-018",
    category: "IC",
    name: "LM393",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 188,
    sku: "IC-019",
    category: "IC",
    name: "LM324",
    price: 6000,
    stock: 100,
    image: "",
  },

  {
    id: 189,
    sku: "IC-020",
    category: "IC",
    name: "LM386",
    price: 8000,
    stock: 100,
    image: "",
  },

  {
    id: 190,
    sku: "IC-021",
    category: "IC",
    name: "MAX232",
    price: 8000,
    stock: 100,
    image: "",
  },

  {
    id: 191,
    sku: "IC-022",
    category: "IC",
    name: "MAX485",
    price: 10000,
    stock: 100,
    image: "",
  },

  {
    id: 192,
    sku: "IC-023",
    category: "IC",
    name: "AT24C02 EEPROM",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 193,
    sku: "IC-024",
    category: "IC",
    name: "AT24C256 EEPROM",
    price: 8000,
    stock: 100,
    image: "",
  },

  {
    id: 194,
    sku: "MOS-001",
    category: "Transistor",
    name: "IRF520 MOSFET",
    price: 10000,
    stock: 100,
    image: "",
  },

  {
    id: 195,
    sku: "MOS-002",
    category: "Transistor",
    name: "IRF540N MOSFET",
    price: 12000,
    stock: 100,
    image: "",
  },

  {
    id: 196,
    sku: "MOS-003",
    category: "Transistor",
    name: "IRLZ44N MOSFET",
    price: 18000,
    stock: 50,
    image: "",
  },

  {
    id: 197,
    sku: "TRIAC-001",
    category: "Transistor",
    name: "BT136 TRIAC",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 198,
    sku: "IC-025",
    category: "IC",
    name: "MOC3021",
    price: 7000,
    stock: 100,
    image: "",
  },

  {
    id: 199,
    sku: "MOD-005",
    category: "Module",
    name: "Module NRF24L01+",
    price: 35000,
    stock: 50,
    image: "",
  },

  {
    id: 200,
    sku: "MOD-006",
    category: "Module",
    name: "Module CC1101 433MHz",
    price: 65000,
    stock: 30,
    image: "",
  },

  {
    id: 201,
    sku: "ESP-001",
    category: "ESP32",
    name: "ESP-01S ESP8266",
    price: 30000,
    stock: 100,
    image: "",
  },

  {
    id: 202,
    sku: "ESP-002",
    category: "ESP32",
    name: "ESP-12F ESP8266",
    price: 35000,
    stock: 50,
    image: "",
  },

  {
    id: 203,
    sku: "MOD-007",
    category: "Module",
    name: "USB Type-C Breakout",
    price: 10000,
    stock: 100,
    image: "",
  },

  {
    id: 204,
    sku: "MOD-008",
    category: "Module",
    name: "Micro USB Breakout",
    price: 10000,
    stock: 100,
    image: "",
  },

  {
    id: 205,
    sku: "MOD-009",
    category: "Module",
    name: "ACS712 5A",
    price: 35000,
    stock: 50,
    image: "",
  },

  {
    id: 206,
    sku: "MOD-010",
    category: "Module",
    name: "INA219 Current Sensor",
    price: 45000,
    stock: 50,
    image: "",
  },

  {
    id: 207,
    sku: "MOD-011",
    category: "Module",
    name: "KY-040 Rotary Encoder",
    price: 25000,
    stock: 50,
    image: "",
  },

  {
    id: 208,
    sku: "MOD-012",
    category: "Module",
    name: "Joystick PS2 Module",
    price: 25000,
    stock: 50,
    image: "",
  },

  {
    id: 209,
    sku: "MOD-013",
    category: "Module",
    name: "Buzzer Active 5V",
    price: 5000,
    stock: 100,
    image: "",
  },

  {
    id: 210,
    sku: "MOD-014",
    category: "Module",
    name: "Buzzer Passive 5V",
    price: 5000,
    stock: 100,
    image: "",
  }

];



export default products;