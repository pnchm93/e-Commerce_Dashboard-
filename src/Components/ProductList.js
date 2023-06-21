import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setproducts(result);
        // console.log(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setproducts(result);
        }
        else {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-box" placeholder="Search Product"
                onChange={searchHandle} />
            <ul className="head">
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Catogery</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.catogery}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)} className="delete">Delete</button>
                            <Link to={"/update/" + item._id} className="update">Update</Link>
                        </li>
                    </ul>
                )
                : <h2 className="validResult ">No Result Found...!</h2>
            }
        </div>
    )
}
export default ProductList; 