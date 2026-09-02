export type SensorKind = "mox-analog" | "mox-digital" | "electrochemical" | "research"

export type SupportLevel = "full" | "partial" | "conditioned" | "research"

export interface Sensor {
  id: string
  name: string
  kind: SensorKind
  target: string
  use: string
  io: string
  supply: string
  support: SupportLevel
  inKit: boolean
  note: string
  links: { label: string; href: string }[]
}

export interface SupportBadge {
  level: SupportLevel
  label: string
  short: string
  detail: string
}

export const SUPPORT_BADGES: Record<SupportLevel, SupportBadge> = {
  full: {
    level: "full",
    label: "Supported · in the standard kit",
    short: "Full support",
    detail:
      "Plays the complete OpenSmell pipeline today: one-click Osmograph firmware flash, standard wiring, channel mapping into the 6-channel encoder.",
  },
  partial: {
    level: "partial",
    label: "Hardware-ready · DIY firmware",
    short: "DIY firmware",
    detail:
      "Wireable and the data format is compatible, but Osmograph's one-click flash currently covers MQ-only configurations. Use the PlatformIO firmware pattern to bring your own driver.",
  },
  conditioned: {
    level: "conditioned",
    label: "Needs conditioning · no software yet",
    short: "Needs extra hardware",
    detail:
      "Feasible on the bench but not plug-and-play — a conditioning circuit (or an on-board-conditioned module) is required, and there is no OpenSmell software support yet. The serial CSV contract is documented so you can build the driver.",
  },
  research: {
    level: "research",
    label: "Research-grade · outside the kit",
    short: "Research-grade",
    detail:
      "Orders of magnitude more sensitive (ppb) and correspondingly more expensive and calibration-sensitive. Not part of the current kit.",
  },
}

const buy = (query: string) => [
  { label: "AliExpress", href: `https://www.aliexpress.com/w/wholesale-${query}.html` },
  { label: "Amazon", href: `https://www.amazon.com/s?k=${query.replace(/\s+/g, "+")}` },
]

