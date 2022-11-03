import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (<div className="center">

    <Form onSubmit={loginSubmit} >
      <fieldset >
        <FormGroup >
          <Label for="email" className="white-text-header">Email</Label>
          <Input
          style={{ width:"300px" }}
          id="email"
          type="text"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="white-text-header">Password</Label>
          <Input
          style={{ width:"300px" }}
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button style={{ marginLeft: "auto", marginTop: "6px", backgroundColor:"white", color:"goldenrod" }} className="addNewProductButton">Login</Button>
        </FormGroup>
        <em className="white-text-2">
          Not registered? <Link to="../register">Register</Link>
        </em>
      </fieldset>
    </Form>
          </div>
  );
}