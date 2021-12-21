import React from "react";
import{ Link } from "react-router-dom";
import '../styles/Delete.css';

function Delete(){
    const user  = JSON.parse(localStorage.getItem("user")) ;
    const token = user.token;
    const id = user.results.results[0].iduser;
console.log("token-et-id---delete.js----->", token, id)
    console.log("user--delete-->", user)
    const deleteHandler = async () => {
        const delcom = {
            method: "DELETE",
           headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`}
          }
         
         fetch(`http://localhost:3000/auth/delete/${id}`, delcom)
         .then((res) => {
             alert('Votre compte est supprimé ! A bienôt !')
         }) 
          .catch((error) => console.log(error));
    }

    return (
        <div className="container_delete">
            <div className="delete">
                <div className="margin_delete">Supprimer mon compte:</div>
                <Link className="nonoui" to="/profil">Non</Link>
                <Link className="nonoui" onClick={deleteHandler} to="/login">Oui</Link>
            </div>
        </div>
    )
}



export default Delete;