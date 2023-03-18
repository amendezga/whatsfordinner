import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import RecipeIndex from '../pages/RecipeIndex';
import RecipeShow from '../pages/RecipeShow';
import RecipeUpdate from '../pages/RecipeUpdate';
import RecipeNew from '../pages/RecipeNew';
import { async } from '@firebase/util';

function RecipesMain () {

    const [savedRecipes, setSavedRecipes] = useState(null);

    const recipesURL = 'http://localhost:2000/recipes/';

    const fetchSavedRecipes = useCallback(async () => {
        try {
            const response = await fetch(props.recipesURL);
            const data = await response.json();
            setSavedRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSavedRecipe (id) {
        await fetch(props.recipesURL + id, {
            method: 'DELETE',
        });
        fetchSavedRecipes();
    }

    async function updateSavedRecipe (recipe, id) {
        await fetch(props.recipesURL + id, {
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
        // const recipe = savedRecipes.filter((r) => {
        //     return r._id === id
        // });
        // recipe[0].eatenToday  = !recipe[0].eatenToday;
        // updateSavedRecipe(recipe, id);
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
                <Route path='/recipes/edit/:id' element={ <RecipeUpdate recipes={savedRecipes} updateRecipe={updateSavedRecipe} /> } />
                <Route
                    path='/recipes/new'
                    element={
                        <RecipeNew
                            getRecipes={props.getRecipes}
                            availableRecipes={props.availableRecipes}
                            setAvailableRecipes={props.setAvailableRecipes}
                            fetchRecipes={props.fetchRecipes}
                            handleSaveRecipe={props.handleSaveRecipe}
                        />
                    }
                />
                {/* <Route path='nutrition' element={ <Nutrtition recipes={savedRecipes} />} /> */}
            </Routes>
        </main>
    );
}


export default RecipesMain;