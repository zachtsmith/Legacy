
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentUserByFirebaseId, getUserProfile } from "../modules/userProfileManager";
import { UserDetails } from "./UserDetails";
import "../App.css"
import { Card, CardBody } from "reactstrap";
export default function Hello() {
  
  
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

 let sayHello = () => { 
  if (userProfile.name.length > 0 ) {
    return (
    
    <div>
      <div className="center-2" ><h1>Hello, {userProfile.name}</h1></div>
      {/* <div>
          <h1 className="center-2">Life insurance is time. The time a man might not have. If he needs time, he needs life insurance. - Ben Fieldman</h1> 
      </div> */}
    </div>
      
  
      
      );
} else {
  return ""
}
}

return sayHello();
}