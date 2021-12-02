import React from 'react';

import Header from './components/Header.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import './styles/App.css';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App(){
  return (
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Login />
        </Route>   
        <Route path="/signup">
          <Header />
          <SignUp />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
        </Route>       
      </Switch>
   </Router>    
  </div> 
  )
}


export default App