import { useEffect, useState } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/customer/get/all`)
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>{customer.businessName}</td>
                        <td>{customer.telephoneNumber}</td>
                        <td>{customer.address.postCode}, {customer.address.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerList;
