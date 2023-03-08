import { Routes, Route } from 'react-router-dom';
import Recipes from '../pages/Recipes';

function Main (props) {
    return (
        <main>
            <Routes>
                <Route path='/recipes' element={ <Recipes /> } />
            </Routes>
        </main>
    )
}


export default Main;