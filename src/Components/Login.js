import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const navigate =useNavigate();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[])
    const handleLogin=async ()=>{
        console.log(email,password);
        let result= await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        result=await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("please enter correct details");
        }
    }
    return (
        <div className='inputBox' >
            <h3>User Login...!</h3>
            <input type='text' placeholder='Username' 
            onChange={(e)=>setemail(e.target.value)} value={email}/>
            <br/>
            <input type='text'  placeholder='Password'
            onChange={(e)=>setpassword(e.target.value)} value={password}/><br/>
            <button onClick={handleLogin} >Login Button</button>
        </div>
    )
}
export default Login;