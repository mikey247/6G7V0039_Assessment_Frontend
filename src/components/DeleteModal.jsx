import { PropTypes } from "prop-types";
import { useState } from "react";
import "./Modal.css";


const DeleteModal = ({ productId, onClose }) => {
    const [message, setMessage] = useState(null);

    const handleDeleteProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        fetch(`${import.meta.env.VITE_API_URL}/product/delete/${productId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setMessage("Product Deleted successfully");
                setTimeout(()=>{
                    onClose()
                }, 1000)
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="modal" onClick={onClose} >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Edit Product</h4>
                </div>
                <div className="modal-body"> 
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={(e)=>{handleDeleteProduct(e)}}>Confirm</button>
                    <p>{message && message}</p>
                </div>
            </div>
        </div>
    );
};


DeleteModal.propTypes = {
    productId:PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default DeleteModal;