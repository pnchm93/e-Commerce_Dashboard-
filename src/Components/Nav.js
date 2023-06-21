//here Nav component is basically acting as the Header 
//whcih will be common for all the file and shared to all
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../App.css'

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    const auth = localStorage.getItem('user');
    return (
        <div className="App">
       
        {
            
            auth?
            <ul className="nav-ul">
            <img className="logo" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVFTpXKLiYP8D-xSQgLhFUXxqd7fMsnyU4ydPKE_xniGsSemindPwlZu3Pv_MV3fF2jg&usqp=CAU'/>
                <li><NavLink to='/'>Products</NavLink></li>
                <li><NavLink to='/add'>Add Products</NavLink></li>
                <li><NavLink to='/update'>Update Products</NavLink></li>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).username})</Link></li>
            </ul>
            :<ul className="nav-ul right-shift">
            <li><Link to='/signup'> Sign Up</Link></li>
            <li><Link to ='/login'>Login</Link></li>
            </ul>
        }
        </div>
    )
}
export default Nav;