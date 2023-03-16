import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';

function Nav (props) {

  return (
    <nav>
      <ul>
        { props.user ?
        <>
        <li>Welcome, {props.user.displayName}</li>
        <li>
            <Link to='/refrigerator'>
            <li> My Refrigerator </li>
            </Link>
          </li>
          <li>
            <Link to='/recipes'>
            <li> My Recipes </li>
            </Link>
          </li>
          <li>
            <Link to='/about'>
            <li> About </li>
            </Link>
          </li>
        <li>
          
          <button className="button-login" onClick={logout}>Logout</button>
        </li>
        </>
        :
        <li>
          <li>Welcome! </li>
          <button className="button-login" onClick={login}>Login</button>
        </li>
      }
      </ul>
    </nav>
  );
}

export default Nav;
