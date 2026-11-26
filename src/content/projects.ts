import type { Project } from "./types";

/**
 * Projects, written from each repository's README and the CV.
 *
 * - `featured: true` projects show on the home page first; the rest appear
 *   after "Show all projects".
 * - Links left empty are hidden, so nothing on the site breaks.
 * - Screenshots: put images in /public/projects/<slug>/ and list them in
 *   `screenshots` (and optionally `cover` for the card). Projects without a
 *   cover show their animated artwork. Images come from each repo's docs/.
 */
export const projects: Project[] = [
  {
    slug: "dashlens",
    index: "01",
    title: "DashLens",
    tagline: "Asking a dashboard a question, and getting a real answer.",
    description:
      "An intelligent vision-language system for accessible, interactive dashboard question answering.",
    kind: "Research system",
    category: "Research",
    featured: true,
    areas: ["Vision-Language Models", "Dashboard interaction", "Visual question answering", "GUI agents", "Accessibility"],
    problem:
      "Dashboards hold an organisation's most important numbers, yet they are among the least accessible things on the web. A chart is a picture: a screen reader sees a canvas. Interactive dashboards add filters, tabs and tooltips, so the answer often isn't on screen until someone clicks the right control.",
    approach: [
      "Treat the dashboard as a visual interface: the system works from what is rendered on screen, the way a person does.",
      "Use a vision-language model to read charts, legends and labels, and ground each question in the region that answers it.",
      "Act like a GUI agent when the answer is hidden: choose a filter, open a tab or hover a point, then look again.",
      "Return answers in plain language with a pointer to the evidence, so screen-reader users can check and follow up.",
    ],
    pipeline: [
      { label: "Observe", detail: "Dashboard screenshot + interface structure" },
      { label: "Ground", detail: "Locate charts, axes, legends, controls" },
      { label: "Reason", detail: "VLM answers or plans an interaction" },
      { label: "Act", detail: "Click, filter, hover, then re-observe" },
      { label: "Explain", detail: "Accessible answer with cited region" },
    ],
    evaluation: "This is ongoing research at the TriModal AI Lab. Results will be added once the work is published.",
    stack: ["Python", "PyTorch", "Hugging Face", "Vision-Language Models", "GUI automation"],
    visual: "dashlens",
    links: {},
  },
  {
    slug: "couplecare-ai",
    index: "02",
    title: "CoupleCare AI",
    tagline: "Private relationship support in English, বাংলা and Banglish.",
    description:
      "A bilingual relationship-support assistant that runs entirely on your own computer, using a local language model and retrieval-augmented generation with source citations and an independent safety layer.",
    kind: "Applied NLP",
    category: "Applied AI",
    featured: true,
    areas: ["Retrieval-Augmented Generation", "Local LLMs", "Conversational AI", "AI safety", "Bangla NLP"],
    problem:
      "People rarely ask for help with relationships in a second language, and most support tools are English-only. General chatbots can drift or make things up on sensitive topics, and many people don't want such private conversations sent to a cloud API.",
    approach: [
      "Runs locally: Qwen3-4B-Instruct (Q4_K_M) through llama.cpp with CUDA, about 80 tokens/s in about 3.8 GB of VRAM on an RTX 4060.",
      "Hybrid retrieval over a curated knowledge base with multilingual E5 embeddings, and citations shown beside every reply.",
      "An independent safety layer of rules, cue detection and a semantic classifier, plus output filters for invented numbers, diagnoses and excusing abuse.",
      "Pre-written support replies in Bangla and Banglish for crisis situations, and a coach mode for what to say next.",
    ],
    pipeline: [
      { label: "Query", detail: "English, Bangla or Banglish" },
      { label: "Safety", detail: "Rules + cues + E5 classifier" },
      { label: "Retrieve", detail: "Hybrid search, multilingual E5" },
      { label: "Generate", detail: "Local Qwen3-4B via llama.cpp" },
      { label: "Cite", detail: "Sources shown beside the reply" },
    ],
    features: [
      { title: "Fully local", detail: "Conversations stay on your machine. Cloud mode is optional." },
      { title: "Three ways to write", detail: "Handles English, Bangla and mixed Banglish." },
      { title: "Cites its sources", detail: "Every reply shows the guides it was grounded in." },
      { title: "Safety first", detail: "Held-out safety tests: 15/15 direct and 5/5 indirect cases caught, 1 false alarm in 94." },
    ],
    evaluation:
      "Evaluated on 386 fictional scenarios covering retrieval, safety, generation quality and prompt ablations, with 95% intervals. 268 backend and 33 frontend tests pass in CI.",
    stack: ["Python", "FastAPI", "llama.cpp", "Qwen3-4B", "Multilingual E5", "TypeScript", "Vitest"],
    visual: "couplecare",
    cover: { src: "/projects/couplecare-ai/landing.webp", alt: "CoupleCare AI landing page", width: 799, height: 506 },
    screenshots: [
      { src: "/projects/couplecare-ai/landing.webp", alt: "CoupleCare AI landing page in the light theme", width: 799, height: 506, caption: "Landing page" },
      { src: "/projects/couplecare-ai/chat-english.webp", alt: "A chat reply in English with its sources listed in the side panel", width: 800, height: 500, caption: "Reply with sources in the side panel" },
      { src: "/projects/couplecare-ai/chat-bangla.webp", alt: "A chat reply written in Bangla", width: 800, height: 500, caption: "Reply in Bangla" },
      { src: "/projects/couplecare-ai/chat-coach.webp", alt: "Coach mode suggesting what to say next", width: 800, height: 500, caption: "Coach mode: what to say next" },
      { src: "/projects/couplecare-ai/knowledge.webp", alt: "The knowledge base page in the dark theme", width: 799, height: 506, caption: "Knowledge base, dark theme" },
    ],
    links: { github: "https://github.com/souwmo04/Couple-Care-AI-Rag-Model" },
  },
  {
    slug: "scanly",
    index: "03",
    title: "Scanly",
    tagline: "A free, offline document scanner with Bangla-English OCR.",
    description:
      "An offline-first document scanner for Android and iOS with document detection, image enhancement, PDF tools and on-device Bangla-English OCR. No subscriptions, no watermarks and no account.",
    kind: "Mobile app",
    category: "Web & Mobile",
    featured: true,
    areas: ["Mobile", "OCR", "Computer Vision", "Privacy"],
    problem:
      "Most scanner apps lock basic features behind subscriptions, add watermarks, ask for accounts and send documents to the cloud. Very few read Bangla at all.",
    approach: [
      "Automatic edge detection and perspective correction, written in pure Dart, with auto or manual capture and multi-page scans.",
      "On-device OCR: ML Kit for English, and Tesseract for Bangla and mixed Bangla-English text.",
      "PDF tools for A4, A5, Letter, Legal or original size, with compression, merge, split, share and print.",
      "A library with folders, favourites and full-text search over OCR text, using SQLite FTS5.",
    ],
    features: [
      { title: "Private by design", detail: "Camera permission only: no internet permission, no account, ads or analytics." },
      { title: "Reads Bangla", detail: "Bangla and mixed Bangla-English OCR, all on device." },
      { title: "Real editing", detail: "Four-corner crop, rotation, filters, brightness, contrast and undo/redo." },
      { title: "Free forever", detail: "No subscription, watermark, page limit or paid API." },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Drift (SQLite + FTS5)", "ML Kit", "Tesseract"],
    visual: "scan",
    links: {
      github: "https://github.com/souwmo04/Scanly-mobile",
      demo: "https://github.com/souwmo04/Scanly-mobile/releases",
      demoLabel: "Download APK",
    },
  },
  {
    slug: "flameguard-ai",
    index: "04",
    title: "FlameGuard AI",
    tagline: "Fire-safety intelligence from NASA microgravity combustion experiments.",
    description:
      "An explainable fire-risk model and dashboard built on NASA's FLEX droplet-combustion experiments from the International Space Station. Built for NASA Space Apps Challenge 2026 (Flame in Freefall).",
    kind: "AI + data science",
    category: "Applied AI",
    featured: true,
    areas: ["Machine learning", "Explainable AI", "Space science", "Data visualisation"],
    problem:
      "Fire behaves differently in microgravity, and spacecraft crews need to understand that risk. NASA's combustion data is public but hard to explore or turn into decisions.",
    approach: [
      "A cleaned dataset of 274 FLEX droplet-combustion tests from NASA's Physical Sciences Informatics repository (CC0).",
      "Exploratory analysis, baseline models, tuning, ablation and stress tests, ending in a deployable model with risk bands.",
      "SHAP explanations, what-if analysis and suppressant comparisons, with every number labelled as observed, predicted or hypothetical.",
      "A FastAPI service with 16 endpoints behind a Next.js dashboard: Mission Control, Fire Risk, What-If Lab and Experiment Explorer.",
    ],
    pipeline: [
      { label: "NASA FLEX", detail: "274 ISS combustion tests" },
      { label: "Model", detail: "Tuned, stress-tested, risk bands" },
      { label: "Explain", detail: "SHAP + what-if analysis" },
      { label: "Serve", detail: "FastAPI, 16 endpoints" },
      { label: "Dashboard", detail: "Next.js mission control" },
    ],
    evaluation: "A research prototype, not a certified spacecraft fire-safety system.",
    stack: ["Python", "Scikit-learn", "SHAP", "FastAPI", "Next.js", "Jupyter"],
    visual: "flame",
    screenshots: [
      { src: "/projects/flameguard-ai/flammability.webp", alt: "Scatter plots of observed FLEX outcomes by oxygen level and droplet size, split by fuel and suppressant", width: 1600, height: 944, kind: "figure", caption: "Observed FLEX outcomes by oxygen level and droplet size" },
      { src: "/projects/flameguard-ai/shap.webp", alt: "Bar charts of mean SHAP contribution: atmosphere 55%, droplet size 25%, fuel 20%", width: 1600, height: 495, kind: "figure", caption: "SHAP: which inputs move the fire-risk score most" },
      { src: "/projects/flameguard-ai/roc.webp", alt: "ROC and precision-recall curves for the final model", width: 1600, height: 668, kind: "figure", caption: "ROC and precision-recall curves" },
      { src: "/projects/flameguard-ai/risk-bands.webp", alt: "Risk bands produced by the final model", width: 1600, height: 513, kind: "figure", caption: "Risk bands" },
    ],
    links: { github: "https://github.com/souwmo04/FlameGuard-AI-NASA-fire-safety-dashboard" },
  },
  {
    slug: "biteatlas",
    index: "05",
    title: "BiteAtlas",
    tagline: "How much of Dhaka have you tasted?",
    description:
      "A personal restaurant exploration map for Dhaka. Mark restaurants as visited and watch your map fill in, across ten live area maps.",
    kind: "Web app",
    category: "Web & Mobile",
    featured: true,
    areas: ["Maps", "Full-stack", "Product design", "Accessibility"],
    problem:
      "Food apps help you find somewhere new to eat, but nothing tracks where you've already been, or shows how much of a city you've explored.",
    approach: [
      "Ten real area maps rendered with MapLibre GL on OpenStreetMap vector tiles, each locked to its traced outline.",
      "Canvas-drawn markers for visited and favourite states, buildings with several restaurants, and clustering that changes colour as you explore.",
      "Supabase Postgres with PostGIS, authentication and row-level security, plus a guest mode that merges into your account later.",
      "A responsive, accessible UI: a sidebar on desktop, a draggable bottom sheet on mobile, and a full list view as a non-map alternative.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "MapLibre GL", "Supabase"],
    visual: "map",
    cover: { src: "/projects/biteatlas/explore.webp", alt: "BiteAtlas explore view on desktop", width: 1366, height: 820 },
    screenshots: [
      { src: "/projects/biteatlas/explore.webp", alt: "Explore view on desktop: the area map with restaurant markers and a sidebar", width: 1366, height: 820, caption: "Explore view" },
      { src: "/projects/biteatlas/dashboard.webp", alt: "Dashboard showing exploration progress across areas", width: 1366, height: 820, caption: "Progress dashboard" },
      { src: "/projects/biteatlas/mobile-map.webp", alt: "The map on a phone", width: 390, height: 844, kind: "mobile", caption: "Map on mobile" },
      { src: "/projects/biteatlas/mobile-detail.webp", alt: "Restaurant details in a bottom sheet on a phone", width: 390, height: 844, kind: "mobile", caption: "Restaurant details on mobile" },
      { src: "/projects/biteatlas/poster.webp", alt: "BiteAtlas promo poster: How much of Dhaka have you tasted?", width: 1600, height: 900, caption: "Promo video poster" },
    ],
    links: {
      github: "https://github.com/souwmo04/Dhaka-Restaurant-Exploration-Map",
      demo: "https://dhakarestuexplore.netlify.app",
      demoLabel: "Live site",
    },
  },
  {
    slug: "meditalk-ai",
    index: "06",
    title: "Meditalk AI",
    tagline: "A medical pre-diagnosis assistant you can talk to.",
    description:
      "A multimodal conversational assistant that produces structured patient summaries from speech, medical reports and images. Built for CSE299 at NSU.",
    kind: "Full-stack AI",
    category: "Applied AI",
    featured: true,
    areas: ["Conversational AI", "Speech", "OCR", "Medical imaging"],
    problem:
      "Before a consultation, patients struggle to describe their symptoms and bring scattered reports. Doctors get unstructured information and little time to read it.",
    approach: [
      "A conversational assistant that extracts symptoms and builds a structured patient summary.",
      "Speech recognition, so patients can talk instead of typing.",
      "OCR for medical reports and analysis of medical images.",
      "A full-stack system with a FastAPI backend, a React frontend and MongoDB.",
    ],
    features: [
      { title: "Talk, don't type", detail: "Speech input for describing symptoms." },
      { title: "Reads the paperwork", detail: "OCR turns reports into structured data." },
      { title: "Structured summary", detail: "A patient summary a clinician can scan quickly." },
      { title: "Multimodal", detail: "Speech, documents and medical images in one flow." },
    ],
    stack: ["Python", "FastAPI", "React", "MongoDB", "Speech recognition", "OCR"],
    visual: "meditalk",
    links: {},
  },
  {
    slug: "weatherlens",
    index: "07",
    title: "WeatherLens",
    tagline: "Weather, understood.",
    description:
      "An AI weather companion that turns raw forecasts into decisions: what to carry, what to wear, whether you can travel, all drawn as a living, illustrated city.",
    kind: "Web app",
    category: "Applied AI",
    areas: ["Grounded AI", "Data products", "Frontend craft"],
    problem:
      "Weather apps show numbers and leave the thinking to you. Forecast models also smooth over local effects like Dhaka's haze.",
    approach: [
      "Uses live observations from the nearest METAR weather station (NOAA) for 'right now', and Open-Meteo for the forecast.",
      "An assistant that may only reason over real forecast data, and shows the data behind every answer.",
      "Practical answers: what to carry, what to wear, travel checks along a route, and when the rain will arrive.",
      "An animated, illustrated city scene that changes with the weather.",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Motion", "FastAPI", "Open-Meteo"],
    visual: "weather",
    links: { github: "https://github.com/souwmo04/WeatherLens" },
  },
  {
    slug: "speech-accent-recognition",
    index: "08",
    title: "Speech Accent Recognition",
    tagline: "Which region is this speaker from?",
    description:
      "English accent classification across 9 regions, comparing MFCC features with classical models against a fine-tuned Wav2Vec 2.0. Built for CSE445 (Machine Learning) at NSU.",
    kind: "ML research project",
    category: "Research",
    areas: ["Speech", "Deep learning", "Transfer learning"],
    problem:
      "Accent recognition is hard: speakers reading the same paragraph differ in subtle ways, and classical audio features miss much of that signal.",
    approach: [
      "About 2,138 recordings from the Speech Accent Archive, mapped to 9 broad regions.",
      "Baseline: 13 MFCCs (mean and variance) with k-NN, Random Forest, SVM and XGBoost.",
      "Fine-tuned facebook/wav2vec2-base end to end on raw audio, with Gaussian-noise augmentation.",
      "Grad-CAM to inspect what the model attends to.",
    ],
    evaluation:
      "The fine-tuned Wav2Vec 2.0 reached 48.13% accuracy, against 29.44% for the best classical baseline (Random Forest) and about 4.5% for the untrained base model.",
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "Librosa", "Scikit-learn"],
    visual: "accent",
    screenshots: [
      { src: "/projects/speech-accent-recognition/finetuned.webp", alt: "Confusion matrix of the Wav2Vec 2.0 model fine-tuned for 15 epochs across 9 accent regions", width: 1200, height: 1000, kind: "figure", caption: "Fine-tuned Wav2Vec 2.0 (15 epochs): confusion matrix" },
      { src: "/projects/speech-accent-recognition/baseline.webp", alt: "Confusion matrix of the classical MFCC baseline", width: 1200, height: 1000, kind: "figure", caption: "MFCC baseline: confusion matrix" },
    ],
    links: { github: "https://github.com/souwmo04/speech_recognization_systems-group-6" },
  },
  {
    slug: "spectralusc",
    index: "09",
    title: "SpectraLUSC",
    tagline: "An Efficient and Explainable Hyperspectral Framework for Pixel-Level Lung Squamous Cell Carcinoma Classification",
    description: "Research manuscript on explainable, pixel-level classification of lung squamous cell carcinoma in hyperspectral images.",
    kind: "Research manuscript",
    category: "Research",
    areas: ["Medical imaging", "Hyperspectral imaging", "Explainable AI"],
    stack: ["Python", "Deep learning", "Hyperspectral imaging"],
    visual: "spectra",
    links: {},
  },
  {
    slug: "meeting-automation-agent",
    index: "10",
    title: "Meeting Automation Agent",
    tagline: "Join the meeting, take the notes, write the report.",
    description:
      "An automated pipeline that joins meetings, transcribes them, writes abstractive summaries and produces PDF reports with multilingual text-to-speech. Built for CSE327 at NSU.",
    kind: "AI automation",
    category: "Applied AI",
    areas: ["Automation", "Summarisation", "Speech"],
    approach: [
      "Selenium automation to join meetings.",
      "Transcription followed by abstractive summarisation with Transformer models.",
      "OCR and multilingual text-to-speech, ending in a generated PDF report.",
    ],
    stack: ["Python", "Django", "Selenium", "Transformers", "TTS", "OCR"],
    visual: "agent",
    links: {},
  },
  {
    slug: "car-buying-javafx",
    index: "11",
    title: "Car Buying Platform",
    tagline: "A JavaFX desktop storefront for cars.",
    description:
      "A car buying application with user login, car listings, email notifications and an admin panel. Team project for CSE215 at NSU.",
    kind: "Desktop app",
    category: "Web & Mobile",
    areas: ["Object-oriented design", "Desktop UI"],
    approach: [
      "User registration and login, with car listing and browsing.",
      "Email notifications through the JavaMail API.",
      "An admin panel for managing listings, styled with CSS.",
    ],
    stack: ["Java", "JavaFX", "CSS", "JavaMail API"],
    visual: "car",
    links: { github: "https://github.com/souwmo04/Car_Buying_Website_Project_In_Java-_javafx-_css-_javamail_API" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
