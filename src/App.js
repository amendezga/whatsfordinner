import logo from './logo.svg';
import './App.css';
import React from 'react';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    
      <Nav />
      {/* new stuff goes here */}
      <Footer />
    
      </header>
    </div>
  );
}


export default App;
