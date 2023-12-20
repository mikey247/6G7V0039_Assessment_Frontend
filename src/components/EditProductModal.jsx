import {PropTypes} from "prop-types";
import { useState } from "react";
import "./Modal.css";

const EditProductModal = ({product, onClose}) => {
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [editedCategory, setEditedCategory] = useState(product.category);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [message, setMessage]= useState(null);

    const handleEditProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const updatedProduct = {
            description: editedDescription,
            category: editedCategory,
            price: editedPrice
        };
    
        // Make a PUT request to the API with the updated product data
        fetch(`${import.meta.env.VITE_API_URL}/product/update/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the API
                console.log('Product updated successfully:', data);
                setMessage("Product updated successfully");
                setTimeout(()=>{
                    onClose()
                }, 1000)
                // Perform any additional actions after the product is updated
            })
            .catch(error => {
                console.error('Error updating product:', error);
                // Handle the error
            });
    };

    return (
        <div className="modal" onClick={onClose} >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Edit Product</h4>
                    <button onClick={onClose}>X</button>
                </div>
        <div className="modal-body">
          <form action="">
            <label htmlFor="description">Description</label>
            <input type="text" name="" id="" value={editedDescription}  onChange={(e) => setEditedDescription(e.target.value)} />
            <label htmlFor="category">Category</label>
            <input type="text" name="" id="" value={editedCategory} onChange={(e)=> setEditedCategory(e.target.value)}/>
            <label htmlFor="price">Price</label>
            <input type="text" name="" id="" value={editedPrice} onChange={(e)=> setEditedPrice(e.target.value)} />
            <p>{message && message}</p>
            <button type="submit" value="Submit"  onClick={(e)=>{handleEditProduct(e)}}> Submit</button>
          </form>
            </div>
            </div>
        </div>
    );
};


EditProductModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
}).isRequired,
onClose: PropTypes.func.isRequired
};

export default EditProductModal;