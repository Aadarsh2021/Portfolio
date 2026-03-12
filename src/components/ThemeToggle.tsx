import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  onToggle?: (e: React.MouseEvent) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (e: React.MouseEvent) => {
    if (onToggle) {
      onToggle(e);
    } else {
      toggleTheme();
    }
  };

  const renderIcon = (IconComponent: any, size: number) => {
    return React.createElement(IconComponent, { size });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        type="button"
        onClick={handleToggle}
        className="btn btn-outline btn-sm theme-toggle-btn"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            renderIcon(BsMoon, 18)
          ) : (
            renderIcon(BsSun, 18)
          )}
        </motion.div>
      </button>
    </motion.div>
  );
};

export default ThemeToggle; 