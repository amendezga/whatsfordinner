import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <nav>
      <ul>
        <li>
            Menu
          <ul>
            <li><a href="/refrigerator">My Refrigerator</a></li>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </li>
        <li class="recipes"><a href="/recipes">Recipes</a></li>
        <li class="login"><a href="/login">Log in</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
