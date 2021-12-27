import React, { useEffect, useState } from "react";
import CardComments from "./CardComments";
import "../styles/CardComments.css"
import { useHistory } from "react-router-dom";



function Comments() {
  let history = useHistory();
const [commentaires, setCommentaires] = useState([]);
const [showComments, setShowComments] = useState(false);
const [showUpdate, setUpdate] = useState(false);
const [photo1, setPhoto1] = React.useState("");
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
//*********BOUTON MODIFIER******************************************************/
function updatePost(){
  let btnUpdate = document.getElementsByClassName('btnUpdate');
  console.log("btnUpdate--->", btnUpdate)
  for(let h = 0; h<btnUpdate.length; h++){
    btnUpdate[h].addEventListener("click", (event)=>{
      event.preventDefault();
      let id = commentaires[h].id;
      console.log("id", id)
      const idcom = commentaires[h].iduser;
      localStorage.setItem("idcom", id)
    })
  }
}

    //   const formModifyPost = {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`},
    //     body: JSON.stringify({
    //       iduser:id,
    //       images: photo,
    //       commentaire: setUpdate,
    //     })
    //   };
    //   fetch(`http://localhost:3000/api/update/${id}`, formModifyPost)
          
    //   .then((res) => {
    //   //  console.log("formModify--->",formModify.body)
    //  //   console.log("res--->" , res)
    //  //    localStorage.setItem("user", JSON.stringify(formModify.body));
    // //    window.location.reload();
        
    //   })
    //   .catch((error) => console.log(error));
    
  


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
//*********************MODIFIER POST********************/
const publierModifPost = (event) => {
  event.preventDefault();
  const compostup  = JSON.parse(localStorage.getItem("idcom")) 
  const id = compostup;
  console.log("id", id)
  console.log("user.iduser--modifPost--->", user.iduser)
  var d = new Date();
var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var fullDate = date+' '+hours;

  const formModifyPost = {
    method: "PUT",
    headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`},
    body: JSON.stringify({
      commentaire:showUpdate,
      images:photo1,
      iduser:user.iduser,
      time: fullDate
    })
  }
  console.log("formModifyPost--->", formModifyPost)
    fetch(`http://localhost:3000/api/update/${id}`, formModifyPost)
          
            .then((res) => {
            //  console.log("formModify--->",formModify.body)
           //   console.log("res--->" , res)
           //    localStorage.setItem("user", JSON.stringify(formModify.body));
              window.location = "/home"
              
            })
            .catch((error) => console.log(error));
    
  };
/*******************************BUTTON REPONDRE****************/
function commentShow(){
  let btnCom = document.getElementsByClassName('btnCom');
  console.log("btnCom--->", btnCom)
  for(let n = 0; n<btnCom.length; n++){
    btnCom[n].addEventListener("click", (event)=>{
      event.preventDefault();
      let idcs = commentaires[n].id;
      console.log("idcs", idcs)
      const idcomShow = commentaires[n].iduser;
      localStorage.setItem("idcomShow", idcomShow)
    })
  }
}
const publierComPost = (event) => {
  event.preventDefault();
  const compostshow  = JSON.parse(localStorage.getItem("idcomShow")) 
  const id = compostshow;
  console.log("id", id)
  console.log("user.iduser--modifPost--->", user.iduser)
  var d = new Date();
var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var fullDate = date+' '+hours;

  const formComShow = {
    method: "POST",
    headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`},
    body: JSON.stringify({
      commentaires:comPost,
      iduser:user.iduser,
      time:fullDate
    })
  }
  console.log("formComShow--->", formComShow)
    fetch("http://localhost:3000/api/post/com", formComShow)
          
            .then((res) => {
            //  console.log("formModify--->",formModify.body)
           //   console.log("res--->" , res)
           //    localStorage.setItem("user", JSON.stringify(formModify.body));
              window.location = "/home"
              
            })
            .catch((error) => console.log(error));
    
  };
 
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
      <img src="{item.images}"/>    
        <div className="choice">
          <div className="cardCom">  
           
            {showComments === true} 
            {showComments && (
              <div>
                <CardComments />
                <input type="text" className="inputCom"  onChange={e =>setComPost (e.target.value)}/>
              <br/>
              <button id="inputComPost"  onClick={publierComPost} className="inputComPost">Répondre</button>
              </div>
            )}
             <div id="btnCom" className="btnCom" onClick={commentShow} onDoubleClick={()=> setShowComments(!showComments)} ><i class="far fa-comment"></i></div>
          </div>   
        </div>
      </div>
      <div className="cardCom2">
        {/* <button id="btnUpdate" onClick={} onDoubleClick={()=> setUpdate(!showUpdate)}> Modifier</button> */}
        <button id="btnUpdate" className="btnUpdate" onClick={updatePost} onDoubleClick={()=> setUpdate(!showUpdate)}> Modifier</button>
        
        <button id="btnDeleteCom"  onClick={deletePost} className="btnDeleteCom">Supprimer</button>
        {showUpdate=== true} 
        {showUpdate && (
          <div>
            <br/>
          <textarea 
          defaultValue={item.commentaire}
          onChange={(e) => setUpdate(e.target.value)}
          />
          <br/>
          <input type="file" accept="image/*"  onChange={e =>setPhoto1 (e.target.value)}/>
          <br/>
          <button onClick={publierModifPost} className="btnPublier"><i class="far fa-paper-plane"></i> Publier</button>
            
            </div>
        )}
      </div>
    </div>
  ))}
</div>
)

} 

export default Comments;
