import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p>&copy; 2023 Team 1, LLC</p>
      <Link to='/about'>
        <p> About </p>
      </Link>
    </footer>
  );
}

export default Footer;