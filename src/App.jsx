import React from 'react';
import Login from './pages/login/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PageRouter from './components/router.jsx'

function App() {
  
  return (
    <router>
      <PageRouter /> 
    </router>
  );
}

export default App;