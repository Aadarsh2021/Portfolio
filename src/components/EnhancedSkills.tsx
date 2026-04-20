import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiPostgresql, 
  SiTailwindcss, SiSupabase, SiFirebase, SiTypescript,
  SiPython, SiGit
} from 'react-icons/si';
import { BsCpu } from 'react-icons/bs';

const EnhancedSkills: React.FC = () => {
  const groups = [
    {
      title: "Core Languages",
      skills: [
        { name: "JavaScript", icon: SiReact, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Python", icon: SiPython, color: "#3776AB" }
      ]
    },
    {
      title: "Frontend & Design",
      skills: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "HTML5/CSS3", icon: SiReact, color: "#E34F26" }
      ]
    },
    {
      title: "Backend & BaaS",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiNodedotjs, color: "#000000" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" }
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "MongoDB", icon: SiPostgresql, color: "#47A248" },
        { name: "Git/GitHub", icon: SiGit, color: "#F05032" },
        { name: "JWT Auth", icon: BsCpu, color: "#ffffff" }
      ]
    }
  ];

  return (
    <div className="skills-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Tech Stack</h3>
        <span className="mono-label">Expertise</span>
      </div>

      <div className="skills-groups flex-grow-1">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="skill-group-item mb-4">
            <p className="mono-label mb-3" style={{ fontSize: '0.65rem', opacity: 0.6 }}>{group.title}</p>
            <div className="d-flex flex-wrap gap-2">
              {group.skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  className="skill-pill d-flex align-items-center gap-2 px-3 py-2 shadow-sm"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: skill.color + '44',
                    backgroundColor: skill.color + '11'
                  }}
                >
                  {React.createElement(skill.icon as any, { size: 14, style: { color: skill.color } })}
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="tech-footer mt-auto pt-3" style={{ borderTop: '1px solid var(--border-luminous)' }}>
        <p className="small mb-0" style={{ color: 'var(--text-secondary)' }}>Constantly evolving with <span style={{ color: 'var(--text-primary)' }}>Next.js</span> and <span style={{ color: 'var(--text-primary)' }}>Cloud Architecture</span>.</p>
      </div>
    </div>
  );
};

export default EnhancedSkills;