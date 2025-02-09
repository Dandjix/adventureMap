import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

import IUser from './models/User';

import Navbar from './components/navbar';

function App() {
  const [user,setUser] = useState<IUser|undefined>(undefined)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Navbar user={user}></Navbar>
        <p>
          Edit <code>src/App.js</code> and save to reload 3.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
