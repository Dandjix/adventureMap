import logo from './logo.svg';

import { useEffect, useState } from 'react';

import IUser from './models/User';

import Navbar from './components/navbar';
import { getUserProfile } from './services/accountService';

function App() {
  const [user,setUser] = useState<IUser|undefined>(undefined)
  const [token,setToken] = useState<string|null>(localStorage.getItem("token"))

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        const userProfile = await getUserProfile(token);
        setUser(userProfile);
      }
      else
      {
        setUser(undefined);
      }
    };
    
    fetchUserProfile();
  }, [token]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Navbar user={user} setToken={setToken}></Navbar>
      </header>
    </div>
  );
}

export default App;
