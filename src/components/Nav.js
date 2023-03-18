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
            <span> My Refrigerator </span>
            </Link>
          </li>
          <li>
            <Link to='/recipes'>
            <span> My Recipes </span>
            </Link>
          </li>
          <li>
            <Link to='/about'>
            <span> About </span>
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
