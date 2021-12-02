import Header from './components/Header.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import './styles/App.css';
import React from 'react';

//import { BrowserRouter as Router, Route} from 'react-router-dom';



function App(){
  return (
  <div>
    
      <Header/>   

      <Login />
      <SignUp />
     


       
  </div> 
  )
}


export default App