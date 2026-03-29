import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  if (!recipe) return null;

  // Extract ingredients and measures from the API response
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();
  const instructions = recipe.strInstructions ? recipe.strInstructions.split('\r\n').filter(step => step.trim()) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="recipe-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className="modal-close" onClick={onClose}>×</button>

            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
                  }}
                />
              </div>

              <div className="modal-details">
                <h1>{recipe.strMeal}</h1>
                <p className="modal-description">{recipe.strCategory} • {recipe.strArea}</p>

                <div className="modal-meta">
                  <div className="meta-item">
                    <span className="meta-icon">🏷️</span>
                    <span>{recipe.strCategory}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🌍</span>
                    <span>{recipe.strArea}</span>
                  </div>
                </div>

                {recipe.strTags && (
                  <div className="modal-tags">
                    {recipe.strTags.split(',').map(tag => (
                      <span key={tag.trim()} className="modal-tag">{tag.trim()}</span>
                    ))}
                  </div>
                )}

                {/* Recipe Instructions */}
                <div className="recipe-instructions">
                  <h3>Instructions</h3>
                  <ol>
                    {instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Ingredients */}
                <div className="recipe-ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {ingredients.map((item, index) => (
                      <li key={index}>
                        {item.measure} {item.ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;