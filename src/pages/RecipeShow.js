import { useParams } from 'react-router-dom';

function RecipeShow (props) {

    const { id } = useParams();
    const recipe = props.recipes ? props.recipes.find((r) => { return r._id === id }) : null;

    return (
        <h1>this is the recipe show page</h1>
    );
}


export default RecipeShow;