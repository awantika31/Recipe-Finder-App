import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="cursor-glow"
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 100,
      }}
    />
  );
};

export default CursorGlow;