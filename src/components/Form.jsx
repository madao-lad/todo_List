import { useEffect, useState } from "react";
import axios from "axios";
import TaskContainer from "./TaskContainer";

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");

  const [task, setTask] = useState([]);

  const fetchTask = async () => {
    try{
      const jsonData = await axios.get("http://localhost:5000/tasks")
      setTask(jsonData.data);
    }catch(e){
      console.log("Error occured: "+e.message);
    }

  }
  useEffect(() =>{
    fetchTask();},
  [])
  
  const handleDelete = () => {
    fetchTask();
  }
  // useEffect(()=> {
  //   axios.get("http://localhost:5000/tasks")
  //   .then((res)=>{
  //     setTask(res.data);
  //     console.log(task);
  //   })
  //   .catch(()=>{
  //     console.log("Error occured ");
  //   })
  // }, [])


  const updateTitle = (e) => {
    setTitle( e.target.value);
  };

  const updateDesc = (e) => {
    setDes(e.target.value);
  };

  const postUserInfo = async () => {
    try {
      const task = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const response = await task.json();
      setTitle("");
      setDes("");
      fetchTask();
      console.log("Response: "+response);
    } catch(e) {
      console.log(e.message);
    }
  };
  return (
    <div className="backdrop">
      <div className="container">
        <label>Title</label>
        <input type="text" value={title} onChange={updateTitle} />
        <br />
        <label>Description</label>
        <textarea
          rows="10"
          cols="40"
          value={description}
          onChange={updateDesc}
        ></textarea>
        <br />
        <button onClick={postUserInfo}>Submit</button>
      </div>
      <div className="container" id="tasks">
        <h2>Tasks</h2>
        <div className="taskHolder">{task.map((tasks)=>{
          return <TaskContainer
            title={tasks.title}
            description={tasks.description}
            _id={tasks._id}
            onDelete={handleDelete}
          />
        })}</div>
      </div>
    </div>
  );
}

export default Form;
