import { useEffect, useState } from 'react';

import './CustomerList.css';
import DeleteCustomerModal from '../components/DeleteCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';
import { Link } from 'react-router-dom';

const CustomerList = () => {
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
        fetch(`${import.meta.env.VITE_API_URL}/customer/get/all`)
            .then(response => response.json())
            .then(data =>{
                setLoading(false);
                 setCustomers(data)
                })
            .catch(error => console.log(error));
    }, [customers]);

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
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>{customer.businessName}</td>
                        <td>{customer.telephoneNumber}</td>
                        <td>{customer.address.postCode}, {customer.address.country}</td>
                        <td><button onClick={()=>{handleEdit(customer)}}>Edit</button></td>
                        <td><button onClick={() => handleDelete(customer.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>}
        {deleteCustomerModal && <DeleteCustomerModal customerId={customerId} onClose={() => setDeleteCustomerModal(false) }/>   }  
        {editCustomerModal && <EditCustomerModal customer={editingCustomer} onClose={() => setEditCustomerModal(false) }/>   }
         </>
    );
};

export default CustomerList;
