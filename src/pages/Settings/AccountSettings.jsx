import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";


export default function SettingInfo() {
  const [name, setName] = React.useState('Jacquelyn Donaldson');
  const [password, setPassword] = React.useState('****');
  const [email, setEmail] = React.useState('test@uta.edu');
  const handleChange = (event) => {
    setName(event.target.value);
    setPassword(event.target.value);
    setEmail(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography
              component="h1"
              variant="h2"
              color="inherit"
              sx={{ color: 'primary.main', textDecoration: 'underline', ml: -5}}
            >Account</Typography>
      <Avatar src="/broken-image.jpg" sx={{width: 200, height: 200, ml: -5, mt: 2}} />
      <Box
        component="form"
        sx={{
        '& > :not(style)': { ml: -40, mt: 5, width: '90ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChange}
      />
      
    </Box>
    <Box
        component="form"
        sx={{
        '& > :not(style)': { ml: -40, mt: 5, width: '90ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Email"
        value={email}
        onChange={handleChange}
      />
      
    </Box>
    <Box
        component="form"
        sx={{
        '& > :not(style)': { ml: -40, mt: 5, width: '90ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Password"
        value={password}
        onChange={handleChange}
      />
    </Box>
    <Button sx={{mt: 10, ml: -20,width: 500}}variant="contained" >Update</Button>
    </React.Fragment>
  );
}
