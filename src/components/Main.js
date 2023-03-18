import {useState,useEffect, useCallback} from 'react'
import { Routes, Route } from 'react-router-dom';
import Refrigerator from "../pages/Refrigerator"

function Main (props) {
    // import ingredient from backend
    const API_URL = "https://whatsfordinnerteam.herokuapp.com/refrigerator"
    const [refrigerator,setRefrigerator]=useState(null)

    const getIngredient= useCallback (async()=>{
        try{
          const token = await props.user.getIdToken();
            const response = await fetch(API_URL,{
                method:'GET',
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            });
            const ingredients = await response.json();
        setRefrigerator(ingredients);
        }catch(error){
            console.log(error);
        }
      }, [props.user]);

    const createIngredient = async (ingredient) => {
        try {
          if (props.user) {
            const token = await props.user.getIdToken();
            await fetch(API_URL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                  },
                  body: JSON.stringify(ingredient),
                });
                getIngredient();
          }
            } catch (error) {
             console.log(error);         
            }
    }

          const deleteIngredient = async (id) => {
            if (props.user) {
              const token = await props.user.getIdToken();
              await fetch(API_URL +"/"+id, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              });
            }
              getIngredient();
          }

          const editIngredient = async(ingredient,id)=>{
            if (props.user) {
              const token = await props.user.getIdToken;
              await fetch(API_URL+"/"+id,{
              method:'PUT',
              header:{
                  'Conmtent-Type':'Application/json',
                  'Authorization': 'Bearer ' + token
              },
              body:JSON.stringify(ingredient),
              });
            }
            getIngredient();
          }

useEffect(()=>{
  if (props.user) {
    getIngredient();
  } else {
    setRefrigerator(null);
  }
}, [props.user, getIngredient]);

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