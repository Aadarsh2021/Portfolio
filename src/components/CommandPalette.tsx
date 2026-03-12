import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsSearch, 
  BsHouse, 
  BsPerson, 
  BsBriefcase, 
  BsLightning, 
  BsRocket, 
  BsDownload, 
  BsMoon
} from 'react-icons/bs';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeToggle: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onThemeToggle }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { id: 'hero', title: 'Home', icon: React.createElement(BsHouse as any), category: 'Navigation', href: '#hero' },
    { id: 'about', title: 'About Me', icon: React.createElement(BsPerson as any), category: 'Navigation', href: '#about' },
    { id: 'experience', title: 'Experience', icon: React.createElement(BsBriefcase as any), category: 'Navigation', href: '#experience' },
    { id: 'skills', title: 'Skills', icon: React.createElement(BsLightning as any), category: 'Navigation', href: '#skills' },
    { id: 'projects', title: 'Projects', icon: React.createElement(BsRocket as any), category: 'Navigation', href: '#projects' },
    { id: 'theme', title: 'Toggle Theme', icon: React.createElement(BsMoon as any), category: 'System', action: onThemeToggle },
    { id: 'resume', title: 'Download Resume', icon: React.createElement(BsDownload as any), category: 'Actions', action: () => document.getElementById('resume-download-btn')?.click() },
  ];

  const filteredActions = actions.filter(action =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((action: typeof actions[0]) => {
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
              {React.createElement(BsSearch as any, { className: "search-icon" })}
              <input 
                autoFocus
                type="text" 
                placeholder="Search commands, sections, actions..." 
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
                    <span className="item-title">{action.title}</span>
                    <span className="item-category">{action.category}</span>
                  </div>
                ))
              )}
            </div>

            <div className="command-palette-footer">
              <div className="hint"><kbd>↑↓</kbd> to navigate</div>
              <div className="hint"><kbd>Enter</kbd> to select</div>
              <div className="hint"><kbd>Esc</kbd> to close</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
