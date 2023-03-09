 function Refrigerator(props){
    const loading = () => {
        return <h1>Loading...</h1>;
      }
    const loaded=()=>{
        return props.refrigerator.map((ingredient) => (
            <div className="ingredient">
            <h6>{ingredient.name}</h6>
            <button>Delete</button>
            </div>)
            )}

    return (
    <>  
        <h2>What we have in the refrigerator?</h2>
        <button>add more Ingredient</button>
        {!props.refrigerator? loading():loaded()}
       
    </>
    )}
export default Refrigerator;