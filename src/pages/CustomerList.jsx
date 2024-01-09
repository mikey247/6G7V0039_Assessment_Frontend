import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


import './CustomerList.css';
import DeleteCustomerModal from '../components/DeleteCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';
import { Link } from 'react-router-dom';

const CustomerList = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshList = () => {
        setRefresh(prev => !prev);
    }

    const auth = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editCustomerModal, setEditCustomerModal] = useState(false);

    const [customerId, setCustomerId] = useState(null);
    const [deleteCustomerModal, setDeleteCustomerModal] = useState(false);

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setEditCustomerModal(true);
    };

    const handleDelete = (customerId) => {
        setCustomerId(customerId);
        setDeleteCustomerModal(true);
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/customer/get/all`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        } )
            .then(response => response.json())
            .then(data =>{
                setLoading(false);
                 setCustomers(data)
                })
            .catch(error => console.log(error));
    }, [refresh, auth.token]);

    return (
    <>
       <Link to={"/customer/create"}><h4>Add New</h4></Link>
       {loading && <h3>LOADING!!</h3>}
       {!loading && <table className='customer-table'>
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
               {customers.length === 0 && <tr><td colSpan="5">No customers found.</td></tr>}
               {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>{customer.businessName}</td>
                        <td>{customer.telephoneNumber}</td>
                        <td>{customer.address.addressLine1}, {customer.address.addressLine2},{customer.address.addressLine3} {customer.address.postCode}, {customer.address.country}</td>
                        {/* <td></td> */}
                        <td><button onClick={()=>{handleEdit(customer)}}>Edit</button></td>
                        <td><button onClick={() => handleDelete(customer.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>}
            {deleteCustomerModal && <DeleteCustomerModal
            customerId={customerId} 
            onClose={() => {
                setDeleteCustomerModal(false);
                refreshList();
            }}/> }  
            {editCustomerModal && <EditCustomerModal
             customer={editingCustomer} 
             onClose={() => {
                setEditCustomerModal(false);
                refreshList();
            }} /> }
         </>
    );
};

export default CustomerList;
