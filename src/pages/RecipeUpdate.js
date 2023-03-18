import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeUpdate (props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = props.recipes ? props.recipes.find((r) => { return r._id === id }) : null;

    const [formState, setFormState] = useState(recipe);

    function handleChange (evt) {
        const nutrInfo = 'nutrInfo'
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
        <label>Recipe Name:
            <input type="text" value={formState.name} name="name" onChange={handleChange} />
        </label>
        <label>Image:
            <input type="text" value={formState.image} name="image" onChange={handleChange} />
        </label>
        <label>Health Labels:
            <input type="text" value={formState.healthLabel} name="healthLabel" onChange={handleChange} />
        </label>
        <label>Ingredients:
            <input type="text" value={formState.ingredients} name="ingredients" onChange={handleChange} />
        </label>
        <label>Calories:
            <input type="number" value={formState.nutrInfo.cal} name="cal" onChange={handleChange} />
        </label>
        <label>Total Fat:
            <input type="number" value={formState.nutrInfo.fat} name="fat" onChange={handleChange} />
        </label>
        <label>Cholesterol:
            <input type="number" value={formState.nutrInfo.chol} name="chol" onChange={handleChange} />
        </label>
        <label>Sodium:
            <input type="number" value={formState.nutrInfo.sod} name="sod" onChange={handleChange} />
        </label>
        <label>Total Carbohydrates:
            <input type="number" value={formState.nutrInfo.carbs} name="carbs" onChange={handleChange} />
        </label>
        <label>Protein:
            <input type="number" value={formState.nutrInfo.protein} name="protein" onChange={handleChange} />
        </label>
            <input type="submit" value="Update Recipe" />
       </form>
        </div>
    );
}


export default RecipeUpdate;