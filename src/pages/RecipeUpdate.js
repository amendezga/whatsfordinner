import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeUpdate (props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = props.recipes ? props.recipes.find((r) => { return r._id === id }) : null;

    const [formState, setFormState] = useState(recipe);

    function handleChange (evt) {
        let nutrInfo = 'nutrInfo'
        if (evt.target.attributes.type.value !== 'number') {
            setFormState({
                ...formState,
                [evt.target.name]: evt.target.value,
            });
        } else {
            setFormState({
                ...formState,
                nutrInfo: {
                    ...formState[nutrInfo],
                    [evt.target.name]: evt.target.value,
                }
            });
        }
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        props.updateRecipe(formState, recipe._id);
        navigate(`/recipes/${recipe._id}`);
    }

    return (
        <div>
       <form onSubmit={handleSubmit} autoComplete="off" >
            <input type="text" value={formState.name} name="name" placeholder="recipe name" onChange={handleChange} />
            <input type="text" value={formState.image} name="image" placeholder="recipe image" onChange={handleChange} />
            <input type="text" value={formState.healthLabel} name="healthLabel" placeholder="Health Label" onChange={handleChange} />
            <input type="text" value={formState.ingredients} name="ingredients" placeholder="ingredients" onChange={handleChange} />
            <input type="number" value={formState.nutrInfo.cal} name="cal" placeholder="calories" onChange={(evt) => {handleChange(evt)}} />
            <input type="number" value={formState.nutrInfo.fat} name="fat" placeholder="total fat" onChange={(evt) => {handleChange(evt)}} />
            <input type="number" value={formState.nutrInfo.chol} name="chol" placeholder="cholesterol" onChange={(evt) => {handleChange(evt)}} />
            <input type="number" value={formState.nutrInfo.sod} name="sod" placeholder="sodium" onChange={(evt) => {handleChange(evt)}} />
            <input type="number" value={formState.nutrInfo.carbs} name="carbs" placeholder="total carbohydrates" onChange={(evt) => {handleChange(evt)}} />
            <input type="number" value={formState.nutrInfo.protein} name="protein" placeholder="protein" onChange={(evt) => {handleChange(evt)}} />
            <input type="submit" value="Update Recipe" />
       </form>
        </div>
    );
}


export default RecipeUpdate;