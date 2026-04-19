import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("recipeUser")) || null
  );

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  /* FETCH RECIPES */
  const fetchRecipes = async (query = search) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  useEffect(() => {
    if (user) fetchRecipes("a");
  }, [user]);

  /* LOGIN PAGE FIRST */
  if (!user) {
    return <LoginPage setUser={setUser} />;
  }

  /* INGREDIENTS */
  const getIngredients = (meal) => {
    let list = [];

    for (let i = 1; i <= 20; i++) {
      let ing = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];

      if (ing && ing.trim() !== "") {
        list.push(`${ing} - ${measure}`);
      }
    }

    return list;
  };

  const getSteps = (text) => {
    return text.split(". ").filter((step) => step.trim() !== "");
  };

  /* DETAILS PAGE */
  if (selected) {
    return (
      <div className="details-page">
        <div className="top-bar">
          <button className="home-btn" onClick={() => setSelected(null)}>
            🏠 Home
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("recipeUser");
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>

        <h1 className="details-title">{selected.strMeal}</h1>

        <img
          src={selected.strMealThumb}
          alt={selected.strMeal}
          className="details-image"
        />

        <div className="card-box">
          <h2>Ingredients</h2>

          <div className="ingredients-grid">
            {getIngredients(selected).map((item, i) => (
              <div key={i} className="ingredient-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-box">
          <h2>Instructions</h2>

          <div className="steps-box">
            {getSteps(selected.strInstructions).map((step, i) => (
              <div key={i} className="step-item">
                <span className="step-number">{i + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* HOME PAGE */
  return (
    <div className="home-page">
      <div className="nav-bar">
        <h2>🍽️ Recipe Finder</h2>

        <div className="nav-right">
          <span>Hi, {user.name}</span>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("recipeUser");
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <h1 className="main-title">Find Your Favorite Recipes</h1>

      <p className="subtitle">
        Search dishes from around the world
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchRecipes();
          }}
        />

        <button onClick={() => fetchRecipes()}>Search</button>
      </div>

      <div className="recipe-grid">
        {recipes.map((item) => (
          <div
            key={item.idMeal}
            className="recipe-card"
            onClick={() => setSelected(item)}
          >
            <img src={item.strMealThumb} alt={item.strMeal} />

            <div className="recipe-content">
              <h3>{item.strMeal}</h3>
              <p>{item.strArea}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* LOGIN PAGE COMPONENT */
function LoginPage({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name || !email) {
      alert("Please fill all details");
      return;
    }

    const userData = { name, email };

    localStorage.setItem("recipeUser", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🍽️ Recipe Finder</h1>
        <p>Login to continue</p>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin}>
          Enter App
        </button>
      </div>
    </div>
  );
}

export default App;