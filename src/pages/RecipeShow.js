import { Link, useParams, useNavigate } from 'react-router-dom';

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
            <div key={recipe._id} className='infoContainer'>
                <div className='recipeInfo'>
                    <img src={recipe.image} alt={recipe.name} />
                    <h1>{recipe.name}</h1>
                    {/* <button onClick={() => {props.handleClick(recipe._id)}}>
                        {recipe.eatenToday ? 'Not Eaten Today' : 'Eaten Today'}
                        </button><br /><br /> */}
                    <button onClick={handleDelete}>Remove Saved Recipe</button><br />
                    {/* <Link to={`/recipes/edit/${recipe._id}`} >
                        Update Recipe
                    </Link><br /> */}
                <section className='details'>
                    <h4>Full Recipe Information:</h4>
                    <p>
                        <a href={recipe.detailsUrl} target="_blank">Click here to see recipe information</a>
                    </p>
                </section>
                <section className='ingredients'>
                    <h2>Ingredients:</h2>
                    <ul>
                    {recipe.ingredients.map((i) => {
                        return <li>{i}</li>
                    })}
                    </ul>
                </section>
                    </div>
                <div className='nutrition'>
                    <h2>Nutrition Facts</h2>
                    <table>
  <thead>
    <tr>
      <th>Nutrient</th>
      <th>Amount per serving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Calories</th>
      <td>{recipe.nutrInfo.cal}</td>
    </tr>
    <tr>
      <th scope="row">Total Fat</th>
      <td>{recipe.nutrInfo.fat}g</td>
    </tr>
    <tr>
      <th scope="row">Cholesterol</th>
      <td>{recipe.nutrInfo.chol}mg</td>
    </tr>
    <tr>
      <th scope="row">Sodium</th>
      <td>{recipe.nutrInfo.sod}mg</td>
    </tr>
    <tr>
      <th scope="row">Total Carbohydrates</th>
      <td>{recipe.nutrInfo.carbs}g</td>
    </tr>
    <tr>
      <th scope="row">Protein</th>
      <td>{recipe.nutrInfo.protein}g</td>
    </tr>
  </tbody>
</table>
                </div>
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