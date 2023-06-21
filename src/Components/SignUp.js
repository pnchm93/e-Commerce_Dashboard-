import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
function SignUp() {

    const navigate=useNavigate();
    const[name,setname]=useState();
    const[email,setemail]=useState();
    const[password,setpassword]=useState();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData=async ()=>{
        let result=await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result=await result.json();
        console.log(result);
        navigate('/');
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
    }
    return (
        
        <div>
            <div className="inputBox">
                <h2>SignUp Page...!</h2>
                <input type="text" placeholder="UserName" onChange={(e)=>{setname(e.target.value)}} /><br/>
                <input type='text' placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} /><br/>
                <input type='password' placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}} /><br/>
                <button type="button"onClick={collectData} >SignUp</button>
            </div>
        </div>
    )
}
export default SignUp;