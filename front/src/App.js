
import React from 'react';

import Header from './components/Header.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Home from './components/Home.js';
import Nav from './components/Nav.js';
import Profil from './components/Profil.js'
import './styles/App.css';
import Modification from './components/Modification.js'
import Delete from './components/Delete.js'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Commentaires from './components/Commentaires.js';






function App(){

  const user  = JSON.parse(localStorage.getItem("user")) 

  return (
    
  <div>
    <Router>
      <Switch>
      {/* {user? (Nav , Home)  : (Login)} */}
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
        <Route path="/home" >   
        <Nav />  
         <Home /> 
        </Route>    
        <Route path="/profil" >  
        <Nav /> 
        <Profil />
        </Route> 
        <Route path="/modification" >  
        <Nav /> 
        <Modification />   
        </Route>        
        <Route path="/delete" >  
        <Nav /> 
        <Delete />
        </Route> 
        <Route path="/commentaires" >  
        <Nav /> 
        <Commentaires/>
        </Route> 

      </Switch>
   </Router>  
   
  </div> 

)
}


export default App;