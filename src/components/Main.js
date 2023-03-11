import {useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import Refrigerator from "../pages/Refrigerator"

function Main(){
    // import ingredient from backend
    const API_URL = "http://localhost:2000/refrigerator"
    const [refrigerator,setRefrigerator]=useState(null)

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
        /> }/>
        </Routes>
    </main>
)
}
export default Main;