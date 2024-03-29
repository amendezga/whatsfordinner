import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function RecipeIndex (props) {

    function loaded () {
        return (
            <>
            {props.recipes.map((recipe) => {
                return (
                <div key={recipe._id}>
                    <img src={recipe.image} alt={recipe.name} />
                    <Link to={`${recipe._id}`} >
                        <h1>{recipe.name}</h1>
                    </Link>
                </div>
                );
            })
            }
            </>
        );
    }

    function loading () {
        return <h1>Loading...</h1>
    }

    useEffect(() => {

    }, [])

    return (
        <>
        <Link to='new'>
            Add a new recipe
        </Link>
        {props.recipes ? loaded() : loading()}
        </>
    );
}


export default RecipeIndex;