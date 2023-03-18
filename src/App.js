import './App.css';
import React from 'react';
import { auth } from './firebase';
import { useState, useEffect } from 'react';

// components import
import Main from './components/Main'
import RecipeMain from './components/RecipesMain';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';


function App() {
  const [user, setUser] = useState(null);
  const [fetchRecipes, setFetchRecipes] = useState(null);
  const [availableRecipes, setAvailableRecipes] = useState(null);

  const recipesURL = 'https://whatsfordinnerteam.herokuapp.com/recipes/';

  const getRecipes = async(query)=>{
    const APP_ID = "f01b9fa1"
    const APP_KEY = "9a089156b246ffaf2df7d06076e6ee9d"
    const Recipe_API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&random=true&app_id=${APP_ID}&app_key=${APP_KEY}`
    try{
        const response = await fetch(Recipe_API_URL,{
            method:'GET'
        });
        const recipes = await response.json();
    setFetchRecipes(recipes);
    }catch(error){
        console.log(error);
    }}

    async function createSavedRecipe (recipe) {
        try {
            if (user) {
                const token = await user.getIdToken();
                await fetch(recipesURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(recipe),
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleSaveRecipe (evt) {
        const handleRecipe = availableRecipes[evt.target.id].recipe;
        const formatRecipe = {
            name: handleRecipe.label,
            image: handleRecipe.images.REGULAR.url,
            healthLabel: ['none'],
            ingredients: handleRecipe.ingredientLines,
            nutrInfo: {
                cal: handleRecipe.calories / handleRecipe.yield,
                fat: handleRecipe.totalNutrients.FAT.quantity / handleRecipe.yield,
                chol: handleRecipe.totalNutrients.CHOLE.quantity / handleRecipe.yield,
                sod: handleRecipe.totalNutrients.NA.quantity / handleRecipe.yield,
                carbs: handleRecipe.totalNutrients.CHOCDF.quantity / handleRecipe.yield,
                protein: handleRecipe.totalNutrients.PROCNT.quantity / handleRecipe.yield,
            },
            eatenToday: false
        }
        for (const [key, value] of Object.entries(formatRecipe.nutrInfo)) {
            formatRecipe.nutrInfo[key] = Math.round(value);
        }
        createSavedRecipe(formatRecipe);
    }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="App">
        <Nav user={user} />
        <Main
            user={user}
            getRecipes={getRecipes}
            recipes={fetchRecipes}
            availableRecipes={availableRecipes}
            setAvailableRecipes={setAvailableRecipes}
            handleSaveRecipe={handleSaveRecipe}
        />
        <RecipeMain
            user={user}
            recipesURL={recipesURL}
            getRecipes={getRecipes}
            fetchRecipes={fetchRecipes}
            availableRecipes={availableRecipes}
            setAvailableRecipes={setAvailableRecipes}
            handleSaveRecipe={handleSaveRecipe}
        />
        <Footer />
    </div>
  );
}


export default App;