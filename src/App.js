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
        <header className="App-header">
        <Nav user={user} />
        <Main
            user={user}
            getRecipes={getRecipes}
            recipes={fetchRecipes}
            availableRecipes={availableRecipes}
            setAvailableRecipes={setAvailableRecipes}
        />
        <RecipeMain
            user={user}
            getRecipes={getRecipes}
            fetchRecipes={fetchRecipes}
            availableRecipes={availableRecipes}
            setAvailableRecipes={setAvailableRecipes}
        />
        <Footer />
        </header>
    </div>
  );
}


export default App;