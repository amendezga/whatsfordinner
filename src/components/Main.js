import {useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import Refrigerator from "../pages/Refrigerator"
function Main(){
    // import ingredient from backend
    // (Make sure the port!!!!)
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
        }
}

useEffect(()=>{
    getIngredient();
},[])
return(
    <main>
        <Routes>
            <Route path="/" element={<Refrigerator refrigerator={refrigerator}/> }/>
            {/* <MakeableFood/> */}
        </Routes>
    </main>
)
}
export default Main;