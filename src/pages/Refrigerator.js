function Refrigerator(props){
    return <>
        <h1>What we have in the refrigerator??</h1>
        {props.refrigerator.map((ingredient) => (
            <div className="ingredient">
            <h6>{ingredient.name}</h6>
            <button>Delete</button>
        </div>
        )
)
    }
    <button>add moe Ingredients</button></>}
export default Refrigerator;