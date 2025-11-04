import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import {  useSelector } from "react-redux";


const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  var navigate = useNavigate();

  var user = useSelector(store=>store.auth.user);


  const handleSubmit = (e) => {
    e.preventDefault();
    const userid = user.id
    const data = { name, price, description,userid };

    const option =  {
      headers: { Accept: "application/json" },
    }

    axios.post("api/create_product_api", data,option).then(() => {
      console.log("Product added successfully");
      navigate("/view")
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg border-0 rounded-4">
            <h2 className="text-center mb-4 text-primary">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input type="text" className="form-control rounded-3 shadow-sm" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Price</label>
                <input type="text" className="form-control rounded-3 shadow-sm" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control rounded-3 shadow-sm" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
