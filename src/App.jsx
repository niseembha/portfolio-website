import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";
import chessBotImage from "./assets/chess-bot.png";
import cs50pImage from "./assets/cs50p.jpg";
import datacolorImage from "./assets/datacolor.jpeg";
import diabetesImage from "./assets/diabetes.png";
import greenhillImage from "./assets/greenhill.png";
import grantMateImage from "./assets/grantmate.png";
import harvardAiBootcampImage from "./assets/harvardaibootcamp.png";
import inzpireuImage from "./assets/inzpireu.jpeg";
import medSightImage from "./assets/MedSight.jpg";
import profile from "./assets/profile-image.jpg";
import resumePdf from "./assets/resume.pdf";
import tableOfHopeImage from "./assets/tableofhope.png";
import VariableProximity from "./components/VariableProximity";

const HeroRobot = lazy(() => import("./components/HeroRobot"));
const LiquidEther = lazy(() => import("./components/LiquidEther"));
const TextPressure = lazy(() => import("./components/TextPressure"));

const liquidEtherColors = ["#111111", "#c8462c", "#8a857c"];

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/niseembha",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.09.66-.22.66-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.67.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "Gmail",
    href: "mailto:niseem2008@gmail.com",
    icon: (
      <>
        <path
          d="M3.75 6.5 12 13l8.25-6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7.25h15a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V8a.75.75 0 0 1 .75-.75Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.75 16.75 9.75 12M19.25 16.75 14.25 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/niseem-bhattacharya-b48907363/",
    icon: (
      <path d="M6.94 8.5H3.56V19h3.38V8.5Zm.22-3.25c0 1.02-.77 1.85-1.91 1.85h-.02c-1.09 0-1.85-.83-1.85-1.85 0-1.05.78-1.85 1.89-1.85 1.12 0 1.86.8 1.89 1.85ZM20.5 12.6c0-3.15-1.68-4.61-3.92-4.61-1.81 0-2.62 1-3.07 1.7V8.5H10.1c.05.79 0 10.5 0 10.5h3.4v-5.86c0-.31.02-.62.11-.84.25-.62.81-1.25 1.75-1.25 1.24 0 1.74.94 1.74 2.32V19h3.4v-6.4Z" />
    ),
  },
];

const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "Raspberry Pi",
      "Figma",
      "Framer",
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Flask",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "PyTorch",
      "PyAutoGUI",
    ],
  },
  {
    label: "Databases",
    items: ["MySQL", "SQLite"],
    staticRow: true,
  },
];

const pyAutoGuiIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="16" fill="#f8fafc"/>
    <path d="M10 6.5v15.2l3.9-3.6 2.9 6.4 3.2-1.5-2.9-6.3 5.8-.5L10 6.5Z" fill="#111111"/>
    <circle cx="23.5" cy="9" r="2.5" fill="#c8462c"/>
  </svg>
`)}`;

const javaIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="16" fill="#f8fafc"/>
    <path d="M18.9 7.4c1.7 1.5-1 2.7-.1 4.2.4.7 1.4 1 1.4 2.2 0 1.8-1.8 2.9-3.9 3.3 1.6-.8 2.5-1.6 2.5-2.6 0-.9-.8-1.4-1.4-2.2-1-1.3-.2-3 1.5-4.9Z" fill="#c8462c"/>
    <path d="M13 17.4c0 1.2 2 1.5 3.8 1.5 1.9 0 3.7-.3 3.7-1.3 0-.5-.5-.9-1.2-1.2.3.3.4.5.4.8 0 1-1.6 1.4-3.3 1.4-1.7 0-3.5-.4-3.5-1.5 0-.2 0-.4.1-.6-.1.3 0 .6 0 .9Z" fill="#111111"/>
    <path d="M10.2 20.1c.8 1.5 3.2 2.2 6.5 2.2 3.5 0 6-.9 6.9-2.4-.3 2.7-3.7 4.1-7.2 4.1-3.2 0-5.7-1-6.2-3.9Z" fill="#111111"/>
    <path d="M11.2 19.3h10.1c.2 0 .4.2.4.4 0 .5-1.4 1.6-5.3 1.6s-5.7-1.1-5.7-1.6c0-.2.2-.4.5-.4Z" fill="#c8462c"/>
  </svg>
`)}`;

const visualStudioCodeIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="16" fill="#f8fafc"/>
    <path d="M23.8 5.8a1.5 1.5 0 0 1 2.2 1.35v17.7a1.5 1.5 0 0 1-2.2 1.34l-9.2-4.5-5.1 4.65a1 1 0 0 1-1.66-.74v-4.06l4.56-4.13-4.56-4.13V9.3a1 1 0 0 1 1.66-.74l5.1 4.65 9.2-7.41Z" fill="#111111"/>
    <path d="m14.6 13.21 6.56-4.99v15.56l-6.56-3.18-4.23-3.1 4.23-4.29Z" fill="#c8462c"/>
  </svg>
`)}`;

function getSkillIcon(label) {
  const iconMap = {
    Java: javaIcon,
    Python: "https://cdn.simpleicons.org/python/111111",
    JavaScript: "https://cdn.simpleicons.org/javascript/111111",
    HTML: "https://cdn.simpleicons.org/html5/111111",
    CSS: "https://cdn.simpleicons.org/css/111111",
    Git: "https://cdn.simpleicons.org/git/111111",
    GitHub: "https://cdn.simpleicons.org/github/111111",
    "Visual Studio Code": visualStudioCodeIcon,
    "Raspberry Pi": "https://cdn.simpleicons.org/raspberrypi/111111",
    Figma: "https://cdn.simpleicons.org/figma/111111",
    Framer: "https://cdn.simpleicons.org/framer/111111",
    React: "https://cdn.simpleicons.org/react/111111",
    "Next.js": "https://cdn.simpleicons.org/nextdotjs/111111",
    Flask: "https://cdn.simpleicons.org/flask/111111",
    "scikit-learn": "https://cdn.simpleicons.org/scikitlearn/111111",
    Pandas: "https://cdn.simpleicons.org/pandas/111111",
    NumPy: "https://cdn.simpleicons.org/numpy/111111",
    PyTorch: "https://cdn.simpleicons.org/pytorch/111111",
    PyAutoGUI: pyAutoGuiIcon,
    MySQL: "https://cdn.simpleicons.org/mysql/111111",
    SQLite: "https://cdn.simpleicons.org/sqlite/111111",
  };

  return iconMap[label];
}

function SkillChip({ item }) {
  return (
    <span className="skill-chip">
      <span className="skill-chip-icon">
        <img src={getSkillIcon(item)} alt="" aria-hidden="true" />
      </span>
      <span>{item}</span>
    </span>
  );
}

const featuredProjects = [
  {
    title: "Python Chess Puzzle Auto-Solver Bot",
    category: "Chess Bot",
    imageLabel: "Python Chess Puzzle Auto-Solver Bot project image",
    imageSrc: chessBotImage,
    summary:
      "Built a Python chess bot using Stockfish, OpenCV, and PyAutoGUI to automatically solve on-screen puzzles. Used computer vision to detect board state from live screen captures and convert it into FEN notation, enabling engine-driven move selection and autonomous gameplay.",
    primaryLinkLabel: "Demo Video",
    primaryLinkHref: "https://www.youtube.com/watch?v=jw0oQ7wH5rA",
    secondaryLinkLabel: "Github",
    secondaryLinkHref: "https://github.com/niseembha/chess-puzzle-bot",
  },
  {
    title: "Diabetes Risk Prediction & Progression Modeling",
    category: "Diabetes Research",
    imageLabel: "Diabetes Risk Prediction & Progression Modeling project image",
    imageSrc: diabetesImage,
    summary:
      "Built a diabetes risk prediction model (ROC-AUC ~0.85) using logistic regression on 986 patient records, with a leakage-free validation pipeline. Developed a simulation engine to model weekly progression scenarios, and conducted the research under SMU professor Kasi Periyasamy for the Dallas Regional Science Fair.",
    primaryLinkLabel: "Display Board",
    primaryLinkHref:
      "https://drive.google.com/file/d/1-JsIRE4ojWB0ulnSyJsRCQfOvOFhH838/view?usp=sharing",
    secondaryLinkLabel: "Colab Notebooks",
    secondaryLinkHref:
      "https://docs.google.com/document/d/100_mn5hdXVUQiQkVFQ8cCMYLEsQMgA9KD0sDzxCyBeE/edit?tab=t.0",
  },
  {
    title: "MedSight",
    category: "HackSMU VII Clinical AI",
    imageLabel: "MedSight project image",
    imageSrc: medSightImage,
    summary:
      "Built an AI-powered clinical observation platform at HackSMU VII that turns passive smart-glasses data into structured behavioral telemetry and physician-facing reports. The system captures first-person context, extracts activity, engagement, and distraction signals, compares trends against patient baselines, and summarizes clinically useful follow-up insights.",
    primaryLinkLabel: "Devpost",
    primaryLinkHref: "https://devpost.com/software/medsight-bu2x7l",
  },
];