export const SENSORS: Sensor[] = [
  {
    id: "mq-135",
    name: "MQ-135",
    kind: "mox-analog",
    target: "NH₃, benzene, broad VOCs",
    use: "General-purpose food and air quality",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "The standard first sensor. Responds to a broad range of volatiles.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-135")],
  },
  {
    id: "mq-3",
    name: "MQ-3",
    kind: "mox-analog",
    target: "Ethanol, alcohols",
    use: "Breath analysis, fermentation",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "Alcohol-selective; the reference rig pairs it with MQ-135 for food vs. alcohol.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-3")],
  },
  {
    id: "mq-7",
    name: "MQ-7",
    kind: "mox-analog",
    target: "Carbon monoxide",
    use: "Air quality, combustion detection",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "CO-selective; part of the standard 3-sensor config.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-7")],
  },
  {
    id: "mq-6",
    name: "MQ-6",
    kind: "mox-analog",
    target: "LPG, propane, butane",
    use: "Gas leak detection, cooking safety",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "Adds cooking-gas safety to the food rig.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-6")],
  },
  {
    id: "mq-4",
    name: "MQ-4",
    kind: "mox-analog",
    target: "Methane, natural gas",
    use: "Gas leak detection",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "Methane-selective; used in the 6-sensor full-spectrum rig.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-4")],
  },
  {
    id: "mq-8",
    name: "MQ-8",
    kind: "mox-analog",
    target: "Hydrogen",
    use: "Industrial, research",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: true,
    note: "Hydrogen-selective; completes the 6-sensor rig.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-8")],
  },
  {
    id: "mq-2",
    name: "MQ-2",
    kind: "mox-analog",
    target: "Smoke, general combustibles",
    use: "Fire detection",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: false,
    note: "Same firmware pattern as the other MQ sensors — swap it into any slot.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-2")],
  },
  {
    id: "mq-5",
    name: "MQ-5",
    kind: "mox-analog",
    target: "LPG, natural gas",
    use: "Gas leak detection",
    io: "Analog (AO)",
    supply: "5 V heater · 3.3 V logic",
    support: "full",
    inKit: false,
    note: "Same firmware pattern as the other MQ sensors — swap it into any slot.",
    links: [{ label: "Winsen (manufacturer)", href: "https://www.winsen-sensor.com/" }, ...buy("mq-5")],
  },
  {
    id: "bme688",
    name: "BME688",
    kind: "mox-digital",
    target: "Broad VOCs (relative) + temp, humidity, pressure",
    use: "Compact environmental sensing",
    io: "I²C / SPI",
    supply: "1.7–3.6 V (3.3 V typical)",
    support: "partial",
    inKit: false,
    note:
      "4-in-1 Bosch sensor. Gas output is a relative resistance, not a calibrated concentration — pairs with Bosch BSEC or a custom model. Firmware pattern exists; one-click flash is MQ-only for now.",
    links: [
      { label: "Bosch Sensortec", href: "https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme688/" },
      { label: "Adafruit breakout", href: "https://www.adafruit.com/product/5046" },
    ],
  },
  {
    id: "sgp40",
    name: "SGP40",
    kind: "mox-digital",
    target: "VOC Index (relative)",
    use: "Indoor air quality, VOC trends",
    io: "I²C",
    supply: "1.7–3.6 V (3.3 V typical)",
    support: "partial",
    inKit: false,
    note:
      "Sensirion's current VOC sensor (the older SGP30 is end-of-life). Raw SRAW values stream cleanly into the OpenSmell CSV contract; the VOC Index algorithm runs on your MCU.",
    links: [
      { label: "Sensirion", href: "https://sensirion.com/products/catalog/nox-voc-sensors" },
      { label: "Mouser", href: "https://www.mouser.com/search/refine.aspx?q=SGP40" },
    ],
  },
  {
    id: "sgp41",
    name: "SGP41",
    kind: "mox-digital",
    target: "VOC + NOx (relative)",
    use: "IAQ with NOx (cooking, combustion)",
    io: "I²C",
    supply: "1.7–3.6 V (3.3 V typical)",
    support: "partial",
    inKit: false,
    note:
      "SGP40 with a second NOx sensing channel. Same raw-stream contract; both indices computed on your MCU.",
    links: [
      { label: "Sensirion", href: "https://sensirion.com/products/catalog/nox-voc-sensors" },
      { label: "Mouser", href: "https://www.mouser.com/search/refine.aspx?q=SGP41" },
    ],
  },
  {
    id: "ens160",
    name: "ENS160",
    kind: "mox-digital",
    target: "VOC index + eCO₂",
    use: "Indoor air quality",
    io: "I²C / SPI",
    supply: "1.71–3.6 V (3.3 V typical)",
    support: "partial",
    inKit: false,
    note:
      "Fully integrated MOX from ScioSense (successor to the discontinued CCS811) with on-chip signal processing.",
    links: [
      { label: "ScioSense", href: "https://www.sciosense.com/products/environmental-sensors/ens160-digital-multi-gas-sensor/" },
      { label: "Adafruit breakout", href: "https://www.adafruit.com/product/5606" },
    ],
  },
  {
    id: "mics6814",
    name: "MiCS-6814",
    kind: "mox-analog",
    target: "CO, NO₂, NH₃ (3 channels)",
    use: "Compact multi-purpose",
    io: "Analog ×3",
    supply: "5 V",
    support: "partial",
    inKit: false,
    note:
      "Three independent metal-oxide elements on one chip (typically the CJMCU-6814 breakout). Needs load resistors, 5 V, and a long warm-up — not plug-and-play on a bare 3.3 V ADC.",
    links: [
      { label: "Datasheet", href: "https://www.sgxsensortech.com/content/uploads/2015/02/1143_Datasheet-MiCS-6814-rev-8.pdf" },
      ...buy("CJMCU-6814"),
    ],
  },
  {
    id: "ze03",
    name: "Winsen ZE03",
    kind: "electrochemical",
    target: "CO, O₂, NH₃, H₂S, NO₂, SO₂, O₃, H₂, Cl₂…",
    use: "Toxic gas detection with on-board conditioning",
    io: "UART (3 V TTL) + analog out",
    supply: "5 V",
    support: "conditioned",
    inKit: false,
    note:
      "Electrochemical cell plus temperature compensation and conditioning built into the module — reads over UART or 0.6–3 V analog. No OpenSmell software support yet; the serial CSV contract is documented so a driver can be built.",
    links: [
      { label: "Winsen ZE03", href: "https://www.winsen-sensor.com/product/ze03.html" },
      { label: "Manual", href: "https://www.winsen-sensor.com/d/files/ze03-electrochemical-module-manualv2_8(6).pdf" },
    ],
  },
  {
    id: "spec",
    name: "SPEC Sensors",
    kind: "electrochemical",
    target: "CO, NO₂, SO₂, H₂S, O₃ (cells)",
    use: "Toxic gas detection",
    io: "Analog (cell)",
    supply: "3.3–5 V",
    support: "conditioned",
    inKit: false,
    note:
      "Bare electrochemical cells output a tiny current and need a load/amplifier circuit — not a direct ADC input. No software support yet.",
    links: [{ label: "SPEC Sensors", href: "https://www.spec-sensors.com/" }],
  },
  {
    id: "alphasense",
    name: "Alphasense cells",
    kind: "electrochemical",
    target: "CO, NO₂, O₃, SO₂, H₂S (4-electrode)",
    use: "Research-grade gas measurement",
    io: "Analog · potentiostat front-end",
    supply: "3.3–5 V",
    support: "conditioned",
    inKit: false,
    note:
      "4-electrode cells need a potentiostat front-end and ppm-level measurement discipline. Research territory.",
    links: [{ label: "Alphasense", href: "https://www.alphasense.com/" }],
  },
  {
    id: "pid",
    name: "PID (photoionisation)",
    kind: "research",
    target: "VOCs at ppb level",
    use: "Research-grade ppb measurement",
    io: "Analog · ppb sensitivity",
    supply: "Varies",
    support: "research",
    inKit: false,
    note:
      "e.g. Alphasense PID-AH. Orders of magnitude more sensitive than MOX, and correspondingly more expensive and calibration-sensitive. Outside the current kit.",
    links: [{ label: "Alphasense", href: "https://www.alphasense.com/" }],
  },
]

