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
            <li><a href="#">My Refrigerator</a></li>
            <li><a href="#">My Recipes</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </li>
        <li class="recipes"><a href="#">Recipes</a></li>
        <li class="Login"><a href="#">Log in</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
