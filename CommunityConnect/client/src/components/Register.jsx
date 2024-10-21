import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AddUser } from "../services/UserService";
import"./Register.css"

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imageLocation, setImageLocation] = useState("");

  const registerClick = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const userProfile = {
      fullName,
      email,
      password,
      phoneNumber,
      city,
      state,
      profileImage: imageLocation,
    };

    AddUser(userProfile)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/login');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="register-form">
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" onChange={e => setFullName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" onChange={e => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" type="text" onChange={e => setPhoneNumber(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Input id="city" type="text" onChange={e => setCity(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="state">State</Label>
          <Input id="state" type="text" onChange={e => setState(e.target.value)} />
        </FormGroup>
        {/* <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup> */}
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  );
}

