import "./listupdate.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";

function Listupdate() {
    const [title, setTitle] = useState("");
     const [desc, setDesc] = useState("");
     const { user } = useContext(Context);
     const [updateMode, setUpdateMode] = useState(false);
     const location = useLocation();
     console.log(location);
     const path = location.pathname.split("/")[2];
     const [updateCount,setupdateCount] = useState(0);
     console.log(path);  
     const handleSubmit = async (e) => {
        e.preventDefault();
         const newPost = {
          username: user.username,
          title,
          desc
        };
         try {
          const res = await axios.put("/lists/"+path, newPost);
          setUpdateMode(true);
         // console.log(res.data);
         setupdateCount(c => c + 1);
         window.location.replace("/");//this will show display post content
           
        } catch (err) {}
        };

        useEffect(() => {
            setupdateCount(JSON.parse(window.sessionStorage.getItem("updateCount")));
          }, []);

        useEffect(() => {
            window.sessionStorage.setItem("updateCount", updateCount);
          }, [updateCount]);

  return (
    <div>
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
          Update
        </button>

      </form>
     </div>
     {updateMode && <h1> Data Updated...</h1>}
     </div>
    </div>
  )
}

export default Listupdate
