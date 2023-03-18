import { useState,useEffect,useCallback } from "react";
import MakeAbleFood from "../components/MakeableFood";

function Refrigerator(props) {
  const [ingredient, setIngredient] = useState({name: "",});
  const [query, setQuery] = useState({name: "",});

  
  const handleChange = (event) => {
    setIngredient((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createIngredient(ingredient);
    setIngredient({
      name: "",
    });
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const loaded = () => {
    return props.refrigerator.map((ingredient) => (
      <div
        key={ingredient._id}>
        <p>{ingredient.name}</p>
        <span>
          <button onClick={() => props.deleteIngredient(ingredient._id)}>
            Delete
          </button>
        </span>
      </div>
    ));
  };

  const  getAvailableRecipes= useCallback(async ()=> {
    const chosenIngredients = [];
    const refrigeratorCopy = [...props.refrigerator];
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * refrigeratorCopy.length)
      let randomIngredient = refrigeratorCopy[randomIndex];
      refrigeratorCopy.splice(randomIndex, 1);
      chosenIngredients.push(randomIngredient);
    }
    setQuery(() => {
      const ingredientArray = chosenIngredients.map((i) => {
        return i.name;
      });
      return ingredientArray.toString();
    });
    props.getRecipes(query);
    props.setAvailableRecipes(props.recipes.hits)
  });

  useEffect(()=>{
    getAvailableRecipes();
}, []);

  return (
    <div className="refrigerator">
      <h2>What we have in the refrigerator?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ingredient.name}
          name="name"
          placeholder="boba"
          onChange={handleChange}
        />
        <input type="submit" value="Add Ingredient" />
      </form>
      <div className="ingredients">
        {!props.refrigerator ? loading() : loaded()}
      </div>
      <h3>Here is recipe based on query:</h3>
      <button onClick={getAvailableRecipes}>
        Click for see today's availableRecipe
        </button>
      {props.availableRecipes ? 
      <MakeAbleFood
      refrigerator={props.refrigerator}
      availableRecipes={props.availableRecipes}
      deleteIngredient={props.deleteIngredient}
      getRecipes={props.getRecipes}
      />
    : 'placeholder'}
    </div>
  );
}

export default Refrigerator;