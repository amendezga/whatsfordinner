import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import RecipeIndex from '../pages/RecipeIndex';
import RecipeShow from '../pages/RecipeShow';

function RecipesMain () {

    const [savedRecipes, setSavedRecipes] = useState(null);

    const recipesURL = 'http://localhost:2000/recipes/';

    async function fetchSavedRecipes () {
        try {
            const response = await fetch(recipesURL);
            const data = await response.json();
            setSavedRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSavedRecipe (id) {
        await fetch(recipesURL + id, {
            method: 'DELETE',
        });
        fetchSavedRecipes();
    }

    useEffect(() => {
        fetchSavedRecipes();
    }, []);


    return (
        <main>
            <Routes>
                <Route path='/recipes' element={ <RecipeIndex recipes={savedRecipes} />} />
                <Route path='/recipes/:id' element={ <RecipeShow recipes={savedRecipes} deleteRecipe={deleteSavedRecipe} />} />
                {/* <Route path='nutrition' element={ <Nutrtition recipes={savedRecipes} />} /> */}
            </Routes>
        </main>
    );
}


export default RecipesMain;