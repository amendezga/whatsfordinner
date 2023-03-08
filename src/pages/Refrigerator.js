 function Refrigerator(props){
    return <>
    <h2>What we have in the refrigerator?</h2>
    {props.refrigerator.map((ingredient) => (
        <div className="ingredient">
        <h6>{ingredient.name}</h6>
        <button>Delete</button>
        </div>)
        )
        }
    <button>add more Ingredient</button></>}
export default Refrigerator;