const allProjects = [
  ...featuredProjects,
  {
    title: "GrantMate",
    category: "AI Grant Platform",
    imageLabel: "Grant Mate project image",
    imageSrc: grantMateImage,
    summary:
      "Started this project during my internship at Datacolor, where I built an AI-powered grant discovery platform that aggregates public and private funding sources into a single searchable workflow for nonprofits. I then continued to develop and expand it, enhancing features like intelligent grant matching and PDF-based analysis to help teams quickly evaluate opportunities without navigating fragmented databases.",
  },
];

const workItems = [
  {
    label: "Software Engineer Intern",
    title: "Datacolor.ai",
    imageLabel: "Datacolor.ai image",
    imageSrc: datacolorImage,
    imageHref: "https://datacolor.ai/",
    description:
      "Built a full-stack AI-powered grant platform integrating federal and private data sources with scalable caching for efficient retrieval. Implemented intelligent matching and PDF analysis to evaluate and summarize grant opportunities for nonprofits.",
  },
  {
    label: "Web Scraping & Data Extraction Intern",
    title: "InzpireU",
    imageLabel: "InzpireU image",
    imageSrc: inzpireuImage,
    imageHref: "https://www.inzpireu.com/",
    description:
      "Built automated web-scraping pipelines using Python, Requests, and BeautifulSoup with authenticated access to collect large-scale grant data. Parsed, cleaned, and structured datasets into database-ready formats while implementing scalable ingestion workflows with duplicate detection and consistency checks.",
  },
  {
    label: "Education",
    title: "Greenhill School",
    imageLabel: "Greenhill School image",
    imageSrc: greenhillImage,
    imageHref: "https://www.greenhill.org/",
    description: (
      <>
        Greenhill School — Addison, TX
        <br />
        Junior (Class of 2027) · GPA: 4.01
        <br />
        Relevant Coursework: AP Calculus BC, AP Physics 2, AP Computer Science
        A, Honors Applied Computer Science, Honors UX Design
      </>
    ),
  },
  {
    label: "Education",
    title: "Harvard CS50's Introduction to Programming with Python",
    imageLabel: "Harvard CS50P image",
    imageSrc: cs50pImage,
    imageHref:
      "https://drive.google.com/file/d/1g9PXpdSNnX3UI8sUxBW_-2lvxvDlX6FG/view",
    description:
      "Completed Harvard's CS50's Introduction to Programming with Python, mastering foundational programming concepts, data structures, and algorithms. Built a python chess bot as my final project.",
  },
  {
    label: "Education",
    title: "Harvard AI Bootcamp",
    imageLabel: "Harvard AI Bootcamp image",
    imageSrc: harvardAiBootcampImage,
    imageHref:
      "https://drive.google.com/file/d/1lKFoPjhPkbQp4oEjsezRjgZF1Cy68jeQ/view",
    description:
      "Completed Harvard's AI Bootcamp, gaining hands-on experience with machine learning algorithms, natural language processing, and computer vision. Built projects including a sentiment analysis tool and an image classifier using PyTorch.",
  },
  {
    label: "Co-Founder",
    title: "Table of Hope Dallas",
    imageLabel: "Table of Hope Dallas image",
    imageSrc: tableOfHopeImage,
    imageHref: "https://tableofhopedallas.org/",
    description:
      "Co-founded a nonprofit dedicated to cooking and delivering meals to underserved communities, helping prepare and distribute over 1,000 meals with a volunteer team. Designed and launched the organization’s website using Framer and led social media efforts to grow engagement. Raised over $3,000 to support operations and expand outreach.",
  },
];

const navItems = [
  { key: "home", label: "Home", href: "#/" },
  { key: "work", label: "Work", href: "#/section/work" },
  { key: "projects", label: "Projects", href: "#/section/projects" },
  { key: "contact", label: "Contact", href: "#/contact" },
];

function getRouteFromHash() {
  const hash = window.location.hash || "#/";

  if (hash === "#/section/work") {
    return { page: "home", active: "work", targetId: "work" };
  }

  if (hash === "#/section/projects") {
    return { page: "home", active: "projects", targetId: "projects" };
  }

  if (hash === "#/work") {
    return { page: "work", active: "work", targetId: null };
  }

  if (hash === "#/projects") {
    return { page: "projects", active: "projects", targetId: null };
  }

  if (hash === "#/contact") {
    return { page: "home", active: "contact", targetId: "contact" };
  }

  return { page: "home", active: "home", targetId: null };
}

