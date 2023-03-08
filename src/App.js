import './App.css';
import React from 'react';
import Main from './components/Main'
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
      <Main/>
      {/* new stuff goes here */}
      <Footer />
      </header>
    </div>
  );
}


export default App;
