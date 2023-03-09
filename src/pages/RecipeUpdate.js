import { useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeUpdate (props) {

    const { id } = useParams();
    const recipe = props.recipes ? props.recipes.find((r) => { return r._id === id }) : null;

    const [formState, setFormState] = useState(recipe);

    return (
        <div>
       <form>
            <input type="text" value={formState.name} name="name" placeholder="recipe name" />
            <input type="text" value={formState.image} name="image" placeholder="recipe image" />
            <input type="text" value={formState.healthLabel} name="healthLabel" placeholder="Health Label" />
            <input type="text" value={formState.ingredients} name="ingredients" placeholder="ingredients" />
            <input type="text" value={formState.nutrInfo.cal} name="cal" placeholder="calories" />
            <input type="text" value={formState.nutrInfo.fat} name="fat" placeholder="total fat" />
            <input type="text" value={formState.nutrInfo.chol} name="chol" placeholder="cholesterol" />
            <input type="text" value={formState.nutrInfo.sod} name="sod" placeholder="sodium" />
            <input type="text" value={formState.nutrInfo.carbs} name="carbs" placeholder="total carbohydrates" />
            <input type="text" value={formState.nutrInfo.protein} name="protein" placeholder="protein" />
            <input type="submit" value="Update Recipe" />
       </form>
        </div>
    );
}


export default RecipeUpdate;