import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
function MakeAbleFood(props){

    const navigate = useNavigate();

    function matchIngredients () {

        const inStockFood = [];
        let recipeFoodArray = [];
        props.refrigerator.map((r) => {
            inStockFood.push(r.name);
        });
        props.availableRecipes.map((r) => {
            r.recipe.ingredients.map((f) => {
                f.food.toLowerCase();
                recipeFoodArray.push(f.food);
                console.log(recipeFoodArray);
            })
            let isMatched = inStockFood.every(f => recipeFoodArray.includes(f.toLowerCase()))
            console.log(isMatched);
            recipeFoodArray = [];
        });
    }

    function handleClick (evt) {
        navigate(`/recipes/preview/${evt.target.className}`);
    }

    function loaded () {
        return (
            <><h1>Available Recipes</h1>
    <div className ="ingredients">
    
        {/* {matchIngredients()} */}
    {
        props.availableRecipes.map((availableRecipe,index)=>{
         return( <div key={index}>
         <h3>{availableRecipe.recipe.label}</h3>
         <img src={availableRecipe.recipe.images.THUMBNAIL.url} alt="" />
         {/* <ul>Includes:
            {availableRecipe.recipe.ingredients.map((r) => {
                return <li>{r.food}</li>
         })}</ul> */}
         <button onClick={handleClick} className={index}>See Recipe Details</button>
         <button id={index} onClick={props.handleSaveRecipe}>Save Recipe</button>
     </div>)
        })
    }
    </div>
    </>

        )
    }

    function loading () {
        return <h1>Loading...</h1>
    }

return props.availableRecipes ? loaded() : loading();

}
export default MakeAbleFood