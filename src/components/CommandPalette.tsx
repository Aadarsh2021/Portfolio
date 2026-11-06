import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsSearch, 
  BsHouse, 
  BsPerson, 
  BsBriefcase, 
  BsLightning, 
  BsRocket, 
  BsDownload, 
  BsMoon,
  BsAward,
  BsEnvelopeFill,
  BsTelephoneFill,
  BsGithub,
  BsBoxArrowUpRight
} from 'react-icons/bs';
import portfolioData from '../data/portfolioData';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeToggle?: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  category: 'Navigation' | 'Projects' | 'Patents' | 'Quick Contact' | 'System';
  action?: () => void;
  href?: string;
  external?: boolean;
}

const renderIcon = (IconComponent: any) => React.createElement(IconComponent);

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onThemeToggle }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: PaletteAction[] = useMemo(() => {
    const list: PaletteAction[] = [
      // Quick Contact & System
      {
        id: 'resume',
        title: 'Download Full Resume (PDF)',
        subtitle: 'Latest verified CV • IIT Patna M.Tech',
        icon: renderIcon(BsDownload),
        category: 'Quick Contact',
        action: () => window.open('/assets/Aadarsh Resume.pdf', '_blank')
      },
      {
        id: 'email',
        title: 'Send Email to Aadarsh',
        subtitle: 'thakuraadarsh1@gmail.com',
        icon: renderIcon(BsEnvelopeFill),
        category: 'Quick Contact',
        action: () => { window.location.href = 'mailto:thakuraadarsh1@gmail.com'; }
      },
      {
        id: 'phone',
        title: 'Call / WhatsApp Aadarsh',
        subtitle: '+91 9310574300',
        icon: renderIcon(BsTelephoneFill),
        category: 'Quick Contact',
        action: () => window.open('https://wa.me/919310574300', '_blank')
      },
      {
        id: 'github',
        title: 'View GitHub Profile',
        subtitle: 'github.com/Aadarsh2021',
        icon: renderIcon(BsGithub),
        category: 'Quick Contact',
        action: () => window.open('https://github.com/Aadarsh2021', '_blank')
      },

      // Navigation
      { id: 'hero', title: 'Go to Home / Overview', icon: renderIcon(BsHouse), category: 'Navigation', href: '#home' },
      { id: 'projects-sec', title: 'Go to Projects Section', icon: renderIcon(BsRocket), category: 'Navigation', href: '#projects' },
      { id: 'skills-sec', title: 'Go to Technical Skills', icon: renderIcon(BsLightning), category: 'Navigation', href: '#skills' },
      { id: 'experience-sec', title: 'Go to Career & Academic Timeline', icon: renderIcon(BsBriefcase), category: 'Navigation', href: '#experience' },
      { id: 'certs-sec', title: 'Go to Patents & Certifications', icon: renderIcon(BsAward), category: 'Navigation', href: '#certifications' },
      { id: 'about-sec', title: 'Go to Identity & Bio', icon: renderIcon(BsPerson), category: 'Navigation', href: '#about' },
    ];

    if (onThemeToggle) {
      list.push({
        id: 'theme',
        title: 'Toggle Dark / Light Mode',
        subtitle: 'Switch between Dark (Cinematic) and Light (Bento) modes',
        icon: renderIcon(BsMoon),
        category: 'System',
        action: onThemeToggle
      });
    }

    // Projects
    portfolioData.projects.forEach((p, idx) => {
      list.push({
        id: `proj-${p.id || idx}`,
        title: `Project: ${p.title}`,
        subtitle: p.desc,
        icon: renderIcon(BsBoxArrowUpRight),
        category: 'Projects',
        action: () => {
          if (p.links.live) {
            window.open(p.links.live, '_blank');
          } else if (p.links.github) {
            window.open(p.links.github, '_blank');
          } else {
            window.location.hash = '#projects';
          }
        }
      });
    });

    // Patents & Awards
    portfolioData.certifications.forEach((c, idx) => {
      list.push({
        id: `cert-${idx}`,
        title: c.title,
        subtitle: `${c.issuer} — ${c.detail}`,
        icon: renderIcon(BsAward),
        category: 'Patents',
        action: () => {
          window.location.hash = '#certifications';
        }
      });
    });

    return list;
  }, [onThemeToggle]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(action =>
      action.title.toLowerCase().includes(q) ||
      (action.subtitle && action.subtitle.toLowerCase().includes(q)) ||
      action.category.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const handleSelect = useCallback((action: PaletteAction) => {
    if (action.href) {
      window.location.hash = action.href;
    } else if (action.action) {
      action.action();
    }
    onClose();
    setQuery('');
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          handleSelect(filteredActions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, handleSelect, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="command-palette-content"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="command-palette-header">
              {renderIcon(BsSearch)}
              <input 
                autoFocus
                type="text" 
                placeholder="Type a command, project, patent, or skill..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="command-palette-input"
              />
              <kbd className="exit-kbd">ESC</kbd>
            </div>

            <div className="command-palette-body">
              {filteredActions.length === 0 ? (
                <div className="no-results">No results found for "{query}"</div>
              ) : (
                filteredActions.map((action, index) => (
                  <div 
                    key={action.id}
                    className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => handleSelect(action)}
                  >
                    <span className="item-icon">{action.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                      <span className="item-title">{action.title}</span>
                      {action.subtitle && (
                        <span style={{ fontSize: '11px', color: '#8F9CAE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {action.subtitle}
                        </span>
                      )}
                    </div>
                    <span className="item-category">{action.category}</span>
                  </div>
                ))
              )}
            </div>

            <div className="command-palette-footer">
              <div className="hint"><kbd>↑↓</kbd> navigate</div>
              <div className="hint"><kbd>Enter</kbd> execute</div>
              <div className="hint"><kbd>Esc</kbd> dismiss</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
