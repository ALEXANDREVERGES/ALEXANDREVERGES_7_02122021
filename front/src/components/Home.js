import React from "react";
import '../styles/Home.css'

import Comments from "./Comments";
import Post from "./Post";

//import {Redirect} from "react-router-dom";
export default function Home() {
  
 
    return (
      <div className="container_home">
        <Post />
          <div className="container_posthome">  
            <Comments />
          </div>
      </div>
       
       )
  
 }