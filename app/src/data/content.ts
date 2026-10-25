export const profile = {
  name: "Vamshi Krishna Korutla",
  short: "Vamshi",
  email: "korutla.vk@gmail.com",
  linkedin: "https://www.linkedin.com/in/vamshi-korutla",
  github: "https://github.com/Vamshi782",
  instagram: "https://www.instagram.com/vamshi.indianabroad/",
  collabEmail: "vamshi.indianabroad@gmail.com",
  site: "https://vamshi-ai.me",
  resume: "/Vamshi_Korutla_Resume.pdf",
  tagline:
    "Analyst by training, founder by instinct. I turn messy operational data into decisions leaders trust, and I ship AI products on the side.",
};

export const stats = [
  { value: "5+", label: "years in healthcare, biotech & consulting" },
  { value: "35%", label: "reporting accuracy lift at Solid Biosciences" },
  { value: "~45K", label: "people in the career community I run" },
  { value: "4", label: "AI products shipped as a founder" },
];

export const companies = [
  "Deloitte",
  "Cardinal Health",
  "Solid Biosciences",
  "Feasto Solutions",
  "Northeastern University",
  "Roux Institute",
  "KOGOS",
];

export type LensKey = "data" | "product" | "ops" | "cs" | "bd";

export const lenses: Record<
  LensKey,
  { label: string; headline: string; pitch: string; proof: string[]; skills: string[]; projects: string[] }
> = {
  data: {
    label: "Data Analyst",
    headline: "Data & BI analyst who makes numbers trustworthy.",
    pitch:
      "SQL on Snowflake and Azure, Power BI and Tableau dashboards executives actually use, and validation checks that catch bad data before it reaches a leader.",
    proof: [
      "35% more accurate, 25% faster reporting at Solid Biosciences",
      "30% better executive reporting access at Cardinal Health",
      "25% fewer data inconsistencies across Deloitte healthcare datasets",
    ],
    skills: ["SQL", "Snowflake", "Power BI", "Tableau", "Excel", "Azure", "Python (working)", "Streamlit"],
    projects: ["insightforge", "energy", "lakehouse"],
  },
  product: {
    label: "Product",
    headline: "Product-minded analyst who has shipped his own apps.",
    pitch:
      "I write the user story, the acceptance criteria and the UAT plan, then track the KPI after launch. As a founder I've taken four products from idea to live users.",
    proof: [
      "Shipped InsightForge AI, InsightApply AI, BubbleUp and PenExecutive end to end",
      "Requirements → UAT → release ownership at Cardinal Health and Solid Biosciences",
      "Daily Jira/Confluence delivery with engineering teams at Deloitte",
    ],
    skills: ["User stories", "Acceptance criteria", "UAT", "KPI design", "Jira", "Confluence", "Prototyping", "GenAI"],
    projects: ["insightapply", "bubbleup", "insightforge"],
  },
  ops: {
    label: "Strategy & Ops",
    headline: "Operator who turns process pain into measurable wins.",
    pitch:
      "Business cases, ROI, root-cause analysis and KPI design. I find where time and money leak in a workflow and fix it with data and automation.",
    proof: [
      "30% more efficient reporting through standardized SQL validation at Deloitte",
      "Business cases and ROI analysis for tech-enabled process changes at Cardinal Health",
      "20% better compliance readiness across healthcare reporting workflows",
    ],
    skills: ["Business cases", "ROI analysis", "Process mapping", "Root-cause analysis", "KPIs", "Exec presentations", "Automation"],
    projects: ["energy", "governance", "insightforge"],
  },
  cs: {
    label: "Customer Success",
    headline: "Trusted translator between customers, data and product.",
    pitch:
      "Four years at Deloitte partnering with business teams, plus a career community of ~45K people I support every week. I listen, find the real problem, and follow through.",
    proof: [
      "Runs KOGOS, a career community of ~45K job seekers, with 8,000+ LinkedIn connections",
      "Founded the Namaste Cultural Community at Northeastern's Roux Institute",
      "Turned stakeholder pain points into requirements and fixes at Deloitte and Cardinal Health",
    ],
    skills: ["Onboarding", "Stakeholder management", "Adoption metrics", "Training", "Escalation handling", "Community building"],
    projects: ["kogos", "insightapply", "bubbleup"],
  },
  bd: {
    label: "Sales / BD",
    headline: "Founder who knows how to build an audience and a pipeline.",
    pitch:
      "I grew KOGOS into a ~45K career community, launched products to real users, and I can speak to both the business buyer and the technical team.",
    proof: [
      "Built a ~45K-person career community from zero as founder of KOGOS, plus 8,000+ LinkedIn connections and growing",
      "Pitched and launched PenExecutive, an executive ghost-writing studio",
      "Healthcare and life-sciences domain depth from Deloitte, Cardinal Health and Solid",
    ],
    skills: ["Audience building", "Positioning", "Discovery", "Business cases", "Partnerships", "Presenting"],
    projects: ["kogos", "penexec", "insightforge"],
  },
};

