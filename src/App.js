import './App.css';
import React from 'react';
import Home from './Home';
import StickyHeaders from "./StickyHeaders";

function App() {
  return (
    <div className="App">
        <StickyHeaders/>
        <Home/>
    </div>
  );
}

export default App;


