
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentUserByFirebaseId, getUserProfile } from "../modules/userProfileManager";
import { UserDetails } from "./UserDetails";
import "../App.css"
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

  return (
    <div className="center-1" ><h1>Hello {[...userProfile.name]}</h1></div>
  );
}