export type Project = {
  id: string;
  name: string;
  kind: string;
  status: "Live" | "Private beta" | "In development" | "Case study" | "Open source";
  blurb: string;
  overview: string[];
  stack: string[];
  log: string[];
  link?: string;
  repo?: string;
  accent: "cyan" | "indigo" | "emerald" | "amber" | "pink";
  code?: { lang: "sql" | "tsx" | "python"; src: string };
};

export const projects: Project[] = [
  {
    id: "insightforge",
    name: "InsightForge AI",
    kind: "Founder · Analytics product",
    status: "Live",
    blurb: "Drop in a CSV or Excel file and get instant dashboards plus plain-English answers.",
    overview: [
      "Built for business users who have data but no analyst: upload a spreadsheet and get a working dashboard in seconds.",
      "Ask questions in plain English (\"which region dropped last quarter?\") and get an answer with the chart that backs it up.",
      "The goal: give a small-business owner the first hour of an analyst's work for free.",
    ],
    stack: ["Next.js", "TypeScript", "Google Gemini", "Recharts", "Tailwind", "Vercel"],
    log: [
      "init  · spreadsheet upload + parsing (CSV, Excel)",
      "feat  · instant auto-generated dashboards",
      "feat  · natural-language Q&A over uploaded data",
      "ship  · deployed to Vercel, public demo live",
    ],
    link: "https://insightforge-ai-delta.vercel.app",
    repo: "https://github.com/Vamshi782/insightforge-ai",
    accent: "cyan",
    code: {
      lang: "sql",
      src: `-- the kind of check every dataset passes before it hits a chart
SELECT column_name,
       COUNT(*)                                   AS rows_total,
       SUM(CASE WHEN value IS NULL THEN 1 END)    AS nulls,
       ROUND(100.0 * SUM(CASE WHEN value IS NULL THEN 1 END)
             / COUNT(*), 2)                       AS null_pct
FROM   staged_upload
GROUP  BY column_name
HAVING null_pct > 5;   -- flag before we visualize`,
    },
  },
  {
    id: "insightapply",
    name: "InsightApply AI",
    kind: "Founder · AI copilot",
    status: "Live",
    blurb: "An AI job-application copilot that tailors a resume and answers to each job description.",
    overview: [
      "Paste a job description and the app maps it to your real experience, highlights the gaps honestly and drafts tailored answers.",
      "Built after watching thousands of people in my career community struggle with the same applications.",
      "Human-in-the-loop by design: the user reviews every line before it goes anywhere.",
    ],
    stack: ["Next.js", "TypeScript", "Claude API", "Prompt engineering", "Vercel"],
    log: [
      "init  · JD parser + requirement extraction",
      "feat  · experience-to-requirement matching with gap notes",
      "feat  · tailored answers with a review step",
      "ship  · live on Vercel",
    ],
    link: "https://insightapply-ai.vercel.app",
    accent: "indigo",
  },
  {
    id: "bubbleup",
    name: "BubbleUp",
    kind: "Founder · EdTech app",
    status: "Private beta",
    blurb: "A phone-first prep app for India's NEET medical entrance: daily practice, full mocks and a coach view.",
    overview: [
      "2,880 original practice questions across 80 chapters in 4 difficulty levels, plus 1,600 swipe-style revision cards.",
      "Timed mock tests and an OMR-sheet scorer that mirrors the real exam, so students practice the format, not just the content.",
      "A coach dashboard shows where each student is weak, so a mentor knows what to teach next.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Content validation scripts"],
    log: [
      "content · 2,880 MCQs written and tagged by chapter and level",
      "feat    · swipe cards + spaced revision",
      "feat    · mock tests with OMR scorer",
      "feat    · coach dashboard with weak-topic heatmap",
      "beta    · private beta, in daily use",
    ],
    accent: "emerald",
  },
  {
    id: "energy",
    name: "Electricity Optimizer",
    kind: "Founder · Energy analytics",
    status: "In development",
    blurb: "Home and small-business energy analytics: see where the kWh go and when to shift usage.",
    overview: [
      "Reads smart-meter or utility-bill data and breaks consumption down by hour, day and season.",
      "Flags peak-hour waste and suggests time-of-use shifts to cut the bill without cutting comfort.",
      "Being built now; the goal is a simple weekly 'what to change' report, not another dashboard nobody opens.",
    ],
    stack: ["Python", "SQL", "Time-series analysis", "Next.js", "Recharts"],
    log: [
      "research · utility time-of-use tariffs and meter export formats",
      "build    · consumption parser + hourly load profile",
      "build    · peak-hour waste detection (in progress)",
      "next     · weekly recommendations report",
    ],
    accent: "amber",
    code: {
      lang: "python",
      src: `# hourly load profile -> where is the peak-hour waste?
profile = (usage.set_index("ts")
                .resample("1h")["kwh"].sum()
                .groupby(lambda t: t.hour).mean())

peak = profile.loc[16:21]          # typical 4pm-9pm peak window
shiftable = peak - profile.median()
print(f"Shiftable load: {shiftable.clip(lower=0).sum():.1f} kWh/day")`,
    },
  },
  {
    id: "kogos",
    name: "KOGOS",
    kind: "Founder · Career community",
    status: "Live",
    blurb: "A career and study-abroad guidance brand with a community of ~45K job seekers.",
    overview: [
      "Started KOGOS to give students and early-career professionals the honest guidance I wished I had when moving to the US.",
      "Grew it into a career community of roughly 45,000 people who share openings, interview prep and job-search wins.",
      "It's also my product lab: InsightApply AI came straight out of questions this community asked every day.",
    ],
    stack: ["Community building", "Content", "Partnerships", "Web (kogos.co)"],
    log: [
      "launch · kogos.co guidance site",
      "grow   · community to ~45K members",
      "build  · tools for members (InsightApply AI)",
    ],
    link: "https://kogos.co",
    accent: "pink",
  },
  {
    id: "penexec",
    name: "PenExecutive",
    kind: "Founder · Services brand",
    status: "Live",
    blurb: "An executive ghost-writing studio: thought-leadership posts and articles for leaders.",
    overview: [
      "Positioned for busy executives who need a consistent voice on LinkedIn and in industry publications.",
      "I designed and built the site, the offer and the intake flow.",
    ],
    stack: ["Next.js", "Tailwind", "Brand & positioning", "Vercel"],
    log: ["design · brand + offer", "ship   · site live on Vercel"],
    link: "https://pro-executive.vercel.app",
    accent: "indigo",
  },
  {
    id: "governance",
    name: "Responsible AI Governance Framework",
    kind: "Independent · AI governance",
    status: "Case study",
    blurb: "An end-to-end governance and safety-evaluation blueprint for Generative AI use cases.",
    overview: [
      "Covers intake, use-case inventory, risk tiering, human approval gates, change control, incident escalation and audit evidence.",
      "Includes an evaluation scorecard for quality, hallucination rate, harmful output, privacy leakage, bias, robustness and drift, with go/no-go thresholds.",
      "Mapped to NIST AI RMF and ISO/IEC 42001.",
    ],
    stack: ["NIST AI RMF", "ISO/IEC 42001", "EU AI Act", "Risk tiering", "Evaluation design"],
    log: [
      "map   · controls to NIST AI RMF functions (Govern, Map, Measure, Manage)",
      "build · risk-tier intake + approval gates",
      "build · evaluation scorecard with go/no-go thresholds",
    ],
    accent: "emerald",
  },
  {
    id: "lakehouse",
    name: "Databricks Lakehouse Pipeline",
    kind: "Open source · Data engineering",
    status: "Open source",
    blurb: "Medallion-architecture pipeline (bronze → silver → gold) delivering BI-ready datasets.",
    overview: [
      "End-to-end analytics pipeline on Databricks with declarative pipelines and Unity Catalog governance.",
      "Gold tables are shaped for BI tools so analysts query clean, documented data.",
    ],
    stack: ["Databricks", "Spark SQL", "Delta Lake", "Unity Catalog", "Medallion architecture"],
    log: ["bronze · raw ingest", "silver · cleaned + conformed", "gold   · BI-ready marts"],
    repo: "https://github.com/Vamshi782/databricks-lakehouse-analytics-pipeline",
    accent: "cyan",
  },
];

