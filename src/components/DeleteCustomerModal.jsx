import { PropTypes } from "prop-types";
import { useState } from "react";
import "./DeleteModal.css";
import { useSelector } from "react-redux";


const DeleteCustomerModal = ({ customerId, onClose }) => {
    const [message, setMessage] = useState(null);
    const auth = useSelector((state) => state.auth);

    const handleDeleteCustomer = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(customerId);
        fetch(`${import.meta.env.VITE_API_URL}/customer/delete/${customerId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setMessage("Customer Deleted successfully");
                setTimeout(()=>{
                    onClose()
                }, 1000)
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    };

    return (
        <div className="delete-modal" onClick={onClose} >
            <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
                <div className="delete-modal-header">
                    <h4 className="delete-modal-title">Delete Customer</h4>
                </div>
                <div className="delete-modal-body"> 
                    <button className="cancelButton" onClick={onClose}>Cancel</button>
                    <span style={{ marginRight: '10px' }}></span>
                    <button className="deleteButton" onClick={(e)=>{handleDeleteCustomer(e)}}>Confirm</button>
                </div>
                    <p>{message && message}</p>
            </div>
        </div>
    );
};


DeleteCustomerModal.propTypes = {
    customerId:PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default DeleteCustomerModal;