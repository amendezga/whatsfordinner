import {useState} from 'react'
function MakeAbleFood(props){
    const [circled,setCircle] = useState(null)
    const availableRecipes = props.availableRecipes
    // const availableRecipes = [
    //      { name: 'bobatea', ingredients: ['boba', 'milktea']},
    //      { name: 'banana', ingredients: ['banana']} ]

    const handleAddClick=(event,index)=>{
        setCircle(index)
        console.log(availableRecipes[index])
        props.usedForRecipe(availableRecipes[index])
    }
    const handleRemoveClick=(event)=>{
        setCircle("")
    }
return(
    <div className ="refrigerator">
    <h1>Here is avail recipes</h1>
    {
        availableRecipes.map((availableRecipe,index)=>{
         return( <div className={circled===index?"usedForRecipe":"ingredient"}>
         {availableRecipe.name}
         <button onClick={(event) => handleAddClick(event, index)}>AddTomake</button>
         
         <button onClick={(event) => handleRemoveClick(event, index)}>Remove</button>
     </div>)
        })
    }
    </div>

)

}
export default MakeAbleFood