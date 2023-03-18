import { useState } from 'react';
import MakeAbleFood from '../components/MakeableFood';

function RecipeNew (props) {

    const [formState, setFormState] = useState({name: ''});
    const [queryRecipes, setQueryRecipes] = useState('');

    function handleQueryChange (evt) {
        setFormState({
            [evt.target.name]: evt.target.value
        });
    }

    function handleQuerySubmit (evt) {
        evt.preventDefault();
        props.getRecipes(formState.name);
        props.setAvailableRecipes(props.fetchRecipes.hits);
    }

    return (
        <>
            <h1>Test</h1>
            <form onSubmit={handleQuerySubmit}>	
	            <input
	                type="text"
	                value={formState.name}
	                name="name"
	                placeholder="banana+milk"
	                onChange={handleQueryChange}
	            />
	            <input type="submit" value="SearchForRecipes" />
	        </form>
            <MakeAbleFood availableRecipes={props.availableRecipes} />
            <h3>Need to look at recipe details, should pair with the recipe details from the makeable food section?</h3>
            <h3>need button to confirm saving that particular recipe, using createRecipe function</h3>
        </>
    );
} 


export default RecipeNew;