import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import Layout from './components/Layout/Layout';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import UserContext from './provider/UserContext';

import { Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user]);


  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </UserContext.Provider>
    </div >
  );
}

export default App;
