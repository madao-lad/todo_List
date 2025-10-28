const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require('dotenv').config();

const User = require("./schema/User.js");

app.post("/users", async (req, res)=> {
    try{
        console.log(req.body);
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })
        const response = await user.save();
        console.log("response saved");
        res.json("recieved "+ user.email);
    }catch(e){
        console.log("Error encountered: "+e);
    }

})

mongoose.connect(process.env.DATABASE2)
.then(()=>{
    console.log("Successfully connected to database");
    app.listen(process.env.SERVERPORT,()=>{
        console.log(`Server runs on port ${process.env.SERVERPORT}`);
    });
})
.catch(()=> {
    console.log("Couldn't connect to a database");
})


