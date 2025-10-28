const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require('dotenv').config();

const task = require("./schema/task.js");

mongoose.connect(process.env.DATABASE)
.then(()=> {
    console.log("Database connection succesful");
    app.listen(5000, ()=> {
        console.log("Server is up and running");
    })
})
.catch((err)=> {
    console.log("Couldn't connect to database"+ err);
})
// })
// app.post("/addUser", async (req, res) => {
//     const data = await req.body;
//     const userInfo = new User({
//         email: req.body.email,
//         password: req.body.password,
//     });
// })

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

app.post("/newTask", async (req, res)=> {
    try{
        const taskDetail = new task({
            title: req.body.title,
            description: req.body.description,
        })
        await taskDetail.save();
        console.log("Task saved");
        res.json("recieved: "+req.body.title);
    }catch(e){
        console.log(e.message);
    }
})

