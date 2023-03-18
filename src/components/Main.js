import {useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import Refrigerator from "../pages/Refrigerator"

function Main(){
    // import ingredient from backend
    const API_URL = "https://whatsfordinnerteam.herokuapp.com/refrigerator"
    const [refrigerator,setRefrigerator]=useState(null)

    const getIngredient= async()=>{
        try{
            const reponse = await fetch(API_URL,{
                method:'GET'
            })
            const ingredients = await reponse.json();
        setRefrigerator(ingredients)
        }catch(error){
            console.log(error);
        }
      }, [props.user]);

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
             console.log(error);         
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

useEffect(()=>{
    getIngredient();
}, []);
return(
    <main>
        <Routes>
        <Route path="/refrigerator" element={<Refrigerator 
        refrigerator={refrigerator} 
        createIngredient={createIngredient}
        deleteIngredient={deleteIngredient}
        editIngredient={editIngredient}
        getRecipes={props.getRecipes}
        recipes={props.recipes}
        availableRecipes={props.availableRecipes}
        setAvailableRecipes={props.setAvailableRecipes}
        handleSaveRecipe={props.handleSaveRecipe}
        /> }/>
        </Routes>
    </main>
)
}
export default Main;