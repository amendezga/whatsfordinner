import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import MakeAbleFood from "../components/MakeableFood";
// import EditIngredient from '../components/EditIngredient';
function Refrigerator(props) {
  const [ingredient, setIngredient] = useState({name: "",});
  const [query, setQuery] = useState({name: "",});
  const [availableRecipes, setAvailableRecipes] = useState(null);
  const [madeFood, setMadeFood] = useState([]);
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
  const handleQueryChange = (event) => {
    setQuery((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleQuerySumbit = (event) => {
    event.preventDefault();
    props.getRecipes(query.name)
    setQuery({
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
        className={madeFood.includes(ingredient.name)?"usedForRecipe ingredient" : "ingredient"}>
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
    { name: "banana split",ingredients:["banana","milk","sugar", "water"]}
  ];

  const nonClickMadeFood=()=>{
    return<h1>Please click the button to see what you can make to eat!</h1>
  }

  const getAvailableRecipes = () => {
    setAvailableRecipes(null)
    const ingredFromRefri = props.refrigerator;
    // console.log(props.recipes.hits)
    setAvailableRecipes(props.recipes.hits)
    // setAvailableRecipes(props.recipes.hits
    //   .filter((recipe) => {
    //     return recipe.ingredients.every((ingredient) => {
    //       return ingredFromRefri.find((i) => i.name === ingredient);
    //     });
    //   }).map((recipe) => recipe))
  };

  const usedForRecipe = (recipe) => {
    if (recipe ==null){
      setMadeFood([""])
    }
    const matchedIngred = props.refrigerator.filter(
       (r) =>(recipe.ingredients.includes(r.name))).map(obj => obj.name)
       setMadeFood(matchedIngred);

  };
  const addToList=()=>{
    // const removeIngrId = props.refrigerator.filter(
    // (r) => (madeFood.includes(r.name)?props.deleteIngredient(r._id):null)
    // )
  }

  useEffect(()=>{
    // console.log(madeFood)
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
      <form onSubmit={handleQuerySumbit}>
        <input
          type="text"
          value={query.name}
          name="name"
          placeholder="banana+milk"
          onChange={handleQueryChange}
        />
        <input type="submit" value="SearchForRecipes" />
      </form>
      <h3>Here is recipe based on query:</h3>
      <button onClick={getAvailableRecipes}>
        Click for see today's availableRecipe
      </button>
      {!availableRecipes?nonClickMadeFood():
      <MakeAbleFood
      usedForRecipe={usedForRecipe}
      availableRecipes={availableRecipes}
      deleteIngredient={props.deleteIngredient}
      getRecipes={props.getRecipes}
      />}
      {madeFood.length>0?<button onClick={addToList}>add to today's recipe</button>:null}

      
    </div>
  );
}
export default Refrigerator;
