import React from 'react';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./list.css";
import { productRows } from "../../dummydata";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";


export default function List() {
    
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
     const [desc, setDesc] = useState("");
    const [addCount, setaddCount] = useState(0);
    const [updateCount,setupdateCount] = useState(0);
    //console.log(addCount);
    //console.log(updateCount);
     const { user } = useContext(Context);
    //console.log(posts);

  //------------------------this is to keep track of number of data items added-------------------------------------
    useEffect(() => {
      setaddCount(JSON.parse(window.sessionStorage.getItem("addCount")));
      setupdateCount(JSON.parse(window.sessionStorage.getItem("updateCount")));
    }, []);
  
    useEffect(() => {
      window.sessionStorage.setItem("addCount", addCount);
    }, [addCount]);
  
    //-----------------------this is to keep track of number of data items updated-----------------------------------------------------------------------
  
    useEffect(() => {
      window.sessionStorage.setItem("updateCount", updateCount);
    }, [updateCount]);

//----------------------this is to data to databse------------------------------
    useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/lists");
     // console.log("data here"); 
     // console.log(res);
  //  http://localhost:4000/api/posts/61dc05892227113648cd2c64
      
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt); //this is to show recent posts on top
          })
        );
    }
    fetchPosts();
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     const newPost = {
      title,
      desc
    };
     try {
      const res = await axios.post("/lists", newPost);
      //console.log(res.data);
      setaddCount(c => c + 1);
     window.location.replace("/");//this will show display post content
       
    } catch (err) {}
    };
//----------------this is to delete data from database------------------------------------
    const handleDelete = async (id) => {
      try {
        await axios.delete("/lists/"+ id, {
          data: { username: user.username },   //res.data.username
        });
        window.location.replace("/");
      } catch (err) {}
    };

    const handleupdateCount = async (id) => {
      setupdateCount(updateCount => updateCount + 1);
    };

  return (
   <div className="MainWrapper">
           <div className="updatedata">YOU ADDED DATA: { addCount }....|| YOU UPDATED DATA { updateCount}....</div>
     <div className="inputwrapper">
     <div className="wrapper">
       
      <form action="datainput" onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="Title of the post"
            className="posttitile"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
         <textarea
            placeholder="description of post"
            type="text"
            className="teatxarea "
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
          <button className="publish" type="submit">
          Publish
        </button>

      </form>
     </div>
     </div>
      
      {
        posts.map((post)=>(
          <div className="wrapper" key={post._id}>
          <div className="toprow">
               <h2>{post.title}</h2>
               <span>{new Date(post.createdAt).toDateString()}</span>
               <Link to={`/update/${post._id}`} className="link">
               <button onClick={()=>handleupdateCount()}>Update</button>
               </Link>
               
               <button  onClick={()=>handleDelete(post._id)}>Delete</button>
              
          </div>
          <hr className="hr"/>
          <p>{post.desc}</p>
          
        </div>
        ))
      }

    

    
   </div>
  )
}
