import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Recipes from '../pages/Recipes';

function Main (props) {

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

    return (
        <main>
            <Routes>
                <Route path='/recipes' element={ <Recipes savedRecipes={savedRecipes} /> } />
            </Routes>
        </main>
    )
}


export default Main;