import { 
  BsLaptop, BsGlobe, BsCodeSlash, BsCloudFill, BsAward, BsPatchCheck 
} from 'react-icons/bs';

export const portfolioData = {
  personalInfo: {
    name: "Aadarsh Thakur",
    role: "Full Stack Developer",
    email: "thakuraadarsh1@gmail.com",
    linkedin: "https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/",
    github: "https://github.com/Aadarsh2021",
    location: "India",
    bio: "I am a Full Stack Developer with 1+ year of experience building production-grade web applications. Proficient in designing scalable REST APIs, implementing JWT-based authentication, role-based access control, and integrating cloud backends using Node.js, Firebase, and Supabase.",
    identity: {
      title: "Identity",
      subtitle: "Who I Am",
      name: "Aadarsh Thakur",
      description: "Fluent in TypeScript, JavaScript, and Python. Proven track record of optimizing database performance by 20–30% and delivering end-to-end features that reduce manual effort.",
      values: [
        {
          title: "Full-Stack Ecosystem",
          desc: "Fluent in TypeScript, JavaScript, and Python. Proven track record of optimizing database performance by 20–30%."
        },
        {
          title: "Scalable Architecture",
          desc: "Specializing in PostgreSQL optimization and Cloud BaaS integration. Experienced in architecting secure systems with RBAC."
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
      id: "clothez",
      title: "Clothez",
      desc: "Premium men's fashion e-commerce platform with a focus on high-end apparel and a seamless, high-performance shopping experience.",
      tags: ["React", "Supabase", "Tailwind", "Framer Motion"],
      links: { github: "https://github.com/Aadarsh2021", live: "https://clothez-4c565.web.app/" },
      icon: BsLaptop,
      img: "/assets/projects/clothez.png",
      featured: true,
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
      featured: true,
      metrics: ["Smart Asset Tracking", "Advisory Suite", "Investment Insights"]
    },
    {
      id: "inventory",
      title: "Escrow BMS",
      desc: "Full-stack platform to manage clients, invoices, inventory, and daily financial ledger records with a normalized database schema.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      links: { github: "https://github.com/Ghuge01-Cover/escrow-inventory", live: "https://escrow-inventory.web.app/" },
      icon: BsCodeSlash,
      img: "/assets/projects/inventory.png",
      metrics: ["QR-based billing system", "Automated invoice generation", "Digitized manual workflows"]
    },
    {
      id: "taliwo",
      title: "Taliwo.com",
      desc: "AI-powered career platform for automated resume and LinkedIn profile analysis with structured feedback suggestions.",
      tags: ["React", "AI", "Firebase", "Supabase"],
      links: { github: "https://github.com/ChinmayShringi/career-compass-launchpad", live: "https://taliwo.com" },
      icon: BsCloudFill,
      img: "/assets/projects/taliwo.png",
      metrics: ["Automated AI analysis", "Secure multi-user workflows", "Real-time data handling"]
    },
    {
      id: "portfolio",
      title: "Portfolio 2.0",
      desc: "Modern high-performance portfolio featuring Bento Grid 2.0, 3D particles, and optimized asset loading.",
      tags: ["React", "Three.js", "Framer Motion", "GSAP"],
      links: { github: "https://github.com/Aadarsh2021/Portfolio", live: "https://aadarsh-portfolio-49ac6.web.app/" },
      icon: BsGlobe,
      img: "/logo512.png",
      metrics: ["Optimized bundle size", "Custom 3D Physics", "Elite UI/UX Design"]
    }
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "Ash-Tech Solutions",
      period: "JAN 2026 - PRESENT",
      details: "Architecting scalable cloud-based backend systems using Firebase Cloud Functions and Supabase."
    },
    {
      role: "Backend Developer Intern",
      company: "Ash-Tech Solutions",
      period: "JUL 2025 - JAN 2026",
      details: "Developed production-ready REST APIs using Node.js and Express.js. Integrated Supabase (PostgreSQL)."
    },
    {
      role: "B.Tech in CS Engineering",
      company: "G.L. Bajaj Group of Institutions",
      period: "2021 - 2025",
      details: "Pursuing Bachelor of Technology in Computer Science Engineering with a focus on full-stack development."
    }
  ],
  certifications: [
    {
      title: "GPS Security Patent",
      issuer: "Patent Published (2024)",
      icon: BsPatchCheck,
      detail: "Published patent for a Luggage Security System based on GPS tracking."
    },
    {
      title: "Agri-Tech Patent",
      issuer: "Patent Published (2024)",
      icon: BsPatchCheck,
      detail: "Published patent for an Agricultural Management Device."
    },
    {
      title: "Full Stack Expert",
      issuer: "CutShort (Feb 2025)",
      icon: BsAward,
      detail: "Certifications in Python Programming and Machine Learning."
    }
  ],
  blogPosts: [
    { 
      title: "Scaling Cloud Inventory", 
      category: "System Architecture",
      date: "Mar 2024"
    },
    { 
      title: "AI & Talent Matching", 
      category: "Groq Intelligence",
      date: "Feb 2024"
    },
    { 
      title: "Modern Billing Architecture", 
      category: "Enterprise SaaS",
      date: "Jan 2024"
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
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "Express", "Firebase", "MongoDB"] },
    { name: "Tools", items: ["Git", "Docker", "Figma", "Postman"] },
  ]
};
