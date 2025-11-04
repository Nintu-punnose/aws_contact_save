import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import {  useSelector } from "react-redux";


const ViewProducts = () => {
  const [view, setView] = useState([]); 
  const [id, setid] = useState([]); 
  const [name, setname] = useState([]); 
  const [price, setprice] = useState([]); 
  const [description, setdescrip] = useState([]); 
  const [showModal, setShowModal] = useState(false); 

  var user = useSelector(store=>store.auth.user);

  function fetchvalue() {

    const userid = user.id  

    
    axios
      .get(`/api/retrieve_product_api/${userid}`)
      .then((response) => {
        setView(response.data.data); 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  function deleteproduct(id) {
    console.log(id);
    axios.delete(`/api/delete_product_api/${id}`) 
      .then((response) => {
        console.log('Product deleted successfully:', response.data);
        fetchvalue();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }



  function modalfunction(id,name,price,description){
    setShowModal(true)
    setname(name)
    setprice(price)
    setdescrip(description)
    setid(id)
  }


  function savechange(id) {
    const updated_data = {
      name: name,
      price: price,
      description: description,
    };
  
    const options = {
      headers: { Accept: 'application/json' },
    };
  
    axios.put(`/api/update_product_api/${id}`, updated_data, options)
      .then((response) => {
        console.log("Updated successfully:", response.data);
        setShowModal(false)
        fetchvalue()
      })
      .catch((error) => {
        console.error("Error occurred while updating product:", error.response || error.message || error);
      });
  }
  

  
  useEffect(() => {
    if(user){
       fetchvalue();
    }
  }, [user]);

  return (
    <>
      <Navbar/>
       <div className="container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      <div className="row">
        {view && view.length > 0 ? (
          view.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary" id="editbtn" onClick={() => modalfunction(product.id, product.name, product.price, product.description)}>Edit</button>
                  <button className="btn btn-danger m-2" id="deletebtn" onClick={() => deleteproduct(product.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
      <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            {/* Input fields */}
            <form>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Name</label>
                <input type="text" className="form-control" id="productName" value={name} onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Price</label>
                <input type="number" className="form-control" id="productPrice" placeholder="Enter product price" value={price} onChange={(e) => setprice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">Description</label>
                <textarea className="form-control" id="productDescription" rows="3" value={description} onChange={(e) => setdescrip(e.target.value)}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">Close</button>
            <button type="button" className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>      
  )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
    </>
  );
};

export default ViewProducts;
