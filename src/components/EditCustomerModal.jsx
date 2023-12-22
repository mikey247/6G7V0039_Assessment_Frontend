import { PropTypes } from "prop-types";
import { useState } from "react";
import "./Modal.css";

const EditCustomerModal = ({ customer, onClose }) => {
    const [editedBusinessName, setEditedBusinessName] = useState(customer.businessName);
    const [editedTelephoneNumber, setEditedTelephoneNumber] = useState(customer.telephoneNumber);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [address, setAddress] = useState({
        addressLine1: customer.address.addressLine1,
        addressLine2: customer.address.addressLine2|| "",
        addressLine3: customer.address.addressLine3|| "",
        postCode: customer.address.postCode,
        country: customer.address.country,
    });

    const handleEditCustomer = (e) => {
        e.preventDefault();
        const updatedCustomer = {
            businessName: editedBusinessName,
            telephoneNumber: editedTelephoneNumber,
            address: {
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                addressLine3: address.addressLine3,
                postCode: address.postCode,
                country: address.country,
            },
        };
        console.log(updatedCustomer);

        // Make a PUT request to the API with the updated customer data
        fetch(`${import.meta.env.VITE_API_URL}/customer/update/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Customer updated successfully:", data);
                setSuccessMessage("Customer updated successfully");
                setTimeout(() => {
                    onClose();
                }, 1000);
            })
            .catch((error) => {
                console.error("Error updating customer:", error);
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Edit Customer</h4>
                </div>
                <div className="modal-body">
                    <form action="">
                        <label htmlFor="description">BusinessName</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={editedBusinessName}
                            onChange={(e) => setEditedBusinessName(e.target.value)}
                        />

                        <label htmlFor="category">Telephone Number</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={editedTelephoneNumber}
                            onChange={(e) => setEditedTelephoneNumber(e.target.value)}
                        />

                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={address.addressLine1}
                            onChange={(e) =>
                                setAddress({ ...address, addressLine1: e.target.value })
                            }
                        />

                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={address.addressLine2}
                            onChange={(e) =>
                                setAddress({ ...address, addressLine2: e.target.value })
                            }
                        />

                        <label htmlFor="addressLine3">Address Line 3</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={address.addressLine3}
                            onChange={(e) =>
                                setAddress({ ...address, addressLine3: e.target.value })
                            }
                        />

                        <label htmlFor="postCode">Post Code</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={address.postCode}
                            onChange={(e) =>
                                setAddress({ ...address, postCode: e.target.value })
                            }
                        />

                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={address.country}
                            onChange={(e) =>
                                setAddress({ ...address, country: e.target.value })
                            }
                        />

                        <p>{successMessage && successMessage}</p>
                        <p>{errorMessage && errorMessage}</p>
                        <button
                            type="submit"
                            value="Submit"
                            onClick={(e) => {
                                handleEditCustomer(e);
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditCustomerModal.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        telephoneNumber: PropTypes.string.isRequired,
        address: PropTypes.shape({
            addressLine1: PropTypes.string.isRequired,
            addressLine2: PropTypes.string.isRequired,
            addressLine3: PropTypes.string.isRequired,
            postCode: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
        }).isRequired,
        businessName: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditCustomerModal;