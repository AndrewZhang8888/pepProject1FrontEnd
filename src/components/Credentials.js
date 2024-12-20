import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const paperStyle = {
  padding: 20,
  height: '70vh',
  width: 280,
  margin: '20px auto'
};

export default function BasicTextFields() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const handleClick = (e)=>{
        e.preventDefault()
        const account = {username,password}
        console.log(account)
        fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(account)
        }).then((response) => {
          if(response.ok){
            console.log("New Student Added");
            setIsLoginSuccess(true);
            return response.json();
          }
          throw new Error('bad');
        })
        // .catch((error) => {
        //   console.log('request failed', error)
        //   console.error('Error:', error);
        //   throw new Error('Login failed. Please check your credentials.'); 
        // });
      };

  return (
    <Container>
    <Paper elevation={3} style = {paperStyle}>
        <h1>User Login</h1>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="username" variant="outlined" 
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />
      <TextField id="outlined-basic" label="password" variant="outlined"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Submit</Button>
      <br />
      {isLoginSuccess && (
        <a href="http://localhost:8080/messages" target="_blank" rel="noopener noreferrer">
        Go to Messages
        </a>
      )}
    </Box>
    {/* {username}
    <br />
    {password} */}
    </Paper>
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BasicTextFields />);