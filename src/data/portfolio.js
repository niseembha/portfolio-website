const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`

export const links = {
  email: 'mailto:niseem2008@gmail.com',
  github: 'https://github.com/niseembha',
  linkedin: 'https://www.linkedin.com/in/niseem-bhattacharya-b48907363/',
  resume: asset('resume.pdf'),
}

export const projects = [
  {
    id: 'medsight',
    index: '01',
    title: 'MedSight',
    kicker: 'Clinical AI / HackSMU VII',
    date: 'April 2026',
    image: asset('MedSight.jpg'),
    alt: 'MedSight presentation graphic featuring a pair of smart glasses',
    tone: 'blue',
    featured: true,
    award: 'Best Use of ElevenLabs',
    summary:
      'A clinical observation platform that translates passive smart-glasses data into structured behavioral telemetry and physician-facing reports.',
    details: [
      'Built computer-vision and LLM pipelines to quantify activity, engagement, and distraction.',
      'Designed multi-layer analytics for trend detection and longitudinal monitoring.',
      'Won Best Use of ElevenLabs at HackSMU VII among competing student teams.',
    ],
    tags: ['Computer Vision', 'LLMs', 'Clinical Analytics'],
    links: [{ label: 'View on Devpost', href: 'https://devpost.com/software/medsight-bu2x7l' }],
  },
  {
    id: 'diabetes',
    index: '02',
    title: 'Diabetes Risk & Progression',
    kicker: 'Independent Research / Healthcare ML',
    date: 'May 2025 — Present',
    image: asset('diabetes.webp'),
    alt: 'Engineering methodology board for diabetes risk and progression modeling',
    tone: 'violet',
    featured: true,
    metric: 'ROC–AUC ≈ 0.85',
    summary:
      'A leakage-corrected machine-learning pipeline and simulation engine for modeling diabetes risk and weekly progression scenarios.',
    details: [
      'Trained logistic regression on 986 patient records with scaling, imputation, and stratified validation.',
      'Built a weekly progression engine for deterioration and intervention scenarios.',
      'Conducted under SMU professor Kasi Periyasamy for the Dallas Regional Science Fair.',
    ],
    tags: ['scikit-learn', 'Python', 'Research'],
    links: [
      {
        label: 'View display board',
        href: 'https://drive.google.com/file/d/1-JsIRE4ojWB0ulnSyJsRCQfOvOFhH838/view?usp=sharing',
      },
      {
        label: 'Open notebooks',
        href: 'https://docs.google.com/document/d/100_mn5hdXVUQiQkVFQ8cCMYLEsQMgA9KD0sDzxCyBeE/edit?tab=t.0',
      },
    ],
  },
  {
    id: 'grantmate',
    index: '04',
    title: 'GrantMate',
    kicker: 'AI Grant Platform / Full Stack',
    date: '2025',
    image: asset('grantmate.webp'),
    alt: 'GrantMate logo with an AI assistant holding a document',
    tone: 'teal',
    featured: false,
    summary:
      'A unified grant-discovery workflow that helps nonprofits search fragmented funding sources, evaluate fit, and analyze application PDFs.',
    details: [
      'Started during a Datacolor.ai internship and continued as an expanded independent build.',
      'Aggregated federal and private funding sources with MySQL-backed caching and retrieval.',
      'Added intelligent opportunity matching and AI-driven PDF extraction and summarization.',
    ],
    tags: ['React', 'Flask', 'MySQL', 'OpenAI API'],
    links: [],
  },
  {
    id: 'chess',
    index: '03',
    title: 'Chess Puzzle Auto-Solver',
    kicker: 'Computer Vision / Automation',
    date: 'November 2025',
    image: asset('chess-bot.webp'),
    alt: 'A chess puzzle interface being read by the auto-solver bot',
    tone: 'orange',
    featured: true,
    summary:
      'A Python bot that sees an on-screen chess position, translates it to FEN, asks Stockfish for a move, and executes it autonomously.',
    details: [
      'Detected live board state and piece positions from screen captures with OpenCV.',
      'Translated visual board data into FEN notation for engine-selected moves.',
      'Integrated Stockfish and PyAutoGUI for repeated autonomous puzzle execution.',
    ],
    tags: ['OpenCV', 'Stockfish', 'PyAutoGUI'],
    links: [
      { label: 'View source', href: 'https://github.com/niseembha/chess-puzzle-bot' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=jw0oQ7wH5rA' },
    ],
  },
]

export const experience = [
  {
    id: 'stars',
    company: 'UT Southwestern Medical Center',
    role: 'Computational Biology & AI Protein Design Intern',
    program: 'STARS Summer Research Program',
    lab: 'Pool Lab / Dr. Allan-Hermann Pool',
    place: 'Dallas, TX',
    date: 'June — July 2026',
    image: asset('STARS/utsw-logo.gif'),
    alt: 'UT Southwestern Medical Center seal',
    summary:
      'Integrated mouse and human transcriptomic data to identify candidate pain-associated neuronal targets, then built computational protein-design workflows that produced 13 KCNK13 designs and 142 GPR139 docking candidates.',
    tech: ['Computational Biology', 'Protein Design', 'Python', 'R'],
    detail: {
      eyebrow: 'STARS Summer Research Program · Pool Lab',
      title: 'Computational design for more targeted pain research.',
      overview:
        'Spinal projection neurons carry sensory signals from the spinal cord to the brain, but their human molecular identities are less resolved than their mouse counterparts. This project connected cross-species single-cell analysis with AI-assisted protein design to investigate more selective ways of reaching candidate pain-associated neurons.',
      hero: {
        image: asset('STARS/smiling-next-to-poster.png'),
        alt: 'Niseem Bhattacharya standing beside his STARS research poster at UT Southwestern',
      },
      sections: [
        {
          label: 'Finding targets',
          text: 'Integrated a molecular atlas of mouse spinal projection neurons with human spinal-cord single-cell RNA-seq data. Cross-species label transfer identified candidate human populations corresponding to characterized mouse SPNs, and cell-surface expression analysis prioritized KCNK13 and GPR139 as potential molecular targets.',
        },
        {
          label: 'KCNK13 · BindCraft',
          text: 'Designed candidate binders against an extracellular region of KCNK13, using residue D69 as an important design hotspot. BindCraft generated 13 accepted computational designs across four distinct protein backbones.',
        },
        {
          label: 'GPR139 · Multistage pipeline',
          text: 'Built a complementary workflow using MetaGen, RIFDock, ProteinMPNN, and AlphaFold to generate scaffolds, dock them against GPR139, design sequences, and evaluate predicted structures. RIFDock identified 142 strong docking candidates.',
        },
      ],
      results: [
        { value: '13', label: 'Accepted KCNK13 computational designs' },
        { value: '04', label: 'Distinct KCNK13 protein backbones' },
        { value: '142', label: 'Strong GPR139 docking candidates' },
      ],
      tools: ['Python', 'R', 'Linux', 'BindCraft', 'MetaGen', 'RIFDock', 'ProteinMPNN', 'AlphaFold'],
      presentation: {
        image: asset('STARS/presenting-poster.png'),
        alt: 'Niseem Bhattacharya explaining his computational pain research during the STARS poster session',
      },
      poster: {
        image: asset('STARS/poster-actual.jpg'),
        alt: 'Research poster summarizing cross-species spinal projection neuron analysis and computational binder design for KCNK13 and GPR139',
      },
    },
  },
  {
    id: 'datacolor',
    company: 'Datacolor.ai',
    role: 'Software Engineering Intern',
    place: 'McKinney, TX',
    date: 'May — Aug 2025',
    image: asset('datacolor.jpeg'),
    alt: 'Datacolor.ai logo',
    href: 'https://datacolor.ai/',
    summary:
      'Built the full-stack foundations of an AI grant platform: multi-source search, MySQL caching, compatibility scoring, and PDF analysis.',
    tech: ['React', 'Flask', 'MySQL', 'OpenAI API'],
  },
  {
    id: 'inzpireu',
    company: 'InzpireU',
    role: 'Web Scraping & Data Extraction Intern',
    place: 'Remote',
    date: 'Jun — Aug 2025',
    image: asset('inzpireu.jpeg'),
    alt: 'InzpireU star logo',
    href: 'https://www.inzpireu.com/',
    summary:
      'Built authenticated scraping and data-ingestion pipelines that cleaned large grant datasets into reliable, database-ready structures.',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'Data pipelines'],
  },
]

export const education = [
  {
    title: 'Greenhill School',
    label: 'Class of 2027',
    image: asset('greenhill.webp'),
    alt: 'Greenhill School letter G mark',
    href: 'https://www.greenhill.org/',
    text: 'Class of 2027 · GPA 4.01 · AP Calculus BC, AP Physics 2, AP Computer Science A, Applied Computer Science, and UX Design.',
  },
  {
    title: 'Harvard Computer Society AI Bootcamp',
    label: 'Machine Learning',
    image: asset('harvardaibootcamp.webp'),
    alt: 'Harvard Society for AI Bootcamp website',
    href: 'https://drive.google.com/file/d/1lKFoPjhPkbQp4oEjsezRjgZF1Cy68jeQ/view',
    text: 'Hands-on work in machine learning, NLP, and computer vision, including PyTorch sentiment and image-classification projects.',
  },
  {
    title: 'Harvard CS50P',
    label: 'Python',
    image: asset('cs50p.jpg'),
    alt: 'Harvard CS50 Python programming course graphic',
    href: 'https://drive.google.com/file/d/1g9PXpdSNnX3UI8sUxBW_-2lvxvDlX6FG/view',
    text: 'Foundations in Python, data structures, and algorithms—completed with the chess puzzle bot as a final project.',
  },
]

export const capabilities = [
  {
    label: 'Build',
    items: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Flask'],
  },
  {
    label: 'Model',
    items: ['Python', 'R', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    label: 'Ship',
    items: ['Git', 'GitHub', 'MySQL', 'SQLite', 'Raspberry Pi'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Framer', 'UX Design', 'Automation', 'Java'],
  },
]

export const profileImage = asset('profile-image.jpg')
export const tableOfHopeImage = asset('tableofhope.png')