export const moreBuilds = [
  { name: "Diabetes prediction (ML)", note: "Random Forest classifier, ~83% accuracy", href: "https://github.com/Vamshi782/diabetes-prediction-ml-project" },
  { name: "School data analytics (R)", note: "Exploratory analysis of school outcomes", href: "https://github.com/Vamshi782/School-Data-Analytics" },
  { name: "Meridian lending dashboard", note: "Interactive lending-portfolio dashboard", href: "https://astounding-torrone-900f4f.netlify.app/" },
];

export const experience = [
  {
    company: "Feasto Solutions LLC",
    role: "AI Business Analyst Intern",
    dates: "Sep 2026 – Present",
    points: [
      "Translate AI-enabled business processes into BRDs, process maps, data requirements and human-review points.",
      "Document data-quality dependencies, ownership, controls and monitoring needs so leaders can evaluate AI opportunities with evidence.",
    ],
    tags: ["AI use cases", "BRDs", "Governance"],
  },
  {
    company: "Solid Biosciences",
    role: "Business Analyst",
    dates: "Jul 2025 – Jan 2026",
    points: [
      "Built Power BI and SQL validation/reporting workflows: reporting accuracy up 35%, turnaround time down 25%.",
      "Data SME in a compliance-driven biotech: business logic, acceptance criteria and UAT evidence for traceable workflows.",
      "Applied Generative AI to requirements, meeting summaries and reporting automation with human review.",
    ],
    tags: ["+35% accuracy", "−25% turnaround", "Biotech"],
  },
  {
    company: "Cardinal Health",
    role: "Business Intelligence Analyst",
    dates: "Jan 2025 – Jul 2025",
    points: [
      "SQL and Power BI reporting on Snowflake and Azure: executive reporting access up 30%, inconsistencies down 25%.",
      "Business cases and ROI analysis for technology-enabled process improvements; Copilot for documentation automation.",
      "Gap analysis, traceability, UAT and defect tracking from requirement to deployment.",
    ],
    tags: ["+30% access", "Snowflake", "Healthcare"],
  },
  {
    company: "Deloitte",
    role: "Operational Analyst – Healthcare",
    dates: "May 2020 – Jul 2024",
    points: [
      "Standardized SQL validation and Power BI reporting: 30% more efficient reporting, 25% fewer data inconsistencies.",
      "Root-cause analysis, requirements, Agile delivery and UAT with business and technology teams in Jira/Confluence.",
      "Governance artifacts and data dictionaries that improved compliance readiness by 20%.",
    ],
    tags: ["+30% efficiency", "4 years", "Consulting"],
  },
];

