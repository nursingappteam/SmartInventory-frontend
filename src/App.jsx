import React from 'react';
import Login from './pages/login/login.jsx';
import Register from "./pages/login/register.jsx";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//import PageRouter from './components/router.jsx'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Login />}/>
        
        <Route path="/register" element= {<Register />} />
      </Routes>
    </Router>
  );
}

export default App;