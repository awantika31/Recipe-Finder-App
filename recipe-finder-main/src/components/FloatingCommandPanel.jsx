import { motion } from 'framer-motion';

const FloatingCommandPanel = () => {
  const actions = [
    { icon: '🍳', label: 'Cook Now', action: () => console.log('Cook Now') },
    { icon: '⭐', label: 'Favorites', action: () => console.log('Favorites') },
    { icon: '📝', label: 'My Recipes', action: () => console.log('My Recipes') },
    { icon: '⚙️', label: 'Settings', action: () => console.log('Settings') },
  ];

  return (
    <motion.div
      className="floating-panel"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="panel-header">
        <span>Quick Actions</span>
      </div>
      <div className="panel-actions">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className="action-button"
            onClick={action.action}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(170, 59, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingCommandPanel;