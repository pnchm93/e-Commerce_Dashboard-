import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [catogery, setcatogery] = useState('');
    const [company, setcompany] = useState('');
    let navigate=useNavigate();
    const params=useParams();
    useEffect(()=>{
        getProductDetails();
    },[])
    const getProductDetails= async ()=>{
        console.log(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setname(result.name);
        setcatogery(result.catogery);
        setcompany(result.company);
        setprice(result.price);
    }
    
    const updateProduct = async () => {
        console.log(name,price,catogery, company);
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,catogery,company}),
            headers:{
                'Content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        console.log(result);
        navigate('/');

    }

    return (
        <div className="inputBox">
            <h5>Update the product successfully...!</h5>
            <input type='text' placeholder="Product name"
                onChange={(e) => setname(e.target.value)} value={name} /><br />


            <input type='text' placeholder="Product price"
                onChange={(e) => setprice(e.target.value)} value={price} /> <br />

            <input type='text' placeholder="Product catogery"
                onChange={(e) => setcatogery(e.target.value)} value={catogery} /><br />


            <input type='text' placeholder="Product company"
                onChange={(e) => setcompany(e.target.value)} value={company} /><br />

            <button className='appButton' onClick={updateProduct} >Update Data</button><br />
        </div>
    )
}

export default UpdateProduct;