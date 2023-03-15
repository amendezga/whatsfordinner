import {useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import Refrigerator from "../pages/Refrigerator"

function Main(){
    // import ingredient from backend
    const API_URL = "http://localhost:2000/refrigerator"
    const [refrigerator,setRefrigerator]=useState(null)
    const [recipes,setRecipes]=useState(null)

    const getIngredient= async()=>{
        try{
            const reponse = await fetch(API_URL,{
                method:'GET'
            })
            const ingredients = await reponse.json();
        setRefrigerator(ingredients)
        }catch(error){
            console.log("something wrong or empty refrigerator")
        }}

    const createIngredient = async (ingredient) => {
        try {
            await fetch(API_URL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'Application/json',
                  },
                  body: JSON.stringify(ingredient),
                });
                getIngredient();
            } catch (error) {
             console.log('createIngredient not works')            
            }
          }
          const deleteIngredient = async (id) => {
            await fetch(API_URL +"/"+id, {
              method: 'DELETE',
            });
            getIngredient();
          };
          const editIngredient = async(ingredient,id)=>{
            await fetch(API_URL+"/"+id,{
            method:'PUT',
            header:{
                'Conmtent-Type':'Application/json'
            },
            body:JSON.stringify(ingredient),
            })
            getIngredient();
          }

          const getRecipes= async(query)=>{
            const APP_ID = "f01b9fa1"
            const APP_KEY = "9a089156b246ffaf2df7d06076e6ee9d"
            const Recipe_API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
            try{
                const reponse = await fetch(Recipe_API_URL,{
                    method:'GET'
                })
                const recipes = await reponse.json();
            setRecipes(recipes)
            }catch(error){
                console.log("something wrong or not avaiable recipes")
            }}

useEffect(()=>{
    getIngredient();
    // getRecipes("banana milk") 
}, []);
return(
    <main>
        <Routes>
        <Route path="/refrigerator" element={<Refrigerator 
        refrigerator={refrigerator} 
        createIngredient={createIngredient}
        deleteIngredient={deleteIngredient}
        editIngredient={editIngredient}
        getRecipes={getRecipes}
        recipes={recipes}
        /> }/>
        </Routes>
    </main>
)
}
export default Main;