export const journey = [
  { year: "2020", title: "Deloitte, healthcare practice", text: "Four years learning how big organizations really run, and how often their data disagrees with itself." },
  { year: "2024", title: "Moved to the US for my master's", text: "M.S. Data Analytics at Northeastern's Roux Institute in Portland, Maine. Founded the Namaste Cultural Community there." },
  { year: "2025", title: "Cardinal Health → Solid Biosciences", text: "BI and business analysis in healthcare distribution and gene-therapy biotech." },
  { year: "2025+", title: "Started building", text: "KOGOS grew into a ~45K career community. Shipped InsightForge AI, InsightApply AI, BubbleUp and PenExecutive." },
  { year: "Next", title: "Your team?", text: "A role where I own real business problems end to end, with the speed and ownership of a founder." },
];

export const principles = [
  { title: "Trust the data last", text: "Validate, reconcile, then visualize. A pretty chart on bad data is worse than no chart." },
  { title: "Ship, then sharpen", text: "Get a working version in front of real users this week; polish what they actually use." },
  { title: "AI with a human in the loop", text: "I use Claude, ChatGPT and Copilot daily, and I always review what they produce." },
  { title: "Community is a moat", text: "The best product ideas I've had came from listening to the ~45K people in my community." },
];

export type Photo = { src: string; caption: string; place?: string; shape: "portrait" | "landscape" | "feature"; pos?: string; featured?: boolean };

