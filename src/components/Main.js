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
              // TODO: Add a task we wish to perform in the event of an error
            }
          }

useEffect(()=>{
    getIngredient();
}, []);
return(
    <main>
        <Routes>
        <Route path="/refrigerator" element={<Refrigerator refrigerator={refrigerator} createIngredient={createIngredient}/> }/>
        </Routes>
    </main>
)
}
export default Main;