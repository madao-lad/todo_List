import axios from "axios";
import fetchTask from "./Form.jsx";


function TaskContainer({title, description, _id, onDelete}) {
    const deleteTask = async(_id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/${_id}`);
            onDelete();
            console.log("deleted: "+ response);
        }catch(e){
            console.log(e.message);
        }
    }

    return(
        <div className="task">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=>deleteTask(_id)}>Delete</button>
        </div>
    )
}

export default TaskContainer;