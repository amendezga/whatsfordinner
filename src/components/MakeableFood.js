import {useState} from 'react'
function MakeAbleFood(props){
    const [circled,setCircle] = useState(null)
    const availableRecipes = props.availableRecipes
    // const availableRecipes = [
    //      { name: 'bobatea', ingredients: ['boba', 'milktea']},
    //      { name: 'banana', ingredients: ['banana']} ]

    const handleAddClick=(event,index)=>{
        setCircle(index)
        // console.log(availableRecipes[index])
        props.usedForRecipe(availableRecipes[index])

    }
    const handleRemoveClick=(event)=>{
        setCircle("")
        props.usedForRecipe(null)
    }
return(
    <><h1>Here is avail recipes</h1>
    <div className ="ingredients">
    
    {
        availableRecipes.map((availableRecipe,index)=>{
         return( <div className={circled===index?"usedForRecipe ingredient":"ingredient"}>
         {availableRecipe.recipe.label}
         <button onClick={(event) => handleAddClick(event, index)}>AddTomake</button>
         
         <button onClick={(event) => handleRemoveClick(event, index)}>Remove</button>
     </div>)
        })
    }
    </div>
    </>
)

}
export default MakeAbleFood