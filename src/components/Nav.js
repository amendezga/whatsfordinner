import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <nav>
      <ul>
            <Link to='/refrigerator'>
            <li><span> My Refrigerator </span></li>
            </Link>
            <Link to='/recipes'>
            <li><span> Recipes </span></li>
            </Link>
            <Link to='/about'>
            <li><span> About </span></li>
            </Link>
            <Link to='/login'>
            <li><span> Log In </span></li>
            </Link>
      </ul>
    </nav>
  );
}

export default Nav;
