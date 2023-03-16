import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import RecipeIndex from '../pages/RecipeIndex';
import RecipeShow from '../pages/RecipeShow';
import RecipeUpdate from '../pages/RecipeUpdate';

function RecipesMain (props) {

    const [savedRecipes, setSavedRecipes] = useState(null);

    const recipesURL = 'https://whatsfordinnerteam.herokuapp.com/recipes/';

    const fetchSavedRecipes = useCallback(async () => {
        try {
            const token = await props.user.getIdToken();
            const response = await fetch(recipesURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });
            const data = await response.json();
            setSavedRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }, [props.user]);

    async function deleteSavedRecipe (id) {
        if (props.user) {
            const token = await props.user.getIdToken();
            await fetch(recipesURL + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }
        fetchSavedRecipes();
    }

    async function updateSavedRecipe (recipe, id) {
        if (props.user) {
            const token = await props.user.getIdToken();
            await fetch(recipesURL + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(recipe)
            });
        }
        fetchSavedRecipes();
    }

    function handleEatenTodayClick (id) {
        setSavedRecipes((savedRecipes) => {
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
        if (props.user) {
            fetchSavedRecipes();
        } else {
            setSavedRecipes(null);
        }
    }, [props.user, fetchSavedRecipes]);


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