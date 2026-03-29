import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  );
};

const EmptyState = () => {
  const messages = [
    "No recipes found yet...",
    "Try searching for your favorite dish!",
    "Or create your first recipe!",
    "The kitchen awaits your creativity! 🍳"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="empty-icon"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        🍽️
      </motion.div>
      <div className="empty-text">
        <TypewriterText text={messages[currentMessage]} />
      </div>
      <motion.div
        className="empty-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="empty-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search Recipes
        </motion.button>
        <motion.button
          className="empty-button secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Recipe
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;