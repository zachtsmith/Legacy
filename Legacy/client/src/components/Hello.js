
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentUserByFirebaseId, getUserProfile } from "../modules/userProfileManager";
import { UserDetails } from "./UserDetails";

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
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>Hello {userProfile.name}</span>
  );
}