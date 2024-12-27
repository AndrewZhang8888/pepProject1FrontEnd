import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const paperStyle = {
  padding: 20,
  height: '70vh',
  width: 280,
  margin: '20px auto'
};

export default function BasicTextFields() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const account = { username, password };
    console.log("Login Attempt:", account);

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Bad login credentials');
        }
      })
      .then((data) => {
        console.log("Login Response Data:", data);

        if (data.occupation === 'employee') {
          localStorage.setItem('occupation', data.occupation);
          localStorage.setItem('postedBy', data.accountId);
          navigate('/employee');
        } else if (data.occupation === 'manager') {
          navigate('/managerPage');
        } else {
          navigate('/login');
        }

        setIsLoginSuccess(true);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

    const handleRegister = (e) => {
      e.preventDefault();
      const account = {
        username,
        password,
        occupation: occupation || "employee" // Provide default value
      };
      console.log("Register Attempt:", account);

      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(account)
      })
        .then((response) => {
          if (response.ok) {
            alert('Registration successful! You can now log in.');
          } else {
            throw new Error('Registration failed');
          }
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        });
    };


  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>User Credentials</h1>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-occupation"
            label="Occupation (optional)"
            variant="outlined"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin} style={{ marginBottom: '10px' }}>
            Login
          </Button>
          <Button variant="outlined" onClick={handleRegister}>
            Register
          </Button>
          <br />
          {isLoginSuccess && (
            <a href="http://localhost:8080/messages" target="_blank" rel="noopener noreferrer">
              Go to Messages
            </a>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
