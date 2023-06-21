import React, { useState } from "react";

const Addproduct=()=>{
    const [name,setname]=useState('');
    const [price,setprice]=useState('');
    const [catogery,setcatogery]=useState('');
    const [company,setcompany]=useState('');
    const [error,seterror]=useState(false);
    const addProduct= async ()=>{
        
        if( !price || name==='' || catogery==='' || company===''){
            seterror(true);
            return false;
        }
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,catogery,company,userId}),
           
            //to add the data, we call the api ,use the method and add the product with product details converting into the json format from string
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }); 
       {
        setname('')
       }
       {
        setprice('')
       }
       {
        setcatogery('')
       }
       {
        setcompany('')
       }
        result=await result.json();
        
    }
    return (
        <div className="inputBox">
        <h3>Add the products...!</h3>

        <input type='text' placeholder="Product name" 
        onChange={(e)=>setname(e.target.value) } value={name}/><br/>
       {error && !name && <span className="invalid-input">Enter valid name</span>}

        <input type='text' placeholder="Product price" 
        onChange={(e)=>setprice(e.target.value)} value={price}/> <br/>
        {
            error && !price && <span className="invalid-input" >Enter valid price</span>
        }

        <input type='text' placeholder="Product catogery" 
        onChange={(e)=>setcatogery(e.target.value)} value={catogery}/><br/>
        {error &&  !catogery && <span className="invalid-input" >Enter valid catogery</span>}
        
        <input type='text' placeholder="Product company"
        onChange={(e)=>setcompany(e.target.value)} value={company}/><br/>
        {error &&  !company && <span className="invalid-input" >Enter valid company</span>}<br/>

        <button className='appButton'
        onClick={addProduct} >Add Product</button><br/>
        </div>
    )
}
export default Addproduct;