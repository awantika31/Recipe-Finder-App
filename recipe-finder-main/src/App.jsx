import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchRecipes = async (query = search) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  useEffect(() => {
    fetchRecipes("a"); // default mixed recipes
  }, []);

  // Ingredients
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

  // Step-by-step instructions
  const getSteps = (text) => {
    return text.split(". ").filter((step) => step.trim() !== "");
  };

  // 🔴 DETAIL VIEW
  if (selected) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Poppins, sans-serif",
          background: "#0e0a00",
          minHeight: "100vh",
        }}
      >
        <button
          onClick={() => setSelected(null)}
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#ff6b4a",
            color: "#ea0954",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ fontWeight: "800" }}>{selected.strMeal}</h1>

        <img
          src={selected.strMealThumb}
          alt=""
          style={{ width: "300px", borderRadius: "15px" }}
        />

        <h2 style={{ marginTop: "20px" }}>Ingredients</h2>
        <ul>
          {getIngredients(selected).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {getSteps(selected.strInstructions).map((step, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // 🔵 MAIN UI
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(to right, #a52d5d, #251106)",
        minHeight: "100vh",
      }}
    >
      {/* 🔥 Stylish Header */}
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "900",
          background: "linear-gradient(90deg, #ff6b4a, #ff9a3c)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        }}
      >
        🍽️ Recipe Finder
      </h1>

      <p style={{ color: "#080000", marginBottom: "20px" }}>
        Discover delicious recipes from India & around the world 🌍
      </p>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") fetchRecipes();
        }}
        style={{
          padding: "12px",
          width: "260px",
          borderRadius: "10px",
          border: "1px solid #130101",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {/* 🧾 Recipes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {recipes.map((item) => (
          <div
            key={item.idMeal}
            onClick={() => setSelected(item)}
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={item.strMealThumb}
              alt=""
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h3 style={{ margin: "5px 0", fontWeight: "600" }}>
                {item.strMeal}
              </h3>
              <p style={{ color: "#1b0101" }}>{item.strArea}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;