export const sensorById = (id: string): Sensor | undefined => SENSORS.find((s) => s.id === id)

export interface StandardConfig {
  name: string
  count: number
  sensors: string[]
  desc: string
}

export const STANDARD_CONFIGS: StandardConfig[] = [
  {
    name: "1-sensor · general VOC",
    count: 1,
    sensors: ["mq-135"],
    desc: "Presence vs. absence of known compounds; air quality and smoke.",
  },
  {
    name: "2-sensor · food vs alcohol",
    count: 2,
    sensors: ["mq-135", "mq-3"],
    desc: "Distinguish food from alcohol vapour.",
  },
  {
    name: "3-sensor · multi-gas food",
    count: 3,
    sensors: ["mq-135", "mq-3", "mq-7"],
    desc: "Distinguish chemically different foods; track spoilage over days; detect anomalies against a clean-air baseline.",
  },
  {
    name: "4-sensor · food + LPG",
    count: 4,
    sensors: ["mq-135", "mq-3", "mq-7", "mq-6"],
    desc: "Finer discrimination between similar foods, plus cooking-gas safety.",
  },
  {
    name: "6-sensor · full-spectrum",
    count: 6,
    sensors: ["mq-135", "mq-3", "mq-7", "mq-6", "mq-4", "mq-8"],
    desc: "Maximum chemical resolution with current MOX technology; complex mixtures; research-grade analysis.",
  },
]

export interface UseCase {
  id: string
  label: string
  desc: string
  tier: string
  sensors: string[]
  note: string
}

export const USE_CASES: UseCase[] = [
  {
    id: "air-quality",
    label: "General air quality / VOC",
    desc: "Is something there? Smoke, off-odours, ambient VOC levels.",
    tier: "1–2 sensors",
    sensors: ["mq-135"],
    note: "Detects presence vs. absence of a known substance.",
  },
  {
    id: "food",
    label: "Food identification & spoilage",
    desc: "Garlic vs. coffee, citrus vs. herbs; track spoilage over days.",
    tier: "3 sensors",
    sensors: ["mq-135", "mq-3", "mq-7"],
    note: "Distinguishes chemically different foods; anomaly detection vs. a clean-air baseline.",
  },
  {
    id: "similar",
    label: "Tell similar smells apart",
    desc: "Garlic vs. ginger, onion vs. shallot.",
    tier: "4 sensors",
    sensors: ["mq-135", "mq-3", "mq-7", "mq-6"],
    note: "Finer discrimination; higher accuracy on all classification tasks.",
  },
  {
    id: "gas-safety",
    label: "Gas leak alarms",
    desc: "LPG, methane, CO — cooking safety and combustion.",
    tier: "2–4 sensors",
    sensors: ["mq-6", "mq-4", "mq-7"],
    note: "Aimed at known-gas alerts rather than food chemistry.",
  },
  {
    id: "breath",
    label: "Breath & fermentation",
    desc: "Alcohol, ethanol, fermentation headspace.",
    tier: "2–3 sensors",
    sensors: ["mq-3", "mq-135", "mq-7"],
    note: "Alcohol-selective core with VOC and CO context.",
  },
  {
    id: "research",
    label: "Full-spectrum fingerprinting",
    desc: "Complex mixtures; research-grade analysis.",
    tier: "6 sensors",
    sensors: ["mq-135", "mq-3", "mq-7", "mq-6", "mq-4", "mq-8"],
    note: "Maximum chemical resolution with current MOX technology.",
  },
]

