import React, { useEffect, useState } from "react";
import '../styles/Commentaires.css'
import CardComments from "./CardComments";

function Commentaires(){
    const id  = JSON.parse(localStorage.getItem("idcs")); 
    const user  = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const [post, setPost] = useState([]);
    const [comPost, setComPost] = React.useState("");
    const [showUpdate, setUpdate] = useState(false);
    const [photo1, setPhoto1] = React.useState("");
    //***************RECUPERER LE POST */
    useEffect(() => {
        fetch(`http://localhost:3000/api/get/onepost/${id}`, 
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
           console.log("data", data) 
           setPost(data)
          
          }
          
        }).catch((error) => console.log(error));
        // console.log("commentaires--->", commentaires)
      }, []) 

      //************MODIFER POST */
      // function updatePost(){
      //   let btnUpdate = document.getElementsByClassName('btnUpdate');
      //   console.log("btnUpdate--->", btnUpdate)
      //   for(let h = 0; h<btnUpdate.length; h++){
      //     btnUpdate[h].addEventListener("click", (event)=>{
      //       event.preventDefault();
      //       let id = commentaires[h].id;
      //       console.log("id", id)
      //       const idcom = commentaires[h].iduser;
      //       localStorage.setItem("idcom", id)
      //     })
      //   }
      // }
      const publierModifPost = (event) => {
        event.preventDefault();
        const compostup  = JSON.parse(localStorage.getItem("idcs")) 
        const id = compostup;
        console.log("id", id)
        console.log("user.iduser--modifPost--->", user.iduser)
        var d = new Date();
      var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      var fullDate = date+','+hours;
     // var file = document.getElementById('fileItem').files[0]
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
   //****************************************ENVOYER COM  */
      const publierComPost = (event) => {
        event.preventDefault();
        
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
            time:fullDate,
            idpost:id
          })
        }
        console.log("formComShow--->", formComShow)
          fetch("http://localhost:3000/api/post/com", formComShow)
                
                  .then((res) => {
                  //  console.log("formModify--->",formModify.body)
                 //   console.log("res--->" , res)
                 //    localStorage.setItem("user", JSON.stringify(formModify.body));
                    window.location = "/commentaires"
                    
                  })
                  .catch((error) => console.log(error));
          
        };
        console.log("post", post)
        var maDate = new Date 
        var now = maDate.toUTCString();
      return(
        <div className="container_onePost">
            {
                post.map((item)=>(
                     <div className="container_post">
                <div className="container_nom">
                    <div className="structureNom">{item.prenom} {item.nom}</div>
                    <div className="structureNom1">{now}</div>
                </div>
                <div className="container_com">
                    <div >
                        <div >{item.commentaire}</div> 
                        <br/>
                        <img src="{item.images}"/>
                    </div>
                </div>
                <button id="btnUpdate" className="btnUpdate" onDoubleClick={()=> setUpdate(!showUpdate)} > Modifier</button>
                {showUpdate=== true} 
        {showUpdate && (
          <div>
            <br/>
          <textarea 
          defaultValue={item.commentaire}
          onChange={(e) => setUpdate(e.target.value)}
          />
          <br/>
          <input type="file" accept="image/*" id="fileItem" name="image" onChange={e =>setPhoto1 (e.target.value)}/>
          <br/>
          <button onClick={publierModifPost} className="btnPublier"><i class="far fa-paper-plane"></i> Publier</button>
            
            </div>
        )}
            </div>
                ))
                
            }
            <div>
                <textarea placeholder="Laisse un commentaire !!" type="text" className="inputCom"  onChange={e =>setComPost (e.target.value)}/>
                <br/>
                <button id="inputComPost"  onClick={publierComPost} className="inputComPost">Répondre</button>

            </div>
            <h2>Commentaires:</h2>
           <CardComments />
        </div>
      )
}

export default Commentaires;