import React from "react";

import '../styles/Home.css'

export default function Home() {
    const [Message, setMessage] = React.useState("");
    
    
  
    const handleSubmit = (event) => {
      console.log(`
        Message: ${Message}
        
       
      `);
      
      event.preventDefault();
    
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          Message: Message,
         
        }),
      };
      fetch("http://localhost:3000/api/post", requestOptions)
        .then((response) => {
          console.log(response.json());
          if (response.ok) {
        
          }
        })
        .catch((error) => console.log(error));
  
    }
  
    return (
        <div className="pos-form">
      <form className="formulaire1" onSubmit={handleSubmit}>
      
        <label>
          <input
          placeholder="Quoi de neuf ?"
            name="message"
            type="message"
            value={Message}
            onChange={e => setMessage(e.target.value)}
            required />
            <button>Publier</button>
        </label>
   
        
        </form>
        </div>
       )
  
 }
