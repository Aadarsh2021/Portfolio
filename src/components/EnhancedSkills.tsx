import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiPostgresql, 
  SiTailwindcss, SiSupabase, SiFirebase, SiTypescript,
  SiPython, SiGit, SiJavascript, SiHtml5,
  SiExpress, SiMongodb, SiPostman, SiVercel, SiOpenai
} from 'react-icons/si';
import { BsCpu, BsShieldLock, BsGear } from 'react-icons/bs';

const EnhancedSkills: React.FC = () => {
  const groups = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Python", icon: SiPython, color: "#3776AB" }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "HTML5 & CSS3", icon: SiHtml5, color: "#E34F26" }
      ]
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#E5E5E5" },
        { name: "REST APIs", icon: BsGear, color: "#60A5FA" },
        { name: "JWT & RBAC", icon: BsShieldLock, color: "#A78BFA" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Firestore", icon: SiFirebase, color: "#FFCA28" }
      ]
    },
    {
      title: "Cloud & Tools",
      skills: [
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
        { name: "Git & GitHub", icon: SiGit, color: "#F05032" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" }
      ]
    },
    {
      title: "AI & ML",
      skills: [
        { name: "AI Service Integration", icon: SiOpenai, color: "#10A37F" },
        { name: "Machine Learning", icon: BsCpu, color: "#F43F5E" }
      ]
    }
  ];

  return (
    <div className="skills-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Tech Stack</h3>
        <span className="mono-label">Expertise</span>
      </div>

      <div className="skills-groups flex-grow-1 overflow-auto custom-scrollbar pe-1">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="skill-group-item mb-3">
            <p className="mono-label mb-2" style={{ fontSize: '0.65rem', opacity: 0.65 }}>{group.title}</p>
            <div className="d-flex flex-wrap gap-2">
              {group.skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  className="skill-pill d-flex align-items-center gap-2 px-3 py-1 shadow-sm"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: skill.color + '44',
                    backgroundColor: skill.color + '11'
                  }}
                >
                  {React.createElement(skill.icon as any, { size: 14, style: { color: skill.color } })}
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="tech-footer mt-auto pt-3" style={{ borderTop: '1px solid var(--border-luminous)' }}>
        <p className="small mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
          M.Tech candidate in <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AI & Data Science</span> @ IIT Patna
        </p>
      </div>
    </div>
  );
};

export default EnhancedSkills;