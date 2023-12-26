import { useSelector } from 'react-redux';
import { PropTypes } from "prop-types";
import { useState } from "react";
import "./DeleteModal.css";



const DeleteModal = ({ productId, onClose }) => {
    const [message, setMessage] = useState(null);
    const auth = useSelector((state) => state.auth);

    const handleDeleteProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        fetch(`${import.meta.env.VITE_API_URL}/product/delete/${productId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }        })
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
        <div className="delete-modal" onClick={onClose} >
            <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
                <div className="delete-modal-header">
                    <h4 className="delete-modal-title">Delete Product</h4>
                </div>
                <div className="delete-modal-body"> 
                    <button className="cancelButton" onClick={onClose}>Cancel</button>
                    <span style={{ marginRight: '10px' }}></span>
                    <button className="deleteButton" onClick={(e)=>{handleDeleteProduct(e)}}>Confirm</button>
                </div>
                    <p>{message && message}</p>
            </div>
        </div>
    );
};


DeleteModal.propTypes = {
    productId:PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default DeleteModal;