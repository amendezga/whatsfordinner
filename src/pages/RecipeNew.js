import { useState } from 'react';
import MakeAbleFood from '../components/MakeableFood';

function RecipeNew (props) {

    const [formState, setFormState] = useState({name: ''});

    function handleQueryChange (evt) {
        setFormState({
            [evt.target.name]: evt.target.value
        });
    }

    function handleQuerySubmit (evt) {
        evt.preventDefault();
        props.getRecipes(formState.name.trim());
        props.setAvailableRecipes(props.fetchRecipes.hits);
        setFormState({
            name: ''
        });
    }

    return (
        <>
            <h1>Test</h1>
            <form onSubmit={handleQuerySubmit}>	
	            <input
	                type="text"
	                value={formState.name}
	                name="name"
	                placeholder="banana, milk"
	                onChange={handleQueryChange}
	            />
	            <input type="submit" value="SearchForRecipes" />
	        </form>
            <MakeAbleFood availableRecipes={props.availableRecipes} handleSaveRecipe={props.handleSaveRecipe} />
        </>
    );
} 


export default RecipeNew;