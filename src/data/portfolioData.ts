import { 
  BsLaptop, BsGlobe, BsCodeSlash, BsCloudFill, BsAward, BsPatchCheck, BsTrophy 
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
      desc: "Full-stack web application for client, inventory, billing, invoice, transaction, and ledger management with secure APIs, authentication, and RBAC for multi-user operations.",
      tags: ["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "RBAC"],
      links: { github: "https://github.com/Ghuge01-Cover/escrow-inventory", live: "https://escrow-bms-6fdeb.web.app" },
      icon: BsCodeSlash,
      img: "/assets/projects/inventory.png",
      featured: true,
      metrics: ["QR-based product scanning & automated billing", "Multi-user RBAC & Ledger management", "20–30% database query optimization"]
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
      metrics: ["AI-powered resume & LinkedIn analysis", "Firebase Auth with Supabase PostgreSQL", "Secure multi-user structured workflows"]
    },
    {
      id: "clothez",
      title: "Clothez",
      desc: "Premium men's fashion e-commerce platform with a focus on high-end apparel and a seamless, high-performance shopping experience.",
      tags: ["React", "Supabase", "Tailwind CSS", "Framer Motion"],
      links: { github: "https://github.com/Aadarsh2021", live: "https://clothez-4c565.web.app/" },
      icon: BsLaptop,
      img: "/assets/projects/clothez.png",
      metrics: ["Real-time Inventory", "Secure Checkout Flow", "Premium Fashion UI"]
    },
    {
      id: "revest",
      title: "Revest",
      desc: "A comprehensive portfolio advisor platform offering a complete suite of financial tools and intelligent investment insights.",
      tags: ["React", "PostgreSQL", "Analytics", "Financial APIs"],
      links: { github: "https://github.com/Aadarsh2021", live: "https://www.revest.co.in/" },
      icon: BsGlobe,
      img: "/assets/projects/Revest.png",
      metrics: ["Smart Asset Tracking", "Advisory Suite", "Investment Insights"]
    },
    {
      id: "portfolio",
      title: "Portfolio 2.0",
      desc: "Modern high-performance portfolio featuring Bento Grid architecture, ambient lighting, and optimized asset loading.",
      tags: ["React", "Three.js", "Framer Motion", "GSAP"],
      links: { github: "https://github.com/Aadarsh2021/Portfolio", live: "https://aadarsh-portfolio-49ac6.web.app/" },
      icon: BsGlobe,
      img: "/assets/projects/Portfolio.png",
      metrics: ["Lighthouse 95+ score", "Interactive 3D Physics", "Elite UI/UX Design"]
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
