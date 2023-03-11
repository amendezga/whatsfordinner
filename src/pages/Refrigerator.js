import { useParams } from "react-router-dom";
import { useState } from "react";
import MakeAbleFood from "../components/MakeableFood";
// import EditIngredient from '../components/EditIngredient';
function Refrigerator(props) {
  const [ingredient, setIngredient] = useState({name: "",});
  const [availableRecipes, setAvailableRecipes] = useState(null);
  const [madeFood, setmadeFood] = useState(null);
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
        key={ingredient._id}
        className={madeFood ? "usedForRecipe ingredient" : "ingredient"}
      >
        <p>{ingredient.name}</p>
        <span>
          <button onClick={() => props.deleteIngredient(ingredient._id)}>
            Delete
          </button>
          {/* <button onClick={handleEdit}>Edit</button> */}
        </span>
      </div>
    ));
  };

  const recipes = [
    { name: "bobatea", ingredients: ["boba", "milktea"] },
    { name: "banana", ingredients: ["banana"] },
  ];

  const nonClickMadeFood=()=>{
    return<h1>Please click the button to see what you can make to eat!</h1>
  }

  const clickMadeFood = () => {
    setAvailableRecipes(null)
    const ingredFromRefri = props.refrigerator;
    setAvailableRecipes(recipes
      .filter((recipe) => {
        return recipe.ingredients.every((ingredient) => {
          return ingredFromRefri.find((i) => i.name === ingredient);
        });
      }).map((recipe) => recipe))
      // console.log(availableRecipes)
  };

  
  const usedForRecipe = (recipe) => {
    const matchedIngred = props.refrigerator.find(
      (u) => u.name === recipe.name
    );
    console.log(matchedIngred.name);
    setmadeFood(true);
  };

  return (
    <div className="refrigerator">
      <h2>What we have in the refrigerator?</h2>
      <div className="ingredients">
        {!props.refrigerator ? loading() : loaded()}
      </div>
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
      <h3>Here is something we can make today</h3>
      <button onClick={clickMadeFood}>
        Click for see today's availableRecipe
      </button>
      {!availableRecipes?nonClickMadeFood():
      <MakeAbleFood
      usedForRecipe={usedForRecipe}
      availableRecipes={availableRecipes}
      />}
  
      
    </div>
  );
}
export default Refrigerator;
