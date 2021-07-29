import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ displayName, setDisplayName ] = useState();
  const [ imageUrl, setImageUrl ] = useState();
  const [ city, setCity ] = useState();
  const [ state, setState ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ confirmPassword, setConfirmPassword ] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, imageUrl, city, state, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <Form onSubmit={ registerClick }>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" autoFocus onChange={ e => setFirstName(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" autoFocus onChange={ e => setLastName(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" autoFocus onChange={ e => setDisplayName(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" type="text" autoFocus onChange={ e => setImageUrl(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Input id="city" type="text" autoFocus onChange={ e => setCity(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="state">State</Label>
          <Input id="state" type="text" autoFocus onChange={ e => setState(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={ e => setEmail(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={ e => setPassword(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={ e => setConfirmPassword(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}