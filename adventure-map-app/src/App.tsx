import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeRouter, Route, Routes } from 'react-router-native';

import IUser from './models/User';
import Navbar from './components/Navbar';
import { getUserProfile } from './services/accountService';

import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    const fetchUserProfile = async () => {
      if (token) {
        const userProfile = await getUserProfile(token);
        setUser(userProfile);
      } else {
        setUser(undefined);
      }
    };

    fetchToken();
    fetchUserProfile();
  }, [token]);

  return (
    <NativeRouter>
      <View style={styles.container}>
        <Text style={styles.logo}>there was the logo here</Text>
        <Navbar user={user} setToken={setToken} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/account' element={<AccountPage user={user} />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