export interface CapabilityTier {
  range: string
  apps: string
}

export const CAPABILITY_TIERS: CapabilityTier[] = [
  { range: "1–2", apps: "Detect presence vs. absence of a known substance. Gas leak alarms. Smoke detection. Basic alcohol sensing." },
  { range: "3", apps: "Distinguish chemically different foods (garlic vs. coffee, citrus vs. herbs). Track spoilage over days. Detect anomalies against a clean-air baseline." },
  { range: "4", apps: "Distinguish chemically similar foods (garlic vs. ginger, onion vs. shallot). Higher accuracy on all classification tasks." },
  { range: "5–6", apps: "Maximum chemical resolution with current MOX technology. Complex mixture analysis. Research-grade applications." },
]

export const MAX_MQ = 6

export const MQ_ADC1_PINS = ["GPIO34", "GPIO35", "GPIO32", "GPIO33", "GPIO36", "GPIO39"]

export const I2C_PINS = { sda: "GPIO21", scl: "GPIO22" }

export const MAX_I2C_ADDON = 1

export interface Controller {
  id: string
  name: string
  fit: "Recommended" | "Works — pin remap" | "Works — limited channels" | "Works — serial only"
  adc: string
  logic: string
  wireless: string
  flash: string
  note: string
}

export const CONTROLLERS: Controller[] = [
  {
    id: "esp32",
    name: "ESP32 (ESP-WROOM-32, 38-pin)",
    fit: "Recommended",
    adc: "6× ADC1, 12-bit (GPIO34/35/32/33/36/39)",
    logic: "3.3 V",
    wireless: "WiFi AP + BLE",
    flash: "Osmograph one-click (esptool), PlatformIO, Arduino IDE",
    note: "The reference board. ADC1 is WiFi-safe — the firmware maps sensors only to ADC1 so WiFi and BLE stay usable while recording.",
  },
  {
    id: "esp32-s3",
    name: "ESP32-S3 / C3",
    fit: "Works — pin remap",
    adc: "Different ADC1 pin numbering (S3: GPIO1–10)",
    logic: "3.3 V",
    wireless: "WiFi + BLE",
    flash: "PlatformIO, Arduino IDE",
    note: "Same ESP32 SDK, same CSV contract — but the ADC1 channels live on different GPIOs. Re-map the pin table in the firmware before flashing.",
  },
  {
    id: "esp8266",
    name: "ESP8266 (NodeMCU)",
    fit: "Works — limited channels",
    adc: "1× 10-bit (A0)",
    logic: "3.3 V",
    wireless: "WiFi (no BLE)",
    flash: "Arduino IDE, PlatformIO",
    note: "A single ADC input. One MQ sensor works; for more, add an I²C ADC (e.g. ADS1115) and keep the sensors on the 5 V rail with dividers into the ADC inputs.",
  },
  {
    id: "uno",
    name: "Arduino Uno / Nano",
    fit: "Works — serial only",
    adc: "6× 10-bit (A0–A5)",
    logic: "5 V",
    wireless: "None on board (shield required)",
    flash: "Arduino IDE",
    note: "Common shelf board. Streams the same CSV over USB Serial, but there is no onboard WiFi or BLE — the host (Osmograph) has to stay connected via USB.",
  },
  {
    id: "pico",
    name: "Raspberry Pi Pico / Pico W",
    fit: "Works — limited channels",
    adc: "4× 12-bit (GP26–29)",
    logic: "3.3 V",
    wireless: "Pico W only: WiFi (no BLE)",
    flash: "C/C++, MicroPython",
    note: "Twelve-bit ADC but only four usable inputs. Pico W adds WiFi; a plain Pico is serial-only. Keep divider outputs at or below 3.3 V.",
  },
]

export const BREADBOARD_GUIDE = {
  footprint:
    "A 38-pin ESP32 spans ~11 rows of a breadboard and blocks every column it sits on — most of a 170-point mini board disappears under the module.",
  byCount: [
    { max: 2, board: "Mini breadboard (170 tie-points)", reason: "Enough for 1–2 sensors" },
    { max: 4, board: "Half-size breadboard (400 tie-points)", reason: "Comfortable for 3–4 sensors" },
    { max: 6, board: "Full-size breadboard (830 tie-points)", reason: "Room for the 6-sensor array and rails" },
  ] as { max: number; board: string; reason: string }[],
}

