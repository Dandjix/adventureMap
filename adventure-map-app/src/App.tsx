import { useEffect, useState } from 'react';

import IUser from './models/User';

import Navbar from './components/navbar';
import { getUserProfile } from './services/accountService';
import { Route, Routes} from "react-router";

import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
  
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
    <div>
      <header>
        <h1>there was the logo here</h1>
        <Navbar user={user} setToken={setToken}></Navbar>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/account' element={<AccountPage user={user}/>}></Route>
          <Route path='/*' element={<NotFoundPage/>}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
