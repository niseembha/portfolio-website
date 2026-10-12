import rfHigherSnr from '../../assets/fudge-ee-research/binary_sigma_1.0_snr_6.02dB.png';
import rfLowerSnr from '../../assets/fudge-ee-research/binary_sigma_9.0_snr_-13.06dB.png';
import rfCleanChirp from '../../assets/fudge-ee-research/chirp_without_noise_real_part.png';
import rfNoisyChirp from '../../assets/fudge-ee-research/chirp_with_noise_real_part.png';
import diaTrendHero from "../../assets/diabetes-project/diatrend-hero.png";
import diaTrendHome from "../../assets/diabetes-project/diatrend-home-page.png";
import diaTrendTrends from "../../assets/diabetes-project/diatrend-glucosetrends-page.png";
import diaTrendScreening from "../../assets/diabetes-project/diatrend-diagnostic-page.png";

const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

export const links = {
  email: "mailto:niseem2008@gmail.com",
  github: "https://github.com/niseembha",
  linkedin: "https://www.linkedin.com/in/niseem-bhattacharya-b48907363/",
  resume: asset("resume.pdf"),
};

export const projects = [
  {
    id: "medsight",
    index: "01",
    title: "MedSight",
    kicker: "Clinical AI / HackSMU VII",
    date: "April 2026",
    image: asset("MedSight.jpg"),
    alt: "MedSight presentation graphic featuring a pair of smart glasses",
    tone: "blue",
    featured: true,
    award: "Best Use of ElevenLabs",
    summary:
      "A clinical observation platform that translates passive smart-glasses data into structured behavioral telemetry and physician-facing reports.",
    details: [
      "Built computer-vision and LLM pipelines to quantify activity, engagement, and distraction.",
      "Designed multi-layer analytics for trend detection and longitudinal monitoring.",
      "Won Best Use of ElevenLabs at HackSMU VII among competing student teams.",
    ],
    tags: ["Computer Vision", "LLMs", "Clinical Analytics"],
    links: [
      {
        label: "View on Devpost",
        href: "https://devpost.com/software/medsight-bu2x7l",
      },
    ],
  },
  {
    id: "diabetes",
    index: "02",
    title: "DiaTrend",
    subtitle: "Diabetes Screening & Longitudinal Glucose Tracking",
    kicker: "SMU Research · Healthcare ML · Mobile Development",
    date: "May 2025 — Present",
    image: diaTrendHero,
    alt: "DiaTrend blue D logo with a medical cross and heartbeat line against a soft glucose-trend graphic",
    screenshots: [
      {
        image: diaTrendHome,
        alt: "DiaTrend Home screen with recent glucose summaries and health tracking",
        caption: "Home · Daily overview",
      },
      {
        image: diaTrendScreening,
        alt: "DiaTrend informational ML screening screen with health inputs",
        caption: "Screening · Saved assessments",
      },
      {
        image: diaTrendTrends,
        alt: "DiaTrend Trends screen visualizing recorded glucose measurements over time",
        caption: "Trends · Glucose over time",
      },
    ],
    stats: [
      { value: "2,704", label: "NHANES participants" },
      { value: "91.5%", label: "Held-out accuracy" },
      { value: "0.917", label: "Held-out ROC-AUC" },
      { value: "3", label: "External benchmark datasets" },
    ],
    tone: "violet",
    featured: true,
    summary:
      "From NHANES-based ML research to a deployed FastAPI backend and a mobile app for informational diabetes screening, glucose logging, and long-term health trends.",
    details: [
      "Developed the screening pipeline from NHANES August 2021–August 2023 data, validated the final model on held-out participants, and benchmarked it on three external diabetes datasets.",
      "Deployed the model through FastAPI using five health inputs: glucose, diastolic blood pressure, insulin, BMI, and age.",
      "Built the TypeScript / React Native / Expo app around four core areas—Home, Track, Trends, and Profile—for glucose logging, summaries, trend visualization, health profiles, and saved screening assessments.",
      "Integrated Supabase authentication and health-data storage, with row-level security restricting users to their own health records.",
    ],
    researchNote:
      "Research manuscript in preparation for submission with SMU Clinical and Computer Science Professor Kasi Periyasamy.",
    screeningNote:
      "Informational screening, not a medical diagnosis tool. Held-out NHANES metrics describe model evaluation, not clinical diagnostic performance.",
    tags: [
      "React Native",
      "TypeScript",
      "Expo",
      "FastAPI",
      "Supabase",
      "scikit-learn",
      "NHANES",
    ],
    links: [],
  },
  {
    id: 'rf-detection',
    index: '03',
    title: 'RF Time-Frequency Detection',
    kicker: 'Electrical Engineering · Signal Processing · RF Systems',
    date: '2026 — Present',
    tone: 'violet',
    featured: true,
    comparison: [
      { image: rfHigherSnr, alt: 'Binary time-frequency detection at 6.02 dB SNR showing a continuous rising chirp track', label: 'Higher SNR · 6.02 dB', caption: 'Clean time-frequency detection' },
      { image: rfLowerSnr, alt: 'Binary time-frequency detection at −13.06 dB SNR showing a fragmented chirp track and false detections', label: 'Lower SNR · −13.06 dB', caption: 'Fragmented time-frequency detection' },
    ],
    supportingFigures: [
      { image: rfCleanChirp, alt: 'Time-domain plot of the real part of a simulated linear chirp without noise', label: 'Clean chirp', caption: 'Time-domain signal before added noise' },
      { image: rfNoisyChirp, alt: 'Time-domain plot of the real part of a simulated linear chirp with added noise', label: 'Noisy chirp', caption: 'Noise obscures the underlying signal' },
    ],
    summary: 'Ongoing ECE research into RF detection using Fourier analysis, IQ data, filtering, and spectrograms, focused on recovering weak chirp signals in noisy environments.',
    affiliation: 'Research with Dr. Gerald Fudge · East Texas A&M University',
    details: [
      'Studied and implemented digital signal-processing foundations: sampling, digital frequency, FFTs, filtering, convolution, and frequency response.',
      'Worked with complex-valued IQ data, magnitude and phase representations, and analytic signals; built time-domain, frequency-domain, and time-frequency views using FFTs and spectrograms.',
      'Simulated complex linear chirps and thresholded spectrogram magnitude to produce binary detection images. Tested different SNR levels to examine when continuous tracks fragment and false detections appear.',
      'Currently exploring clustering methods to group fragmented detections into individual time-frequency pulses.',
    ],
    progression: 'Signals → Sampling → Fourier transform / FFT → Filtering → IQ data → Spectrograms → Time-frequency detection → Weak-signal fragmentation → Pulse grouping',
    tags: ['Signal Processing', 'RF', 'FFT', 'IQ Data', 'Spectrograms', 'Fourier Analysis', 'Python', 'MATLAB'],
    links: [],
  },
  {
    id: "chess",
    index: "04",
    title: "Chess Puzzle Auto-Solver",
    kicker: "Computer Vision / Automation",
    date: "November 2025",
    image: asset("chess-bot.webp"),
    alt: "A chess puzzle interface being read by the auto-solver bot",
    tone: "orange",
    featured: false,
    summary:
      "A Python bot that sees an on-screen chess position, translates it to FEN, asks Stockfish for a move, and executes it autonomously.",
    details: [
      "Detected live board state and piece positions from screen captures with OpenCV.",
      "Translated visual board data into FEN notation for engine-selected moves.",
      "Integrated Stockfish and PyAutoGUI for repeated autonomous puzzle execution.",
    ],
    tags: ["OpenCV", "Stockfish", "PyAutoGUI"],
    links: [
      {
        label: "View source",
        href: "https://github.com/niseembha/chess-puzzle-bot",
      },
      {
        label: "Watch demo",
        href: "https://www.youtube.com/watch?v=jw0oQ7wH5rA",
      },
    ],
  },
];

