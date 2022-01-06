import React, { useEffect, useState } from "react";
import "../styles/CardComments.css"

import { useHistory } from "react-router-dom";



function Comments() {
  let history = useHistory();
  const [commentaires, setCommentaires] = useState([]);
const [showComments, setShowComments] = useState(false);

const [comPost, setComPost] = React.useState("");
//const [delete, setDelete] = useState(false);
//var commentaire;
//const commentaire=[];
const user  = JSON.parse(localStorage.getItem("user")) 
const token = user.token;
console.log("user.iduser---->", user.iduser)
useEffect(() => {
  fetch(`http://localhost:3000/api/get/commentaire`, 
  {
    headers:
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then ((res) => res.json())  
  .then ((data) => {
    if (data) {
    // console.log("data", data) 
     setCommentaires(data);
    
    }
    
  }).catch((error) => console.log(error));
  // console.log("commentaires--->", commentaires)
}, [])


//*******Bouton update */
function updatePost(){
  updatePost ("click",(event) =>{
  event.preventDefault();
  window.location = "/updatepost"
  })
}


//*****************BOUTON SUPPRIMER POST ******************/
function deletePost(){
  let btnDeleteCom = document.getElementsByClassName('btnDeleteCom');
// console.log("btnDeleteCom", btnDeleteCom)
for(let l = 0; l < btnDeleteCom.length; l++){
  btnDeleteCom[l].addEventListener("click",(event) =>{
    event.preventDefault();
    let id = commentaires[l].id ;
  //  const user  = JSON.parse(localStorage.getItem("user")) 
    
   
    const iduser= user.iduser;
    const idcom = commentaires[l].iduser;
    
    // console.log("iduser",iduser)
    // console.log("idcom",idcom)
    const delpost = {
      method: "DELETE",
     headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`}
    }
  if(iduser === idcom){
    fetch(`http://localhost:3000/api/delete/${id}`,delpost, 
  )
   .then((res) => {
     
    //  console.log("res", res)
     window.location="/home"
   }) .catch((error) => console.log(error));

   } else {
     
     alert("Ce n'est pas votre publication ! Vous ne pouvez pas la supprimer")
   }
  

  })
}
}


//***********************************************************************/

localStorage.setItem("com", JSON.stringify(commentaires))
//console.log("commentaires----->", commentaires)
//console.log(commentaires, typeof(commentaires))
function commentShow(){
  let btnCom = document.getElementsByClassName('btnCom');
for(let m = 0; m < btnCom.length; m++){
  btnCom[m].addEventListener("click",(event) =>{
    event.preventDefault();
    let id = commentaires[m].id ;
    
  })
}
}


/*******************************BUTTON REPONDRE****************/
function commentShow(){
  let btnCom = document.getElementsByClassName('btnCom');
  console.log("btnCom--->", btnCom)
  for(let n = 0; n<btnCom.length; n++){
    btnCom[n].addEventListener("click", (event)=>{
      event.preventDefault();
      let idcs = commentaires[n].id;
      console.log("idcs", idcs)
      localStorage.setItem("idcs", idcs)
      const idcomShow = commentaires[n].iduser;
      localStorage.setItem("idcomShow", idcomShow)
      window.location='/commentaires'
    })
  }
  
}
  function comOnepost(){
    window.location='/commentaires'
  }
  // var maDate = new Date 
  // var now = maDate.toUTCString();
    return(
    <div>
{
  commentaires.map((item)=>(
    <div className="container_post">
      <div className="container_nom">
      <div className="structureNom">{item.prenom} {item.nom}</div>
      
      <div className="structureNom1">{item.time}</div>
      </div>
      <div className="container_com">
        <div >
          <div >{item.commentaire}</div> 
        </div>
      </div>
      <div>
        <br/>
      <img src="{item.images}"/>  
        <div className="choice">
          <div className="cardCom">  
             <div id="btnCom" className="btnCom" onClick={commentShow} onDouclickClick={comOnepost} ><i class="far fa-comment"></i></div>
          </div>   
        </div>
      </div>
      <div className="cardCom2">
        <button id="btnDeleteCom"  onClick={deletePost} onDouclickClick={comOnepost}  className="btnDeleteCom">Supprimer</button>
      </div>
    </div>
  ))}
</div>
)

} 

export default Comments;
