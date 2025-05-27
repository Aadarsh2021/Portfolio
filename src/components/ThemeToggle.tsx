import React from 'react';
import { Button } from 'react-bootstrap';
import { BsSun, BsMoon } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const renderIcon = (IconComponent: IconType, size: number) => {
    const Icon = IconComponent as React.ComponentType<{ size: number }>;
    return <Icon size={size} />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="theme-toggle-btn"
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
      </Button>
    </motion.div>
  );
};

export default ThemeToggle; 