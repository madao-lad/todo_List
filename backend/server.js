const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const task = require("./schema/task.js");

mongoose.connect('mongodb+srv://bhattrishav84_db_user:0wds1TlqZphq0MjJ@tasks.hgsdqn4.mongodb.net/?retryWrites=true&w=majority&appName=tasks')
.then(()=> {
    console.log("Database connection succesful");
    app.listen(5000, ()=> {
        console.log("Server is up and running");
    })
})
.catch(()=> {
    console.log("Couldn't connect to database");
})

app.get("/tasks", async (req, res)=>{
    try{
        const taskLog = await task.find();
        res.status(200).json(taskLog);
    }catch(e){
        console.log(e.message);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

app.delete("/:_id", async (req, res)=> {
    try{
        const deletedTask = await task.findByIdAndDelete(req.params._id);
        if(!deletedTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }catch(e){
        console.log("Error occured while deletion");
        res.status(500).json({message: "Failed to delete task"});
    }
})

app.post("/", async (req, res)=> {
    try{
        const taskDetail = new task({
            title: req.body.title,
            description: req.body.description,
        })
        await taskDetail.save();
        console.log("User saved");
        res.json("recieved: "+req.body.title);
    }catch(e){
        console.log(e.message);
    }
})

