import { useParams } from 'react-router-dom';
import {useState}from 'react';
 function Refrigerator(props){
    const[ingredient,setIngredient] = useState({
        name:"",
    })

    const handleChange = (event) => {
        setIngredient((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }
      const handleSubmit = (event) => { 
        event.preventDefault();
        props.createIngredient(ingredient);
        setIngredient({
          name: '',
        });
      }

    const loading = () => {
        return <h1>Loading...</h1>;
      }
    const loaded=()=>{
        return props.refrigerator.map((ingredient) => (
            <div key={ingredient._id} className="ingredient">
            <p>{ingredient.name}</p>
            <span>
                <button onClick={()=>props.deleteIngredient(ingredient._id)}>Delete</button>
                <button>Edit</button>
            </span>
            </div>)
            )}
    
    return (
    <div className ="refrigerator">  
        <h2>What we have in the refrigerator?</h2>
        <div className ="ingredients">
        {!props.refrigerator? loading():loaded()}</div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={ingredient.name}
            name="name"
            placeholder="boba"
            onChange={handleChange}
            />
    <input type="submit" value="Add Ingredient" />
  </form>
       <h3>here is something we can make today</h3>
       <button>Click and See</button>
    </div>
    )}
export default Refrigerator;