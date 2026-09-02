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

A fan pulls air from above an odor source into a chamber holding several MOX sensors. The microcontroller samples each sensor's analog output, normalises the readings into features, and hands them to a classifier that outputs "this is coffee" or "this is tap water." Once the plumbing works, everything above the sensors is software.

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

The raw time-series is high-dimensional and noisy. The OpenSmell Python SDK extracts a **187-dimensional feature framework** from each exposure: per-sensor baseline-normalised response, rise and fall slopes, peak, \`t90\` (time to 90% of max response), area under the curve, integral ratios, and cross-sensor ratios. You can start with a tiny subset yourself:

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
- Use the **OpenSmell Python SDK** (\`pip install opensmell\`) for the full 187-feature framework and pretrained classifiers.
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
- Osmo Labs, PBC. "The Osmo Scent Taxonomy," v1.1, 2025 (ODC-ODbL): <https://github.com/osmoai/taxonomy>
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

## What the Numbers Say

On **SmellNet-Base**, ScentFormer reaches **63.3% Top-1 accuracy** with GC-MS supervision. On mixtures it reaches **50.2% Top-1@0.1 on seen mixtures** and **16.0% on unseen mixtures** — above random, and consistent with *compositional* learning. On novel environments the numbers are lower: real-world machine olfaction has not yet reached human-level performance.

SmellNet's own authors frame generalization to unseen mixtures and environmental drift as a core open challenge—temperature, airflow, sensor location, and aging all shift the readings. Publishing the full set of results, including the harder cases, is what makes a benchmark useful.

## Why This Matters for Open Smell

SmellNet is external validation of the open-stack thesis this Academy has been building:

- It proves that **commodity MOX arrays**, the same sensors OpenSmell targets, can feed serious machine-learning research—no proprietary silicon required.
- It provides the **sensor-side benchmark** the field lacked, complementing perceptual datasets (Dravnieks, Pyrfume) and the UCI gas-sensor drift benchmark.
- It is **open**: code, data, and models released on GitHub, so anyone can build on it. That is exactly the "raise the tide" move the field needs.

The remaining gaps—mixture generalization, environmental robustness, and the gap between sensor readings and human perception—are the same problems OpenSmell works on. Benchmark culture is how a field compounds, and SmellNet is a step in that direction.

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

The chemoprint is the *molecule* half of the representation stack. The *sensor* half is the feature framework the OpenSmell SDK extracts from raw traces (28 per channel + one selectivity ratio per channel pair + 4 global metrics — 187 dimensions at the canonical six channels). Together they cover both ends: what's in the air, and what the instrument measured. Two representations, one open stack, zero lock-in.

## Sources & Further Reading

- RDKit documentation: <https://www.rdkit.org>
- OpenSmell chemoprint reference: <https://github.com/opensmell>
- Dravnieks, A. *Atlas of Odor Character Profiles* (1985).
- Lee, B. K. et al. *Science* 381, 999–1006 (2023) — structure-to-perception prediction.
`,
  },
  {
    slug: "band-bending-and-power-law",
    title: "Band Bending and the Power Law: The Chemistry Behind a MOX Reading",
    excerpt:
      "A metal-oxide sensor is a resistor that changes when molecules chemisorb on a hot SnO₂ surface. This essay walks through the surface chemistry (band bending, oxygen adsorption, depletion layers) and the empirical power law Rs/R₀ = a·C^b that every practical calibration rests on.",
    category: "Foundations",
    tags: ["mox", "sensor physics", "chemisorption", "power law", "cross-sensitivity"],
    readTime: "16 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/band-bending-power-law.svg",
    content: `
If you have held a cheap gas sensor, you have held a small ceramic tube wrapped in a sintered film of tin dioxide (SnO₂), a coil of platinum–iridium wire inside to heat it to somewhere around 350–450 °C, and a pair of electrodes measuring resistance across the film. That is a MOX sensor — a *metal-oxide semiconductor* chemiresistor. It is the workhorse of hobbyist and industrial gas sensing alike, and it is the sensor behind most electronic noses.

This essay is about what actually happens inside that film. Not because the chemistry is interesting for its own sake, but because **every practical decision about an electronic nose — how many sensors to buy, how to arrange them, what calibration can and cannot promise, why drift happens — is a direct consequence of this surface chemistry.** Read this once and the rest of the field makes sense.

## What a MOX Sensor Actually Is

A MOX sensor is built around a thick film of metal oxide, most commonly SnO₂, deposited on a ceramic tube or micro-hotplate and heated from below. In clean air the surface of the film chemisorbs oxygen. Oxygen molecules pull electrons out of the conduction band of the oxide, forming adsorbed species (O₂⁻, O⁻, and O²⁻ depending on temperature) and leaving a region near the surface depleted of charge carriers. The resistance of the film is dominated by the potential barriers that this depletion creates at grain boundaries — the contact points between individual SnO₂ crystallites where the depleted zones overlap.

That is the central fact of MOX sensing: **the resistance you measure is controlled by the height of an energy barrier at the surface, and that barrier is controlled by what is adsorbed there.** A gas sensor is therefore not measuring "how much gas is present" directly. It is measuring how the adsorbed-oxygen population — and the resulting barrier height — is perturbed by the gases in the air.

## Band Bending: The Surface as an Interface

In solid-state terms, the physics is band bending. Imagine the conduction band of the SnO₂ crystal as a horizontal line at a given energy. Near the surface, adsorbed oxygen traps electrons, so the density of free carriers drops and the bands bend upward toward the surface. The result is a barrier *qV_s* at every grain boundary that electrons must cross to carry current. When a reducing gas arrives, it reacts with the adsorbed oxygen (for example, CO + O⁻ → CO₂ + e⁻), releasing an electron back into the conduction band. The depletion shrinks, the barrier drops, and the measured resistance falls.

An oxidizing gas does the opposite. NO₂ and O₃ trap additional electrons directly at the surface, deepening the depletion, raising the barrier, and increasing resistance.

We therefore need a sign convention. Let us define the sensor's *response direction* as

$$
\\text{direction} = \\text{sign}\\left(\\frac{\\Delta R}{R_0}\\right)
$$

Reducing gases (CO, ethanol, most VOCs) give a *negative* direction — resistance decreases. Oxidizing gases (NO₂, O₃) give a *positive* direction — resistance increases. The framework treats this as a first-class feature, because a substance that raises resistance is telling you something chemically different from one that lowers it, and mixing the two up silently destroys classifiers.

## The Empirical Power Law

For a single target gas at concentration C, the sensor's response follows an empirically robust relationship — a power law:

$$
\\frac{R_s}{R_0} = a \\cdot C^{b}
$$

where R_s is the resistance in the presence of the gas, R_0 is the resistance in clean air, and a and b are sensitivity constants. On a log–log plot this is a straight line:

$$
\\log\\left(\\frac{R_s}{R_0}\\right) = \\log a + b \\cdot \\log C
$$

The exponent b is the slope — the concentration response of the sensor. The constant a is the intercept — the overall gain. Both are specific to a given sensor model and to a given target gas, and both vary from unit to unit with a manufacturing tolerance of roughly 20–30%. That variability, more than anything else, is why electronic noses need per-device calibration, a theme developed in the companion essay *What a Normalized Reading Can and Cannot Mean*.

Why a power law? In the simplest physical picture, the resistance varies exponentially with barrier height, and the barrier height varies logarithmically with the partial pressure of the reducing gas via the adsorption isotherm. Two logarithms compose into a power law. Real sensors deviate from a clean power law at very low and very high concentrations, but over one to three decades of concentration — the range a practical sensor is used in — the power law is a dependable engineering approximation.

## Where a and b Come From

Two known concentrations are enough to recover both constants. Measure the response at C₁ and C₂:

$$
b = \\frac{\\log\\left(R_{s1}/R_{s2}\\right)}{\\log\\left(C_1/C_2\\right)}
$$

$$
a = \\frac{R_{s1}/R_0}{C_1^{\\,b}}
$$

Note the shape of the denominator in the first equation: b is only defined when the two reference concentrations are *different*. Calibrating with one point and an assumed "zero" point is degenerate, because log(C₁/C₂) blows up as C₂ → 0. That single fact explains why "one-point calibration" attempts in this field produce unusable results, and why the sanctioned reference-point protocol always spans at least two decades of concentration. The *Reference-Point Calibration* essay develops this properly.

## Cross-Sensitivity: Selectivity Is a Ratio, Not a Switch

Here is the uncomfortable truth that shapes all of e-nose engineering: **no MOX sensor is selective.** A sensor marketed as "alcohol sensor" will also respond to CO, methane, hydrogen, and most other reducing gases. Its name reflects the gas it was *characterized against*, not a physical lock on that molecule.

What an array gives you is not selectivity per sensor but a *relative* pattern across sensors. If channel i responds to a gas with constants (aᵢ, bᵢ) and channel j with (aⱼ, bⱼ), then the ratio of their responses to the same gas is

$$
\\frac{dr_i}{dr_j} = \\frac{a_i}{a_j} \\cdot C^{b_i - b_j}
$$

Two consequences fall directly out of this equation.

First, the ratio is **concentration-invariant only when bᵢ = bⱼ**. If two channels have the same exponent, their ratio is a pure number that identifies the gas regardless of how much of it is present — a property the feature framework exploits. If the exponents differ, the ratio silently varies with concentration, and a classifier trained at one concentration level degrades at another.

Second, this is the mathematical reason cross-sensitivity is a *feature* of an e-nose and not a bug. A "selective" single sensor gives you one scalar — a detector, not a nose. An array whose sensors overlap in sensitivity but differ in the details (aᵢ, bᵢ) gives you a vector in a space where gases land in different places. That vector is what pattern recognition works on. The selection rules for arrays — see *How Many Sensors Make a Nose?* — follow directly: what matters is the diversity of the sensitivity profiles, not the number of sensors.

## The Interference Budget

The same surface chemistry that responds to your target gas responds to other things in the environment, and a practical e-nose must budget for them explicitly.

- **Humidity.** Water vapor is a reducing-adjacent interferent that affects every SnO₂ sensor. Because it is common-mode across the array (it changes all channels in the same direction), it effectively consumes one whole dimension of your discriminative space — an array with N sensors behaves more like an array with N − 1 degrees of freedom in a humid environment. Differential measurement or per-recording z-score normalization is essential.
- **Temperature.** MOX sensitivity shifts by roughly 2–5% per degree Celsius. Small temperature swings read like small gas events. The mitigation is not exotic compensation but disciplined capture: log temperature, keep the environment stable, and never trust a reading taken while the rig is still warming up.
- **Air flow and pressure.** These change how quickly molecules reach the surface and how the film equilibrates, distorting the temporal features (rise time, decay time) that classifiers lean on. The capture protocol — clean-air baseline → exposure → recovery, with the sensor held still — exists to make these variables reproducible.
- **Oxygen itself.** The sensor's entire operating point depends on the ambient oxygen level. At drastically reduced oxygen (inert gas or altitude), the baseline R₀ moves and the power law shifts. A MOX sensor is fundamentally an oxygen-and-adsorbate instrument.

None of these are surprises if you start from the band-bending picture. All of them are surprises if you treat the sensor as a black box that "outputs ppm."

## Drift and Poisoning

Two degradation modes dominate field failures, and both are surface phenomena.

**Baseline drift** is a slow change in R₀ over weeks and months — sintering of the film, slow migration of surface species, accumulated contamination. The fix is operational: periodic re-zeroing against reference clean air, and always expressing readings relative to a freshly measured R₀ rather than an absolute resistance.

**Poisoning** is the catastrophic cousin. H₂S, siloxanes (found in many household products), and halogens bind irreversibly to the SnO₂ surface and permanently degrade sensitivity. A clean-air MOX sensor lives one to three years; in a harsh environment, weeks. There is no recovery from poisoning — the sensor must be replaced.

## What This Means for Arrays

Everything in this essay compresses into a few engineering rules:

1. The signal is *Rs/R₀*, a ratio, never raw resistance.
2. Direction (±) is a first-class feature: reducing vs oxidizing gases are different physics.
3. Response follows *a·C^b*; a and b are per-model, per-gas, and per-unit.
4. "Selectivity" only exists as ratios across channels, and only meaningfully when exponents are similar.
5. Humidity, temperature, and flow are not noise to average away; they are variables to control or log.
6. Drift and poisoning are surface processes; they respond to protocol (baseline windows, clean-air references, environmental discipline), not to software patches.

An electronic nose is a chemical instrument whose physics is well understood. The reason this field is hard is not mystery — it is variability: a, b, drift, humidity, batch. The reason it is *possible* is that the physics is stable enough to be modeled, normalized, and calibrated. The remaining essays in this series show how that is done, with the numbers to prove it.

## Sources & Further Reading

- OpenSmell master reference, §4.6 (the Rs/R₀ normalization proof) and §6 (sensor theory).
- \`opensmell/opensmell/mox/quality.py\` and the \`electronic-nose/\` build guide in the OpenSmell monorepo.
- Gardner & Bartlett, *Sens. Actuators B* 18 (1994) — electronic nose fundamentals.
- Marco & Gutierrez-Galvez, *Sens. Actuators B* 166–167 (2012) — signal and data processing for MOX arrays.
`,
  },
  {
    slug: "interoperability-normalization-theorem",
    title: "What a Normalized Reading Can and Cannot Mean",
    excerpt:
      "The voltage divider equation looks device-dependent, yet Rs/R₀ cancels supply voltage and load resistance exactly. But it cannot cancel the sensor itself. This essay proves the theorem, then shows what zero-shot transfer can and cannot promise — measured, not assumed.",
    category: "Foundations",
    tags: ["normalization", "calibration", "interoperability", "zero-shot", "proof"],
    readTime: "18 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/normalization-theorem.svg",
    content: `
Every MOX sensor is wired into a voltage divider: the sensor resistance R_s in series with a known load resistor R_L, with a supply voltage V_cc across the pair. The ADC measures the midpoint:

$$
V(t) = V_{cc} \\cdot \\frac{R_L}{R_s(t) + R_L}
$$

Two devices — different V_cc, different R_L, different ADC — will therefore report wildly different voltages for the same gas. This looks like a fatal portability problem for electronic noses. It is not. The algebraic identity at the heart of the OpenSmell framework shows that the ratio R_s/R_0 removes both quantities completely, leaving a reading that is comparable across electronics — but only up to the sensor itself.

This essay proves that theorem, then spends the rest of its length on its boundary: **what normalization cancels, what it cannot cancel, and what the measured limits of cross-device transfer actually are.**

## The Theorem: Rs/R₀ Cancels the Electronics

Start from the divider and solve for R_s:

$$
R_s(t) = R_L \\cdot \\frac{V_{cc} - V(t)}{V(t)}
$$

Now measure the clean-air baseline V₀ in the same way, and form the ratio:

$$
\\frac{R_s(t)}{R_0} = \\frac{R_L \\cdot \\frac{V_{cc} - V(t)}{V(t)}}{R_L \\cdot \\frac{V_{cc} - V_0}{V_0}} = \\frac{(V_{cc} - V(t))/V(t)}{(V_{cc} - V_0)/V_0}
$$

The load resistance R_L divides out of the numerator and denominator. The supply voltage V_cc does the same. What remains depends only on the *measured voltage ratio*, not on the electronics that produced it.

The consequence is precise and testable: **two devices with different V_cc (say 3.3 V vs 5 V) and different R_L (say 10 kΩ vs 47 kΩ), but the same sensor model, produce the same R_s/R_0 curve for the same gas.** This is not a hope; it is arithmetic, and it is why R_s/R_0 — not raw resistance, not raw voltage — is the unit of exchange in the entire framework. It is also why the \`.osmell\` manifest must record \`adcBits\` and \`adcMax\`: so any reader can reconstruct the physical range and know where the digitisation happened.

## What the Theorem Does Not Cancel

The identity is exact, and precisely because it is exact, its limits are also exact. Form the full chain: the sensor responds to concentration through the power law

$$
\\frac{R_s}{R_0} = a \\cdot C^{b}
$$

The normalization has removed V_cc and R_L, but the right-hand side **still contains a and b — the sensor's own sensitivity constants.** Those constants:

- differ between sensor models,
- differ between individual units of the same model (20–30% manufacturing tolerance),
- drift with temperature and age.

So R_s/R_0 cancels the *electronics* and leaves you holding the *sensor*. Two units of the same model, fed the same gas at the same concentration, will generally produce different R_s/R_0 values — because their a and b differ. Normalization alone cannot make a reading portable across sensors. Only calibration of each unit's (a, b) can.

## The Impossibility Result, Measured

This is the point at which most projects quietly wish for zero-shot transfer: train once, deploy anywhere, no per-device calibration. The OpenSmell project tried exactly that, repeatedly, and published the results. The summary is in the experiment log:

- A **domain-adversarial encoder** trained to hide device identity failed outright — the domain classifier reached **99.2% accuracy (chance = 50%)**, meaning the latent space still encoded which device produced each sample. There is no device-invariant representation to be had by adversarial trickery here.
- **Cross-device transfer** of trained classifiers failed outright: **25.3%** accuracy for a classifier trained on the OpenSmell rig and tested on SmellNet recordings, and **18.6%** for the reverse direction — at or below the chance level for the four-substance task (banana, cinnamon, garlic, ginger). The two feature spaces did not overlap meaningfully.
- **Chemoprint-as-prior** transfer (using a molecule's chemical descriptor vector as the target representation) collapsed from 99.6% within-device to 2.4% across devices.
- Cosine similarity of the same substance across two different rigs was *negative*: banana −0.0638 and cinnamon −0.1440 in one measured pair. The same smell, on two devices, produced representations pointing away from each other.

Every one of these results is consistent with the arithmetic above. Different (a, b) means different distributions; classifiers trained on one distribution do not transfer to another. The proof says zero-shot cross-device transfer is **mathematically impossible without calibration**, and the experiments confirm it on real devices. This is not a bug to be fixed by a cleverer network; it is the geometry of the problem.

## The Two Questions Every Evaluation Must Answer

The single most common error in e-nose papers is conflating two different claims:

1. **Session invariance** — does the model recognize a *substance it was trained on*, when presented with a new recording from the same rig on a different day? Measured answer: **81.78% accuracy / 80.33% macro-F1** on held-out sessions, against a pre-registered >70% threshold (random baseline 2%). That is a real, solid result.
2. **Substance generalization** — does the model recognize a *substance it has never seen*, using only what it learned about others? Measured answer: **R² = −14.62** under leave-substance-out cross-validation (one fold, −55.71). That is worse than predicting the mean. There is no novel-substance generalization.

These are not two versions of the same thing. Session invariance is about robustness of a learned mapping; substance generalization is about extrapolation to an unlearned mapping. Reporting one as the other is a category error, and it is the main reason so many "interoperable" electronic nose claims evaporate under scrutiny.

## What Interoperability Actually Requires

The arithmetic and the experiments together point to one workable definition of interoperability: **comparable signals require per-rig, per-substance reference points.** Concretely:

- Normalize by R_s/R_0 so the electronics drop out — this is free and always worth doing.
- Calibrate each rig's (a, b) against known reference concentrations — two points spanning a real concentration range, per channel, per substance of interest.
- After calibration, device-agnostic features — amplitudes, time constants, selectivity ratios in the exponent-matched regime — become genuinely transferable across units of the same model.

Reference-point calibration is exactly the route validated in the *Reference-Point Calibration* essay: unbiased recovery of a and b under realistic sensor noise (σ = 5%, six points, two decades → median concentration error ≈ 7.1%, recovered a = 2.0042 vs true 2.0, b = −0.6001 vs true −0.6). The method exists, the SDK implements it, and it converts a per-rig fingerprint into a quantity that another rig of the same model can compare against.

## The Interoperability Claim

The interoperability claim for this stack is specific and defensible:

- **Electronics are normalized away exactly** — V_cc and R_L never appear in the exchanged representation.
- **Sensors are not normalized away by math** — a and b survive, and drift with time and temperature.
- **Session invariance for trained substances on a single device is real** — 81.78%, reproducible.
- **Zero-shot cross-device transfer is falsified on every family tried** — single-point M, two-point power, CORAL, supervised anchors, taxonomy coarsening, and chemoprint-as-prior all fail reference-free (each LOO-fair ≤ +0.0 to +8 percentage points).

Interoperability is a protocol and a calibration contract — not a magic network. It is a less exciting sentence than "any nose can read any smell," and it is the one the evidence supports. The rest of this series is the engineering that makes that sentence work in practice.

## Sources & Further Reading

- OpenSmell master reference, §4.6 (the full proof), §7.11 (honesty rules), §8.3 (Experiment results), §8.7 (publishable results).
- \`research/cross_device_145dim_analysis/adapter_complexity_report.txt\` — the measured banana/cinnamon cosine similarities.
- \`research/calibration-experiments/reference-point-calibration/results.json\` — the verified reference-point calibration recovery.
- Johnson & Lindenstrauss, *Contemporary Mathematics* 26 (1984) — the dimensionality background for why representations are fragile.
`,
  },
  {
    slug: "sensor-count-and-dimensionality",
    title: "How Many Sensors Make a Nose? Dimensionality, Saturation, and the JL Bound",
    excerpt:
      "One sensor is a gas detector, not a nose. Six diverse sensors give roughly four to five effective dimensions and separate twenty to forty substances. This essay derives why count saturates, why selection matters more than count, and what the Johnson–Lindenstrauss bound says about the ceiling.",
    category: "Foundations",
    tags: ["arrays", "dimensionality", "jl bound", "sensor selection", "information theory"],
    readTime: "15 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/sensor-count-and-dimensionality.svg",
    content: `
"How many sensors should my electronic nose have?" is the first question everyone asks and the hardest to answer with a single number. The answer is a curve: discriminative power grows steeply at first, flattens, and then nearly stops. The exact shape of that curve is governed by a few pieces of information theory, and knowing them saves you money and disappointment.

The shortest version: **one sensor is a gas detector, not a nose. Six well-chosen sensors are a research instrument. Eight or more buy you almost nothing.** Here is the reasoning.

## Effective Dimensionality, Not Raw Count

A sensor array's power is not the number of channels; it is the number of *independent* degrees of freedom in the signals those channels produce. Two sensors that respond identically to every gas give you one dimension no matter how many units you wire up. The measured results are stark:

| Sensors | Effective dims | Max substances | Verdict |
|---|---|---|---|
| 1 | ~0.5–1 | 1 | Detector, not nose |
| 2 | ~1–1.5 | 2–4 | Marginal |
| 3 | ~1.5–2 | 3–7 | Proof-of-concept |
| 4 | ~2–3 | 8–12 | Conditional |
| 5 | ~3–4 | 12–20 | Yes, most applications |
| 6 | ~4–5 | 20–40 | Yes, research-grade |
| 8+ | ~5–6 | 30–60 | Diminishing returns |

The column that matters is **effective dims** — the rank of the response space after you normalize and remove the correlations the chemistry forces on you. Everything downstream, from how many substances you can separate to whether your model will transfer, is set by this number, not by the sticker on the array.

## Why Two Same-Family Sensors Give You One Dimension

Metal-oxide sensors share the same sensing mechanism. Two MOX sensors of the same family (say two MQ-series units) respond to the same gases through the same surface chemistry, differing only in their (aᵢ, bᵢ) constants. Their responses to any substance are therefore strongly correlated: knowing one largely determines the other. Singular-value analysis of the recorded response space confirms it — two same-family MOX sensors behave like roughly one dimension, and even six *identical* MOX sensors collapse to a single dimension.

The takeaway is not "fewer sensors." It is that **sensor selection matters more than count.** A deliberately diverse array — a mix of MOX families, or MOX plus a different transduction technology such as an electrochemical cell or a photoionisation detector — buys real dimensions, while another near-identical MOX unit buys almost none. Compare:

| Array type | Raw count | Effective dims | ~Distinguishable substances |
|---|---|---|---|
| All MQ-series MOX | 6 | 3–4 | 12–20 |
| MQ + electrochemical + PID | 4 | 3–4 | 12–20 |
| All identical MOX | 6 | 1 | 1 |
| Micro-hotplate array (different T) | 4 | 3–5 | 8–30 |

Notice the middle rows: **four diverse sensors match six same-family sensors.** Diversity of transduction mechanism — or even of operating temperature, which shifts the surface chemistry — is worth more than extra channels of the same thing.

## The Saturation Curve

The diminishing returns are not an artifact of a particular array; they are generic. The capacity table above shows the pattern: the second sensor adds roughly half a dimension, the fifth and sixth add fractions, and beyond eight sensors the curve is essentially flat. A frequently quoted empirical rule from the same measurements: **the sixth sensor typically adds less than 10% separation over the fifth.**

Why does the curve saturate? Real gases and real sensor physics give you a limited number of genuinely different response shapes. Humidity is common-mode across all SnO₂ channels, so it consumes a shared degree of freedom. Beyond a point, every additional channel you add is a noisy, partially redundant projection of the same few underlying factors. The array has hit its *information ceiling*.

## The Johnson–Lindenstrauss Bound: The Ceiling in Numbers

There is a classical result that puts a number on this ceiling. The Johnson–Lindenstrauss lemma says that to embed n points in a Euclidean space while preserving all pairwise distances to within a distortion factor ε, you need at least about

$$
d_{\\min} > \\frac{8 \\ln n}{\\varepsilon^{2}}
$$

dimensions. The connection to e-noses is direct: each substance is a point, the array's effective dimensions are the embedding dimension, and ε is the fraction of pairwise separation you are willing to lose. If you want an array to separate n substances with ε = 0.5 distortion, you need

| n (substances) | ε = 0.5 | ε = 0.3 | ε = 0.1 |
|---|---|---|---|
| 5 | 4 | 10 | 92 |
| 10 | 5 | 13 | 115 |
| 20 | 6 | 15 | 133 |
| 50 | 7 | 17 | 157 |

Two things stand out. First, for a *handful* of substances — the realistic target of a research or hobby array — a handful of dimensions genuinely suffices. Six effective dims cleanly separates 20 substances at ε = 0.5, which is the quantitative case for a six-sensor research array.

Second, the bound is a floor under ideal conditions. In practice, sensor noise and residual correlations double or triple the requirement, which is exactly why the measured "max substances" column of the capacity table (20–40 at six sensors) is so much smaller than the bound's ideal. And if your ambition is the entire odorant universe — the ~4,565 odorants in one common reference corpus — the bound says you need roughly 270 effective dimensions at ε = 0.5. No single-array e-nose is close to that, and none will be by adding cheap sensors. That ceiling is why the field's goal is *reference libraries and per-rig calibration*, not a universal nose.

## Choosing an Array for a Job

The framework translates "which array" into a quantitative check. A model trained on a rig with certain capacity is only trustworthy on a rig with enough effective dimensions, so the stack carries a hardware-insufficiency gate: if the deployment rig's measured effective dimensions fall below the model's minimum requirement, prediction is refused or explicitly warned, never silently attempted with padded channels.

Practical guidance from the measurements:

- **One sensor** → a leak alarm ("is something there?"). Do not call it a nose.
- **Three diverse sensors** → proof-of-concept separation of a handful of beverages or chemicals.
- **Four to five diverse sensors** → most real applications: broad categories, food states, gas mixtures.
- **Six diverse sensors** → the research-grade sweet spot; the configuration the whole U-suite (§12) was validated on.
- **Beyond eight** → spend the money on calibration replicates instead; they buy more accuracy than another channel.

## The Reason Cross-Sensitivity Is the Budget

There is a subtle inversion here worth stating plainly. A perfectly selective sensor — one that responds to exactly one molecule — would give you a detector for that molecule and nothing else. An e-nose with eight such sensors would be eight unrelated detectors: useful, but not a "nose," because it has no capacity for anything it was not specifically built for.

Cross-sensitivity is what makes an array a *nose*. Because each sensor responds to many gases, in different ratios, the array's vector space is densely populated with distinct, learnable signatures — and the JL bound says that space has real separating power. The art of array design is not maximizing selectivity per channel; it is maximizing *diversity* of sensitivity profiles while keeping the shared failure modes (humidity, temperature, poisoning) under protocol control. That is the same lesson the chemistry essay ended with, and it is the one every measurement in this series confirms.

## Sources & Further Reading

- OpenSmell master reference, §6.2–6.5 (capacity table, selection, JL bound, failure modes) and §10.10 (the hardware-insufficiency gate).
- Johnson & Lindenstrauss, *Contemporary Mathematics* 26 (1984), 189–206.
- Wilson & Baietto, *Sensors* 9(7) (2009) — electronic nose survey.
- Marco & Gutierrez-Galvez, *Sens. Actuators B* 166–167 (2012) — signal processing for MOX arrays.
`,
  },
  {
    slug: "from-smiles-to-smell",
    title: "From SMILES to a Feasibility Verdict: Predicting Odour from Molecular Structure",
    excerpt:
      "A molecule's structure — written as a SMILES string — can be converted into the physical properties that determine whether an electronic nose can detect it: vapor pressure, redox character, and headspace concentration. This essay shows how, and why the verdict is an estimate, not a calibration.",
    category: "Foundations",
    tags: ["smellability", "smiles", "vapor pressure", "redox", "feasibility"],
    readTime: "15 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/from-smiles-to-smell.svg",
    content: `
Before you buy a sensor, record a sample, or train a classifier, you want one answer: *can this substance be smelled at all by an electronic nose?* That question has a surprisingly rigorous software answer, because it reduces to two physical facts — how much of the molecule gets into the air, and whether it reacts with the sensor surface. Both can be estimated from nothing more than the molecule's structure, written as a SMILES string.

This essay walks through the pipeline that turns a string like \`CC(=O)OCC(C)C\` (isoamyl acetate, the smell of banana oil) into a green/yellow/red feasibility verdict. And it is explicit about what that verdict is not: an estimate, not a calibration.

## The Two Questions That Decide Detectability

A MOX sensor can only detect a molecule that (a) actually reaches its surface in meaningful quantity, and (b) is redox-active — capable of donating or accepting electrons at the hot SnO₂ surface. That is the entire logic:

- **Volatility** decides how much is in the headspace.
- **Redox character** decides whether it perturbs the sensor.
- Their product decides feasibility.

Both properties are computable from the molecular graph before you ever open a bottle.

## From Graph to Physical Properties

A SMILES string is a compact graph encoding of a molecule. The smellability stack parses that graph and applies **Joback group-contribution** methods: fragment the molecule into known functional groups, sum their contributions, and recover bulk properties such as normal boiling point T_b and molecular weight. From T_b and structure, effective vapor pressure and headspace concentration follow via the standard thermodynamic relations (Clausius–Clapeyron / Antoine forms).

The arithmetic behind the headline numbers in this essay:

$$
\\text{headspace ppm} \\propto \\frac{P_{\\text{vap}}(T)}{P_{\\text{total}}} \\times 10^6
$$

Two worked examples make the dynamic range concrete. At 25 °C:

- **Isoamyl acetate** — vapor pressure ≈ 700 Pa, giving a saturated headspace around **6,900 ppm**. This is why banana oil is trivial for a MOX sensor: the air above the bottle is a thick fog of it.
- **Cinnamaldehyde** — vapor pressure ≈ 1.3 Pa, giving a saturated headspace around **13 ppm**. Still detectable — the MOX floor is roughly 1 ppm — but three orders of magnitude weaker than the banana ester.

The gap between these two molecules is the whole feasibility story in miniature: not "can the sensor respond to cinnamaldehyde" (it can) but "how carefully must you capture, concentrate, or calibrate to use that response." A verdict is never just *yes/no*; it is a *grade*.

## Redox: The Sign of Detectability

The second axis is chemistry. SnO₂ sensing relies on the gas either releasing electrons (reducing) or trapping them (oxidizing). The stack classifies each molecule accordingly:

- **Reducing gases** — alcohols, aldehydes, most hydrocarbons, ammonia — lower the sensor's resistance (negative direction). These are the bread-and-butter of MOX sensing.
- **Oxidizing gases** — NO₂, O₃ — raise it (positive direction). Rarer in everyday organic vapors but strongly detectable.
- **Redox-inactive molecules** — saturated hydrocarbons of low reactivity, or molecules whose functional groups neither donate nor accept at the operating temperature — produce little or no signal no matter how volatile they are.

The two axes compose into a verdict matrix: **volatility × redox.** A volatile, redox-active molecule is an ideal MOX target (green). A non-volatile redox-active molecule and a volatile redox-inactive molecule are both weak (yellow) — for different reasons, and the remedy differs (concentrate the headspace in one case; choose another transduction technology in the other). A molecule that is neither is effectively invisible to this sensor class (red).

## The Validation Behind the Estimates

None of this is asserted from a textbook; the property estimates are validated against measured data:

- **Joback boiling-point accuracy**: mean absolute error ≈ 27 °C on a 716-compound VOC validation set (inorganics excluded). Good enough to place molecules on the volatility axis correctly for feasibility purposes; not good enough to claim metrology.
- **Implementation parity**: the pure-Python and RDKit-SMARTS paths reproduce each other **exactly** (|Δ| = 0.000 K) on the 720-compound odour-threshold corpus. Parity is path-to-path — the two implementations agree with each other perfectly, which is a reproducibility guarantee, not a prediction-accuracy guarantee.
- **Odour-threshold prediction**: the smellability model predicts human detection thresholds with R² ≈ 0.575 on a reference corpus — a mediocre but real correlation, and it is reported as exactly that.

These numbers matter because they define the tool's envelope. The estimates are strong enough to sort molecules into feasibility tiers and to rank candidate targets before lab work. They are not strong enough to print a certified concentration on a bottle. The tool says so itself, everywhere.

## The Feasibility Verdict, and Its Boundary

The verdict is a grade with three inputs — volatility, redox, and the sensor's own operating floor:

| Volatile? | Redox-active? | Verdict |
|---|---|---|
| Yes | Yes | **Green** — strong MOX target |
| Yes | No | Yellow — need another transduction |
| No | Yes | Yellow — need headspace concentration |
| No | No | **Red** — effectively invisible |

Two hard limits bound the verdict. First, **it is not a calibrated concentration.** Headspace ppm from vapor pressure is a *thermodynamic estimate* of the saturated case at a given temperature; it says nothing about your actual jar, your airflow, or your sensor's (a, b) on that day. Second, **it is per-molecule, not per-mixture.** Real smells are blends, and the feasibility verdict is computed for isolated molecules. A mixture's verdict is the composition of its components' verdicts, weighted by their relative volatility — a statement about the headspace, not a guarantee of identification in a blend.

## Why This Matters Before You Build Anything

The pragmatic payoff is that feasibility analysis belongs at the *start* of a project, not the end:

- It tells you which substances an array can plausibly detect, so you buy the right transduction technology.
- It warns you about the weak cases (low vapor pressure, redox-inert classes) before you record a week of data that produces nothing.
- It sets expectations for capture protocol — the 13 ppm cinnamaldehyde demands sealed-bag collection and care; the 6,900 ppm banana ester does not.
- It is the tool that turns "can we make an e-nose for X?" into a budgeted engineering question instead of a marketing claim.

A MOX electronic nose is a volatility-and-redox instrument. The smellability stack makes that tautology useful by computing, from a structure string alone, where a molecule sits on both axes — with measured error bars, and with the boundary between *estimate* and *calibration* drawn explicitly. That boundary is the discipline this field needs most.

## Sources & Further Reading

- OpenSmell master reference, §7.11 (the honesty rules), §11.8 (odorant chemistry), §8.6 (quantified claims, incl. the 716-VOC Joback validation and the 720-compound parity corpus).
- \`opensmell/opensmell/mox/smellability/compounds.py\` — the worked vapor-pressure examples (isoamyl acetate 700 Pa, cinnamaldehyde 1.3 Pa).
- The smellability SDK's feasibility engine in the OpenSmell monorepo.
- Dravnieks, A. *Atlas of Odor Character Profiles* (1985) — the perceptual reference for structure–odour work.
`,
  },
  {
    slug: "the-signal-chain",
    title: "The Signal Chain: From a SnO₂ Film to a Sample Number",
    excerpt:
      "Between the hot film and a feature vector sits a chain of decisions: the voltage divider, the ADC, sampling rate, the baseline window, and the dead-channel gate. Each one can silently corrupt the data. This is the field guide to that chain, decision by decision.",
    category: "Hardware",
    tags: ["adc", "signal chain", "voltage divider", "sampling", "dead channels"],
    readTime: "14 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/signal-chain.svg",
    content: `
A MOX sensor does not produce numbers. It produces a resistance, which a voltage divider converts to a voltage, which an analog-to-digital converter (ADC) converts to an integer, which software converts to R_s/R_0 and then to features. Every link in that chain is a place where a naive setup quietly destroys the data. This essay walks the chain from the hot film to the feature vector, and names what can go wrong at each link.

## Link 1 — The Divider

The sensor R_s(t) sits in series with a fixed load resistor R_L, and the ADC reads the midpoint:

$$
V(t) = V_{cc} \\cdot \\frac{R_L}{R_s(t) + R_L}
$$

The engineering goal is to make the *change* in V large enough to matter while keeping V inside the ADC's range. If R_L is much smaller than the sensor's operating resistance, the divider is stiff, V barely moves, and the whole range of sensor response maps to a handful of ADC counts. If R_L is much larger, the response swings hard but clips against the rails. Choosing R_L near the sensor's typical baseline resistance puts the operating point on the steepest part of the curve — the standard rule of thumb.

Two details deserve emphasis. First, **you do not actually need to know V_cc or R_L precisely** — the R_s/R_0 ratio cancels both exactly (the *normalization theorem* essay proves it). Second, the ADC's reference voltage and bit depth still matter, because they set the *resolution* of V, and therefore the smallest change in R_s you can see. A 12-bit ADC with a 3.3 V reference resolves about 0.8 mV — enough for most MOX work, and far better than the sensor's own noise.

## Link 2 — The ADC and Clipping

The ADC maps the analog voltage to a fixed integer range. For a 12-bit converter, the maximum is:

$$
\\text{adcMax} = 2^{12} - 1 = 4095
$$

Clipping happens when the signal exceeds the ADC's range: the trace flattens at 4095 (or 0) and the information in the saturated region is gone. This is not a subtle failure. It produces a flat-topped response that looks, to a downstream classifier, like a *different substance* — and it has happened in the OpenSmell project's own data, most memorably on a banana recording whose response slammed into the ceiling. The lesson was encoded into the quality scorer: every channel is scored for how much of its trace survived without clipping:

$$
S_k = 100 \\cdot \\left(1 - \\frac{\\text{clipped}_k}{N}\\right)
$$

where clipped_k counts the samples pinned at a rail and N is the window size. A channel that clips is not adjusted after the fact; it is flagged, and the recording is treated with the suspicion it deserves. The \`.osmell\` manifest records \`adcBits\` and \`adcMax\` precisely so that any reader can reproduce the physical scale and recognize saturation.

## Link 3 — Sampling Rate and Irregular Gaps

MOX transients are slow by electronic standards — rise times of seconds, recovery over tens of seconds — so a nominal sampling rate of a few hertz is usually ample. The Nyquist argument applies to the *transients*, not to the sensor's DC level: if your fastest meaningful feature is a 5-second rise, a 10 Hz sample stream has margin to spare.

The failure mode to fear is not low rate; it is **irregular gaps**. A recorder that hiccups, a logging loop that stalls, a USB bus that drops a packet — these leave holes in the timeline, and any feature computed across a hole (rise time, decay time, AUC) is silently wrong. The protocol does not trust the reported rate; it infers the *median* gap from the data itself, uses it as the effective sampling rate, and makes continuity one of the seven quality factors. If the median gap is inconsistent with the manifest, the record is downgraded.

## Link 4 — The Baseline Window

The ratio R_s/R_0 is only as trustworthy as R_0. The framework's contract defines R_0 from a clean-air window at the start of a recording: **15 samples / roughly 1.5 seconds, aggregated by median** (robust against a single glitchy sample). Two rules protect it:

- **The baseline must be stable.** The health dimension tracks \`noise_floor\` and \`drift_rate\` on the baseline window. If the baseline is itself moving (sensor still warming up, air flow changing), the recording fails the readiness gate and its features are unreliable — the capture protocol prescribes *clean-air baseline → exposure → recovery*, and the quality scorer refuses to pretend otherwise.
- **Provenance must be recorded.** Was R_0 measured (explicit, from a real clean-air window) or inferred (auto, from the first samples of whatever you happened to record)? Cross-session comparability depends on the answer. The manifest carries \`baseline.source\` and \`r0Samples\` so that a later reader can tell which case they are looking at — explicit R_0 from a real clean-air window, or auto-inferred R_0 from the first samples of whatever you happened to record.

## Link 5 — The Dead-Channel Gate

Some channels stop responding. A solder joint fails, an amplifier gain is mis-set, a sensor poisons — and the channel's trace becomes a flat line while the rest of the array carries on. The data still flows, which is exactly why a dead channel is dangerous: it is not absent, it is *present and wrong*, and it corrupts every feature that involves it — especially selectivity ratios, which divide by a per-channel response.

The gate is a coefficient-of-variation threshold. A channel whose coefficient of variation across the response is below 0.001 is not responding:

$$
cv_k = \\frac{\\sigma_k}{\\mu_k} < 0.001 \\Rightarrow \\text{dead}
$$

When a channel is flagged dead, the correct move is to drop it and recompute the feature set for the reduced array — not to pad it with a mean. The framework's count model (the *187-dimension* essay) recomputes cleanly for any channel count, and the hardware-insufficiency gate ensures a model trained with six channels is never silently run on five by filling the gap.

## The Feature Vector at the End

What arrives downstream is a normalized, quality-scored, gap-checked vector per channel: R_s/R_0 values built on a stable, provenance-recorded baseline; absolute values only where the hardware scale is meaningful; temporal and health features only where the recording actually contains the events they describe. The chain, done right, is boring. That is the point — the excitement should happen in the chemistry and the model, never in the wiring.

## The Checklist

A reliable capture chain, in one list:

1. Choose R_L near the sensor's baseline resistance.
2. Record \`adcBits\`/\`adcMax\`; verify you are not clipping.
3. Log a stable clean-air baseline first (≥15 samples).
4. Fix a real sampling discipline; watch for gaps.
5. Gate every channel on \`cv ≥ 0.001\` before feature extraction.
6. Store raw + baseline + manifest so any consumer can re-normalize.

## Sources & Further Reading

- OpenSmell master reference, §3 (\`.osmell\` protocol), §4.6 (the divider/normalization proof), §10.2 (the R₀ contract), §10.3 (dead-channel detection).
- \`opensmell/opensmell/mox/quality.py\` — the seven-factor scorer including the saturation score.
- \`opensmell/opensmell/hardware.py\` — the \`HardwareInsufficiencyWarning\` gate.
- The \`electronic-nose/\` build guide in the OpenSmell monorepo.
`,
  },
  {
    slug: "the-osmell-format",
    title: "The .osmell Format: Anatomy of a Portable Smell Recording",
    excerpt:
      "A smell recording should be a file, not a folder you have to explain. The .osmell format is a zip container with a manifest, per-channel CSV traces, baseline provenance, and an optional event log — self-describing enough that any client can re-normalize any recording. This is its anatomy.",
    category: "Tutorial",
    tags: ["osmell", "file format", "manifest", "data pipeline", "quality"],
    readTime: "16 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/the-osmell-format.svg",
    content: `
Vision got JPEG; audio got WAV and MP3. Smell, until now, got a spreadsheet somebody emailed you with no column explanation and three different units in the same column. The \`.osmell\` format is an attempt to give smell what sound already has: a single-file container that carries the data *and* everything needed to interpret it.

The design philosophy is deliberately unglamorous: **\`.osmell\` is a boring zip.** No binary blob, no proprietary codec, no parser you have to reverse-engineer. A \`.osmell\` file opens with any unzip tool. Inside are four files, and each one is human-readable.

## The Container

\`\`\`
recording.osmell
├── manifest.json     # who, what, how — the self-description
├── data.csv          # per-channel raw readings, time-aligned
├── baseline.csv      # the clean-air reference the ratios are built on
└── events.json       # optional: onset, exposure, recovery annotations
\`\`\`

A zip, not a folder, buys three things: one file to move, one checksum to verify, and a hard boundary against a client silently editing "just the timestamps." The spec (v1.1.0) is versioned, so an old reader fails loudly on a new file instead of misreading it.

## The Manifest — Self-Describing Data

The manifest answers the questions a stranger would ask before they can use your data. The required fields are the small set without which the traces are uninterpretable:

\`\`\`json
{
  "sensor": {
    "type": "mq-135",
    "adcBits": 12,
    "adcMax": 4095,
    "samplingRateHz": 10,
    "channels": ["NO2", "C2H5OH", "VOC", "CO", "Alcohol", "LPG"]
  },
  "session": {
    "role": "exposure",
    "label": "banana",
    "groupId": "fruit-2026-08"
  },
  "baseline": {
    "source": "explicit",
    "r0Samples": 15
  }
}
\`\`\`

Each field exists because a consumer needs it: \`adcBits\`/\`adcMax\` to reconstruct the physical voltage scale; \`samplingRateHz\` to interpret the timeline (with the data file's median gap as the *verified* rate); \`channels\` so the columns mean something; \`session.role\` and \`label\` so a researcher can split recordings correctly (training on a *recording* boundary, never a *window* boundary); \`baseline.source\` so the reader knows whether R_0 was a real clean-air measurement or an inference.

The manifest also carries the calibration contract when one exists — per-channel \`(a, b)\` constants with their reference substance, reference ppm, date, and method — so a calibrated recording can be round-tripped and re-inverted by any compliant client.

## The Data — Raw, Time-Aligned

The traces are deliberately stored as **raw** values: whatever the ADC produced, one row per timestamp, one column per channel. Storing raw has one non-negotiable virtue: it preserves the possibility of *re-normalization*. The framework's own guidance is that z-score beat R_s/R_0 for encoder input while paradigm features beat statistical features cross-device — and the only way any reader can test a claim like that is to have the raw data. A \`.osmell\` file that stored only pre-normalized features would be a photograph of someone else's opinion about your recording.

The baseline file plays the same role for R_0: the actual clean-air samples, stored next to the data, so R_0 can be recomputed with a different window, a different aggregator, or a different policy — instead of trusting a number that was decided at capture time.

## The Events — Structure the Reader Can Trust

\`events.json\` is optional but recommended, and it is where the session protocol becomes data: the moment an exposure began, when it ended, when recovery completed. These timestamps let a downstream pipeline segment the raw trace into baseline / onset / response / recovery regions without guessing — and they make the recording *comparable* to others that followed the same protocol. This is the difference between "a file with a smell in it" and "a recording that belongs to a dataset."

## Normalization: The Menu, Kept Open

Because the container keeps raw + baseline + manifest separate, normalization is a client-side choice, applied after reading:

- **(R − R₀)/R₀** — simple, interpretable, common.
- **R_s/R₀** — the ratio that cancels V_cc and R_L (see the normalization theorem essay).
- **z-score** — per-recording standardization; the measured winner for encoder input.

The format does not pick one for you. It preserves the raw + baseline structure so that any client can pick its own — and so that the choice is auditable in any re-analysis. That is the definition of interoperability used in this project: not "one pipeline," but "a container that keeps every pipeline auditable."

## Quality: Seven Factors, Scored Not Assumed

A recording is only as good as its capture discipline, so the container pairs every recording with a quality score computed from seven factors:

| Factor | What it checks | Weight |
|---|---|---|
| Continuity | no irregular gaps in the timeline | 0.15 |
| Dynamic range | the signal spans a meaningful ADC range | 0.10 |
| Saturation-free | the trace never pinned at a rail | 0.10 |
| Baseline stability | R₀ window is flat, not drifting | 0.20 |
| Signal strength | the response is above the noise floor | 0.20 |
| Recovery completeness | the trace returns toward baseline | 0.15 |
| Duration adequacy | the window covers the full event | 0.00* |

The zero-weight on the last factor is deliberate: duration is logged but not scored, because the auto-R₀ policy caps the overall score at 50 when it has to infer a baseline — punishing the "we didn't record a clean baseline" case structurally rather than rhetorically. A low quality score is not a suggestion; it is a warning that the recording should not be trusted for the features it flags.

## Loose CSV Ingress: Meeting Reality

Not everyone will adopt the container tomorrow, so the pipeline accepts loose CSVs and upgrades them: it infers the sampling rate from the median gap, builds an auto-manifest, and defaults to \`r0Samples = 15\` with \`baseline.source = "auto"\`. The upgrade path is explicit about what was inferred and what was measured — a loose CSV becomes a valid \`.osmell\` file whose manifest states that R_0 was not recorded properly.

## Why the Boring Details Win

Every choice in this format — raw over normalized, explicit over inferred, scored over assumed — is a decision to make the *container* carry the discipline instead of the *conversation*. A \`.osmell\` file you receive in 2027 should be as interpretable as one you recorded today, by a program that never met the recorder. That is the same bar JPEG and WAV met decades ago, and it is the bar digital olfaction has been missing.

## Sources & Further Reading

- OpenSmell master reference, §2 (SDK quick start), §3 (the full \`.osmell\` specification, v1.1.0), §7.1–7.4 (web import and quality).
- \`opensmell/opensmell/io.py\` and \`osmograph-web/lib/osmell/io.ts\` — the mirroring Python/TypeScript implementations.
- \`opensmell/opensmell/mox/quality.py\` — the seven-factor scorer.
`,
  },
  {
    slug: "the-187-dimension-framework",
    title: "187 Dimensions, Explained: The OpenSmell Feature Framework",
    excerpt:
      "Six MOX channels can be turned into 187 structured features across five categories — device-agnostic, absolute, temporal, health, and hardware — plus advanced decay/saturation features, selectivity ratios, and global metrics. This essay explains the taxonomy, why it is structured, and which features transfer across devices.",
    category: "Tutorial",
    tags: ["feature engineering", "187-dim", "taxonomy", "selectivity ratios", "transfer"],
    readTime: "17 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/feature-framework-187.svg",
    content: `
A raw MOX recording is a table of voltages: thousands of rows, a handful of columns. No classifier eats that directly — and even if it could, the result would be a model that memorizes a particular rig, a particular day, and a particular timing. The OpenSmell framework's answer is a **structured feature taxonomy**: a fixed, named set of features that turns any recording into a vector whose entries have meanings you can reason about.

At six channels, that vector has **187 dimensions**. This essay explains the taxonomy, where every one of those numbers comes from, and which of them survive the trip to a different device.

## The Five-Category Spine

The per-channel features are organized into five categories. The categories are not cosmetic; they encode *why* a feature behaves the way it does:

| Category | Per channel | What it captures | Transfer behaviour |
|---|---|---|---|
| Device-agnostic | 6 | amplitudes, rise/decay times, AUC ratios | transfers (relative) |
| Absolute | 4 | raw resistance, calibrated concentration | bound to this device |
| Temporal | 4 | onset/recovery timing, latency | transfers (relative) |
| Health | 4 | noise floor, drift rate, cv | transfers (diagnostics) |
| Hardware | 3 | gain-scaled, adcMax-scaled values | bound to this hardware |

The two columns on the right are the reason the taxonomy exists at all. **Relative features transfer; absolute features do not.** An amplitude expressed as a ratio of its own baseline survives a different supply voltage, a different gain, and (after R_s/R_0) a different load resistor, because the electronics cancel out (the *normalization theorem* essay). A raw resistance in kilohms is a statement about one particular board on one particular day. Keeping the two categories distinct is what lets a model trained on rig A have any hope of being probed on rig B — and, just as importantly, lets you know exactly which part of the model is hostage to rig A.

## The Count, Worked Out

The arithmetic behind "187" is transparent. Per channel there are 6 + 4 + 4 + 4 + 3 = **21** standard features. On top of those, each channel contributes **7 advanced** features (saturation index and multi-exponential decay constants — the decay model is its own essay). Then the array contributes *cross-channel* features, and the whole recording contributes *global* features:

| Group | Per channel | N = 3 | N = 6 | N = 12 |
|---|---|---|---|---|
| Device-agnostic | 6 | 18 | 36 | 72 |
| Absolute | 4 | 12 | 24 | 48 |
| Temporal | 4 | 12 | 24 | 48 |
| Health | 4 | 12 | 24 | 48 |
| Hardware | 3 | 9 | 18 | 36 |
| Advanced | 7 | 21 | 42 | 84 |
| Selectivity ratios | N(N−1)/2 | 3 | 15 | 66 |
| Global | — | 4 | 4 | 4 |
| **Total** | | **91** | **187** | **406** |

The N(N−1)/2 term is where the array's cross-sensitivity becomes a feature (next section). Note the growth pattern: the feature count is *quadratic* in channels, because the selectivity-ratio term grows with pairs — but as the *sensor count* essay showed, the *effective dimensionality* grows only logarithmically. You get more columns per channel, not more independent information per channel.

## Selectivity Ratios: The Array's Signature Feature

Two channels i and j respond to a gas through their own power laws. Their ratio is

$$
\\frac{dr_i}{dr_j} = \\frac{a_i}{a_j} \\cdot C^{\\,b_i - b_j}
$$

This single expression does the heavy lifting of array-based identification. When the exponents match (b_i = b_j), the ratio is **independent of concentration** — a pure fingerprint of the substance that works whether the recording captured 5 ppm or 500 ppm. When they differ, the ratio still varies with C, and the framework says so explicitly rather than pretending otherwise.

This is the feature that makes a *nose* out of sensors that are individually unselective (the *band bending* essay). And because it is a ratio of per-channel responses, it is also the feature most sensitive to a dead channel — which is why the dead-channel gate (\`cv < 0.001\`) runs *before* the ratio computation, not after.

## Advanced Features: Saturation and Decay

Two per-channel advanced groups deserve their own mention because they encode physical events rather than statistics.

- **Saturation index** measures how close a response came to the ADC rail (and, separately, to the sensor's own response saturation). A saturated channel's other features are unreliable, so saturation index is designed to be checked *first* — the framework's interpretation guide routes feature-selection decisions through it.
- **Multi-exponential decay constants** (single, bi-, tri-exponential fits to the recovery phase) capture surface heterogeneity: a surface with one dominant binding site decays as a single exponential; multiple sites produce a sum. The recovered time constants τ₁, τ₂ are physically meaningful and transfer across sessions better than raw recovery slopes. The equal-cost caveat is on record: MINPACK-style fits can land in different local minima for equally good errors, so the constants are stable for *comparison within one fitting pipeline*, not infinitely reproducible across pipelines.

## Global Metrics

Four features summarize the whole recording: total active channels, overall signal-to-noise, average drift over the session, and a compact "which channels fired" mask. These are the first features a clustering step looks at, and the cheapest to compute from any container.

## What the Numbers Are Actually For

A structured taxonomy changes how you work with a model in three practical ways:

1. **You can reason about features by name.** "Amplitude on the CO channel" is a concept; "column 137" is not. When a classifier leans on one feature, you can ask *why it makes sense* — or notice that it is a hardware-bound absolute feature that will not survive a rig change.
2. **You can drop a whole category cleanly.** Recording without a recovery phase? Drop the temporal and decay features rather than feeding in garbage. Unknown concentration? The framework warns that selectivity ratios degrade unless exponents match. The taxonomy makes these decisions structural instead of ad hoc.
3. **Transfer is scoped by feature category.** The cross-device story of this framework is precisely the category story: device-agnostic features transfer, absolute and hardware features do not, and per-rig calibration is what upgrades a device-agnostic model into a cross-rig one (the *calibration* essay).

## The Bottom Line

187 dimensions is not a number to be impressed by — it is a number to be *explained*. The framework's entire point is that the feature space is auditable: every one of the 187 has a name, a category, a transfer class, and a failure mode. That is the difference between a feature extractor and a *feature framework*, and it is why the same taxonomy appears, 1:1, in the Python SDK and the TypeScript web stack, kept equal by tests.

## Sources & Further Reading

- OpenSmell master reference, §4 (the full 187-dimension framework), §4.7 (feature counts), §4.8 (interpretation guide), §4.9 (use-case recipes).
- \`opensmell/opensmell/mox/features.py\` — \`extract_all_framework_features\`.
- OpenSmell master reference, §5 (multi-exponential decay model) for the τ₁/τ₂ details.
- The normalization theorem essay — for why device-agnostic features transfer.
`,
  },
  {
    slug: "reference-point-calibration",
    title: "Reference-Point Calibration for Metal-Oxide Sensors",
    excerpt:
      "A MOX sensor's response is a power law with two unknown constants per channel, and both vary per unit. Calibration means measuring those constants against known reference concentrations — and the numbers show the method is unbiased when done right: σ=5%, six points, two decades → median error ≈7%. This is the sanctioned route to quantification.",
    category: "Tutorial",
    tags: ["calibration", "power law", "concentration", "loocv", "dilution"],
    readTime: "16 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/reference-point-calibration.svg",
    content: `
Here is the position at the center of this essay: a MOX sensor does not measure concentration, it measures *resistance*, and the mapping between the two contains two unknowns that differ for every unit you buy. Calibration is the procedure for turning resistance readings into quantities you can report. This essay gives you the procedure, the arithmetic, and — most importantly — the measured error bars.

## What You Are Calibrating

The sensor's response to a target gas at concentration C is

$$
\\frac{R_s}{R_0} = a \\cdot C^{b}
$$

with two per-channel constants: **a** (the overall gain) and **b** (the concentration response). Both are unit-specific — manufacturing tolerance alone is 20–30% — and both drift with temperature and age. Calibration means measuring (a, b) for your channel, your gas, on your rig.

Two reference points are the mathematical minimum, because the system has exactly two unknowns:

$$
b = \\frac{\\log(R_{s1}/R_{s2})}{\\log(C_1/C_2)}
$$

$$
a = \\frac{R_{s1}/R_0}{C_1^{\\,b}}
$$

But the minimum is not the recommendation. Note what the first equation needs: *two genuinely different concentrations*. The denominator log(C₁/C₂) is what carries the information, so a calibration that spans a tiny concentration range — or tries to use C = 0 as a reference — produces a b that is noise. The practical rule is to span **at least two decades** of concentration and to fit (a, b) by log–log ordinary least squares across *all* reference points, not just two. More points average out the sensor noise; two points do not.

## Where Reference Concentrations Come From

You need known C values to feed the fit, and you get them without a gas chromatograph:

- **Headspace from vapor pressure.** A pure liquid's saturated headspace concentration follows from its vapor pressure (Antoine/Clausius–Clapeyron) at your temperature — the same thermodynamics the *SMILES to smell* essay uses. Fill a sealed container, let it equilibrate, and the gas above it has a computable ppm.
- **Sealed-bag dilution.** Dilute the saturated headspace with clean air in known volume ratios to produce a ladder of concentrations C₁, C₂, C₃, … spanning your two decades. The *ratio* C₁/C₂ is set by volumes, which you control precisely — which is exactly what the b-estimator needs.

Neither method claims laboratory-grade metrology. Both claim the thing that matters for calibration: *known, controllable, reproducible concentration ratios*.

## The Verified Error Bars

The method's credibility comes from a numerical falsification that was actually run: simulate a sensor with known truth, add realistic noise, and see how well calibration recovers the truth. The setup — a = 2.0, b = −0.6, measurement noise σ = 5%, n = 6 reference points across two decades, 300 repetitions — produced:

- recovered **a = 2.0042** (true 2.0)
- recovered **b = −0.6001** (true −0.6)
- fit R² = **0.9984**
- **leave-one-out median concentration error ≈ 7.1%**

The method is *unbiased*: it does not systematically drift the constants, and the LOO error — predicting each reference point from the other five — is the number to quote when someone asks "how wrong is this calibration?"

The data budget matters as much as the fit. The point-count grid shows how error falls as you add references:

| Reference points | σ = 5% | σ = 10% |
|---|---|---|
| 4 | 9.5% | 19.0% |
| 5 | 8.2% | 16.2% |
| 8 | 6.6% | 13.1% |

The flagship recovery run above (6 points, σ = 5%, two decades, 300 reps) measured 7.1% LOO error, consistent with this grid.

Two rules fall out. **Span sets the reportable range, not the in-range accuracy**: extrapolating past the top calibrated ppm is penalized, so the calibration's legal range is exactly the range you measured. And **noise compounds fast**: a rig with within-session scatter of σ ≈ 12% — the level measured on the OpenSmell rig — will show ~20–40% concentration error on a single exposure, which is why the protocol prescribes **multiple replicates** (four per point pulls the effective σ back toward 5%).

## The One-Point Trap and the Affine Dead End

Two alternative "shortcuts" keep failing, and the project has the measurements to say so rather than assume so.

**The one-point "M" calibration** — scale everything by a single exposure to make one known substance match — fails structurally. In the measured experiments it restored +0.0 percentage points on the full model and even degraded some settings, because one point cannot pin down b, and b is where the concentration behavior lives. The pure-gain case (where one point is mathematically sufficient) is real but almost never the actual situation; real drift is exponent-shaped, not gain-shaped.

**Affine calibration** — learn a linear map from device A's feature space to device B's (3→6 channel) — failed outright on real cross-device data, going from 47% to 33% accuracy. A linear map cannot create dimensions that do not exist (see the *sensor count* essay), and the features that matter do not transform affinely across units. Both dead ends point the same way: measure (a, b) on each rig, per substance.

## The Sanctioned Protocol

Putting it together, the reference-point protocol is:

1. Choose a target substance and a reference method (headspace or sealed-bag dilution).
2. Build a concentration ladder spanning **≥ 2 decades** (e.g., 10, 30, 100, 300, 1000 ppm).
3. Record **clean-air baseline → exposure → recovery** for each point, following the capture protocol.
4. Fit (a, b) per channel by log–log OLS across all points.
5. Report **LOO error** alongside the fit, and state the calibrated span.
6. Record the result in the manifest: \`{ a, b, reference_substance, reference_ppm, date, method }\` — so every future reader knows the constants are *measured*, not nominal.

The SDK implements the whole pipeline — \`fit_power_law\`, \`loocv_power_law\`, \`invert_concentration\`, \`build_calibration_payload\` — and the calibration contract round-trips through the \`.osmell\` manifest. The only missing piece in the project is real labeled-ppm recordings from hardware, which is a data problem, not a method problem.

## The Limit: Anchors Are Not Universes

Calibration is a *reference-point strategy*, not a universal map. Six pure reference compounds — even well chosen — cover roughly **0.1% of the ~4,565 odorants** in a standard reference corpus (a convex-hull analysis of the measured result). The consequence is operational, not philosophical: you calibrate for the substances you actually care about, per rig, and you ship a *contribution loop* so the community's reference library grows — rather than pretending six bottles can span the smell of the world.

The payoff is that calibrated readings become *comparable artifacts*: two rigs, calibrated against the same ladder, produce concentration estimates that can be pooled. That is the entire foundation the interoperability essay demands, and it is reachable with a bottle, a bag, and a spreadsheet.

## Sources & Further Reading

- OpenSmell master reference, §4.6 (two-point derivation), §10.10 (calibration hooks and the falsification results), §8.7 (the reference-point calibration method).
- \`research/calibration-experiments/reference-point-calibration/results.json\` — the verified a = 2.0042 / b = −0.6001 / LOO ≈ 7.1% numbers.
- \`opensmell/opensmell/calibration.py\` — \`fit_power_law\`, \`loocv_power_law\`, \`invert_concentration\`, \`build_calibration_payload\`.
- The interoperability essay — why calibration is the only sanctioned route to cross-device quantification.
`,
  },
  {
    slug: "evaluating-e-nose-models",
    title: "Evaluating an E-Nose Model the Way It Will Be Used",
    excerpt:
      "The most common reason e-nose models fail in the field is evaluation design, not model quality: windows from the same recording leak across train and test, and session invariance gets reported as substance generalization. This essay lays out leak-aware, recording-fair evaluation and the numbers that separate real results from artifacts.",
    category: "Research",
    tags: ["evaluation", "cross-validation", "leakage", "session invariance", "reproducibility"],
    readTime: "17 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/evaluation-honesty.svg",
    content: `
Electronic nose models get evaluated in two regimes: the way that flatters them, and the way they will actually be used. The gap between the two is where most of this field's inflated numbers come from. This essay is about closing that gap — the specific design choices that make an evaluation *recording-fair*, the two questions every model must answer separately, and the measured numbers that show what each question actually produces.

## The Leak That Inflates Everything

The most common error is subtle, structural, and quiet. A recording is a continuous trace. Models are trained on *windows* — short slices of that trace, each carrying labels. If you split windows from the same recording randomly into train and test, you leak: adjacent windows from the same physical capture, the same sensor state, the same drift trajectory, appear on both sides of the boundary.

The model then looks brilliant because it memorized a specific afternoon, not because it learned a substance. The tell is the accuracy gap: the leaked model scores 95% on windows it has effectively seen and collapses when you hand it a recording from a different session.

The fix is a grouping rule that sounds like common sense and is violated constantly: **never split windows from the same physical recording across the train/test boundary.** Group by recording (or by cut, induction, or substance — the natural unit of your dataset), and do grouped cross-validation: \`GroupKFold\`, \`LeaveOneGroupOut\`, or leave-one-out over the natural grouping. Every headline number in the OpenSmell evaluation suite was produced under this rule, with the null baselines in the same table.

## The Two Questions

An e-nose model can be asked two very different things, and an evaluation must answer them separately:

1. **Can it recognize a substance it was trained on, in a new recording from the same rig?** This is *session invariance*. Measured result: **81.78% accuracy / 80.33% macro-F1** on held-out sessions, against a pre-registered >70% threshold (random baseline 2%). This is a strong, real result.
2. **Can it recognize a substance it has never seen?** This is *substance generalization*. Measured result: **R² = −14.62** under leave-substance-out cross-validation (one fold as bad as −55.71). The model is *worse* than predicting the mean.

These are different claims with different engineering meaning. Session invariance says: train me on your substances, and I will recognize them next week. Substance generalization says: train me on some substances, and I will recognize ones I never met. The first is achievable and is what most deployed e-noses actually need. The second is a research frontier, and reporting the first as evidence of the second is the category error this field keeps making.

## Pre-Registered Thresholds and Fixed Seeds

The other pillar of evaluation is *deciding before fitting*. The session-invariance work declared a >70% threshold in advance, then ran the experiment, then published the result — so the threshold cannot be moved after the fact to make a near-miss look like a win. The discipline extends to:

- **Fixed seeds** (the project uses 42) so every run is reproducible bit-for-bit.
- **A fixed CV structure**, stated before the run, so the grouping choice cannot be tuned to flatter the result.
- **Balanced accuracy in addition to raw accuracy**, because a 60/40 class split lets a majority-only model claim 60% "accuracy" while doing nothing.

This is the same pre-registration culture that protects clinical trials, and it protects e-nose claims just as well.

## What the Adapter Results Actually Say

The perennial hope is that a small "adapter" layer lets a model trained on device A transfer to device B with a few samples. The project tried the main families, and the measured results are mixed enough to be worth printing in full:

| Adapter | Result | Verdict |
|---|---|---|
| MSE adapter | 0.95 cosine on held-out lemon | confirmed (simulation) |
| Cosine-loss adapter | 0.81 | **failed** |
| Parameterised adapter | 0.879 on held-out config | confirmed |
| Conv1 fine-tune | garlic–ginger cosine 0.409 | partial |

The pattern: adapters help in narrow, well-specified settings (the MSE result is a simulation; the parameterised result is on one held-out configuration), and they stop helping when the gap is structural. The reading the whole experiment arc converged on: a small set of labeled reference samples on the target device, used for reference-point calibration, beats every reference-free adapter family tried. Adapters are a complement to calibration, not a replacement for it.

## The Recording-Fair Baseline Table

The strongest habit to borrow from the evaluation suite is its *baseline table discipline*: every headline number ships next to chance accuracy and the majority-class predictor in the same table, so nobody has to trust a single number in isolation. A sample of the pattern, from six evaluations:

| Task | Result | Balanced / chance | Majority |
|---|---|---|---|
| Gas present/absent | 94.1% | 94.4% / 50% | 65.5% |
| TVC regression | R² 0.793 | ρ 0.849 | mean-pred MAE 0.935 |
| Fine substance identity | 89.4% | 89.5% / 2.0% | 2.3% |
| Perceptual family (LSO) | 40.2% | — / 12.5% | 38.1% |

Read the last row carefully: 40.2% looks substantial until you see the majority baseline is 38.1%. The family result is close to a null result. Without the baseline column the row would be misread; the baseline is why it reads this way.

## A Leak Caught and Fixed

The value of the discipline is best shown by the leak that got caught. The taxonomy experiment (U6) initially grouped its cross-validation by *recording ID* — 250 groups — while claiming leave-one-substance-out. Same-substance recordings would have leaked across the boundary. The run was killed, both evaluation loops were re-grouped by *substance* (50 groups), and the collapse metric was recomputed from aligned predictions. All published numbers are the post-fix run. The lesson is not "the team was sloppy"; it is that **grouping bugs are invisible until you audit the group key itself**, and an evaluation pipeline that makes the group key an explicit, versioned argument is what makes the audit possible.

## The Checklist

- Group by the natural unit (recording / cut / induction / substance); never by window.
- Report chance and majority baselines in the same table as the headline.
- Pre-register thresholds and seeds; keep the CV structure fixed.
- State which question you answered: session invariance or substance generalization.
- Quote balanced accuracy, not just accuracy.
- Audit the group key — the leak is usually there, hiding.

## Sources & Further Reading

- OpenSmell master reference, §7.11 (honesty rules), §8.3 (the session-invariance and leave-substance-out results), §11.7 (ML evaluation hygiene), §12 (the recording-fair evaluation suite and its leak catch).
- [\`opensmell/e-nose-evals\`](https://github.com/opensmell/e-nose-evals) — the reproducible evaluation suite (\`harness/evaluate.py\`) and per-experiment \`results/*_metrics.json\`.
- The interoperability essay — why evaluation design and calibration limits are the same story.
`,
  },
  {
    slug: "the-u-suite-use-cases",
    title: "The U-Suite: Six Evaluations, One Shared Protocol",
    excerpt:
      "Gas detection, onset timing, spoilage quantification, indoor-air monitoring, rig chemoprinting, and smell taxonomy — six recording-fair evaluations of the OpenSmell framework on public data, one shared harness, null baselines beside every headline. Every number is measured, reproducible, and committed with provenance.",
    category: "Research",
    tags: ["u-suite", "e-nose-evals", "evaluation", "reproducibility", "validation"],
    readTime: "18 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/u-suite-results.svg",
    content: `
Can a low-cost metal-oxide array, driving the OpenSmell framework's feature extractor, do real jobs — gas alarms, spoilage checks, indoor-air events, device identity — and can we measure the answer without fooling ourselves? The U-suite (U1–U6) is that measurement: six evaluations of the framework on public e-nose datasets, run through one shared harness, scored under a recording-fair protocol, with null baselines printed in the same table as every headline.

One framing note before the numbers. This suite runs on a **fixed protocol**: one shared harness, recording-fair grouping, every headline printed beside its null baseline, and committed result artifacts with \`generated_utc\` provenance. Some numbers are seed-averaged (U5's k-shot curve averages five seeds); because the suite is built to be re-run end-to-end, every claim is checkable against the committed artifacts. Anyone can re-run it and verify that the claims hold.

## 1. Protocol

Every experiment used the same pipeline — dataset loader → windowing + framework feature extraction → evaluation → report — and every one obeyed the same three rules:

1. **Recording-fair grouping.** Windows from the same physical recording never cross the train/test boundary (GroupKFold / LeaveOneGroupOut / leave-one-out over the natural grouping: recording, cut, induction, or substance). The group key is an explicit, versioned argument to the evaluator.
2. **Baselines in the table.** Chance accuracy and the majority predictor (or the mean predictor, for regression) sit beside every headline. A number that beats its baseline is a result; one that does not is printed anyway.
3. **Public data only, research/validation-only.** No product training data, and the UCI corpora are research-only even where their badge reads CC BY 4.0.

Those rules are what make the numbers comparable to each other and to the field.

## 2. Datasets

| Dataset | Source | Sensors | License |
|---------|--------|---------|---------|
| Gas sensor array exposed to turbulent gas mixtures | [UCI id 309](https://archive.ics.uci.edu/dataset/309) · Fonollosa et al. 2014 | 8 Figaro TGS | research-only |
| Gas sensor array under dynamic gas mixtures | [UCI id 322](https://archive.ics.uci.edu/dataset/322) · Fonollosa et al. 2015 | 16 Figaro TGS | research-only |
| Gas sensor array drift | [UCI id 146](https://archive.ics.uci.edu/dataset/146) | 16 MOX, 6 gases, 10 batches / 36 months | research-only |
| Gas sensors for home activity monitoring | [UCI id 362](https://archive.ics.uci.edu/dataset/362) · Huerta et al. 2016 | 8 Figaro TGS + temp/humidity | research-only |
| Electronic nose from various beef cuts | [Harvard Dataverse 10.7910/DVN/XNFVTS](https://doi.org/10.7910/DVN/XNFVTS) | 11 MQ, 12 cuts | CC0 1.0 |
| SmellNet | [arXiv:2506.00239](https://arxiv.org/abs/2506.00239) · HF \`DeweiFeng/smell-net\` | 6 MOX, 50 substances | research |

All provenance, conversion formulas, and sha256s are committed in \`data/DATASETS.md\` inside the code repo.

## 3. U2 — Gas leaks and mixtures (UCI wind-tunnel data)

Detecting gas in air is the easiest job an e-nose has, and the numbers reflect it:

- **Binary gas-present detection:** **94.1%** / 94.4% balanced (chance 50%, majority 65.5%), 5,220 windows over 180 recordings.
- **Onset detection:** 180/180 recordings detected, median latency **10 s**; the onset window itself was classified correctly at **84.2%** / 85.2% balanced.
- **Mixture identity** (ethylene-only / CO-only / methane-only / both): **89.2%** / 83.9% balanced (chance 25%, majority 60.0%); secondary gas id (CO vs methane) **94.9%**.
- **Dynamic concentration tracking:** on a continuous two-gas run, per-gas regression hit **R² 0.922** (ethylene, MAE 0.62 ppm) and **R² 0.952** (methane, MAE 5.7 ppm) — against a mean-predictor baseline of R² 0. Event/state classification reached **98.1%** / 97.7% balanced (any-gas) and **96.7%** / 96.6% balanced (four-state).

The read: *detection and onset are reliable under realistic conditions.* A MOX array using the framework tells you something is there within about ten seconds. That is the value proposition of a gas alarm.

**The calibration caveat, measured.** The suite also tested power-law concentration recovery on the turbulent data. Per-channel log-log R² is weak — median R² 0.276 for ethylene, 0.320 for CO, 0.067 for methane — and leave-one-out recovery lands within one decade on 94–100% of predictions (median log₁₀ error 0.16–0.30 decades). In words: the sensor *responds* to concentration, and recovery is a usable detection reference bounded by that ±0.16–0.30 decades error — the stated precision of this family of results.

## 4. U3 — Food spoilage (Harvard Dataverse beef cuts)

Electronic-nose readings from 12 beef cuts with hourly microbial ground truth — total viable counts (TVC) in log₁₀ CFU/g plus a 4-class freshness grade. Evaluation was leave-one-cut-out (12 groups); 876 windows, TVC range 1.88–5.76 log₁₀ CFU/g.

- **TVC regression:** **R² 0.793**, MAE **0.384** log₁₀ CFU/g (the mean predictor's MAE is 0.935 — a 59% improvement), RMSE 0.495, Spearman ρ 0.849.
- **Four-class freshness:** **78.4%** / 64.5% balanced (chance 25%, majority 60.3%). Per class: 1→81.1%, 2→66.7%, 3→17.3%, 4→93.0%.
- **Binary "spoiled" (TVC ≥ 5):** **85.0%** / 84.8% balanced (chance 50%, majority 60.3%).
- Strongest single-channel signals against TVC: MQ5 (ρ = 0.93), MQ4 (ρ = −0.90), MQ137 (ρ = 0.83).

Two scope notes. Class 3 — the *transitional* freshness bin — is a real weak spot (17.3%), which is exactly what the chemistry predicts: the middle of a spoilage curve is where the sensor signal stops changing monotonically. And the binary "spoiled/not-spoiled" question is the practically useful one — a consumer does not need "freshness class 2," they need "is this meat safe" — and that works at 85%.

## 5. U4 — Indoor-air monitoring (UCI-362 home activity)

Eight Figaro sensors in a real home, 99 gas inductions of background/wine/banana activity, ~929k rows. Temperature and humidity were excluded so the claim stays MOX-only; 3,960 windows, leave-one-induction-out.

- **Binary stimulus detection:** **87.6%** / 74.1% balanced (chance 50%, majority 81.7%); background detected at 95.4%, stimulus at 52.8%.
- **Three-class** (background/wine/banana): **86.0%** / 55.0% balanced (chance 33.3%, majority 81.7%). Banana: **4.5%**.

The balanced accuracy carries the detail: the model beats the majority baseline but struggles on the *stimulus* class, and banana detection is at chance. "Detecting *an* event" works; "detecting *which* event, in a home, with a MOX array" is hard. Both numbers are printed because both are true.

## 6. U5 — Rig chemoprinting (UCI gas drift benchmark)

Six gases, 16 sensors, 10 batches over 36 months of real drift. Batches model rig / device-time states; fingerprinting uses batches 6/7/9/10 (all six gases, ≥20 samples each).

- **Rig fingerprinting:** pooled **78.5%** (chance 25%), evaluated leave-gas-out — trained on five gases, identifying the rig on the sixth, so the rig pattern must generalize to a never-seen gas to count. Per gas: Acetaldehyde 91.5%, Ammonia 79.4%, Toluene 79.1%, Ethanol 78.1%, Acetone 77.7%, Ethylene 68.8%.
- **Per-rig calibration curve:** source batches 1–5 (3,633 measurements) → target batches 6–10 (10,277). Zero-shot transfer **52.3%** (chance 16.7%, majority 20.0%); in-target supervised ceiling **99.5%** (balanced 99.4%).
- **The k-shot curve** (labeled target samples added to the source training set, 5 seeds): k=5 → **65.6% ± 1.5**, k=10 → **73.4% ± 2.3**, k=25 → **83.5% ± 0.9**, k=50 → **91.2% ± 0.4**.

This is the suite's central result. A rig is identifiable from sensor statistics alone (78.5%) — the foundation for per-rig reference calibration, and the demonstration that every rig is subtly different. The 99.5% ceiling versus 52.3% zero-shot is the measured price of drift. The k-shot curve shows the fix: a handful of reference samples on the target rig recovers most of the gap. That curve is the empirical case for reference-point calibration in one chart.

**Scope note.** The drift batches are one physical array aging over time, so they model rig identity and device-time shift, not distinct manufactured hardware. Results describe *these batches / this array*, not a guarantee for other hardware.

## 7. U6 — Smell taxonomy (SmellNet + OSMO families)

SmellNet's 50 food substances (250 recordings, 4,903 windows), labeled with eight perceptual grand families from the OSMO taxonomy.

- **Fine substance identity:** **89.4%** / 89.5% balanced (chance 2.0%, majority 2.3%), stratified group-6-fold over 250 recordings. Recognizing *which of 50 foods* works.
- **Perceptual family** (leave-one-substance-out, 50 groups): **40.2%** vs majority **38.1%** (chance 12.5%). Per class: Woody 65.2%, Green 41.7%, Fruity 28.5%, Herbal 21.7%; Citrus/Floral/Mineral/Soulful **0.0%**.
- **Fine→coarse collapse:** 35.7% — predicting families from fine predictions does not recover family structure.

The read: *identity is learned, family is not.* The sensor distinguishes the 50 foods well, but the perceptual categories ("woody," "floral") do not fall out of raw sensor identity — the model can tell cumin from pineapple but cannot generalize to "this is a woody thing." The tiny families score 0.0% because one or two substances per family is too little data to learn a category from. This is the substance-generalization wall, measured at the perceptual level.

## 8. Synthesis table

| Evaluation | Headline | Balanced / chance | Majority |
|---|---|---|---|
| U2a mixture identity | 89.2% | 83.9% / 25% | 60.0% |
| U2b gas-present | 94.1% | 94.4% / 50% | 65.5% |
| U2b onset window | 84.2% | 85.2% / 50% | 60.0% |
| U2c any-gas (best) | 98.1% | 97.7% / 50% | 67.2% |
| U2c dynamic ppm | R² 0.922–0.952 | ρ 0.886–0.949 | mean-pred R² 0 |
| U3 TVC regression | R² 0.793 | ρ 0.849 | mean-pred MAE 0.935 |
| U3 4-class freshness | 78.4% | 64.5% / 25% | 60.3% |
| U4 binary stimulus | 87.6% | 74.1% / 50% | 81.7% |
| U5 rig fingerprint | 78.5% | — / 25% | — |
| U5 zero-shot | 52.3% | — / 16.7% | 20.0% |
| U5 in-target ceiling | 99.5% | — / 16.7% | 20.0% |
| U6 fine substance | 89.4% | 89.5% / 2.0% | 2.3% |
| U6 family (LSO) | 40.2% | — / 12.5% | 38.1% |

## 9. What this proves — and does not

**Proves** (recording-fair, public data, baselines in the same table): a single MOX device using the framework separates gases, detects onsets within ~10 seconds, tracks concentration, scores beef spoilage against microbial ground truth, and identifies 50 food substances at ~89% — all on held-out recordings. Rig identity is learnable from sensor statistics, which is the foundation for per-rig calibration.

**Does not prove:** zero-shot cross-device transfer (52.3% vs the 99.5% ceiling says no, reference-free), novel-substance generalization (the family result — 40.2% ≈ majority 38.1% — says no), or certified absolute quantification (power-law recovery is a detection reference at ±0.16–0.30 decades median).

The suite's real deliverable is the shape of that table: detection beats identification, quantification works against real ground truth, and every wall it hits is the same wall — the need for per-rig reference calibration.

## 10. Reproducibility

The entire suite is a standalone repository, [\`opensmell/e-nose-evals\`](https://github.com/opensmell/e-nose-evals): the shared \`harness/\` (loaders, feature extraction, grouped evaluation, report emitter), all six \`uN_*/run_*.py\` entrypoints, and the committed \`results/*_metrics.json\` + \`*_analysis.md\` artifacts with \`generated_utc\` provenance — plus the dataset registry (\`data/DATASETS.md\`) and the bundled small datasets (drift batches, SmellNet offline recordings, OSMO taxonomy, beef-cut sheets) so U3/U5/U6 run out of the box. The three large UCI corpora are re-downloadable and never committed.

\`\`\`bash
pip install -r requirements.txt
python selftest.py                     # U1 — no dataset needed
python u5_chemoprint/run_experiment.py # U5 — bundled drift data
\`\`\`

If you re-run an experiment and your numbers differ, that is a finding — report it. The suite is designed so the comparison is possible.

## 11. Limitations

- **Procedure-defined splits, not a frozen benchmark.** No leaderboard exists; a formal benchmark (frozen splits, submission harness) is a separate, future project. Do not read this suite as one.
- **One array, one time series per domain.** U2–U4 each rest on a single device's recordings; U5 models device-time shift rather than manufactured hardware variation.
- **Research-only data.** The UCI corpora are restricted to non-commercial research; anything built on these numbers inherits that restriction.
- **Feature-level, not raw, for U5.** The drift dataset ships pre-extracted features, so the chemoprint experiments consume them directly rather than through the windowing pipeline.

## 12. References

- Fonollosa et al. 2014 — chemical discrimination in turbulent gas mixtures with MOX arrays (UCI 309).
- Fonollosa et al. 2015 — gas sensor arrays for real-time identification of dynamic gas mixtures (UCI 322).
- Vergara et al. 2012 — drift compensation for gas sensor arrays (UCI 146).
- Huerta et al. 2016 — gas sensors for home activity monitoring (UCI 362).
- Wijaya et al. — electronic nose from various beef cuts, Harvard Dataverse 10.7910/DVN/XNFVTS.
- Feng, D., Dai, W., Li, C., Pernigo, A., Wen, Y. & Liang, P. P. "SmellNet: A Large-scale Dataset for Real-world Smell Recognition." *arXiv:2506.00239* (2025); ICLR 2026; dataset \`DeweiFeng/smell-net\`.
- Osmo Labs, PBC. "The Osmo Scent Taxonomy," v1.1, 2025 (ODC-ODbL): <https://github.com/osmoai/taxonomy>.
- Code and results: [\`opensmell/e-nose-evals\`](https://github.com/opensmell/e-nose-evals); SmellNet code and ScentFormer: <https://github.com/MIT-MI/SmellNet>.
`,
  },
  {
    slug: "the-opensmell-stack",
    title: "The OpenSmell Stack: An Orientation Map",
    excerpt:
      "SDK, web platform, desktop app, hardware build guide, and a research layer — plus the 1:1 Python/TypeScript mirroring contract. If you are new to the project, start here: where everything lives, how the pieces mirror each other, and the order in which to read the code and this Academy.",
    category: "Foundations",
    tags: ["orientation", "repository map", "mirroring", "getting started", "open source"],
    readTime: "12 min",
    date: "2026-08-06",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/the-opensmell-stack.svg",
    content: `
OpenSmell is not one repository; it is a stack — a set of pieces that share a common vocabulary and a common contract. If you have just arrived, the most useful thing this Academy can give you is a map: what each piece is for, how they mirror each other, and the order in which to read them. That is this essay.

## The Layers

| Layer | Repository | What it does |
|---|---|---|
| SDK | \`opensmell/\` | Python package: feature extraction, \`.osmell\` I/O, calibration, smellability, quality scoring |
| Web | \`osmograph-web/\` | Next.js platform: import, compare, train, search; the RDKit-backed smellability engine |
| Desktop | \`Osmograph/\` | Python desktop visualization of traces, windows, and fingerprints |
| Hardware | \`electronic-nose/\` | Build guide and firmware for a ~$30 MOX array (ESP32 + modules) |
| Science | \`research/\`, \`encoder/\`, \`Chemoprint/\`, \`interoperability/\` | The experiments, negative results, calibration studies, and representation learning |

The names are chosen to be boring. \`opensmell/\` is the single source of truth for the data model; everything else consumes it.

## The 1:1 Mirroring Contract

The stack's most distinctive engineering decision: **core logic exists twice, in Python and in TypeScript, kept equal by tests.** The pairs are exact:

- \`io.py\` ↔ \`io.ts\` — \`.osmell\` read/write
- \`normalize.py\` ↔ \`normalize.ts\` — the normalization menu
- \`types.py\` ↔ \`types.ts\` — the shared data model (including the calibration descriptor)
- \`groups.py\` ↔ \`groups.ts\` — functional-group inference from SMILES

Why run the same logic twice? Because the SDK serves Python researchers and the web platform serves browser users, and if the two implementations ever disagree — a feature off by one, a normalization subtly different — every downstream comparison across the stack inherits the bug. Mirroring by test turns "are these the same?" from a hope into a build-time fact. This is the same discipline that drives the \`.osmell\` format to be self-describing: the stack would rather fail loudly on a mismatch than silently produce two different answers.

## The Honesty Rules

The stack carries a document of *honesty rules* that every piece of public content must obey. Their substance:

1. **Affine calibration failed** on real cross-device data (47% → 33%); the engine never claims calibrated ppm — headspace ppm is a thermodynamic estimate.
2. **Six pure anchors cannot cover odorant space** (≈0.1% of 4,565 odorants); the design ships a contribution loop, not a "calibrate to these bottles" flow.
3. **Session invariance comes from learning, not magic** — 81.78% on held-out sessions, for *trained* substances; not zero-shot generalizable.
4. **Effective dimensionality ≪ sensor count** — two same-family MOX ≈ 1 dimension; humidity is common-mode across SnO₂.
5. **Drift / batch ±20% / humidity set the capture rules** — the protocol always prescribes clean-air baseline → exposure → recovery.
6. **Normalization is a menu, kept open** — z-scores beat R_s/R₀ for encoder input; paradigm features beat statistical features cross-device; \`.osmell\` preserves raw + baseline so any client picks its own.

Every essay in this Academy that quotes a number is quoting a result that passed through these rules. The "is / is-not" table is the distilled form: a verdict *is* a physical feasibility estimate; it *is not* a calibrated concentration, a guarantee of mixture decomposition, a promise across unseen devices, or a replacement for capture discipline.

## Where to Start Reading

The project's own onboarding order, which doubles as an Academy reading order:

1. **Orientation** — this essay; then the *digitising smell* primer for the "why."
2. **Run the SDK** — \`extract_features\` on a SmellNet CSV; then the *187-dimension* essay explains what you just computed.
3. **Sensor theory** — the *band bending* and *sensor count* essays (the physics and the limits).
4. **Data formats** — the *.osmell* essay (the container everything flows through).
5. **Decay model** — the multi-exponential fit that powers the advanced features.
6. **Discipline** — the *interoperability* and *evaluating models* essays (the walls and the protocol).
7. **Evidence** — the *U-suite* essay (what the stack actually does on real data).

Each Academy essay carries a "Sources & Further Reading" section that points back to the master reference section it came from, so the code is never more than one click away.

## Known Gaps, Published Alongside Everything Else

The same honesty rules apply to the project's own open items, which are tracked publicly: the training pipeline, the MINPACK decay-minima reproducibility caveat, and the unification of the canonical feature extractor. The calibration hooks and the hardware-insufficiency gate are done and shipped; the *firmware* calibration mode and any real labeled-concentration hardware validation are still open. They are listed as open because the stack's contract is that gaps are named, not hidden.

## The Point of the Map

Every layer of this stack exists to make one sentence true: *a smell recording is a comparable, self-describing artifact, and every claim made from it is traceable to measured data.* The SDK makes the features; the format makes the artifact; the mirrors keep the logic consistent; the science layer keeps the claims verifiable; the Academy explains all of it. You can start anywhere — but the order above is the one that builds understanding fastest, and it is the order the rest of the series assumes.

## Sources & Further Reading

- OpenSmell master reference, §11.9 (the repo map) and §11.10 (the reading order), §7.11 (the honesty rules), §9 (changelog and reproducibility).
- The OpenSmell GitHub organization — one monorepo per layer above, all MIT-licensed.
- The \`.osmell\` format essay — the container at the center of the stack.
- The U-suite essay — the evidence the stack points to.
`,
  },
  {
    slug: "mox-smellability",
    title: "Will My E-Nose Actually Smell It? The 4-Step Physics Chain",
    excerpt:
      "A compound can be intensely smelly to a human and nearly invisible to a MOX sensor. Feasibility is a physics question — identity, volatility, signal, reactivity — and it deserves a falsifiable answer before you buy hardware.",
    category: "Research",
    tags: ["mox", "smellability", "feasibility", "headspace", "vapor pressure", "reactivity"],
    readTime: "11 min",
    date: "2026-08-10",
    author: "OpenSmell Academy",
    thumbnail: "/thumbnails/mox-smellability.svg",
    content: `
Before you buy sensors, choose a sensor count, or record a single exposure, there is a boring question you should answer first: **will the target molecule actually produce a detectable response on a MOX array?**

That question is not answered by your nose. The human nose and a metal-oxide semiconductor (MOX) sensor are different instruments with different response functions, and confusing the two is the most common source of failed e-nose projects. This essay is about the *physics* of the question — the four-step chain that turns "will it smell?" into a falsifiable verdict. It is the theory behind the **smellability** engine in the OpenSmell SDK and the browser toolkit.

## Your Nose Is Not a MOX Sensor

Humans detect thiols and mercaptans down at parts-per-trillion to parts-per-billion concentrations. That is why a few drops of ethyl mercaptan can make a gas leak obvious to every nose on a street. Commodity MOX sensors do not work that way: their datasheets specify response ranges in the *parts-per-million* decade (an MQ-3, for instance, is rated for roughly 25–5,000 ppm of ethanol-family gases). A compound can therefore be:

- **Strongly smelly to humans, nearly invisible to a MOX** — a volatile thiol at trace concentration;
- **Dull to humans, obvious to a MOX** — ethanol in hand sanitizer smells faint but saturates a headspace with tens of thousands of ppm;
- **Smelly to everyone, dead on a MOX** — pure nitrogen has no smell, but neither does it reduce the sensor surface, so a flow of nitrogen is not a signal.

The nose detects *specific receptors firing*; a MOX detects *reduction of a hot metal-oxide surface*. That single mechanistic difference drives everything below.

## What a MOX Sensor Actually Measures

A MOX sensor is a sintered film of tin dioxide (SnO₂) held at roughly 350–450 °C. At that temperature, oxygen chemisorbs onto the surface, trapping electrons and raising the film's resistance. When a gas arrives that can be *oxidised by the surface oxygen* — a reducing gas — the surface releases those electrons and the resistance drops. The resistance change is the signal.

So feasibility decomposes into exactly two physical requirements:

1. **Volatility** — enough of the molecule must reach the sensor surface in the gas phase.
2. **Reactivity** — the molecule must be redox-active at the operating temperature.

Both must hold. A perfectly reactive molecule that never leaves the liquid phase is invisible. A volatile molecule that cannot reduce the surface produces only background changes. The smellability engine grades both, and the answer is only as good as the worst of the two.

## The Four-Step Chain

The engine runs the following chain for every substance under test. Each step emits a verdict in **green / yellow / red**; the overall verdict is the **worst** step. A red anywhere is a red everywhere.

### Step 1 — Identity

First the engine must know what it is looking at. A lookup can resolve a name to:

- a **curated** entry (measured boiling point, curated functional groups) — the most trustworthy path;
- a **composite** entry (a known mixture with recorded constituents and weight fractions);
- a **chemical class** term (e.g. "terpene", "thiol") with class-level properties;
- or, when you hand it a **SMILES string**, a *de novo* estimate via group-contribution (Joback) theory — a boiling point and functional groups inferred from the structure.

Every property in the chain carries a *provenance*: measured, estimated, or unknown. That provenance is what sets the verdict's confidence — estimated properties never pretend to be measurements.

### Step 2 — Volatility

The engine estimates vapor pressure at 25 °C. For curated substances it uses Antoine coefficients (NIST data); otherwise it falls back to the Clausius–Clapeyron equation with Trouton's rule for the heat of vaporization:

    ΔH_vap ≈ 88 × T_boil          (J/mol, Trouton)
    P_vap(298 K) via Clausius–Clapeyron

Pure gases are assigned full atmospheric pressure (they *are* the vapor phase). The result is graded against volatility bands: ≥10,000 Pa "very high", 1,000–10,000 "high", 100–1,000 "moderate", 1–100 "low", below 1 Pa "negligible".

### Step 3 — Signal

Next: how strong would the *sensor signal* actually be? The engine computes the saturated headspace concentration an ideal enclosed chamber would present:

    ppm_headspace = (P_vap / P_atm) × 10^6

and a **flux ratio** of the compound's diffusion-weighted flux to that of ethanol (the reference substance), using the Fuller–Schettler–Giddings method where diffusivity scales roughly with molecular weight.

The headspace is graded against the sensor's detection floor — **1 ppm** — in bands: ≥1,000 ppm "strong", 100–1,000 "moderate", 10–100 "weak", 1–10 "marginal", below 1 ppm "none". Note how strict this is: the engine's *floor* is 1 ppm while an MQ-3's *rated range* starts at 25 ppm. A "marginal" verdict is already optimistic for most cheap arrays.

### Step 4 — Reactivity

Finally, the chemistry: are the molecule's functional groups redox-active at MOX operating temperature? The engine maps groups (alcohols, aldehydes, ketones, esters, acids, terpenes, thiols, sulfides, amines, phenols, aromatics, ethers) as **reducing / oxidisable** → green. True inerts — N₂, O₂, CO₂, noble gases, water — are **red**: they cannot undergo the surface reduction the sensor detects. Anything unclassified is **yellow**: any response would be indirect (humidity baseline shifts, oxygen partial-pressure changes, matrix effects), not a true analyte signal.

### Aggregation

The verdict is the worst of the four steps. For composites, each constituent runs the full chain and the constituents' signal scores are combined by weight: red if red weight dominates, yellow if the non-green fraction is substantial. Confidence falls to **low/medium** whenever properties were estimated rather than measured. Two extra blocks round out the answer:

- **crossCheck** — a capacity check: can an N-sensor array resolve this substance *within your existing labeled library*? It reports label overlap. It does not promise mixture decomposition, and it explicitly flags that cross-sensitivity to your library is unknown until you add labeled sessions.
- **guidance** — capture advice tuned to the expected signal: short exposures for strong/fast responses, maximised headspace and long windows for weak/slow ones, always clean-air baseline → exposure → recovery.

## "It's a Complex Material" — the Constituent Fallback

Most real targets are not a single curated molecule. A ripe banana is dozens of compounds; a diesel exhaust is hundreds. The chain has a principled answer rather than a shrug: **decompose, grade, and combine.**

If you know the material's constituents — as SMILES strings or formulas and rough weight fractions — the engine runs the full four-step chain **per constituent** and produces a weighted composite verdict. A banana's profile, for example, is dominated by isoamyl acetate (an ester — green reactivity, moderate volatility), backed by ethyl butyrate and 2-methyl-1-butanol; each contributes a verdict proportional to its share of the headspace.

This keeps the honesty rules intact: the engine is not hallucinating a compound it cannot identify. If you supply \`O=C=O\` it tells you it is carbon dioxide — an inert oxide with no reducing chemistry — and grades it red for MOX reactivity, regardless of how strongly you might associate "CO₂" with a smell. The verdict always traces back to the chemistry you actually handed it.

## Making It Falsifiable

Every verdict should be a prediction you can go and break. That is the discipline the whole stack tries to hold itself to, and the smellability engine is no exception.

**Concrete example — ethanol.** The chain predicts: saturated headspace at 25 °C ≈ **78,000 ppm** (well into "strong"), flux ratio 1.0 (it *is* the reference), reactivity green (an alcohol oxidises at ~350 °C), response fast. Overall: **green**.

**How you would falsify that:** put a few ml of ethanol in a sealed jar at room temperature, let it equilibrate, run the capture protocol, and check. If *no* channel moves above the noise floor while a "moderate" compound does, the volatility estimate is wrong for your rig. If nitrogen produces a response equal to ethanol, the reactivity classification is broken — or your flow control and oxygen baseline are.

**Troubleshooting, in order:**

- **No response on a predicted "strong" substance** — is the container sealed? Did you let the baseline settle to a stable resistance *before* exposure? Is the sensor actually at operating temperature? (A cold sensor is a resistor, not a detector.)
- **Response only during the recovery phase** — you are probably measuring a humidity swing from your breath or the room, not the analyte.
- **Everything triggers everything** — your flow rate or oxygen baseline is uncontrolled; MOX responses are strongly modulated by oxygen partial pressure, which is exactly why pure O₂ or N₂ must *not* be graded green.
- **Cross-sensitivity surprises** — a compound you did not expect is dominating. Add its label to the library and re-run the crossCheck.

Two claims the engine deliberately does **not** make, because it lacks the per-rig reference data to back them up: calibrated parts-per-million measurements (calibration on real cross-device data measured a *fall* from 47% to 33% accuracy — see the evaluating-models essay) and the ability to separate isomers like limonene from pinene on a small array. The honest next step is a rig-reference layer: record known concentrations on *your* hardware and let the chain's predictions be tested against them. The chain ships the prediction; you supply the reference.

## Actionable Guidance

The single highest-leverage lever for weak signals is temperature. Vapor pressure grows roughly **exponentially** with temperature (Clausius–Clapeyron again), roughly doubling every 10–15 °C. A compound that is "negligible" at 25 °C can jump two or three decades by warming the sample to 60 °C — within a sealed bag or glass jar, never an open flame. The engine's guidance block will tell you when to do exactly this: it maximises headspace and lengthens capture windows for anything below "moderate", and it keeps exposures short for the strong/fast cases so you do not saturate the array.

Beyond that, the rules are short:

- **Maximise headspace** — a sealed bag or jar, not an open dish; sniff the headspace, not the liquid.
- **Keep the distance short** — a few centimeters, not a meter; concentration falls with distance.
- **Control the baseline** — clean air, stable resistance, then expose, then let it recover fully.
- **Match the sensor family to the target** — different MOX parts are tuned to different gas classes; a carbon-monoxide detector is not an ethanol monitor.
- **Do not over-promise the array** — four real MOX sensors have effective dimensionality around 2–3; grade a single substance, resolve against your library, and stop there.

## Sensor Poisoning: The Silent Killer

The smellability chain tells you whether a compound *can* produce a signal. It does not tell you whether that signal will still be there next week. **Poisoning** is the catastrophic cousin of drift — while drift is gradual, poisoning is often irreversible and can render a sensor permanently unresponsive.

### What Poisoning Is

At MOX operating temperatures (350–450 °C), certain molecules do not just reduce the surface — they *bind irreversibly* to the SnO₂ lattice. The most common culprits:

- **Hydrogen sulfide (H₂S)** — forms stable metal sulfides on the oxide surface
- **Siloxanes** — found in perfumes, cleaning products, and even some food packaging; polymerize on hot surfaces
- **Halogens (Cl₂, HCl)** — etch the oxide lattice, permanently altering its structure
- **Phosphorus compounds** — from pesticides, flame retardants

A clean-air MOX sensor in a typical office environment might live one to three years before baseline drift forces replacement. In a food processing plant, a bakery, or anywhere with high concentrations of these compounds, that lifetime can drop to *weeks*.

### How to Detect Poisoning

The OpenSmell SDK's PoisoningDetector monitors four signatures:

1. **Sensitivity decay** — the sensor's response to known compounds gradually weakens
2. **Noise increase** — the signal becomes noisier as surface defects accumulate
3. **Recovery slowdown** — after exposure, resistance takes longer to return to baseline
4. **Baseline drift** — linear regression on clean-air readings shows consistent upward or downward trend

When any two signatures appear together, the system flags the sensor as "poisoned" and recommends replacement.

### Preventing Poisoning

- **PTFE filter** — a microporous PTFE membrane over the sensor inlet blocks particulates and some larger molecules while allowing gas-phase compounds through
- **Cartridge design** — OpenSmell's sensor cartridges are designed for field replacement; when a sensor poisons, you swap the cartridge, not the whole device
- **Baseline discipline** — always establish a clean-air baseline before exposure; poisoned sensors often show anomalous baseline behavior first
- **Environmental monitoring** — track cumulative exposure to known poisons in your operating environment

### The Cartridge Model

This is why OpenSmell uses a razor-blade cartridge model. Sensors are consumables. The calibration data (\`R₀\`, variance, Fisher discriminant ratios) lives in the firmware, not on the sensor itself. When you swap a cartridge:

- The old \`R₀\` is retained for drift analysis
- The new cartridge gets a fresh baseline
- Variance resets but the system's adaptive learning preserves your labeled library
- The cartridge ID is tracked in the data-commons for provenance

The goal is not infinite sensor life — it is predictable, manageable sensor replacement with minimal downtime and zero loss of learned behavior.

## What the Verdict Is and Is Not

| The verdict **is** | The verdict **is not** |
|---|---|
| Physical feasibility: volatility × redox, given the chemistry you supplied | A calibrated concentration measurement |
| A capacity grade: can an N-sensor array resolve this within your labeled library | A guarantee of mixture decomposition |
| Honest uncertainty: low/medium confidence when properties are estimated | A promise across unseen devices or unlabeled sessions |
| Actionable capture guidance tuned to the expected signal | A replacement for baseline → exposure → recovery discipline |

The chain never fabricates missing data and never upgrades an estimate into a measurement. If it does not know the boiling point, it says so and drops the confidence — it does not guess a number and print a confident green. Those limits are not omissions; they are the measured lessons of the calibration experiments, and they are what keep a feasibility verdict worth acting on.

## Sources & Further Reading

- The smellability engine source — \`opensmell/mox/smellability/\` (Python) and \`osmograph-web/lib/smellability/\` (TypeScript mirror), with the two implementations held in parity by mirrored tests.
- The feasibility-chain spec and calibration-lessons documents in \`osmograph-web/docs/smellability/\` — the evidence base for every number above.
- The *from-SMILES-to-smell* and *chemoprint* essays — structure-derived representations that feed Step 1.
- The *sensor-count* and *band-bending* essays — why effective dimensionality is far below sensor count, and what a MOX surface actually does.
- The *evaluating-models* essay — the calibration honesty rules (47% → 33% affine failure) that forbid calibrated-ppm claims.
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