function SectionHeading({ eyebrow, title, note }) {
  const headingRef = useRef(null);

  return (
    <div className="section-heading section-heading-row">
      <div ref={headingRef}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          <VariableProximity
            label={title}
            containerRef={headingRef}
            radius={130}
            falloff="gaussian"
            fromFontVariationSettings="'wght' 700, 'wdth' 100"
            toFontVariationSettings="'wght' 800, 'wdth' 118"
          />
        </h2>
      </div>
      <div className="section-heading-meta">
        {note ? <p className="section-note">{note}</p> : null}
      </div>
    </div>
  );
}

function ImageFrame({ label, detail, src, href, alt, className = "" }) {
  const content = src ? (
    <img src={src} alt={alt ?? label} className="card-image" />
  ) : (
    <div className="image-placeholder-inner">
      <span>{label}</span>
      {detail ? <small>{detail}</small> : null}
    </div>
  );

  if (href) {
    return (
      <a
        className={`image-placeholder image-link ${className}`.trim()}
        aria-label={label}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`image-placeholder ${className}`.trim()} aria-label={label}>
      {content}
    </div>
  );
}

function ProjectCard({ project }) {
  const titleRef = useRef(null);
  const projectLinks = [
    {
      label: project.primaryLinkLabel,
      href: project.primaryLinkHref,
    },
    {
      label: project.secondaryLinkLabel,
      href: project.secondaryLinkHref,
    },
  ].filter((link) => link.label && link.href);

  return (
    <article className="project-card card">
      <p className="project-category">{project.category}</p>
      <ImageFrame
        label={project.imageLabel}
        alt={project.title}
        src={project.imageSrc}
        detail="Replace with screenshot, mockup, or cover image"
      />
      <h3 ref={titleRef}>
        <VariableProximity
          label={project.title}
          containerRef={titleRef}
          radius={92}
          falloff="linear"
          fromFontVariationSettings="'wght' 600, 'wdth' 100"
          toFontVariationSettings="'wght' 760, 'wdth' 112"
        />
      </h3>
      <p>{project.summary}</p>
      {projectLinks.length ? (
        <div className="project-footer">
          {projectLinks.map((link) => (
            <a
              key={`${project.title}-${link.label}`}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function WorkCard({ item }) {
  const titleRef = useRef(null);

  return (
    <article className="work-highlight card">
      <p className="card-label">{item.label}</p>
      <ImageFrame
        label={item.imageLabel}
        alt={item.title}
        src={item.imageSrc}
        href={item.imageHref}
        className={item.imageHref ? "work-image-link" : ""}
        detail="Replace with team photo, logo, or role snapshot"
      />
      <h3 ref={titleRef}>
        <VariableProximity
          label={item.title}
          containerRef={titleRef}
          radius={92}
          falloff="linear"
          fromFontVariationSettings="'wght' 600, 'wdth' 100"
          toFontVariationSettings="'wght' 760, 'wdth' 112"
        />
      </h3>
      <p>{item.description}</p>
    </article>
  );
}

function SocialIcon({ label, href, icon }) {
  return (
    <a
      className="contact-icon-link"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {icon}
      </svg>
    </a>
  );
}

function SkillGroup({ group }) {
  return (
    <div className="skill-group">
      <span className="skill-group-label">{group.label}</span>
      <div className="skill-static-row">
        {group.items.map((item) => (
          <SkillChip key={`${group.label}-${item}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero section">
        <div className="hero-ether-field" aria-hidden="true">
          <Suspense fallback={null}>
            <LiquidEther
              colors={liquidEtherColors}
              mouseForce={18}
              resolution={0.6}
              autoDemo
              autoSpeed={0.42}
              autoIntensity={1.6}
            />
          </Suspense>
        </div>

        <div className="hero-media hero-reveal hero-reveal-1">
          <div className="hero-image-frame" aria-label="Profile image">
            <div className="hero-image-placeholder">
              <div className="hero-image-placeholder-inner">
                <img src={profile} alt="Niseem Bhattacharya" />
              </div>
            </div>
          </div>
          <div className="hero-media-note card hero-reveal hero-reveal-4">
            <p className="card-label">Based In</p>
            <p>Dallas, TX</p>
          </div>
          <div className="hero-media-note hero-fun card hero-reveal hero-reveal-5">
            <p className="card-label">About Me</p>
            <h3>I build technology that solves real problems.</h3>
            <p>
              From creating AI tools to working on nonprofit initiatives like
              Table of Hope, I enjoy exploring how technology can solve real
              problems and create meaningful impact. I&apos;m always learning,
              building, and looking for new challenges to tackle.
            </p>
            <p>
              In my free time, I like watching movies and shows, playing video
              games, eating with friends, and playing basketball and golf.
            </p>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-intro-layout">
            <div className="hero-main-content">
              <p className="eyebrow hero-reveal hero-reveal-1">Portfolio</p>
              <h1 className="hero-reveal hero-reveal-2">
                Hi, I&apos;m <span className="hero-accent">Niseem</span>.
              </h1>
              <p className="hero-text hero-reveal hero-reveal-3">
                I build AI tools, explore machine learning, and create
                technology for real-world impact.
              </p>
              <div className="hero-pressure" aria-label="AI and impact">
                <Suspense fallback={null}>
                  <TextPressure
                    text="AI + IMPACT"
                    textColor="#111111"
                    strokeColor="#c8462c"
                    minFontSize={34}
                    stroke
                  />
                </Suspense>
              </div>
              <div className="hero-actions hero-reveal hero-reveal-4">
                <a className="btn btn--primary" href="#/section/projects">
                  View Projects
                </a>
                <a className="btn btn--ghost" href="#/contact">
                  Get In Touch
                </a>
              </div>
            </div>
            <Suspense fallback={null}>
              <HeroRobot />
            </Suspense>
          </div>

          <div className="skill-strip card hero-reveal hero-reveal-4">
            <p className="card-label">Skills Stack</p>
            <div className="skill-strip-grid">
              {skillGroups.map((group) => (
                <SkillGroup key={group.label} group={group} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="Work"
          title="Places where I’ve worked and learned."
          note="These experiences have helped me develop technical skills, collaborate with others, and apply what I’m learning to real-world problems."
        />

        <div className="section-link-row">
          <a className="more-link" href="#/work">
            More work
          </a>
        </div>

        <div className="work-grid">
          {workItems.slice(0, 3).map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <SectionHeading
          eyebrow="Projects"
          title="Some of the things I’ve been building."
          note="Projects at the intersection of AI, software, research, and curiosity."
        />

        <div className="section-link-row">
          <a className="more-link" href="#/projects">
            More projects
          </a>
        </div>

        <div className="project-grid">
          {allProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* <section className="section spotlight">
        <div>
          <p className="eyebrow">Proof</p>
          <h2>
            Reserve this section for a testimonial, result, or short credibility
            statement.
          </h2>
        </div>
        <blockquote className="quote card">
          “Add a client quote here, or replace this with a concise statement
          about outcomes, trust, or experience.”
        </blockquote>
      </section> */}

      <section className="section contact-section" id="contact">
        <SectionHeading
          eyebrow="Contact"
          title="Contact & Resume"
          note={null}
        />

        <div className="contact-layout">
          <div className="resume-card card">
            <div className="resume-header">
              <h3>Resume</h3>

              <a
                className="btn btn--ghost"
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
              >
                Open PDF
              </a>
            </div>

            <div className="resume-preview-frame">
              <iframe
                src={resumePdf}
                title="Resume PDF preview"
                className="resume-preview"
              />
            </div>
          </div>

          <div className="contact-card card">
            <div className="contact-actions contact-icon-row">
              {contactLinks.map((link) => (
                <SocialIcon key={link.label} {...link} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WorkPage() {
  return (
    <section className="section page-section">
      <SectionHeading
        eyebrow="Work"
        title="All Work Experiences"
        note="This section highlights what I build, how I approach problems, and the skills I bring to my work. It outlines my core capabilities and areas of focus beyond the featured projects on the homepage."
      />

      <div className="archive-actions">
        <a className="btn btn--ghost" href="#/">
          Back to main page
        </a>
      </div>

      <div className="work-grid">
        {workItems.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
      </div>

      {/* <div className="page-subsection process-section">
        <div className="section-heading">
          <p className="eyebrow">Process</p>
          <h2>
            A simple way to explain how you work from first conversation to
            final delivery.
          </h2>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-card card" key={step.label}>
              <span className="process-label">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div> */}
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="section page-section">
      <SectionHeading
        eyebrow="Projects"
        title="All Projects"
        note="A fuller archive of the tools, research systems, and experiments I’ve built across AI, healthcare, automation, and civic technology."
      />

      <div className="archive-actions">
        <a className="btn btn--ghost" href="#/">
          Back to main page
        </a>
      </div>

      <div className="project-grid project-grid-expanded">
        {allProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route.targetId) {
      const element = document.getElementById(route.targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#/">
          Niseem Bhattacharya
        </a>
        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.key}
              className={
                route.active === item.key
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {route.page === "home" ? <HomePage /> : null}
        {route.page === "work" ? <WorkPage /> : null}
        {route.page === "projects" ? <ProjectsPage /> : null}
      </main>
    </div>
  );
}

export default App;
