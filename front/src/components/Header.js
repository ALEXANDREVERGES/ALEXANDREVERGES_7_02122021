import globe from '../assets/globe.jpg'
import '../styles/Header.css'
import React from 'react';
function Header() {
    const title = 'Groupomania'
 
    return (
        <div className='header'>
            <div className='header-gpm'>
                
                <h1>{title}</h1>  
            </div>    

        </div>
        
    )
}
export default Header