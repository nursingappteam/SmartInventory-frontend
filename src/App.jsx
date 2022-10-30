import React from 'react';
import Login from './pages/login/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  
  return (
    <router>
      <div>   
        <Login />
      </div> 
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </router>
  );
}

export default App;