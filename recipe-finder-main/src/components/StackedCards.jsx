import { motion } from 'framer-motion';

const StackedCard = ({ title, description, image, index }) => {
  return (
    <motion.div
      className="stacked-card"
      style={{
        zIndex: 10 - index,
        transform: `translateY(${index * 8}px) rotate(${index * 2}deg)`,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="card-content">
        <img
          src={image}
          alt={title}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
          }}
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const StackedCards = ({ recipes = [] }) => {
  // Default recipes if none provided
  const defaultRecipes = [
    {
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato, mozzarella, and basil',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop'
    },
    {
      title: 'Chicken Caesar Wrap',
      description: 'Grilled chicken wrapped in tortilla with caesar dressing',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop'
    },
    {
      title: 'Beef Tacos',
      description: 'Seasoned ground beef in corn tortillas with toppings',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=200&fit=crop'
    },
  ];

  const cards = recipes.length > 0 ? recipes.map(recipe => ({
    title: recipe.strMeal || recipe.title,
    description: recipe.strCategory && recipe.strArea ? `${recipe.strCategory} • ${recipe.strArea}` : recipe.description,
    image: recipe.strMealThumb || recipe.image
  })) : defaultRecipes;

  return (
    <div className="stacked-cards-container">
      {cards.map((card, index) => (
        <StackedCard key={index} {...card} index={index} />
      ))}
    </div>
  );
};

export default StackedCards;