export const experience = [
  {
    id: "stars",
    company: "UT Southwestern Medical Center",
    role: "Computational Biology & AI Protein Design Intern",
    program: "STARS Summer Research Program",
    lab: "Pool Lab / Dr. Allan-Hermann Pool",
    place: "Dallas, TX",
    date: "June — July 2026",
    image: asset("STARS/utsw-logo.gif"),
    alt: "UT Southwestern Medical Center seal",
    summary:
      "Integrated mouse and human transcriptomic data to identify candidate pain-associated neuronal targets, then built computational protein-design workflows that produced 13 KCNK13 designs and 142 GPR139 docking candidates.",
    tech: ["Computational Biology", "Protein Design", "Python", "R"],
    detail: {
      eyebrow: "STARS Summer Research Program · Pool Lab",
      title: "Computational design for more targeted pain research.",
      overview:
        "Spinal projection neurons carry sensory signals from the spinal cord to the brain, but their human molecular identities are less resolved than their mouse counterparts. This project connected cross-species single-cell analysis with AI-assisted protein design to investigate more selective ways of reaching candidate pain-associated neurons.",
      hero: {
        image: asset("STARS/smiling-next-to-poster.png"),
        alt: "Niseem Bhattacharya standing beside his STARS research poster at UT Southwestern",
      },
      sections: [
        {
          label: "Finding targets",
          text: "Integrated a molecular atlas of mouse spinal projection neurons with human spinal-cord single-cell RNA-seq data. Cross-species label transfer identified candidate human populations corresponding to characterized mouse SPNs, and cell-surface expression analysis prioritized KCNK13 and GPR139 as potential molecular targets.",
        },
        {
          label: "KCNK13 · BindCraft",
          text: "Designed candidate binders against an extracellular region of KCNK13, using residue D69 as an important design hotspot. BindCraft generated 13 accepted computational designs across four distinct protein backbones.",
        },
        {
          label: "GPR139 · Multistage pipeline",
          text: "Built a complementary workflow using MetaGen, RIFDock, ProteinMPNN, and AlphaFold to generate scaffolds, dock them against GPR139, design sequences, and evaluate predicted structures. RIFDock identified 142 strong docking candidates.",
        },
      ],
      results: [
        { value: "13", label: "Accepted KCNK13 computational designs" },
        { value: "04", label: "Distinct KCNK13 protein backbones" },
        { value: "142", label: "Strong GPR139 docking candidates" },
      ],
      tools: [
        "Python",
        "R",
        "Linux",
        "BindCraft",
        "MetaGen",
        "RIFDock",
        "ProteinMPNN",
        "AlphaFold",
      ],
      presentation: {
        image: asset("STARS/presenting-poster.png"),
        alt: "Niseem Bhattacharya explaining his computational pain research during the STARS poster session",
      },
      poster: {
        image: asset("STARS/poster-actual.jpg"),
        alt: "Research poster summarizing cross-species spinal projection neuron analysis and computational binder design for KCNK13 and GPR139",
      },
    },
  },
  {
    id: "datacolor",
    company: "Datacolor.ai",
    role: "Software Engineering Intern",
    place: "McKinney, TX",
    date: "May — Aug 2025",
    image: asset("datacolor.jpeg"),
    alt: "Datacolor.ai logo",
    href: "https://datacolor.ai/",
    summary:
      "Built the full-stack foundations of an AI grant platform: multi-source search, MySQL caching, compatibility scoring, and PDF analysis.",
    tech: ["React", "Flask", "MySQL", "OpenAI API"],
  },
  {
    id: "inzpireu",
    company: "InzpireU",
    role: "Web Scraping & Data Extraction Intern",
    place: "Remote",
    date: "Jun — Aug 2025",
    image: asset("inzpireu.jpeg"),
    alt: "InzpireU star logo",
    href: "https://www.inzpireu.com/",
    summary:
      "Built authenticated scraping and data-ingestion pipelines that cleaned large grant datasets into reliable, database-ready structures.",
    tech: ["Python", "Requests", "BeautifulSoup", "Data pipelines"],
  },
];

export const education = [
  {
    title: "Greenhill School",
    activity: 'Basketball · 4 years',
    location: "Dallas, TX",
    sat: { total: 1520, readingWriting: 730, math: 790 },
    apScores: [
      { course: "AP Physics 2", score: 5 },
      { course: "AP United States Government and Politics", score: 5 },
      { course: "AP Computer Science A", score: 5 },
      { course: "AP Calculus BC", score: 5 },
    ],
    apNote: "Remaining AP exams are planned for senior year; scores pending.",
    recognition: [
      "Certificate of Achievement — Outstanding Accomplishment in AP Physics 2",
      "High Honor Roll",
    ],

    label: "Class of 2027",
    image: asset("greenhill.webp"),
    alt: "Greenhill School letter G mark",
    href: "https://www.greenhill.org/",
    text: "Class of 2027 · GPA 4.01 · AP Calculus BC, AP Physics 2, AP Computer Science A, Honors Applied Computer Science, Honors UX Design, Adv. Topics Tutorial - Design + Innovation, AP Physics C, AP Statistics, and Multivariable Calculus (post-AP).",
  },
  {
    title: "Harvard Computer Society AI Bootcamp",
    label: "Machine Learning",
    image: asset("harvardaibootcamp.webp"),
    alt: "Harvard Society for AI Bootcamp website",
    href: "https://drive.google.com/file/d/1lKFoPjhPkbQp4oEjsezRjgZF1Cy68jeQ/view",
    text: "Hands-on work in machine learning, NLP, and computer vision, including PyTorch sentiment and image-classification projects.",
  },
  {
    title: "Harvard CS50P",
    label: "Python",
    image: asset("cs50p.jpg"),
    alt: "Harvard CS50 Python programming course graphic",
    href: "https://drive.google.com/file/d/1g9PXpdSNnX3UI8sUxBW_-2lvxvDlX6FG/view",
    text: "Foundations in Python, data structures, and algorithms—completed with the chess puzzle bot as a final project.",
  },
];

export const honors = [
  {
    title: "HackSMU VII Winner: Best Use of ElevenLabs",
    context: "Regional · Hackathon recognition",
  },
  {
    title: "Kathryn and Ashley H. Priddy Young Scientist Award",
    context: "Regional · Dallas Regional Science & Engineering Fair",
  },
  {
    title: "National Merit Commended Student",
    context: "National recognition",
  },
  { title: "AP Scholar with Honor", context: "National recognition" },
];

export const capabilities = [
  {
    label: "Build",
    items: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Flask"],
  },
  {
    label: "Model",
    items: ["Python", "R", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    label: "Ship",
    items: ["Git", "GitHub", "MySQL", "SQLite", "Raspberry Pi"],
  },
  {
    label: "Design",
    items: ["Figma", "Framer", "UX Design", "Automation", "Java"],
  },
];

export const profileImage = asset("profile-image.jpg");
export const tableOfHopeImage = asset("tableofhope.png");