export function breadboardFor(mq: number): { item: string; reason: string } {
  const g = BREADBOARD_GUIDE.byCount.find((b) => mq <= b.max) ?? BREADBOARD_GUIDE.byCount[BREADBOARD_GUIDE.byCount.length - 1]
  return { item: g.board, reason: g.reason }
}

export interface BomLine {
  item: string
  qty: string
  purpose: string
  optional?: boolean
}

export interface PlanInput {
  goal: string
  sensors: string[]
}

export function buildBom(input: PlanInput): BomLine[] {
  const mq = input.sensors.filter((id) => sensorById(id)?.kind === "mox-analog").length
  const digital = input.sensors.filter((id) => sensorById(id)?.kind === "mox-digital").length
  const resistorPacks = Math.ceil((mq * 2) / 5)
  const breadboard = breadboardFor(mq)
  const lines: BomLine[] = [
    { item: "ESP32 dev board (38-pin)", qty: "1", purpose: "Microcontroller" },
    { item: "MQ sensor modules", qty: String(mq), purpose: "Gas sensing array (see sensor list)" },
    ...(digital > 0
      ? [{ item: "Digital gas sensor breakout (I²C)", qty: String(digital), purpose: "Supplementary digital sensing channel" }]
      : []),
    { item: breadboard.item, qty: "1", purpose: `${breadboard.reason} — the 38-pin ESP32 covers ~11 rows and blocks the columns it sits on` },
    { item: "Jumper wires, male–male (40 pc)", qty: "1", purpose: "Connections" },
    { item: "10 kΩ resistors (5-pack)", qty: String(resistorPacks), purpose: `Voltage dividers — 2 per MQ sensor (${mq * 2} needed)` },
    { item: "Micro USB data cable", qty: "1", purpose: "Power + programming — must be data-capable, not charge-only" },
  ]
  lines.push(
    { item: "DHT22 temperature/humidity", qty: "1", purpose: "Environmental logging; improves drift tracking", optional: true },
    { item: "Sample container", qty: "1", purpose: "Any cup, bowl, jar, or bag to hold samples near the sensors", optional: true },
    { item: "Airtight container + desiccant", qty: "1", purpose: "Storage to keep dust and humidity off the device", optional: true },
  )
  return lines
}

export const WIRING_CHECKLIST = [
  "ESP32 VIN (5 V) → red power rail",
  "ESP32 GND → blue ground rail",
  "Each sensor VCC → red rail",
  "Each sensor GND → blue rail",
  "Each sensor AO → voltage divider (two equal resistors) → a unique GPIO",
  "No bare metal touching between the red and blue rails",
]

export const FIRMWARE_NOTES = {
  mqOnly:
    "MQ-only configs flash with Osmograph in one click (Detect Board → select sensor config → Flash). No manual code editing. PlatformIO firmware source also lives in electronic-nose/firmware.",
  withDigital:
    "Osmograph's one-click flash currently covers MQ-only configurations. For a rig that includes a digital I²C sensor, flash the PlatformIO firmware from electronic-nose/firmware and add the sensor's I²C init, appending its readings as extra CSV columns.",
  stream:
    "Stream contract: comma-separated values over serial at 115200 baud. The Osmograph firmware emits OSM-prefixed lines every 500 ms over USB Serial and a WiFi AP (TCP :8080, mDNS osmograph) at the same time; a BLE variant lives in electronic-nose/firmware/variants.",
}

export const SAFETY_NOTES = [
  "Check polarity twice before powering: ESP32 VIN → 5 V, GND → GND. Reversed power is the fastest way to kill a board.",
  "Never feed 5 V into a 3.3 V GPIO or ADC pin. The two-resistor divider is there for a reason.",
  "MQ heater elements run at roughly 80 °C and are always on when powered. Keep plastic, wires, and fingers clear.",
  "MQ heaters draw ~150 mA each. Four to six sensors can exceed a laptop USB port's 500 mA budget — use a powered hub or an external 5 V supply.",
  "Bare electrochemical cells are not direct ADC inputs — they need a load/amplifier circuit. Wire a cell straight to GPIO and you risk the cell and the ADC.",
  "The ESP32 is ESD-sensitive. Touch a grounded surface before handling the board.",
  "If the board powers but never shows up on your computer, the cable is almost certainly charge-only.",
]

