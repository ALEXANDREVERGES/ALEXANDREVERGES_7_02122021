import React from 'react'
import ReactDOM from 'react-dom'
import './styles/Index.css'
import App from './App.js'
import Login from './components/Login.js';

const user  = JSON.parse(localStorage.getItem("user")) 

ReactDOM.render(
	
	<React.StrictMode>
		{/* {user? (<App/>) : (<Login/>)} */}
		<App/>
		
	</React.StrictMode>,
	document.getElementById('root')
)