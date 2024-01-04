import {PropTypes} from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Modal.css";

const EditProductModal = ({product, onClose}) => {
    const auth = useSelector((state) => state.auth);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [editedCategory, setEditedCategory] = useState(product.category);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedSku, setEditedSku] = useState(product.sku);
    const [successMessage, setSuccessMessage]= useState(null);
    const [errorMessage, setErrorMessage]= useState(null);

    const handleEditProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const updatedProduct = {
            description: editedDescription,
            category: editedCategory,
            price: editedPrice,
            sku: editedSku
        };
        console.log(updatedProduct);
    
        // Make a PUT request to the API with the updated product data
        fetch(`${import.meta.env.VITE_API_URL}/product/update/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the API
                console.log('Product updated successfully:', data);
                setSuccessMessage("Product updated successfully");
                setTimeout(()=>{
                    onClose()
                }, 1000)
                // Perform any additional actions after the product is updated
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="modal" onClick={onClose} >
           <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Edit Product</h4>
                </div>
             <div className="modal-body">
                <form action="">
                    <label htmlFor="description">Description</label>
                    <input required={true} type="text" name="" id="" value={editedDescription}  onChange={(e) => setEditedDescription(e.target.value)} />

                    <label htmlFor="category">Category</label>
                    <input required={true} type="text" name="" id="" value={editedCategory} onChange={(e)=> setEditedCategory(e.target.value)}/>

                    <label htmlFor="price">Price</label>
                    <input required={true} type="text" name="" id="" value={editedPrice} onChange={(e)=> setEditedPrice(e.target.value)} />

                    <label htmlFor="sku">SKU</label>
                    <input disabled required={true} type="text" name="" id="" value={editedSku} onChange={(e)=> setEditedSku(e.target.value)} />

                    <p>{successMessage && successMessage}</p>
                    <p>{errorMessage && errorMessage}</p>
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
        description: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired
}).isRequired,
onClose: PropTypes.func.isRequired
};

export default EditProductModal;