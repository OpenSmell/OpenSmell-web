export type ArticleCategory = "Foundations" | "Hardware" | "Tutorial" | "Research"

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  tags: string[]
  readTime: string
  date: string
  author: string
  thumbnail: string
  content: string
}

export const articles: Article[] = [
  {
    slug: "digitising-smell",
    title: "Digitising Smell: An Open Source Primer",
    excerpt:
      "Vision and hearing got an engineering stack — file formats, codecs, libraries, APIs. Smell never did. Why that matters, why it is hard, and why openness is a methodological necessity, not a preference.",
    category: "Foundations",
    tags: ["primer", "manifesto", "open source", "digital olfaction"],
    readTime: "12 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/digitising-smell.png",
    content: `
Technological advancement often follows a recursive pattern: the creation of knowledge enables new tools, which automate manual processes, thereby freeing human capital to solve more complex problems. This cycle is not merely a history of convenience but the engine of societal transformation. Major social shifts—from industrialisation altering labour dynamics to information technology reshaping communication—are often the downstream effects of prior technological emancipation, not their initial cause.

The mechanism is the externalisation of human capability. We model our innate faculties into reproducible, scalable systems:

- **Fire** externalised metabolic digestion.
- **Writing** externalised memory and narrative.
- **The camera** externalised vision, mastering the physics of light.
- **The microphone** externalised hearing, mastering the physics of sound waves.

We didn't just digitise our biology; we transcended it. Today we can see a single atom and hear the echo of the Big Bang.

But our chemical sense remains trapped in biology—subjective, unshareable, and unprogrammable.

## Life without a Nose

We lack a standard \`.scent\` file format, a universal olfactory sensor, or a device capable of broadcasting a smell profile as seamlessly as a speaker emits sound.

Our primary instrument for chemical sensing remains biological: the human nose. Its output is a subjective, unshareable percept, or *quale*. Unlike the deterministic physics of light and sound, the mapping from a molecule's structure to its perceived odour is not defined by a simple, finite set of rules. This represents a profound explanatory gap in our scientific knowledge.

The absence of a digital smell platform has measurable costs. Food waste is a trillion-dollar global problem, yet a refrigerator cannot tell you that milk is spoiling until you open the carton and smell it yourself. Industrial facilities rely on workers carrying handheld detectors to locate toxic gas leaks. Doctors screen for certain cancers using expensive, invasive imaging that could one day be supplemented by breath analysis—if a standardised, interoperable olfactory platform existed.

## The Camera and the Microphone Had a Stack. Smell Has None

Today, trillions of photos are taken every year, and cameras are embedded in every phone, doorbell, and car. The transformation was not driven by better optics alone. It required an entire engineering stack: standard file formats (JPEG, PNG), image-processing libraries (OpenCV), and platforms that let developers build applications without understanding the physics of CMOS transistors.

Sound followed an identical trajectory. MEMS microphones became tiny, cheap, and ubiquitous. Codecs like MP3 compressed audio efficiently. APIs like the Web Audio API made sound programmable in the browser. The result—podcasts, voice assistants, real-time translation—rests on an open, interoperable stack.

Smell has no such stack. There is no open-source library for odour classification. No standard format for a smell recording. No widely available, interoperable sensor hardware with a common data layer. The field is fragmented, and the cost is measured in wasted food, preventable disease, environmental damage, and missed scientific discovery.

## Why Digitising Smell is Hard

Digitisation requires compression of a phenomenon's complexity into a predictive model. We achieved this for vision (wavelength + intensity) and hearing (frequency, amplitude, timbre). Olfaction presents a problem of exponentially higher dimensionality.

The human olfactory system employs roughly **400 distinct receptor types** (about 350–400 are functional in humans). A single odourant molecule can activate multiple receptors, and a single receptor can be activated by numerous molecules. This creates a combinatorial explosion of possible signals, resulting in a perceptual space that is high-dimensional and poorly mapped. The field currently relies on descriptive taxonomies because it lacks a unifying, predictive theory that can reliably compute odour from molecular structure.

Some argue that smell is too subjective to measure. We once said the same about colour. Artists still debate dark red versus burgundy, yet we built colorimeters, RGB, sRGB, and cameras that reproduce colour accurately across devices. Sound, too, has its subjectivity—yet we have decibels, Fourier transforms, and audio codecs. Subjectivity does not prevent objective measurement. It simply means we need the right primitives.

Scientists still debate the exact mechanism of olfaction: one theory holds that molecular geometry determines receptor binding, while another points to quantum-mechanical vibrational frequencies. The truth likely involves both, and a complete causal explanation remains an open research question.

But a complete theory of olfaction is not a prerequisite for a useful digital nose. What is needed is a sensor that produces a stable, reproducible signal when exposed to a particular molecule, and a way to map that signal to something useful—a concentration, a classification, a spoilage alert. The physics for this already exists:

- **Metal-oxide semiconductor (MOX) sensors** — cheap, broad-spectrum, widely available.
- **Infrared absorption spectroscopy** — measures the unique vibrational fingerprint of molecular bonds.
- **Electrochemical cells** — specific to particular gases, quantitative.
- **Quartz crystal microbalances** — detect mass changes when molecules bind to a coated surface.
- **Photoionisation detectors (PID)** — measure total volatile organic compound concentration.

Each has tradeoffs in cost, specificity, and stability. None is perfect. But the bottleneck is not a lack of science. It is the absence of an open, interoperable engineering stack that makes any of these sensors easy to use, compare, and build upon.

## The Imperative for Openness

History shows that foundational infrastructure—like the internet, Linux, or Python—thrives through open, collaborative development. Openness is not merely beneficial for olfaction; it is a **methodological necessity**. Only a transparent process of public code, data, and peer critique can accelerate the iterative failures and insights required to solve a problem of this complexity.

OpenSmell treats olfaction as a public engineering problem rather than a proprietary research puzzle. The aim is to build the same kind of infrastructure that turned cameras and microphones from niche instruments into universal platforms.

## Conclusion

In 1975, when Steve Sasson showed his colleagues the first digital camera, they asked, "Why would anyone want to look at pictures on a television?"

That camera weighed eight pounds, recorded 0.01 megapixels onto a cassette tape, and was dismissed as a curiosity. Today, the camera is the most universal sensor on the planet.

The same transformation will happen to smell. It will begin with clunky devices, incomplete data, and failed experiments. It will seem impractical and niche—until suddenly it is not.

## Get Involved

- **Explore the code & data**: <https://github.com/opensmell>
- **Join the discussion**: <https://discord.gg/CGER3tHxbH>
- **Follow progress**: <https://opensmell.xyz>

## Sources & Further Reading

- Sasson, S. *The first digital camera: a Kodak engineering story* (1975).
- Buck, L. & Axel, R. "A novel multigene family may encode odorant receptors." *Cell* **65**, 175–187 (1991).
- Nobel Prize in Physiology or Medicine 2004 — R. Axel and L. B. Buck.
- Persaud, K. & Dodd, G. "Analysis of discrimination mechanisms in the mammalian olfactory system using a model nose." *Nature* **299**, 352–355 (1982).
- *UNEP Food Waste Index Report* — the roughly \$1 trillion annual cost of food loss and waste.
`,
  },
  {
    slug: "building-your-first-e-nose",
    title: "Building Your First E-Nose",
    excerpt:
      "A complete, flexible build guide for about \$30: an ESP32, a handful of MOX modules, and the signal-chain thinking that turns raw resistance readings into a classifier that can tell espresso from tap water.",
    category: "Tutorial",
    tags: ["hardware", "esp32", "mox", "beginner", "build guide"],
    readTime: "18 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/e-nose-build.svg",
    content: `
Every serious field needs a reproducible, cheap instrument that a student can build in a weekend. For digital olfaction, that instrument is the electronic nose (e-nose): an array of gas sensors whose combined response, interpreted with machine learning, produces a *smell signature*. This guide gets you from zero parts to a working classifier. No PCB milling, no electronics mastery—just an ESP32, some modules, and an afternoon.

## What You'll Build

The signal chain is the whole subject of digital olfaction in miniature:

\`\`\`
SAMPLE → HEADSPACE CHAMBER → SENSOR ARRAY ×N → ADC/MCU → FEATURES → CLASSIFIER
\`\`\`

A fan pulls air from above an odor source into a chamber holding several MOX sensors. The microcontroller samples each sensor's analog output, normalises the readings into features, and hands them to a classifier that outputs "this is coffee" or "this is tap water." Once the plumbing works, everything above the sensors is software—which is where the field's real leverage lives.

## Bill of Materials

| Part | Role | Approx. cost |
| --- | --- | --- |
| ESP32 DevKit | MCU + Wi-Fi + 12-bit ADC | \$6 |
| MQ-135 | MOX, broad VOC sensitivity (ammonia, benzene, CO₂) | \$3 |
| MQ-3 | MOX, alcohol-family sensitivity | \$3 |
| BME680 | Temp + humidity + pressure + VOC index | \$7 |
| 5 V fan + glass jar | headspace chamber + airflow | \$4 |
| Breadboard + jumper wires | assembly | \$5 |
| USB power bank | portable 5 V supply | \$10 |

**Total: ~\$30–35.** You can substitute any MQ module (MQ-2, MQ-7, MQ-8…); the point is *diversity* of sensing surfaces, not any single sensor's quality.

## Why an Array?

A single MOX sensor is cross-sensitive to half the periodic table—that is its fundamental weakness *and* its superpower. The flaw is solved the same way biology solved it: use several *broadly tuned, overlapping* sensors and let the **pattern** across them carry the information. This is precisely the argument Persaud and Dodd made in their landmark 1982 "model nose" paper: discrimination can be achieved with broadly tuned receptors, no specific receptor required. An array of five MOX sensors, run through a classifier, vastly outperforms one "high-end" sensor on real-world discrimination tasks.

## Wiring It Up

Every MQ module has four pins:

- **VCC** → 5 V (this powers the *heater* — more on that below)
- **GND** → GND
- **AO** → an analog input pin on the ESP32 (e.g. GPIO 34)
- **DO** → *ignore this pin.* The digital output is just an internal comparator and will destroy your data. Use AO.

Wire the BME680 over I²C (SDA → GPIO 21, SCL → GPIO 22 on most DevKits). Power the fan from 5 V with a transistor/MOSFET gate on GPIO 26 if you want software-controlled pumping.

> **Heater warning:** MQ modules pull 150–800 mA and their heaters run hot (300 °C+). Always power them from the 5 V rail, never the 3.3 V logic rail, and give them a fresh warm-up of 10–30 minutes before trusting readings.

## Firmware: From ADC to Numbers

The sensor output is a voltage across a load resistor, proportional to sensor resistance \`Rs\`. The quantity that actually matters is the *conductance change* relative to a clean-air baseline. A minimal Arduino sketch:

\`\`\`cpp
const int mqPins[] = {34, 35, 32, 33, 25};
const int N = 5;
float baseline[N];

void setup() {
  Serial.begin(115200);
  delay(30000); // warm-up
  for (int i = 0; i < N; i++) baseline[i] = readConductance(i);
}

float readConductance(int i) {
  float v = analogRead(mqPins[i]) / 4095.0 * 3.3;
  float rs = (3.3 - v) / v * 10.0;      // load resistor 10 kΩ
  return 1.0 / rs;                      // conductance, S
}

void loop() {
  for (int i = 0; i < N; i++) {
    float g = readConductance(i);
    Serial.print((g - baseline[i]) / baseline[i]); Serial.print(" ");
  }
  Serial.println();                     // ΔG/G₀ per sensor
  delay(100);
}
\`\`\`

The per-sensor \`ΔG/G₀\` vector is your first feature. It is unitless, roughly baseline-corrected, and directly comparable across devices.

## The Measurement Protocol

Reproducibility is 80% of this field, and it lives in the protocol:

1. **Purge** — run the fan on clean air for 60 s, capture fresh baseline.
2. **Expose** — place the sample, run the fan for 20 s.
3. **Record** — log every sensor at 10 Hz for the whole cycle.
4. **Purge again** — 60 s clean air, let sensors recover.
5. **Repeat ×5** per sample, ideally across different days.

Log temperature and humidity from the BME680 alongside every reading. MOX sensors are notoriously humidity-sensitive; if you don't log it, you cannot correct it, and your model will silently learn "humidity," not "coffee."

## From Raw Traces to Features

The raw time-series is high-dimensional and noisy. The OpenSmell Python SDK extracts a **145-dimensional feature framework** from each exposure: per-sensor baseline-normalised response, rise and fall slopes, peak, \`t90\` (time to 90% of max response), area under the curve, integral ratios, and cross-sensor ratios. You can start with a tiny subset yourself:

- **Peak ΔG/G₀** per sensor
- **Rise slope** (max \`dG/dt\` during exposure)
- **t90** and **recovery t50**
- **Humidity-normalised peak**

Feed these into any off-the-shelf classifier. With five sensors and five engineered features you already have a 25-dimensional vector per measurement—plenty to separate espresso from tap water.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X, y = load_my_recordings()              # (n_exposures, n_features)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
clf = RandomForestClassifier(200)
clf.fit(X_train, y_train)
print(clf.score(X_test, y_test))
\`\`\`

## Calibration 101

A classifier tells you *which* smell. Calibration tells you *how much*. For quantitative work you need known concentrations. The empirical MOX response is a power law,

\`\`\`
Rs / R0 = A · C^(-α)
\`\`\`

which is linear in log-log space, so two reference points (e.g. certified gas at 10 ppm and 100 ppm) are enough to fit a rough concentration curve for a single gas. Don't over-trust it: the power law is empirical, gas-specific, and temperature-dependent.

## Drift Is Real — Plan for It

The UCI Gas Sensor Array Drift dataset is the field's cautionary tale: 13,910 measurements from 10 MOX sensors over **36 months**, and the sensor response drifted so much that naive classifiers trained on early months fail on later ones. Practical mitigations:

- Recompute \`baseline[]\` on every purge.
- Log *batch* and *date* and treat them as features or as a domain-adversarial problem.
- Recalibrate monthly.
- Prefer relative features (\`ΔG/G₀\`) over raw resistance—they cancel some drift automatically.

## Where to Go Next

- Flash the **Osmograph** firmware to get a zero-code GUI: flash, record, train, done.
- Use the **OpenSmell Python SDK** (\`pip install opensmell\`) for the full 145-feature framework and pretrained classifiers.
- Contribute your recordings to the OpenSmell data commons—every labeled, timestamped trace makes the open stack better for everyone.

## Safety Notes

- MOX heaters reach 300 °C+; mount them clear of plastic and don't touch the mesh during operation.
- Calibrate with safe VOCs (isopropanol, ethanol, vinegar, coffee) in a ventilated space. Never sniff—or vaporize—unknown industrial chemicals.
- A "digital nose" is not a substitute for certified gas detectors in safety applications. It is a research and ML instrument. Know the difference.

## Sources & Further Reading

- Persaud, K. & Dodd, G. *Nature* 299, 352–355 (1982).
- Figaro Engineering application notes on TGS sensors (sensitivity, drift, humidity correction).
- Vergara, A. et al. "Chemical gas sensor drift compensation using classifier ensembles." *Sensors and Actuators B* 166–167 (2012) — the UCI drift dataset.
- OpenSmell GitHub: <https://github.com/opensmell>
`,
  },
  {
    slug: "how-mox-sensors-work",
    title: "How MOX Sensors Work",
    excerpt:
      "The metal-oxide semiconductor sensor is the workhorse of digital olfaction: cheap, rugged, and maddeningly non-specific. A deep dive into the physics, the history, and how to read one properly.",
    category: "Hardware",
    tags: ["mox", "tin dioxide", "physics", "sensor theory", "history"],
    readTime: "14 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/mox-sensor.svg",
    content: `
The metal-oxide semiconductor (MOX) sensor is the transistor of the smell world: imperfect, ubiquitous, and quietly revolutionary. One sentence captures the whole device:

> When a metal-oxide surface (usually tin dioxide, SnO₂) is heated, oxygen from the air adsorbs onto it and strips electrons from the surface. When a reducing gas arrives, it reacts with that oxygen, returns the electrons, and the material's electrical resistance drops. Measure the resistance, you measure the gas.

Everything else—the history, the engineering, the frustrations—is detail. And the details matter, because MOX sensors are simultaneously the cheapest gateway into digital olfaction and its most common source of bad data.

## A Short, Dense History

The story begins in 1962, twice. In Japan, **Naoyoshi Taguchi** was driven by a wave of LP-gas explosion accidents sweeping the country as bottled gas reached 23 million households. After screening many oxides he landed on tin dioxide (SnO₂), filed his patent in October 1962, and commercialised the world's first gas sensor—the **Taguchi Gas Sensor (TGS)**—in **1968** through his company Figaro Engineering. By 1963 he had already discovered that doping the oxide with palladium dramatically improved sensitivity and selectivity. The classic TGS recipe is almost folkloric in its simplicity: a paste of tin chloride and stearic acid is painted on a substrate and fired at ~700 °C; the organic binder burns away, leaving a *porous* SnO₂ layer.

Meanwhile, in a *Analytical Chemistry* paper the same year, **Seiyama and Kato** demonstrated the first thin-film ZnO gas sensor based on the same resistance-change mechanism. Two independent discoveries, one physics.

Decades later, in **1982**, Persaud and Dodd wired a few of these devices together, called it a "model nose," and showed that *broadly tuned* sensors plus pattern recognition could discriminate smells. The e-nose was born—and MOX sensors became its default sensor because they are cheap to make and sensitive to almost everything volatile and reducible.

## The Physics: Oxygen Is the Gatekeeper

SnO₂ is an n-type semiconductor with a wide band gap (~3.6 eV). Heated to 300–450 °C, its surface chemisorbs oxygen as negatively charged species (O₂⁻, O⁻, O²⁻ depending on temperature). Each adsorbed oxygen ion captures an electron from the conduction band, depleting the near-surface region of charge carriers. At the junctions between sintered grains, this depletion creates energy barriers that electrons must cross—so the sensor sits in a *high-resistance* state.

Then a reducing gas—ethanol, CO, hydrogen, methane—arrives and reacts with the adsorbed oxygen:

\`\`\`
CO + O⁻ → CO₂ + e⁻
\`\`\`

The released electron returns to the conduction band, the barriers collapse, and **resistance drops**. The size of the drop scales with gas concentration. Note the asymmetry that catches beginners: *oxidising* gases like NO₂ or ozone *steal* electrons, so resistance *rises*. There is no universal sign convention—always check the datasheet.

## Anatomy of a TGS Sensor

A classic tubular TGS (like the MQ modules) is remarkably low-tech:

- **Sensing layer** — porous SnO₂ (or doped SnO₂: Pd, Pt) sintered at ~700 °C.
- **Electrodes** — gold or platinum wires measuring the film's resistance.
- **Heater** — a platinum–iridium coil running through the ceramic tube, held at 300–450 °C (older units draw ~150–800 mW; modern MEMS versions like the TGS8100 drop to ~15 mW).
- **Ceramic tube / substrate** — alumina (Al₂O₃), chosen for thermal stability.
- **Mesh cap + metal can** — mechanical protection; the can keeps flame from propagating if a combustible mix ignites near the heater.

The geometry is pure engineering craft: you *want* porosity (maximises the surface available for chemisorption) but you also want mechanical strength. Every manufacturer has their own sintering recipe, which is why "two MQ-135s are not two MQ-135s."

## The Response Model

For a fixed temperature, the empirical response is a power law:

\`\`\`
Rs / R0 = A · C^(-α)
\`\`\`

where \`Rs\` is resistance in the gas, \`R0\` the clean-air baseline, \`C\` the concentration, and \`A\`, \`α\` empirical constants. Take the log of both sides and you get a straight line—this is why MOX datasheets plot log–log "sensitivity curves" and why you fit calibrations in log space. The exponent \`α\` is typically ~0.5, which tells you the sensor is *nonlinear and saturating*: it can detect a few ppm of ethanol and a few hundred ppm of methane, but its dynamic range is only a few decades.

## Dynamics: Not Just How Much, But How Fast

Response dynamics carry information too. \`t90\` (time to reach 90% of the steady-state response) and recovery time differ between gases, and *temperature modulation*—pulsing the heater between 200 °C and 400 °C—changes the selectivity profile over time, creating a pseudo-spectrum that can be fed to a classifier. This is a cheap trick that meaningfully improves discrimination and is a great first experiment.

## The Selectivity Problem (and Why Arrays Exist)

The dirty secret: an MOX sensor cannot tell CO from ethanol by itself. Both are reducing gases; both drop the resistance. Dopants buy partial specificity (Pd:CO, Pt:CH₄), but broad cross-sensitivity is intrinsic. The field's answer, since Persaud and Dodd, is **arrays**: run N sensors with overlapping response profiles and let pattern recognition do the separation. A single MOX sensor is a gas alarm; *an array of MOX sensors is an instrument.*

## Drift, Humidity, and Poisoning

Three enemies, all well documented:

- **Humidity** — water vapour changes the oxygen-adsorption equilibrium and shifts the baseline by tens of percent. Compensate with a co-located humidity sensor (this is exactly why the OpenSmell stack mandates logging T/RH).
- **Drift** — long-term slow change in the sensing film (recrystallisation, contamination). The UCI drift dataset documented failures of naive models over 36 months. Mitigate with periodic recalibration and relative features.
- **Poisoning** — silicone vapours (from sealants, lubricants) can permanently deactivate the surface. Keep the sensor away from fresh silicone.

## Reading One Properly

A five-point checklist before you trust any MOX number:

1. Warm up ≥ 10–30 minutes until the baseline is stable.
2. Express results as \`ΔG/G₀\` or \`Rs/R0\` — never raw voltage.
3. Log temperature and humidity.
4. Calibrate in log space against known concentrations.
5. Treat "ppm" estimates as ±factor-of-two at best unless you have certified references.

MOX sensors are not precise. They are *cheap, fast, and information-rich*—and with an array and a classifier, that is a winning combination. Most of the hard problems in digital olfaction are not solved by a better sensor; they are solved by better use of the sensors that cost three dollars.

## Sources & Further Reading

- Taguchi, N. U.S. Patent 3,631,436, "Gas detecting devices" (filed 1967, granted 1971); U.S. Patent 3,625,756 (manufacture of the porous element).
- Seiyama, T. & Kato, A. "A new detector for gaseous components using semiconductor thin film." *Analytical Chemistry* 34, 1502–1503 (1962).
- Persaud, K. & Dodd, G. *Nature* 299, 352–355 (1982).
- Korotcenkov, G. "First fifty years of chemoresistive gas sensors." *Chemosensors* 3, 1 (2015).
- Figaro Engineering, *History* and TGS technical application notes: <https://www.figaro.co.jp>
- Vergara, A. et al. UCI gas sensor drift dataset, *Sensors and Actuators B* (2012).
`,
  },
  {
    slug: "a-field-guide-to-odor-sensor-technologies",
    title: "A Field Guide to Odor Sensor Technologies",
    excerpt:
      "MOX, electrochemical cells, PIDs, QCMs, IR, GC-MS, and biomimetic biosensor arrays — what each technology actually measures, how it fails, and what it costs. Including a deep dive on Aryballe's silicon-photonics nose.",
    category: "Research",
    tags: ["sensors", "survey", "aryballe", "electrochemical", "gc-ms", "qcm"],
    readTime: "16 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/sensor-field-guide.svg",
    content: `
There is no universal smell sensor—and, given the physics, there may never be one. Odour is a *mosaic*: what reaches your nose is a mixture of dozens of volatile organic compounds (VOCs), each present at a different concentration, and different instruments "see" different slices of that mosaic. This guide surveys the main transduction technologies, what each one genuinely measures, where each fails, and how to choose.

## The One-Table Comparison

| Technology | Transduction | Measures | Sensitivity | Selectivity | Cost | Speed |
| --- | --- | --- | --- | --- | --- | --- |
| MOX (SnO₂) | chemoresistive | total reducing VOCs | ppm–ppb | very low | \$ | s–min |
| Electrochemical | amperometric | specific gases (CO, NO₂, H₂S, O₂) | ppb–ppm | high | \$–\$\$ | s |
| PID | UV photoionisation | total VOCs | ppb–ppm | low | \$\$ | ms–s |
| QCM / SAW | gravimetric | mass of adsorbed molecules | ppt–ppm | coating-dependent | \$\$ | s |
| NDIR / FTIR | optical absorption | functional-group bonds | ppm (%), not ppb | high (per bond) | \$\$\$\$ | s |
| GC-MS / GC-O | separation + mass | individual compounds | ppt–ppm | highest | \$\$\$\$\$ | min–hr |
| Biosensor array (SPR) | optical, peptide-bound | affinity fingerprint | ppb–ppm | medium | \$\$\$\$ | s–min |

## MOX — The Workhorse

Covered in depth [in its own article](/academy/how-mox-sensors-work). Cheap, rugged, cross-sensitive, humidity-prone. The default starting point for any e-nose because an array costs less than a nice dinner.

## Electrochemical Cells — The Specific One

An amperometric electrochemical cell passes a gas over an electrode where it oxidises or reduces at a characteristic voltage; the resulting current is proportional to concentration. Because the electrolyte and electrode materials are chosen for a *specific* target (CO, NO₂, H₂S, O₂), these are the sensors in your household carbon-monoxide alarm—specific, quantitative, and power-miserly. Downsides: consumable liquid/electrolyte, limited lifetime, one gas per cell (so an "array" means one sensor per analyte, which scales badly).

## Photoionisation Detectors — The Fast Total

A PID shines a 10.6 eV UV lamp at the gas; any molecule with an ionisation energy below that (most aromatics, many VOCs) loses an electron and the resulting current is measured. It is **not specific**—it reads "total VOCs"—but it responds in milliseconds and detects down to ppb. That makes it the instrument of choice for workplace safety sweepers and fugitive-emission surveys. You get a number, not a smell identity.

## Quartz Crystal Microbalances — The Gravimetric

A QCM is a quartz disc oscillating at MHz frequencies. When molecules adsorb onto its coated surface, the added mass shifts the resonance frequency; the famous **Sauerbrey equation** makes the shift directly proportional to adsorbed mass:

\`\`\`
Δf = -(2 f₀² / A√(ρ·μ)) · Δm
\`\`\`

With a library of different surface coatings (polymers, cyclodextrins, metal-organic frameworks), you build a *gravimetric* array whose combined fingerprint identifies the sorbed mixture. SAW (surface acoustic wave) devices work on the same principle at higher frequency. Sensitive, reversible, but coating chemistry is where the real engineering lives.

## NDIR & FTIR — The Spectroscopist

Infrared spectroscopy measures the *bonds*, not the smell: C–H, C=O, O–H groups absorb at characteristic wavelengths, so you can positively identify functional-group chemistry. Non-dispersive IR (NDIR) is the standard CO₂ sensor; FTIR is the laboratory workhorse. But ppb sensitivity is hard, instruments are expensive, and humidity—the air's dominant IR absorber—is a constant fight. This is the technology of the chemistry lab, not the pocket.

## GC-MS / GC-O — The Gold Standard (and the Reference Point)

Gas chromatography–mass spectrometry separates a mixture into individual compounds, then identifies each by mass spectrum. It is *the* definitive answer to "what is in this air"—but it takes minutes, costs tens of thousands, and requires a trained operator. Its special sibling, **GC-Olfactometry (GC-O)**, splits the column output between the mass spectrometer and a human sniffing port, so you learn *which* chromatographic peak is responsible for *which* perceived smell. GC-O is how you discover that a single compound at ppt concentration is what makes coffee smell like coffee.

Any serious odour project eventually leans on GC-MS as the arbiter of ground truth: the sensor array says "this smells like caramel," GC-MS says "it's 2-acetylpyrazine at 3 ppb."

## Biomimetic Biosensor Arrays — The Aryballe Deep Dive

If MOX is the transistor, **Aryballe** is building the closest thing to an actual nose in silicon. Founded in **2014 in Grenoble, France**, Aryballe pairs *silicon photonics* with *peptide-based biosensors*. At the heart of the technology is a silicon chip containing **64 Mach-Zehnder interferometers** running in parallel, each coated with a different custom peptide that selectively binds VOCs. When a molecule binds, the local refractive index changes, the interference pattern shifts, and the change is transduced optically (surface plasmon resonance imaging in the earlier NeOse Pro generation; interferometry in the current Core Sensor).

Three details are worth stealing from their design:

1. **Peptides as the sensing surface.** Peptides are small protein fragments with defined chemistry; a diverse peptide set binds a broad range of chemical families—more like olfactory receptors than like any single sensor material.
2. **The pattern, not the receptor.** Like biology, Aryballe's value is in the *ensemble*: each odor produces a characteristic response across all 64 channels, rendered as an "olfactive signature" radar chart. A learning phase records signatures into a database; a recognition phase matches unknown samples against it. Two phases, exactly the train/infer split in ML.
3. **Fast regeneration.** The binding is transient (physisorption, not chemisorption), so a clean-air purge desorbs the VOCs and the sensor is reusable within minutes. Peer-reviewed characterization with CEA-LETI measured reversible, ppm-level detection with events resolvable down to ~100 ms — fast enough for continuous monitoring, not just lab batches.

Aryballe sells the NeOse Pro and NeOse Advance benchtop analysers plus the Core Sensor Module (CSM) for OEM integration, and its customers span food, fragrance, cosmetics, and automotive. Academic work with CEA-LETI showed coupling a silicon micro pre-concentrator (Tenax TA, heated to 200 °C) improved the detection limit for n-nonane by ~125× and helped discrimination in humid samples. A companion peer-reviewed paper (Herrier et al., 2022) characterised the 64-MZI silicon nitride platform itself: a 22 × 4.7 mm die with a ~10⁻⁷ RIU bulk limit of detection, identifying VOCs at ppm level. This is the state of the art in commercially deployed biomimetic olfaction—and a strong argument that *biology-inspired, optically-transduced* arrays are the credible path to a general-purpose nose.

## The Pattern-Recognition Layer Is the Real Instrument

Every technology above produces numbers; none produces "smell." The step from *transducer readings* to *odour identity* is a machine-learning problem, and it is the part OpenSmell is building in the open: standard feature extraction, the chemoprint representation, reference datasets, and trained classifiers that work across hardware.

So the practical advice when choosing sensors:

- **Start with an MOX array** (cheap, forgiving, information-rich).
- **Add an electrochemical cell** when a specific gas is your safety-critical target.
- **Use PID** when you need fast, absolute VOC totals.
- **Rent GC-MS time** when you need ground-truth speciation.
- **Watch the biosensor/SPR space** — it is where general-purpose digital olfaction is heading.

## Sources & Further Reading

- Aryballe, *Our technology* and product datasheets (NeOse Pro, NeOse Advance, Core Sensor Module): <https://aryballe.com>
- EE Times, "Silicon photonics improves electronic nose" (2023).
- MDPI *Chemosensors* 8(3), 60 (2020) — SPRi + silicon µPC coupling for the NeOse Pro.
- Herrier, C., et al. "A silicon photonic olfactory sensor based on an array of 64 biofunctionalized Mach-Zehnder interferometers" (2022) — silicon nitride MZI platform, ppm-level detection.
- Sauerbrey, G. *Zeitschrift für Physik* 155, 206–222 (1959) — the QCM equation.
- Harper, W. J. "The strengths and weaknesses of the electronic nose." *Advances in Experimental Medicine and Biology* 481 (2001).
`,
  },
  {
    slug: "review-osmo-machine-olfaction",
    title: "Osmo and the Principal Odor Map: A Field Review",
    excerpt:
      "How Osmo turned Google Research's machine learning into a 256-dimensional map of human olfaction — and why its sensor-map-printer architecture became the shared vocabulary of the entire field.",
    category: "Research",
    tags: ["osmo", "graph neural networks", "principal odor map", "review", "machine learning"],
    readTime: "13 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/osmo-review.svg",
    content: `
Osmo is the company that made digital olfaction mainstream news. It spun out of Google Research in January 2023 with a \$60 million Series A led by Lux Capital and GV (with Amazon's Alexa Fund), led by Alex Wiltschko, who spent years building olfactory machine learning at Google Brain. By 2026 it had raised roughly \$70 million more, grown past 100 employees, and opened a 58,000-square-foot R&D and manufacturing facility in Elizabeth, New Jersey. This review looks at their *science*, their *taxonomy of smell*, and what their architecture means for everyone working on digital olfaction.

## The Thesis: Sensor, Map, Printer

Wiltschko's framing is the cleanest description of digital olfaction ever put on a slide. To digitise smell you need three components:

- **The sensor** — converts atoms to bits (analogous to the camera's CMOS array).
- **The map** — organises, compresses, and transmits the bits (analogous to RGB colour space and JPEG).
- **The printer** — converts bits back to atoms (analogous to the speaker, or a chemical synthesizer).

His ambition is the "Shazam for smell," and his shorthand is that smell needs its *RGB*. It's the correct mental model, and OpenSmell shares it — we'll return to where we think the map should live.

## The Science: The Principal Odor Map (POM)

The intellectual core is the **Principal Odor Map**, published in *Science* in September 2023 ("A principal odor map unifies diverse tasks in olfactory perception"), written with the Monell Chemical Senses Center, the University of Reading, and Arizona State University. It tackles the field's oldest problem — the **Structure-Odor Relation (SOR)**: given a molecule's structure, predict what it smells like.

Here's what they actually did:

- **Data.** A message-passing graph neural network (GNN) trained on ~5,000 molecules with 138 odor descriptors, drawn from the public GoodScents and Leffingwell compilations.
- **Task.** Given a molecular structure, predict the human-perceived odor profile (floral, fruity, sweet, and so on).
- **Result.** On a prospective validation set of 400 odorants never used in training, the model's predicted odor profile matched the trained human panel mean (n = 15) **more closely than the median panelist did** — as the *Science* summary put it, substituting the model for an average human panelist would improve the overall panel description. A simple linear readout of the map generalised to other olfactory tasks (intensity, perceptual similarity, detection thresholds), and the map was used to plot **~500,000 potential odorants** into odor space — most of them never synthesized, and roughly 70 person-years of continuous smelling for a human panel to characterise.

The POM is a **structure-to-perception map**: a learned, 256-dimensional embedding where molecules that smell alike land near each other, the way sRGB and the CIE color spaces locate colours. The paper's own framing is that the POM does for odor "what the CIE color space represents for vision." That is a genuine milestone — it validated at scale that smell is predictable from structure, a question that had been open for decades.

Follow-up work (Qian et al., *eLife*, 2023) showed the same embedding predicts olfactory receptor, neural, and behavioural responses across species separated by hundreds of millions of years of evolution — evidence that a shared, metabolically grounded odor representation runs through much of biology. That is the kind of result that changes how a field thinks.

## Their Taxonomy of Smell

In 2025 Osmo published an actual, open **scent taxonomy** — the kind of resource the field has lacked since Aristotle's classes, and exactly the "common vocabulary" this Academy argues the field needs. It lives on GitHub as a data project:

- **11 Grand Families, 64 Subfamilies, and ~150 additional descriptors** that combine to describe nearly any smell in existence — from perfumery to food to the environment.
- **Built from public, cross-industry knowledge** — flavor and fragrance literature, medical texts, food science, and academic olfaction research — sharpened by Osmo's perfumers and researchers into one consistent system. The letter introducing it is by Osmo's master perfumer, **Christophe Laudamiel**.
- **Licensed as open data (ODC-ODbL)** and published as machine-readable JSON, spreadsheet, and PDF (version 1.1, 2025), maintained in the open with community feedback via GitHub issues.

Why this matters beyond Osmo: the taxonomy is **human vocabulary, not molecular structure** — it names *what things smell like* (families, subfamilies, descriptors) rather than which atoms a molecule contains. That is precisely the perceptual-descriptor layer that supervises the POM (sweet, woody, floral are the map's labels), and it's the same layer OpenSmell's open stack wants to standardise. A common scent vocabulary is a *data* primitive: if recordings, models, and devices all reference the same descriptors, the entire field becomes more interoperable. Osmo's decision to release theirs openly is a gift to the community — and a good example of the openness this review argues compounds.

The company's near-term business is flavour and fragrance ingredients — designing potent, biodegradable aroma molecules — plus a 2023 Gates Foundation partnership applying the discovery engine to ingredient research. The long-term ambition, stated plainly, is the full triad: read, map, write — digitising scent the way the camera digitised vision.

## Open Questions for the Whole Field

The POM is a genuine scientific achievement. The questions below aren't aimed at Osmo so much as the hard problems every serious attempt to digitise smell has to face — and they're worth naming precisely because Osmo has made them tractable enough to argue about productively.

**1. A perception map encodes perception — which is a feature and a boundary.** The POM is trained on human panels, and that makes it the right tool for fragrance, where consensus human perception *is* the product. It also means the map is perceptual rather than chemical: it encodes how people describe molecules, not which receptors they activate. This is the same boundary every colour space lives with — sRGB encodes the eye, not the photon — and it's worth stating clearly, because it defines what any structure-to-perception model can and cannot claim.

**2. The sensor leg is the field's hardest open problem — for everyone.** The POM predicts; reading the world still means turning atoms into bits with cheap, stable, interoperable hardware. That challenge is shared by every lab and company in digital olfaction, Osmo included, and it's the reason their near-term business is molecule design, where the map *is* the product. It's also the reason OpenSmell is sensor-first: we think the read side of the stack is where an open ecosystem can contribute the most.

**3. Data is everyone's constraint — and why openness compounds.** Foundations at this scale need large, labelled datasets, and the fragrance industry runs on trade secrecy. Notably, the POM itself rests on decades of *public* psychophysics — the Dravnieks Atlas, the GoodScents and Leffingwell compilations — and Osmo has been unusually willing to publish rather than hoard. OpenSmell's contribution is the same instinct pushed further: an open chemoprint, public datasets, and classifiers that run on commodity hardware, so the field's data problem gets solved once, in the open, for everyone.

## Why It Matters

- The POM is the strongest published evidence that **olfaction is learnable from structure** — a milestone on par with early wins in image recognition.
- The **sensor-map-printer triad** has become the shared mental model of the entire field, which is no small thing for a field that has historically lacked a common vocabulary.
- Publishing the POM in *Science*, in collaboration with Monell, the University of Reading, and ASU, raised the scientific bar for the whole industry and gave the community a citable foundation to build on.
- The follow-up *eLife* work suggests the POM captures something real about **biology itself**, not just human panels.

## The Bottom Line

Osmo has built the most significant map of odor space yet published, and the whole field is better for it. Their work moved structure-to-smell prediction from a research curiosity to a validated, scalable technique, and their sensor-map-printer framing is now the shared vocabulary of digital olfaction. The open questions above aren't Osmo's problems — they're the field's problems, and they're exactly why there's room for complementary efforts. OpenSmell's thesis is simple: build the open stack — the chemoprint, the data commons, the hardware — alongside the best maps anyone can make, and let the field compound. We'd rather help raise the tide than argue about which ship wins.

## Sources & Further Reading

- Lee, B. K., et al. "A principal odor map unifies diverse tasks in olfactory perception." *Science* 381, 999–1006 (2023).
- Qian, W. W., et al. "Metabolic activity organizes olfactory representations." *eLife* (2023).
- Osmo, *About* and *Building a map of odor*: <https://www.osmo.ai>
- Osmo Scent Taxonomy (open data, ODC-ODbL, v1.1, 2025): <https://github.com/osmoai/taxonomy>
- Laudamiel, C. "The Osmo Scent Taxonomy" (letter): <https://www.generationbyosmo.com/blog/osmo-scent-taxonomy>
- Google Cloud blog, "How Osmo is digitizing smell with AI" (2023).
- Monell Chemical Senses Center, "A step closer to digitizing the sense of smell" (2023).
- Wired, "This startup is using AI to unearth new smells" (2023).
`,
  },
  {
    slug: "smellnet-open-benchmark",
    title: "SmellNet: An Open Benchmark for Real-World Smell Recognition",
    excerpt:
      "MIT Media Lab recorded 828,000 sensor timesteps across 50 foods and 43 mixtures with cheap portable MOX arrays — the first large, open, sensor-side dataset for machine olfaction. What SmellNet is, what ScentFormer achieves, and why open benchmarks are the field's missing engine.",
    category: "Research",
    tags: ["dataset", "benchmark", "mox", "machine learning", "open data"],
    readTime: "10 min",
    date: "2026-08-01",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/smellnet.svg",
    content: `
Every field needs a benchmark to move. Computer vision had ImageNet; language got GLUE and then a thousand leaderboards. Machine olfaction has never quite had one—mostly because the data was proprietary, tiny, or collected in chemistry labs on instruments nobody can afford. In 2025, MIT Media Lab released **SmellNet**: 828,000 sensor timesteps, 50 food substances, 43 mixtures, and 68 hours of recordings, gathered with cheap, portable **metal-oxide (MOX) gas sensors** and released openly. It is the first benchmark built for *sensor-side* smell recognition—and it is almost exactly the stack OpenSmell has been arguing for.

## The Dataset: Real Food, Cheap Sensors

Previous smell datasets were either **perceptual** (human panel ratings, like Dravnieks) or **lab-scale** (bench instruments measuring pure chemicals). SmellNet is different: it points low-cost MOX sensor arrays at *real objects*—nuts, spices, herbs, fruits, vegetables—and records what the hardware actually reports.

- **828,000 timesteps** across **50 base substances** and **43 controlled mixtures**, spanning multiple days and environmental conditions.
- **12 channels** per recording: gas concentrations plus environmental factors (temperature, humidity, and the like).
- **Two benchmarks**: **SmellNet-Base** (recognise which of 50 substances) and **SmellNet-Mixture** (predict the ingredient *ratios* of a mixture over 12 base odorants, with seen and unseen splits).

Because it is a *sensor* dataset, it tests exactly the hard part of the open-stack vision: can models learn from the noisy, drifting, overlapping signals of commodity hardware, rather than from pristine lab measurements?

## ScentFormer: Why Temporal Modeling

The accompanying model, **ScentFormer**, is a Transformer that treats each recording as a *time series*, not a point:

1. **Window and differentiate.** The signal is split into sliding windows, and a first-order temporal difference is computed across each window. The paper reports this simple differencing step as worth roughly **+16% accuracy on average** across models—sharp changes in sensor readings carry most of the signal.
2. **Self-attention.** A Transformer encoder learns which parts of the trace matter for the class.
3. **Read out.** A classification head for the 50-way task; a ratio-prediction head for mixtures.

Temporal models consistently beat non-temporal baselines (MLPs, static features). The lesson is general: **a smell is an event in time**, and treating a reading as a single number throws away most of the information.

## Chemistry as a Teacher: GC-MS Supervision

SmellNet's most distinctive trick is **cross-modal supervision**. At training time, each ingredient is paired with a **GC-MS-derived chemistry embedding** (from FooDB's volatile-compound database), and the model is trained with a contrastive objective to align sensor embeddings with chemistry embeddings. At inference time, only the cheap sensor is used—the chemistry stays behind as a teacher.

This mirrors the intuition behind OpenSmell's own representation stack: structure-based chemistry (the molecule-level *chemoprint*) and sensor-based measurements (the hardware-level trace) describe the same smell from two ends, and aligning them makes each half better.

## What the Numbers Say (Honestly)

On **SmellNet-Base**, ScentFormer reaches **63.3% Top-1 accuracy** with GC-MS supervision. On mixtures it hits **50.2% Top-1@0.1 on seen mixtures** and **16.0% on unseen mixtures**—better than random, and a clear sign of *compositional* learning, but still far from solved. And when the same models meet genuinely novel environments, performance drops sharply: **real-world machine olfaction remains substantially below human-level**.

That honesty is the point. SmellNet's own authors frame generalization to unseen mixtures and environmental drift as the core open challenge—temperature, airflow, sensor location, and aging all shift the readings. A benchmark that publishes its failures is worth more than a demo that hides them.

## Why This Matters for Open Smell

SmellNet is external validation of the open-stack thesis this Academy has been building:

- It proves that **commodity MOX arrays**, the same sensors OpenSmell targets, can feed serious machine-learning research—no proprietary silicon required.
- It provides the **sensor-side benchmark** the field lacked, complementing perceptual datasets (Dravnieks, Pyrfume) and the UCI gas-sensor drift benchmark.
- It is **open**: code, data, and models released on GitHub, so anyone can build on it. That is exactly the "raise the tide" move the field needs.

The remaining gaps—mixture generalization, environmental robustness, and the gap between sensor readings and human perception—are the same problems OpenSmell works on. Benchmark culture is how a field compounds, and SmellNet is a large step in the right direction.

## Sources & Further Reading

- *A Large-scale Dataset for Real-world Smell Recognition.* arXiv:2506.00239; ICLR 2026.
- SmellNet code, dataset, and ScentFormer: <https://github.com/MIT-MI/SmellNet>
- SmellNet dataset mirror: <https://huggingface.co/datasets/DeweiFeng/SmellNet>
- FooDB, food volatile-compound database: <https://foodb.ca>
- Persaud, K. & Dodd, G. *Nature* 299, 352–355 (1982) — the "broadly tuned array" idea SmellNet hardware inherits.
`,
  },
  {
    slug: "history-of-digital-olfaction",
    title: "The Sixty-Year History of Digital Olfaction",
    excerpt:
      "From Theophrastus's On Odours and Aristotle's smell classes, through Taguchi's tin-dioxide patent and Persaud and Dodd's model nose, to the Nobel Prize and the deep-learning era — a 60-year timeline of a field that is finally arriving.",
    category: "Foundations",
    tags: ["history", "timeline", "foundations", "nobel prize", "thinkpiece"],
    readTime: "12 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/history.svg",
    content: `
Every technology field has a decade when it "suddenly arrives." For digital olfaction, the pattern is always the same: decades of scattered invention, a missing standard, and then—when compute, sensors, and open data finally align—a decade of compounding. This is the long version of that story.

## The Prehistory (300 BC – 1960)

Humans have been *classifying* smells longer than we've been *measuring* them. **Theophrastus**, Aristotle's student, wrote *On Odours* (~300 BC), the earliest surviving attempt to arrange smells into a system. Aristotle himself had proposed classes (sweet, pungent, sour, astringent); the taxonomy impulse is 2,300 years old. In 1756, Linnaeus proposed seven odor classes. In 1895, **Hendrik Zwaardemaker** built the *olfactometer*—a device to deliver controlled odour doses—and proposed his own classification. In 1961, **Robert Moncrieff** published *The Chemical Senses*, which, among other things, revived the theory that molecular vibrations (not just shape) explain odour. The question of *shape vs. vibration* would still be debated 60 years later.

The other prehistory is military. During World War II, the U.S. government tested ~19,000 compounds as insect repellents, a program that produced **DEET** and, decades later, would become a dataset that machine-learning researchers actually mined. Government-funded chemical sensing has funded this field from the start.

## 1962: The Sensor Is Invented (Twice)

1962 is the year that matters most. Two groups, independently:

- **Seiyama and Kato** reported the first thin-film zinc-oxide gas sensor—a device whose electrical resistance changed in the presence of gases.
- **Naoyoshi Taguchi** filed his patent on a tin-dioxide (SnO₂) gas sensor in Japan, motivated by the LP-gas explosion crisis in Japanese homes.

By **1968**, Figaro Engineering had shipped the world's first *commercial* chemoresistive gas sensors (the TGS line), and by 1963 Taguchi had already discovered that palladium doping improves sensitivity. Within a decade, millions of Japanese households had a tin-oxide sensor quietly watching for gas leaks. **The MOX sensor—the transistor of olfaction—was born before the microprocessor.**

## 1982: The Electronic Nose Gets a Name

In 1982, **Krishna Persaud and George Dodd** (University of Warwick) published "Analysis of discrimination mechanisms in the mammalian olfactory system using a model nose" in *Nature*. Their insight was biological and profound: you do **not** need a specific receptor for every smell. You need a *small array of broadly tuned sensors* and a pattern-recognition layer. They built exactly that with semiconductor transducers and showed it could reproducibly discriminate odours. This paper (1,500+ citations and counting) is the founding document of the e-nose field, and every MOX array you can buy today—including OpenSmell's—is a descendant.

The 1980s also gave us the *data*: in 1985, **Dravnieks published the Atlas of Odor Character Profiles**—160 odorants rated by ~120 panelists on 146 descriptors. It is the first standardized, public dataset of human olfactory perception, and 40 years later it still anchors the field.

## 1991 & 2004: Biology Catches Up

In 1991, **Linda Buck and Richard Axel** published the paper that cracked olfaction's biology: the discovery of a vast multigene family encoding **odorant receptors**—roughly 1,000 genes in mice (about 3% of the genome), ~350–400 functional in humans. Each olfactory neuron expresses one receptor type; each receptor is broadly tuned to many molecules. Their discovery explained, at the molecular level, exactly why Persaud and Dodd's "broadly tuned array" architecture is the right one: *evolution had already invented it*. In **2004** they received the Nobel Prize in Physiology or Medicine.

## The 1990s: Commercial E-Noses Boom and Bust

The commercial era arrived with names you rarely hear today: **AromaScan**, **Cyrano Sciences' Cyranose 320**, **AlphaMOS** (the FOX and PEN instruments), **Neotronics** and its olfaction line. These used polymer, SAW, and MOX arrays with PCA and neural networks. They were genuinely useful in labs—food quality, fragrance QC—but the market never scaled, because each device was a **closed, proprietary island**: incompatible file formats, incompatible sensor sets, no shared data. The dot-com era's e-nose bubble burst for the same reason the field keeps stalling: *no open stack*.

## 2000s–2010s: Commodity Sensors and the First Open Datasets

The hobby electronics boom (Arduino, then ESP32) made MOX sensors cheap enough to buy in quantity and wire in an afternoon. For the first time, thousands of people could build sensor arrays—and many did. The ML community got its workhorse dataset in 2012: the **UCI Gas Sensor Array Drift dataset**—13,910 measurements from 10 MOX sensors over 36 months—which remains the standard benchmark for sensor drift compensation.

On the data side, **Pyrfume** (led by the Monell Chemical Senses Center) began assembling a unified, open platform linking molecular identities to psychophysical data. **GoodScents** and **Leffingwell's** threshold databases compiled decades of industrial olfactory knowledge. The pieces of an open stack were quietly appearing.

## 2023: The Deep-Learning Landmark

In 2023, **Osmo** (a Google Research spinout) published the **Principal Odor Map** in *Science*: a graph neural network trained on 5,000 molecules that predicts human odor descriptors from molecular structure, generalises to never-before-smelled molecules, and beats single-panelist consensus prediction. It was the strongest demonstration yet that *olfaction is learnable from structure*. [We review it in depth here.](/academy/review-osmo-machine-olfaction)

## 2026: The Open-Stack Moment

Here is the thesis, stated plainly:

> Every major leap in this 60-year history came from an **open primitive**—the tin-oxide sensor, the odorant-receptor gene family, the public dataset (Dravnieks, UCI, Pyrfume). Every stall came from a **closed island**—proprietary e-noses, incompatible formats, private data.

The technology to digitise smell has existed, in pieces, since 1962. What has been missing is exactly what cameras got in the 1990s: standard formats, shared libraries, interoperable hardware, and a data commons. That is what OpenSmell is building—the open stack that turns 60 years of scattered invention into a platform. The timeline's inflection point is not the next sensor. It is the next *standard*.

## Sources & Further Reading

- Theophrastus, *On Odours* (~300 BC).
- Zwaardemaker, H. *Die Physiologie des Geruchs* (1895).
- Seiyama, T. & Kato, A. *Analytical Chemistry* 34, 1502–1503 (1962).
- Taguchi, N. U.S. Patent 3,631,436 (1967).
- Persaud, K. & Dodd, G. *Nature* 299, 352–355 (1982).
- Dravnieks, A. *Atlas of Odor Character Profiles* (1985).
- Buck, L. & Axel, R. *Cell* 65, 175–187 (1991).
- Nobel Prize in Physiology or Medicine 2004: <https://www.nobelprize.org>
- Vergara, A. et al. UCI gas sensor drift dataset (2012).
- Lee, B. K. et al. *Science* 381, 999–1006 (2023).
`,
  },
  {
    slug: "odor-psychophysics-and-open-data",
    title: "Odor Psychophysics and the Open Data Commons",
    excerpt:
      "Detection thresholds, Steven's power law, the trillion-smells debate, and why the quality of your model is decided before you write a single line of ML code — a field guide to the human data that makes digital olfaction possible.",
    category: "Foundations",
    tags: ["psychophysics", "thresholds", "data", "pyrfume", "datasets", "perception"],
    readTime: "15 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/psychophysics.svg",
    content: `
Machine olfaction has a strange dependency: to build models that "smell like humans," you need lots of data about how humans smell. Psychophysics is the discipline that produces that data—and, done badly, it produces data your models will happily memorise into confident nonsense. This article is about the human side of the stack.

## What Psychophysics Measures

Olfactory psychophysics asks four questions about every odorant:

1. **Detection** — can you smell it? (threshold)
2. **Discrimination** — can you tell it apart from another? (similarity)
3. **Intensity** — how strong is it? (scaling)
4. **Quality** — what does it smell like? (descriptors)

Each maps to a machine-learning task: classification, similarity search, regression on concentration, and multi-label descriptor prediction.

## Detection Thresholds: The Dynamic Range of Life

The **odor detection threshold (ODT)** is the concentration at which a panel detects an odorant ~50% of the time—the midpoint of a steep psychometric function. This is where olfaction's absurd sensitivity shows up. Some compounds are detected at **parts-per-trillion** concentrations. Consider mercaptans: the thiols added to natural gas so humans can smell leaks are detectable at ~1–10 ppb, and a few even lower. The human nose can beat many gas chromatographs on sheer sensitivity for certain compounds.

Two consequences for engineering:

- **Thresholds are log-normal and hugely variable.** Individual ODTs for the same compound vary by *orders of magnitude* across people (genetics: you literally have different receptor repertoires). The published "threshold" is a distribution, not a number.
- **Dynamic range is enormous but compressed.** Perceived intensity grows with concentration as a power law—**Stevens' law**, \`I = k·Cⁿ\` with \`n ≈ 0.2–0.8\`—meaning a 10× concentration increase is often perceived as only a ~2× intensity increase. Your sensor is linear and your human is logarithmic; any "matches human perception" claim has to reconcile the two.

This is why the "smell-o-meter" dream fails at the first calibration step if you treat perception as a single number. It isn't one.

## The Trillion-Smells Debate

In 2014, *Science* published a paper estimating that humans can discriminate **more than one trillion olfactory stimuli**. It made headlines. It also attracted serious statistical critique: reanalyses (notably by Gerkin & Castro and by Meister) argued the extrapolation was mathematically fragile, with sensible estimates ranging anywhere from ~3 billion mixtures down to ~1.6 trillion depending on the assumptions.

The defensible takeaway is not the number—it's the shape of the space. **Olfactory perceptual space is staggeringly high-dimensional.** With ~400 receptor types, each broadly tuned and combinatorially activated, the encoding capacity dwarfs what any current sensor array samples. That's the gap between the human nose and the $30 e-nose: not sensitivity, *dimensionality*.

## Quality: Descriptors and the Atlas

"How does it smell?" is answered with words—and words are noisy labels. The field's reference point is the **Dravnieks Atlas** (1985): 160 odorants rated by ~120 panelists across 146 descriptors, producing a "profile" for each compound. Modern descriptor sets (and Osmo's POM training data) descend from this approach. The known failure modes:

- **Label noise.** Panels disagree; consensus is smoother than any individual.
- **Cultural grounding.** Descriptor vocabularies are not universal; "pungent" and "sweet" anchor differently across languages and cultures.
- **Hedonic bias.** "Pleasant/unpleasant" is the strongest, most reliable axis in odor space—and also the most culturally variable.
- **Context.** A smell in isolation is rated differently than the same smell in a matrix (coffee vs. a coffee-scented candle).

A useful model therefore predicts *consensus* and treats individual variance as irreducible noise. This is exactly what made Osmo's POM result impressive: beating the average single panelist at predicting consensus.

## The Open Data Commons

The good news: unlike 1985, the data is being freed.

| Source | What it has |
| --- | --- |
| **Pyrfume** (Monell) | Open platform linking molecule identities to psychophysical data, with structured IDs |
| **GoodScents** | Compiled olfactory descriptors, thresholds, and references from fragrance literature |
| **Leffingwell** | Odor and flavor threshold database |
| **Dravnieks Atlas** | 160 × 146 descriptor matrix |
| **UCI Gas Sensor Drift** | 13,910 MOX array measurements, 6 gases, 36 months |
| **PubChem / ChEMBL** | Odor annotations linked to molecular structures |
| **OpenSmell data commons** | Labeled e-nose recordings + chemoprints, CC-licensed |

For ML practitioners the strategic advice is blunt: **download Pyrfume and the Dravnieks matrix before you write a model.** Structure-to-descriptor prediction is the most data-starved problem in the field, and every compound with a published threshold is a free training example.

## Protocols That Make Data Shareable

The quality of the commons depends on protocol discipline. When you contribute data (please do!), follow the checklist:

1. **Standardise the headspace** — fixed container, fixed volume, fixed temperature.
2. **Log everything environmental** — temperature, humidity, pressure, time, batch.
3. **Repeat ×N** — at least 5 exposures per sample, ideally across days.
4. **Store raw waveforms**, not just extracted features; features are lossy opinions.
5. **Timestamp and tag instrument metadata** — sensor model, age, calibration history.
6. **License it** — CC0/CC-BY. Undefined licensing is why most corporate odor data is unusable.
7. **Record human labels as distributions** — panel n, spread, and method, so downstream users can model the noise.

## The Argument in Brief

Olfaction's data problem is not "not enough molecules." It's "enough molecules, measured in a thousand incompatible ways by people who never published the raw values." Psychophysics gives us the right primitives—thresholds, power laws, descriptor matrices—and open platforms like Pyrfume and OpenSmell give us the plumbing. The models will come. The discipline is the bottleneck.

## Sources & Further Reading

- Dravnieks, A. *Atlas of Odor Character Profiles* (ASTM, 1985).
- Bushdid, C. et al. "Humans can discriminate more than one trillion olfactory stimuli." *Science* 343, 1370–1372 (2014).
- Gerkin, R. C. & Castro, J. B. "The number of olfactory stimuli that humans can discriminate is still unknown." *eLife* (2015).
- Stevens, S. S. *Psychophysics: Introduction to Its Perceptual, Neural, and Social Prospects* (1975).
- Pyrfume project: <https://pyrfume.org>
- Good Scents Company: <http://www.thegoodscentscompany.com>
- Leffingwell odor thresholds: <https://www.leffingwell.com>
- UCI gas sensor drift dataset: <https://archive.ics.uci.edu/ml/datasets/Gas+Sensor+Array+Drift+Dataset>
`,
  },
  {
    slug: "the-chemoprint-explained",
    title: "The Chemoprint, Explained",
    excerpt:
      "What is a 29-dimensional physicochemical vector, why does it capture the properties that make molecules smell, and how do you compute, normalise, and validate one? A working guide with RDKit.",
    category: "Research",
    tags: ["chemoprint", "rdkit", "representations", "molecular descriptors", "ml"],
    readTime: "14 min",
    date: "2026-07-31",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/chemoprint.svg",
    content: `
Every machine-learning field needs a *representation*: a way to turn a thing into numbers that preserve what matters. For images it's pixels, for text it's tokens. For smell, there are two representations in play—**sensor-level features** (what an e-nose measured, like \`ΔG/G₀\` vectors) and **molecule-level features** (computed from the molecule's structure). The **chemoprint** is OpenSmell's molecule-level representation: a 29-dimensional vector of physicochemical properties that lets you compare, cluster, and classify *molecules* independently of any hardware.

## Why Molecule-Level Features?

A sensor trace answers "what does this *sample* smell like." But most interesting questions are about the *molecules*: given a SMILES string, is this molecule likely to be pleasant? How similar is it to vanillin? Which of these 10,000 candidates shares odor-space with my target? Structure is the most portable thing in chemistry—two atoms of carbon and six of hydrogen define ethanol in Boston or in Beijing—so a structure-derived vector is the lingua franca of the field. This is also the reason structure-based prediction (Osmo's POM, for instance) can generalize to molecules nobody has ever synthesized.

## What the 29 Dimensions Are

The chemoprint condenses a molecule into the physicochemical properties known (and mechanistically expected) to influence odour. Concretely, the categories:

**Size & volatility** — molecular weight, heavy-atom count, boiling point, vapour pressure. A molecule that can't vaporise can't reach your nose. The "osmogenic" observation that odorous molecules are small (roughly under ~300 Da) is fundamentally a volatility statement.

**Lipophilicity** — logP (octanol–water partition coefficient), logD. Odorants must partition out of the aqueous olfactory mucus and into the receptor's binding pocket. Lipophilicity governs that transfer, and it correlates with both potency and "molecule-hugging" receptor binding.

**Polarity & H-bonding** — topological polar surface area (TPSA), H-bond donors and acceptors. Receptors recognise molecules partly through complementary hydrogen bonds; these numbers encode that complementarity.

**Electronic properties** — polarizability, formal charge. Polarizability controls London dispersion forces—the weak, ubiquitous attraction that dominates small-molecule binding—and has been central to the shape-vs-vibration debate in olfaction.

**Topology & shape** — rotatable bonds, ring counts, aromatic ratio, chiral centres. Chain length and branching change smell dramatically (ethanol vs. octanol vs. 2-methyl-2-propanol), so the vector must see connectivity and shape, not just an atom census.

This is a *curated, normalised* subset of the hundreds of descriptors a tool like RDKit can compute. The point of curation is that each dimension is independently meaningful and the vector is small enough to be transparent.

## Computing It with RDKit

RDKit is the open-source cheminformatics workhorse (the same library powering OpenSmell's browser toolkit). Computing hundreds of descriptors is one line:

\`\`\`python
from rdkit import Chem
from rdkit.Chem import Descriptors

mol = Chem.MolFromSmiles("CC(=O)Oc1ccccc1C(=O)O")  # aspirin
for name, fn in Descriptors.descList:
    print(name, fn(mol))
\`\`\`

From that pool you select your curated set, handle the pathological edge cases (missing values, salts), and **normalise**—for the OpenSmell chemoprint, each dimension is scaled to a 0–1 range across a reference corpus so that no single property dominates distance calculations. The result is one fixed-length vector per molecule:

\`\`\`python
import numpy as np

def chemoprint(smiles: str, names: list[str]) -> np.ndarray:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return np.zeros(len(names))
    raw = [Descriptors.descList[n][1](mol) for n in names]
    return (np.array(raw) - mins) / (maxs - mins)   # precomputed corpus bounds
\`\`\`

## What You Can Do With It

- **Similarity search.** Euclidean or cosine distance between chemoprints ranks molecules by *property* similarity. This is the engine behind "find me molecules that smell like this one."
- **Classification.** A random forest or MLP on the 29 dims predicts qualitative targets (pleasant/unpleasant, woody/floral) surprisingly well—because the descriptors encode the chemistry that drives perception.
- **Clustering.** In the absence of human labels, the chemoprint gives a principled way to group a chemical library before you ever spend money on synthesis or a panel.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

X = np.array([chemoprint(s, names) for s in smiles_list])
y = pleasant_labels
clf = RandomForestClassifier(300)
clf.fit(X, y)
\`\`\`

## Validating a Representation

The cardinal sin is evaluating a representation on molecules that resemble your training set (leakage from shared scaffolds). The right protocol:

1. **Leave-molecule-out cross-validation** — hold out whole structures, not random rows.
2. **Scaffold splitting** — split by ring system so similar molecules never straddle train/test.
3. **Compare to human judgments** — the real test of a smell representation is agreement with pairwise perceptual similarity ratings (that's precisely how the Dravnieks data is used as a benchmark).

## Known Limits (Say Them Out Loud)

- **Stereochemistry.** Optical isomers can smell completely different—(–)-carvone smells of spearmint, (+)-carvone of caraway—yet they have identical scalar descriptors. Any representation that drops chirality will silently merge compounds humans clearly separate.
- **Mixtures and context.** The chemoprint describes an isolated molecule. Real smells are mixtures, and perception shifts with concentration and matrix.
- **The map is not the nose.** Physicochemical descriptors correlate with smell *because* they shape receptor binding—but they are not a theory of the receptor.

## Where the Chemoprint Fits

The chemoprint is the *molecule* half of the representation stack. The *sensor* half is the feature framework the OpenSmell SDK extracts from raw traces (145 dimensions of temporal response features). Together they cover both ends: what's in the air, and what the instrument measured. Two representations, one open stack, zero lock-in.

## Sources & Further Reading

- RDKit documentation: <https://www.rdkit.org>
- OpenSmell chemoprint reference: <https://github.com/opensmell>
- Dravnieks, A. *Atlas of Odor Character Profiles* (1985).
- Lee, B. K. et al. *Science* 381, 999–1006 (2023) — structure-to-perception prediction.
`,
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelated(current: Article, n = 3): Article[] {
  return articles
    .filter((a) => a.slug !== current.slug)
    .sort((a, b) => {
      const ab = a.category === current.category ? 1 : 0
      const bb = b.category === current.category ? 1 : 0
      return bb - ab
    })
    .slice(0, n)
}
