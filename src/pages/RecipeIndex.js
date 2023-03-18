import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeIndex (props) {

    // const [nutrition, setNutrition] = useState(null);

    console.log(props.recipes);

    function loaded () {
        return (
            <>
            {props.recipes.map((recipe) => {
                // if (recipe.eatenToday) {
                //     setNutrition((prev) => {
                //         if (nutrition) {
                //             return ({
                //                 ...prev,
                //                 recipe
                //             }
                //             );
                //         } else {
                //             return recipe;
                //         }
                //     });
                // }
                return (
                <div key={recipe._id}>
                    <img src={recipe.image} alt={recipe.name} />
                    <Link to={`${recipe._id}`} >
                        <h1>{recipe.name}</h1>
                    </Link>
                    {console.log(recipe)}
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