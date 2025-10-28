import { useState } from "react";
import axios from 'axios';

function LogIn() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const updateMail = (e) => {
        setEmail(e.target.value);
    }

    const updatePass = (e) => {
        setPassword(e.target.value);
    }

    const postUserInfo = async () => {
        try{
            const user = await fetch("http://localhost:8000/users", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            });
            setEmail('');
            setPassword('');
        }catch(e) {
            console.log("error ecountered "+ e);
        }

    }


  return (
    <div className="container">
        <label>Email</label>
        <input type="email" placeholder="Your email" value={email} onChange={updateMail}/> <br /> <br />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={updatePass} /> <br /> <br/>
        <button onClick={postUserInfo}>Submit</button>
    </div>
  );
}

export default LogIn;
