import { 
  BsLaptop, BsGlobe, BsCodeSlash, BsCloudFill, BsAward, BsPatchCheck, BsTrophy,
  BsJournalCheck, BsPeople, BsKanban, BsReceiptCutoff, BsBoxSeam
} from 'react-icons/bs';

export const portfolioData = {
  personalInfo: {
    name: "Aadarsh Thakur",
    role: "Full Stack Developer | Software Developer",
    email: "thakuraadarsh1@gmail.com",
    phone: "+91 9310574300",
    linkedin: "https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/",
    github: "https://github.com/Aadarsh2021",
    location: "Delhi, India",
    profileImage: "/assets/profile.png",
    bannerImage: "/assets/banner.png",
    bio: "Full Stack Developer with 1+ year of experience building and deploying web applications and backend services using React.js, Node.js, Express.js, PostgreSQL, Firebase, and Supabase. Skilled in REST API development, cloud backend system design, AI service integration, JWT/Firebase authentication, and Role-Based Access Control (RBAC). M.Tech candidate in AI & Data Science at IIT Patna.",
    identity: {
      title: "Identity",
      subtitle: "Who I Am",
      name: "Aadarsh Thakur",
      description: "Fluent in TypeScript, JavaScript, and Python. Proven track record of optimizing database performance by 20–30% and building secure, scalable cloud backends and AI-integrated applications.",
      values: [
        {
          title: "Full-Stack & Cloud Architecture",
          desc: "Expertise in React.js, Node.js, Express.js, PostgreSQL, Supabase, and Firebase Cloud Functions. Skilled in RBAC and RESTful API engineering."
        },
        {
          title: "AI / ML & Academic Excellence",
          desc: "Integrating third-party AI services and ML solutions. Pursuing M.Tech in Artificial Intelligence & Data Science at IIT Patna."
        }
      ]
    }
  },
  socialLinks: [
    { name: "GitHub", url: "https://github.com/Aadarsh2021", icon: "BsGithub" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/", icon: "BsLinkedin" },
    { name: "Email", url: "mailto:thakuraadarsh1@gmail.com", icon: "BsEnvelopeFill" },
  ],
  projects: [
    {
      id: "escrow-bms",
      title: "Escrow BMS",
      desc: "All-in-one SaaS ERP and business management platform unifying 6 enterprise modules: GST e-invoicing, automated payroll & attendance, double-entry Khaata ledger, real-time inventory monitoring, sales CRM pipelines, and daily Hisab calculations.",
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Firebase Hosting", "Framer Motion"],
      links: { github: "https://github.com/Helpawave/Escrow-BMS", live: "https://escrow-bms-6fdeb.web.app" },
      icon: BsCodeSlash,
      img: "/assets/projects/escrow_bms.png",
      featured: true,
      metrics: [
        "6 interconnected enterprise modules in a single unified SaaS workspace",
        "GST e-invoicing with auto CGST/SGST/IGST tax calculation & HSN mapping",
        "Row-Level Security (RLS) data isolation with 14-day automated onboarding triggers"
      ],
      deepArchitecture: "Engineered with React 18, Vite, and Supabase PostgreSQL with strict Row Level Security (RLS). Incorporates a 6-module architecture uniting GST e-invoicing, attendance-driven payroll, Khaata accounting ledger, inventory stock monitoring with automated shortage triggers, CRM lead pipelines, and daily cash counter reconciliation."
    },
    {
      id: "escrow-ledger",
      title: "Escrow Account Ledger",
      desc: "Elite, keyboard-first double-entry accounting suite engineered to manage high-volume transactional ledgers, automate Monday Final settlements, and keep multi-party balance sheets synchronized with strict read-only audit locking.",
      tags: ["Vite", "React", "TypeScript", "Supabase", "PostgreSQL", "Firebase Auth", "Tailwind CSS"],
      links: { github: "https://github.com/Aadarsh2021/Escrow-Account-Ledger", live: "https://esrow-ledger.web.app" },
      icon: BsJournalCheck,
      img: "/assets/projects/escrow_ledger.png",
      featured: true,
      metrics: [
        "Keyboard-first double-entry ledger navigation with auto-completion overlays",
        "Automated Monday Final settlement engine with immutable audit locking",
        "Visual balance sheet with live Credit (Jama/Dena) and Debit (Name/Lena) tracking"
      ],
      deepArchitecture: "Built with Vite, React, and TypeScript paired with Supabase PostgreSQL and Firebase Auth. Features automated database triggers that enforce weekly Monday Final transaction cutoffs, multi-party ledger synchronization, cascading account purges, and instant dark/light glassmorphic UI toggling."
    },
    {
      id: "escrow-payroll",
      title: "Escrow Payroll",
      desc: "Automated enterprise payroll processing and HRMS platform featuring one-click monthly salary disbursements, tax deduction computation, daily attendance check-ins, leave approvals, and dynamic PDF payslip generation.",
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "Firebase Auth", "Radix UI", "TanStack Query"],
      links: { github: "https://github.com/escrowbms/Escrow-Payroll", live: "https://escrow-payroll.web.app" },
      icon: BsPeople,
      img: "/assets/projects/escrow_payroll.png",
      featured: true,
      metrics: [
        "Automated monthly payroll cycles with wage, allowance, and tax computation",
        "One-click printable payslip generation with automated employee deduction breakdown",
        "Integrated employee directory, leave management workflows, and attendance analytics"
      ],
      deepArchitecture: "Architected using React 18, TypeScript, Tailwind CSS, and TanStack Query with Supabase PostgreSQL and Firebase Auth. Implements robust attendance aggregation algorithms, automated tax and deduction calculating engines, and client-side PDF payslip compilation with real-time HRMS analytics."
    },
    {
      id: "apexcrm",
      title: "ApexCRM",
      desc: "High-fidelity enterprise Client Relationship Management suite engineered for sales velocity, featuring interactive Drag-and-Drop Task Kanban boards, full CRUD lead pipelines, automated contacts registry synced from won deals, and Chart.js analytics.",
      tags: ["React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Chart.js", "Lucide Icons", "Vite"],
      links: { github: "https://github.com/Rokella-Medias/CRM", live: "https://crm-f35c0.web.app" },
      icon: BsKanban,
      img: "/assets/projects/apexcrm.png",
      featured: true,
      metrics: [
        "Interactive Lead Kanban pipeline with real-time status transitions & priority scoring",
        "Automated customer directory compilation dynamically synced when deals are WON",
        "Chart.js performance analytics showing pipeline value distribution & win rates"
      ],
      deepArchitecture: "Engineered on React 19 and Tailwind CSS v4 with Supabase backend and Row Level Security (RLS). Features multi-role authentication (Sales Agent, Director, Manager), interactive task Kanban boards, live lead modification activity logs, and real-time database syncing."
    },
    {
      id: "escrow-bill",
      title: "Escrow Bill",
      desc: "Enterprise-grade GST billing, invoicing, and ERP platform with 10+ industry invoice templates (Rule 46 compliant), automobile showroom vehicle booking advances, automated HSN lookup, and UPI instant checkout.",
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "Firebase Hosting", "Vite"],
      links: { github: "https://github.com/escrowbms/escrow-invoice", live: "https://escrow-bill.web.app" },
      icon: BsReceiptCutoff,
      img: "/assets/projects/escrowbill.png",
      metrics: [
        "10+ customizable GST invoice templates including Classic, Export, and Thermal POS",
        "Automobile showroom module with VIN/Chassis tracking & token advance invoicing",
        "Rule 46 tax breakup computation (CGST, SGST, IGST) with real HSN/SAC code mapping"
      ],
      deepArchitecture: "High-performance billing engine with dual-tenant role routing, integrated UPI payment QR generators, WhatsApp Cloud API billing distribution, and sub-second HSN search."
    },
    {
      id: "taliwo",
      title: "Taliwo.com",
      desc: "AI-powered career platform for automated resume analysis, LinkedIn profile optimization, and career recommendations by integrating third-party AI services.",
      tags: ["React.js", "AI Integration", "Firebase Auth", "Supabase PostgreSQL", "REST APIs"],
      links: { github: "https://github.com/ChinmayShringi/career-compass-launchpad", live: "https://taliwo.com" },
      icon: BsCloudFill,
      img: "/assets/projects/taliwo.png",
      featured: true,
      metrics: [
        "AI-powered resume & LinkedIn analysis using generative AI models",
        "Firebase Auth paired with Supabase PostgreSQL cloud backend",
        "Secure multi-user structured workflows and actionable career scoring"
      ],
      deepArchitecture: "Full-stack AI integration utilizing external LLM inference pipelines, serverless cloud functions, secure profile scraping, and structured career readiness indexing."
    },
    {
      id: "escrow-inventory",
      title: "Escrow Inventory",
      desc: "High-throughput warehouse inventory system featuring sub-second barcode & QR scanning, automated low-stock threshold triggers, and real-time inventory ledger syncing.",
      tags: ["React.js", "Node.js", "PostgreSQL", "Supabase", "QR Scanner", "Tailwind CSS"],
      links: { github: "https://github.com/Ghuge01-Cover/escrow-inventory", live: "https://escrow-inventory.web.app" },
      icon: BsBoxSeam,
      img: "/assets/projects/inventory.png",
      metrics: [
        "Sub-second camera-based barcode & QR product catalog scanning",
        "Automated low-stock alerts & dynamic reorder point calculations",
        "20–30% database query optimization via composite Postgres indexing"
      ],
      deepArchitecture: "Architected with optimized SQL schemas, connection pooling, and sub-second scanner processing to handle high-frequency warehouse barcode lookups without latency spikes."
    },
    {
      id: "clothez",
      title: "Clothez",
      desc: "Premium men's fashion e-commerce platform with a focus on high-end apparel and a seamless, high-performance shopping experience.",
      tags: ["React", "Supabase", "Tailwind CSS", "Framer Motion"],
      links: { github: "https://github.com/Aadarsh2021", live: "https://clothez-4c565.web.app/" },
      icon: BsLaptop,
      img: "/assets/projects/clothez.png",
      metrics: [
        "Real-time inventory synchronization with Supabase backend",
        "Frictionless multi-step checkout with cart persistence",
        "High-performance responsive luxury storefront UI"
      ],
      deepArchitecture: "Designed with responsive UI components, optimistic UI state updates for instant cart operations, and Supabase PostgreSQL with real-time stock availability subscriptions."
    },
    {
      id: "revest",
      title: "Revest",
      desc: "A comprehensive portfolio advisor platform offering a complete suite of financial tools and intelligent investment insights.",
      tags: ["React", "PostgreSQL", "Analytics", "Financial APIs", "Supabase"],
      links: { github: "https://github.com/Aadarsh2021", live: "https://www.revest.co.in/" },
      icon: BsGlobe,
      img: "/assets/projects/Revest.png",
      metrics: [
        "Multi-asset portfolio tracking across equities, mutual funds, and cash",
        "Algorithmic risk evaluation and asset rebalancing suggestions",
        "Secure cloud-native data architecture with enterprise privacy standards"
      ],
      deepArchitecture: "Engineered with modular financial calculation utilities, real-time charting components, and PostgreSQL financial schemas handling transactions and compounding returns."
    },
    {
      id: "portfolio",
      title: "Portfolio 2.0",
      desc: "Modern high-performance developer showcase featuring dual-mode Netflix cinematic streaming view and interactive Bento Grid architecture.",
      tags: ["React", "Three.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
      links: { github: "https://github.com/Aadarsh2021/Portfolio", live: "https://aadarsh-portfolio-49ac6.web.app/" },
      icon: BsGlobe,
      img: "/assets/projects/Portfolio.png",
      metrics: [
        "Lighthouse 95+ performance score with zero cumulative layout shift",
        "Instant toggle between Cinematic Netflix view and interactive Bento Grid",
        "Keyboard-navigable rows, responsive glassmorphic cards, and fluid modals"
      ],
      deepArchitecture: "Crafted with React, Framer Motion, and custom glassmorphism styling. Features dual presentation modes, responsive touch & keyboard row sliders, and optimized WebP visual asset delivery."
    }
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "Ash-Tech Solutions, Delhi, India",
      period: "JAN 2026 – PRESENT",
      type: "work",
      details: "Developed production-grade full-stack applications using React.js, Node.js, and Express.js. Engineered cloud backends with Firebase & Supabase; boosted DB performance by 20–30%.",
      highlights: [
        "Developed production-grade full-stack applications using React.js, JavaScript, Node.js, and Express.js, translating business requirements into scalable features.",
        "Designed RESTful APIs with input validation, middleware, structured error handling, and authorization for secure application workflows.",
        "Implemented JWT and Firebase Authentication with Role-Based Access Control (RBAC) for secure multi-user applications.",
        "Engineered cloud backends using Firebase Cloud Functions, Supabase, PostgreSQL, and Firestore; optimized database operations, improving performance by approximately 20–30%.",
        "Contributed across the software development lifecycle: requirement analysis, API integration, testing, debugging, deployment, and maintenance."
      ]
    },
    {
      role: "Backend Developer Intern",
      company: "Ash-Tech Solutions, Delhi, India",
      period: "JUL 2025 – JAN 2026",
      type: "work",
      details: "Built backend services and REST APIs with Node.js and Express.js. Developed serverless workflows with Firebase Cloud Functions and Supabase PostgreSQL.",
      highlights: [
        "Built backend services and REST APIs with Node.js and Express.js, including validation and error handling.",
        "Developed serverless workflows with Firebase Cloud Functions and integrated Supabase PostgreSQL; designed schemas and optimized queries.",
        "Tested APIs with Postman and managed source code using Git and GitHub."
      ]
    },
    {
      role: "M.Tech, Artificial Intelligence & Data Science",
      company: "Indian Institute of Technology Patna",
      period: "JUN 2026 – JUN 2028",
      type: "education",
      details: "Master of Technology candidate in Artificial Intelligence & Data Science at IIT Patna.",
      highlights: [
        "Specializing in AI architectures, Machine Learning, and data-intensive distributed systems."
      ]
    },
    {
      role: "B.Tech, Computer Science Engineering",
      company: "G.L. Bajaj Group of Institutions, Greater Noida",
      period: "2021 – 2025",
      type: "education",
      details: "Bachelor of Technology in Computer Science Engineering.",
      highlights: [
        "Strong foundation in data structures, algorithms, database management systems, and full-stack software development."
      ]
    }
  ],
  certifications: [
    {
      title: "GPS-Based Luggage Security System",
      issuer: "Published Patent (2024)",
      icon: BsPatchCheck,
      detail: "Published patent for an innovative GPS-based luggage security and tracking mechanism."
    },
    {
      title: "Agricultural Management Device",
      issuer: "Published Patent (2024)",
      icon: BsPatchCheck,
      detail: "Published patent for an IoT & smart agricultural management device."
    },
    {
      title: "4th Place — ITS Codeathon",
      issuer: "ITS Codeathon",
      icon: BsTrophy,
      detail: "Achieved 4th place in competitive collegiate programming and system building."
    },
    {
      title: "Machine Learning & Python Programming",
      issuer: "CutShort Certified",
      icon: BsAward,
      detail: "Validated proficiency in Python programming and core machine learning models."
    },
    {
      title: "Data Science Certification",
      issuer: "Google Launchpad",
      icon: BsAward,
      detail: "Certification in data analysis, predictive modeling, and data pipelines."
    },
    {
      title: "AI & Machine Learning",
      issuer: "AICTE EduSkills",
      icon: BsAward,
      detail: "Comprehensive coursework and certification in applied AI and deep learning architectures."
    }
  ],
  blogPosts: [
    { 
      title: "Scaling Cloud Inventory: How I Built a Sub-Second Scanning Engine", 
      category: "System Architecture",
      date: "Mar 2026",
      link: "https://medium.com/@thakuraadarsh1/scaling-cloud-inventory-how-i-built-a-sub-second-scanning-engine-461bb2873767"
    },
    { 
      title: "AI & Talent Matching: The Future of Global Recruitment", 
      category: "AI & Recruitment",
      date: "Feb 2026",
      link: "https://medium.com/@thakuraadarsh1/ai-talent-matching-the-future-of-global-recruitmen-edb6682e252f"
    }
  ],
  testimonials: [
    {
      name: "Prof. Dr. Rajesh Kumar",
      role: "Project Supervisor, G L Bajaj",
      content: "Aadarsh is a problem-solver who thinks about the bigger picture. His ability to engineer scalable enterprise architectures is remarkable.",
      impact: "Architectural Lead"
    },
    {
      name: "Sarah Johnson",
      role: "Senior Backend Lead",
      content: "He single-handedly optimized our API response time by 60% and improved system scalability by 300%.",
      impact: "60% API Boost"
    }
  ],
  skills: [
    { name: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
    { name: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Middleware", "JWT Authentication", "RBAC"] },
    { name: "Databases", items: ["PostgreSQL", "MongoDB", "Firestore"] },
    { name: "Cloud & Tools", items: ["Supabase", "Firebase (Cloud Functions, Auth)", "Vercel", "Git", "GitHub", "Postman"] },
    { name: "AI & ML", items: ["AI Service/API Integration", "Machine Learning (certified)", "Python"] }
  ]
};

export default portfolioData;
