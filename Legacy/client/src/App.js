
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
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState({
    id: 0,
    name: "",
    firebaseUserId: "",
    email: "",
    imageLocation: "",
    userTypeId: 0,
    userType: "",
    weight: 0,
    age: 0,
    isDiabetic: "",
    isSmoker: "",
    medications: ""
})
  useEffect(() => {
    getCurrentUserByFirebaseId()?.then((user) => {
      setUserProfile(user)
    });
  }, [])

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

  useEffect(() => {
    getCurrentUserByFirebaseId()?.then((user) => {
      setUserProfile(user)
    });
  }, [isLoggedIn])


if (isLoggedIn === null) {
  return <Spinner className="app-spinner dark" />;
}

return (<>
  <Router>
    <Header isLoggedIn={isLoggedIn} isBroker={isBroker} user={userProfile}/>
    <div className='background'>
    <ApplicationViews isLoggedIn={isLoggedIn} isBroker={isBroker} user={userProfile}/>
    </div>

  </Router>
</>
);

}
export default App;

