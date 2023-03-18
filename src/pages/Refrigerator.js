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
    if (props.refrigerator) {
        const chosenIngredients = [];
        const refrigeratorCopy = [...props.refrigerator];
        for (let i = 0; i < 3; i++) {
          let randomIndex = Math.floor(Math.random() * refrigeratorCopy.length)
          let randomIngredient = refrigeratorCopy[randomIndex];
          refrigeratorCopy.splice(randomIndex, 1);
          chosenIngredients.push(randomIngredient);
        }
        const ingredientArray = chosenIngredients.map((i) => {
            return i.name;
        });
        props.getRecipes(ingredientArray.toString());
        if (props.recipes) {
            props.setAvailableRecipes(props.recipes.hits);
        }
    }
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
      <br />
      <button onClick={getAvailableRecipes}>
        See more recipes
        </button>
      {props.availableRecipes ? 
      <MakeAbleFood
      refrigerator={props.refrigerator}
      availableRecipes={props.availableRecipes}
      deleteIngredient={props.deleteIngredient}
      getRecipes={props.getRecipes}
      handleSaveRecipe={props.handleSaveRecipe}
      />
    : 'placeholder'}
    </div>
  );
}

export default Refrigerator;