export const COMMON_MISTAKES = [
  ["Wiring DO instead of AO", "MQ modules expose a digital DO pin (threshold output) and an analog AO pin. AO is the gas value — DO is not."],
  ["Two sensors sharing one ADC pin", "Each MQ sensor needs a unique ADC1 pin. Sharing corrupts both readings."],
  ["Skipping the voltage divider", "MQ AO can swing above 3.3 V. Without the divider the ADC clips at 3.3 V and reads wrong, and can be damaged."],
  ["Under-sizing the breadboard", "The 38-pin ESP32 spans ~11 rows and blocks the columns it sits on. A 170-point mini board only fits 1–2 sensors."],
  ["Two identical I²C breakouts", "Two SGP40s (or two of any same-address breakout) collide on the bus. Pick one digital add-on, or change an address if the breakout allows it."],
  ["Flashing over a charge-only cable", "The board powers up but the port never enumerates. Swap the cable."],
  ["Sensors sealed in an enclosure", "MQ sensors need airflow. A sealed box fills with heater heat and stale air — readings become meaningless."],
]

export const TIPS = [
  "After flashing, you don't need the laptop plugged in: power the rig from a USB wall adapter or power bank and stream over the WiFi AP (or BLE). Your machine stays untethered.",
  "Let the heaters warm up 5 minutes before every session — readings drift hard while they settle.",
  "Log a clean-air baseline at the start of each session; drift happens and the baseline is your reference.",
  "Use a cup, jar, or bag to hold samples at a consistent distance from the array.",
  "Keep the rig near fresh air between samples, not next to the thing you're sniffing.",
  "Re-flash to switch streaming mode — the variants cover USB-only, WiFi, and BLE.",
]

export const BUILD_FLOW = [
  { step: "1", title: "Wire it", desc: "Rails, power, and one voltage divider per MQ sensor onto unique ADC1 pins." },
  { step: "2", title: "Flash firmware", desc: "Osmograph one-click for MQ-only rigs; PlatformIO pattern for mixed/digital." },
  { step: "3", title: "Burn in", desc: "24 cumulative hours powered on — a one-time requirement." },
  { step: "4", title: "First test", desc: "Crush a garlic clove near the array; watch the traces move." },
  { step: "5", title: "Record & train", desc: "30+ seconds per substance in Osmograph; train a classifier with a click." },
  { step: "6", title: "Calibrate", desc: "The calibration wizard is in active development — within-session use works now." },
  { step: "7", title: "Contribute", desc: "Upload labelled recordings to the Data Commons (HuggingFace opensmell/community)." },
]

export const ENCLOSURE_SPECS = {
  summary: "3D-printed or laser-cut from 3 mm acrylic.",
  base: "120 × 80 mm base plate with mounting holes for the ESP32 and sensor breakouts.",
  spacing: "Space MQ sensors at least 20 mm apart for airflow.",
  lid: "Vented lid with 5 mm holes in a grid pattern above the sensors.",
  fan: "Optional 30 mm 5 V fan for active air exchange.",
  clearance: "The heater runs hot (~80 °C) — keep at least 10 mm clearance above each sensor.",
  airflow: "MQ sensors need ambient air — never seal the enclosure.",
  access: "For food testing, add a small door or slot to insert samples without opening the main chamber.",
  models: "Printable model files are being finalised (a Fusion 360 template is pending). Join the Discord to follow along.",
}

export const TROUBLESHOOTING: [string, string, string][] = [
  ["No numbers in the serial monitor", "Wrong baud rate", "Set the serial monitor to 115200"],
  ["All values are zero", "Loose VCC or GND connection", "Press each wire firmly into the breadboard"],
  ["One sensor always reads zero", "Loose voltage-divider connection", "Check both resistors on that sensor's AO line"],
  ["Values drift wildly", "Insufficient burn-in", "Continue until 24 cumulative hours"],
  ["Values drift during a session", "Sensors still warming up", "Wait 5 minutes after power-on before recording"],
  ["ESP32 not recognised", "Charge-only USB cable", "Use a data-capable cable"],
  ["Permission denied on serial", "Linux group membership", "usermod -a -G dialout $USER, then log out/in"],
]

export const REPO_LINKS = {
  repo: "https://github.com/opensmell/electronic-nose",
  osmograph: "https://github.com/OpenSmell/osmograph-desktop",
  discord: "https://discord.gg/CGER3tHxbH",
}
