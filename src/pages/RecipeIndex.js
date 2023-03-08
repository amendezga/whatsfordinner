import { Link } from 'react-router-dom';

function RecipeIndex (props) {

    function loaded () {
        return props.recipes.map((recipe) => {
            return (
                <div key={recipe._id}>
                    <img src={recipe.image} alt={recipe.name} />
                    <Link to={`recipes/${recipe._id}`} >
                        <h1>{recipe.name}</h1>
                    </Link>
                </div>
            );
        });
    }

    function loading () {
        return <h1>Loading...</h1>
    }

    return props.recipes ? loaded() : loading()
}


export default RecipeIndex;