// Featured photos are the only ones on the page (each proves one thing); the rest open in the viewer.
// The grid packs densely: two portraits + the feature fill rows 1-2, two portraits + the story tile fill rows 3-4.
export const gallery: Photo[] = [
  { src: "/img/graduation.webp", caption: "Commencement, M.S. Data Analytics", place: "Northeastern", shape: "portrait", pos: "50% 30%", featured: true },
  { src: "/img/dallas.webp", caption: "Home base: Dallas–Fort Worth, at Texas Live!", place: "Dallas, TX", shape: "portrait", pos: "50% 40%", featured: true },
  { src: "/img/diwali.webp", caption: "Diwali with the Namaste Cultural Community I founded", place: "Portland, ME", shape: "feature", featured: true },
  { src: "/img/google.webp", caption: "Visiting Google in Mountain View", place: "Mountain View, CA", shape: "portrait", pos: "50% 45%", featured: true },
  { src: "/img/boston-skyline.webp", caption: "Boston skyline from the harbor", place: "Boston, MA", shape: "portrait", pos: "50% 40%", featured: true },
  { src: "/img/roux.webp", caption: "The Roux Institute, where I did my master's", place: "Portland, ME", shape: "landscape" },
  { src: "/img/graduation-flags.webp", caption: "Class of 2026", place: "Northeastern", shape: "portrait" },
  { src: "/img/lab.webp", caption: "In the lab", shape: "portrait" },
  { src: "/img/boston.webp", caption: "Arriving in Boston", place: "Boston, MA", shape: "landscape" },
  { src: "/img/sunset.webp", caption: "Golden hour by the water", shape: "portrait" },
  { src: "/img/golden-gate.webp", caption: "Golden Gate weekend", place: "San Francisco, CA", shape: "portrait" },
  { src: "/img/palace.webp", caption: "Palace of Fine Arts", place: "San Francisco, CA", shape: "portrait" },
  { src: "/img/temple.webp", caption: "Staying close to my roots", shape: "portrait" },
];

export const route = [
  { city: "India", note: "Bachelor's, then Deloitte" },
  { city: "Portland, ME", note: "Master's at the Roux Institute" },
  { city: "Boston, MA", note: "Northeastern University" },
  { city: "Dallas, TX", note: "Home base today" },
  { city: "Bay Area, CA", note: "SF & Mountain View" },
];

export const education = [
  { school: "Northeastern University · Roux Institute", degree: "M.S. Data Analytics" },
  { school: "Kakatiya University", degree: "B.S." },
];

export const certifications = [
  "Google Advanced Data Analytics Professional Certificate",
  "AWS Certified Solutions Architect – Associate",
];
