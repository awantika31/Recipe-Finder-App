import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlassSearchBar = ({ onSearch, recipes = [] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  // Sample recipe data if none provided
  const defaultRecipes = [
    { id: 1, title: 'Classic Spaghetti Carbonara', description: 'Creamy pasta with eggs, cheese, and pancetta', tags: ['pasta', 'italian', 'creamy', 'bacon'] },
    { id: 2, title: 'Grilled Salmon with Herbs', description: 'Fresh salmon fillet grilled with lemon and herbs', tags: ['fish', 'grilled', 'healthy', 'salmon'] },
    { id: 3, title: 'Chocolate Lava Cake', description: 'Decadent chocolate cake with molten center', tags: ['dessert', 'chocolate', 'cake', 'lava'] },
    { id: 4, title: 'Chicken Tikka Masala', description: 'Spicy Indian curry with tender chicken', tags: ['indian', 'curry', 'spicy', 'chicken'] },
    { id: 5, title: 'Caesar Salad', description: 'Crisp romaine lettuce with parmesan and croutons', tags: ['salad', 'healthy', 'quick', 'romaine'] },
    { id: 6, title: 'Beef Stroganoff', description: 'Tender beef in creamy mushroom sauce over noodles', tags: ['beef', 'creamy', 'comfort', 'mushrooms'] },
    { id: 7, title: 'Vegetable Stir Fry', description: 'Mixed vegetables stir-fried with soy sauce', tags: ['vegetarian', 'asian', 'quick', 'veggies'] },
    { id: 8, title: 'Blueberry Pancakes', description: 'Fluffy pancakes with fresh blueberries', tags: ['breakfast', 'sweet', 'easy', 'pancakes'] },
    { id: 9, title: 'Mediterranean Quinoa Bowl', description: 'Nutritious quinoa with vegetables and feta', tags: ['healthy', 'vegetarian', 'mediterranean', 'quinoa'] },
    { id: 10, title: 'Thai Green Curry', description: 'Aromatic curry with coconut milk and vegetables', tags: ['thai', 'curry', 'spicy', 'coconut'] },
    { id: 11, title: 'Margherita Pizza', description: 'Classic Italian pizza with tomato, mozzarella, and basil', tags: ['pizza', 'italian', 'cheese', 'tomato'] },
    { id: 12, title: 'Chicken Caesar Wrap', description: 'Grilled chicken wrapped in tortilla with caesar dressing', tags: ['wrap', 'chicken', 'quick', 'lunch'] },
    { id: 13, title: 'Beef Tacos', description: 'Seasoned ground beef in corn tortillas with toppings', tags: ['mexican', 'beef', 'tacos', 'spicy'] },
    { id: 14, title: 'Vegetable Sushi Rolls', description: 'Fresh vegetables rolled in seaweed with sushi rice', tags: ['sushi', 'vegetarian', 'asian', 'healthy'] },
    { id: 15, title: 'Chocolate Chip Cookies', description: 'Classic homemade cookies with chocolate chips', tags: ['cookies', 'chocolate', 'baking', 'sweet'] },
    { id: 16, title: 'Greek Salad', description: 'Fresh tomatoes, cucumbers, olives, and feta cheese', tags: ['salad', 'greek', 'healthy', 'mediterranean'] },
    { id: 17, title: 'Butter Chicken', description: 'Rich and creamy Indian chicken curry', tags: ['indian', 'chicken', 'curry', 'creamy'] },
    { id: 18, title: 'French Toast', description: 'Golden bread soaked in egg mixture and fried', tags: ['breakfast', 'french', 'sweet', 'easy'] },
    { id: 19, title: 'Pad Thai', description: 'Thai stir-fried noodles with shrimp and peanuts', tags: ['thai', 'noodles', 'shrimp', 'spicy'] },
    { id: 20, title: 'Mushroom Risotto', description: 'Creamy Italian rice dish with mushrooms', tags: ['italian', 'rice', 'mushrooms', 'creamy'] },
    { id: 21, title: 'Fish and Chips', description: 'Crispy battered fish with french fries', tags: ['fish', 'british', 'fried', 'comfort'] },
    { id: 22, title: 'Chicken Parmesan', description: 'Breaded chicken cutlet with tomato sauce and cheese', tags: ['italian', 'chicken', 'cheese', 'breaded'] },
    { id: 23, title: 'Bibimbap', description: 'Korean rice bowl with vegetables and meat', tags: ['korean', 'rice', 'vegetables', 'bowl'] },
    { id: 24, title: 'Shakshuka', description: 'North African eggs poached in tomato sauce', tags: ['middle-eastern', 'eggs', 'tomato', 'spicy'] },
    { id: 11, title: 'Margherita Pizza', description: 'Classic Italian pizza with tomato, mozzarella, and basil', tags: ['pizza', 'italian', 'cheese', 'tomato'] },
    { id: 26, title: 'Pepperoni Pizza', description: 'Classic pizza topped with spicy pepperoni and cheese', tags: ['pizza', 'italian', 'pepperoni', 'spicy'] },
    { id: 27, title: 'BBQ Chicken Pizza', description: 'Pizza with BBQ sauce, chicken, onions, and cilantro', tags: ['pizza', 'chicken', 'bbq', 'american'] },
    { id: 28, title: 'Vegetarian Pizza', description: 'Loaded with bell peppers, mushrooms, olives, and cheese', tags: ['pizza', 'vegetarian', 'veggies', 'cheese'] },
    { id: 29, title: 'Hawaiian Pizza', description: 'Sweet and savory pizza with ham, pineapple, and cheese', tags: ['pizza', 'ham', 'pineapple', 'sweet'] },
    { id: 30, title: 'Meat Lovers Pizza', description: 'Loaded with pepperoni, sausage, bacon, and ground beef', tags: ['pizza', 'meat', 'spicy', 'hearty'] },
  ];

  const allRecipes = recipes.length > 0 ? recipes : defaultRecipes;

  // Compute suggestions using useMemo to avoid unnecessary recalculations
  const suggestions = useMemo(() => {
    if (searchTerm.length > 0) {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/)

      const filtered = allRecipes.filter(recipe => {
        if (!recipe) return false;

        const title = (recipe.strMeal || recipe.title || '').toLowerCase()
        const category = (recipe.strCategory || '').toLowerCase()
        const area = (recipe.strArea || '').toLowerCase()
        const tags = recipe.strTags ? recipe.strTags.toLowerCase().split(',') : (Array.isArray(recipe.tags) ? recipe.tags.map(tag => tag.toLowerCase()) : [])

        // Check if any search word matches title, category, area, or tags
        return searchWords.some(word =>
          title.includes(word) ||
          category.includes(word) ||
          area.includes(word) ||
          tags.some(tag => typeof tag === 'string' && tag.includes(word))
        )
      }).slice(0, 5); // Limit to 5 suggestions

      return filtered
    }
    return []
  }, [searchTerm, allRecipes])

  const showSuggestions = suggestions.length > 0 && searchTerm.length > 0;

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  const handleSuggestionClick = (recipe) => {
    const searchText = recipe.strMeal || recipe.title || '';
    setSearchTerm(searchText);
    setIsFocused(false);
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="glass-search-container" ref={searchRef}>
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative' }}
      >
        <motion.input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Delay to allow suggestion clicks
          onKeyDown={handleKeyDown}
          className="glass-search-input"
          animate={{
            boxShadow: isFocused
              ? '0 0 20px rgba(170, 59, 255, 0.3)'
              : '0 0 0 rgba(170, 59, 255, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          className="glass-search-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSearch(searchTerm)}
        >
          🔍
        </motion.button>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              className="search-suggestions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.map((recipe) => (
                <motion.div
                  key={recipe?.idMeal || recipe?.id || Math.random()}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(recipe)}
                  whileHover={{ backgroundColor: 'rgba(170, 59, 255, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="suggestion-content">
                    <div className="suggestion-title">{recipe?.strMeal || recipe?.title || 'Unknown Recipe'}</div>
                    <div className="suggestion-description">
                      {recipe?.strCategory && recipe?.strArea ? `${recipe.strCategory} • ${recipe.strArea}` : (recipe?.description || '')}
                    </div>
                    {recipe?.strTags && (
                      <div className="suggestion-tags">
                        {recipe.strTags.split(',').slice(0, 2).map(tag => (
                          <span key={tag.trim()} className="suggestion-tag">{tag.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GlassSearchBar;