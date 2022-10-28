
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { onLoginStatusChange } from './modules/authManager';
import { getCurrentUserByFirebaseId } from './modules/userProfileManager';
import "firebase/auth"
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isBroker, setIsBroker] = useState();

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn)
  }, []);

  useEffect(() => {
    getCurrentUserByFirebaseId()?.then((user) => {
      if (user.userType === "Broker") {
        setIsBroker(true);
      } else {
        setIsBroker(false);
      }
    });
  }, [isLoggedIn])


if (isLoggedIn === null) {
  return <Spinner className="app-spinner dark" />;
}

return (
  <Router>
    <Header isLoggedIn={isLoggedIn} isBroker={isBroker}/>
    <ApplicationViews isLoggedIn={isLoggedIn} isBroker={isBroker}/>
  </Router>
);

}
export default App;
