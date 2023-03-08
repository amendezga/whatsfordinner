import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <nav>
      <ul>
            <Link to='/refrigerator'>
            <li>My Refrigerator</li>
            </Link>
            <Link to='/recipes'>
            <li>Recipes</li>
            </Link>
            <Link to='/about'>
            <li>About</li>
            </Link>
            <Link to='/login'>
            <li>Log In</li>
            </Link>
      </ul>
    </nav>
  );
}

export default Nav;
