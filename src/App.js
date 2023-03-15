import './App.css';
import React from 'react';
import { auth } from './firebase';
import { useState, useEffect } from 'react';

// components import
import Main from './components/Main'
import RecipeMain from './components/RecipesMain';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <Nav user={user} />
      <Main user={user} />
      <RecipeMain user={user} />
      <Footer />
      </header>
    </div>
  );
}


export default App;