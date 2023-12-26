import { useState } from 'react';
import './CreateCustomer.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const CreateCustomer = () => {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        address: {
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            postCode: '',
            country: ''
        },
        businessName: '',
        telephoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    // Check if the field is part of the address object
        if (name in customer.address) {
            setCustomer(prevCustomer => ({
                ...prevCustomer,
                address: {
                    ...prevCustomer.address,
                    [name]: value
                }
            }));
        } else {
            // Update the top-level fields
            setCustomer(prevCustomer => ({
                ...prevCustomer,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send customer object to API
        console.log(customer);
        fetch(`${import.meta.env.VITE_API_URL}/customer/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(customer)
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log("Customer created successfuly", data)
            setTimeout(()=>{
                navigate('/customers');
            }, 2000)
        })
    };

    return (
        <>
        <div className='create-customer'>
        <form onSubmit={handleSubmit}>
            <label>
                Address Line 1:
                <input
                required={true}
                    type="text"
                    name="addressLine1"
                    value={customer.address.addressLine1}
                    onChange={handleChange}
                />
            </label>
            <label>
                Address Line 2:
                <input
                required={true}
                    type="text"
                    name="addressLine2"
                    value={customer.address.addressLine2}
                    onChange={handleChange}
                />
            </label>
            <label>
                Address Line 3:
                <input
                required={true}
                    type="text"
                    name="addressLine3"
                    value={customer.address.addressLine3}
                    onChange={handleChange}
                />
            </label>
            <label>
                Post Code:
                <input
                required={true}
                    type="text"
                    name="postCode"
                    value={customer.address.postCode}
                    onChange={handleChange}
                />
            </label>
            <label>
                Country:
                <input
                required={true}
                    type="text"
                    name="country"
                    value={customer.address.country}
                    onChange={handleChange}
                    />
            </label>
            <label>
                Business Name:
                <input
                required={true}
                    type="text"
                    name="businessName"
                    value={customer.businessName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Telephone Number:
                <input
                required={true}
                    type="text"
                    name="telephoneNumber"
                    value={customer.telephoneNumber}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Create Customer</button>
        </form>
        </div>
        </>
    );
};

export default CreateCustomer;
