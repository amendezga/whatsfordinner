import React from 'react';
import { useState } from 'react';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <ul>
        <li>
          <button onClick={handleMenuClick}>
            Menu
          </button>
          <ul className={isMenuOpen ? 'open' : ''}>
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
