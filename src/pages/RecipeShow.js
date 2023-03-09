import { useParams, useNavigate } from 'react-router-dom';

function RecipeShow (props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = props.recipes ? props.recipes.find((r) => { return r._id === id }) : null;


    function handleDelete () {
        props.deleteRecipe(recipe._id);
        navigate('/recipes');
    }

    function loaded () {
        return (
            <>
                <div className='recipeInfo'>
                    <img src={recipe.image} alt={recipe.name} />
                    <h1>{recipe.name}</h1>
                    <button>Mark as eaten today</button>
                    <button>Edit recipe</button>
                    <button onClick={handleDelete}>Remove Saved Recipe</button>
                </div>
                <ul className='labels'>
                    <h4>Health Labels:</h4>
                {recipe.healthLabel.length !== 0 ? 
                    recipe.healthLabel.map((label) => {
                        return <li>{label}</li>
                })
                :
                <li>none</li>
            }
                </ul>
                <ul className='ingredients'>
                    <h2>Ingredients:</h2>
                    {recipe.ingredients.map((i) => {
                        return <li>{i}</li>
                    })}
                </ul>
                <div className='nutrition'>
                    <h2>Nutrition Facts</h2>
                    <span>
                        <h3>Calories</h3>
                        {recipe.nutrInfo.cal}
                    </span>
                    <span>
                        <h3>Total Fat</h3>
                        {recipe.nutrInfo.fat}g
                    </span>
                    <span>
                        <h3>Cholesterol</h3>
                        {recipe.nutrInfo.chol}mg
                    </span>
                    <span>
                        <h3>Sodium</h3>
                        {recipe.nutrInfo.sod}mg
                    </span>
                    <span>
                        <h3>Total Carbohydrates</h3>
                        {recipe.nutrInfo.carbs}g
                    </span>
                    <span>
                        <h3>Protein</h3>
                        {recipe.nutrInfo.protein}g
                    </span>
                </div>
            </>
        )
    }

    function loading () {
        return <h1>Loading...</h1>
    }

    return recipe ? loaded() : loading();
}


export default RecipeShow;