import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import RecipeIndex from '../pages/RecipeIndex';
import RecipeShow from '../pages/RecipeShow';
import RecipeUpdate from '../pages/RecipeUpdate';

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

    async function updateSavedRecipe (recipe, id) {
        await fetch(recipesURL + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(recipe)
        });
        fetchSavedRecipes();
    }

    function handleEatenTodayClick (id) {
        setSavedRecipes((savedRecipes) => {
            // console.log(savedRecipes);
            const recipesCopy = [...savedRecipes];
            let foundIndex = recipesCopy.findIndex((r) => {
                return r._id === id
            });
            const foundRecipeCopy = recipesCopy[foundIndex];
            recipesCopy.splice(foundIndex, 1, {
                ...foundRecipeCopy,
                eatenToday: !foundRecipeCopy.eatenToday
            });
            return recipesCopy;
        });
    }

    useEffect(() => {
        fetchSavedRecipes();
    }, []);


    return (
        <main>
            <Routes>
                <Route path='/recipes' element={ <RecipeIndex recipes={savedRecipes} />} />
                <Route
                    path='/recipes/:id'
                    element={
                        <RecipeShow
                            recipes={savedRecipes}
                            deleteRecipe={deleteSavedRecipe}
                            handleClick={handleEatenTodayClick}
                        />
                    }
                />
                <Route path='/recipes/edit/:id' element={ <RecipeUpdate recipes={savedRecipes} updateRecipe={updateSavedRecipe} /> }/>
                {/* <Route path='nutrition' element={ <Nutrtition recipes={savedRecipes} />} /> */}
            </Routes>
        </main>
    );
}


export default RecipesMain;