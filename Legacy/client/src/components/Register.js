import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";
import { getAllUserTypes } from "../modules/userTypeManager";





export default function Register() {
  const navigate = useNavigate();

 
  const [Name, setName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userTypeName, setUserTypeName] = useState([]);
  const [userType, setUserType] = useState();

  const getUserType = () => {
    getAllUserTypes().then(userTypes => setUserTypeName(userTypes));
};

useEffect(() => {
    getUserType();
}, []);

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        Name,
        imageLocation,
        email,
        userType,
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (<div className="center">

    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="Name" className="white-text-3">Name</Label>
          <Input
            style={{ width:"300px" }}
            id="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userType" className="white-text-3">UserType</Label>
          <div>
          <select
              id="userType"
              name="userType"
              type="text"
              style={{marginBottom: '6px'}}
              onChange={
                  (evt) => {
                    let copy = { ...userType }
                    copy = (evt.target.value)
                    setUserType(copy)
                  }
                } ><option value={0}> Select User Type </option>
                  {userTypeName.map(
                    (userType, index) => {
                      return (<option value={userType.name} key={index}
                        >{userType?.name}</option>
                        )
                      })}

          </select>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="email" className="white-text-3">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation" className="white-text-3">Profile Image URL</Label>
          <Input
            id="imageLocation"
            type="text"
            onChange={(e) => setImageLocation(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="white-text-3">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword" className="white-text-3">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
            </div>
  );
}
