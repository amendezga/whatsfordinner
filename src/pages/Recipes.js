import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Recipes (props) {

    const [savedRecipes, setSavedRecipes] = useState(null);

    const recipesURL = 'http://localhost:3001/recipes';

    async function fetchSavedRecipes () {
        try {
            const response = await fetch(recipesURL);
            const data = await response.json();
            setSavedRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    function loaded () {
        return savedRecipes.map((recipe) => {
            return (
                <div key={recipe._id}>
                    <img src={recipe.image} alt={recipe.name} />
                    <Link to={`recipes/${recipe._id}`}>
                        <h1>{recipe.name}</h1>
                    </Link>
                </div>
            );
        });
    }

    function loading () {
        return <h1>Loading...</h1>
    }

    return (
        savedRecipes ? loaded() : loading()
        )       
}


export default Recipes;