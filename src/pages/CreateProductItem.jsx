import { useState,useEffect } from 'react';
import './CreateProduct.css';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";



const CreateProductItem = () => {
    const auth = useSelector((state) => state.auth);
    const [serialNumber, setSerialNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');
    const [productOptions, setProductOptions] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSerialNumberChange = (e) => {
        setSerialNumber(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const productDetails = {
            serialNumber,
            expiryDate,
        };
    
        console.log(productDetails);
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/food-item/create/${selectedProductId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(productDetails)
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(responseData.message || 'Error occurred');
            }
    
            console.log("Item created successfully", responseData);
            setSuccess(true);
            setError(null);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error(err.message);
            setError(err.message); // Assuming setError is a state setter for displaying the error
        }
    };    

    useEffect(() => {
        const fetchProductOptions = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/product/get/all`);
                const data = await response.json();
                setProductOptions(data);
            } catch (error) {
                console.error('Error fetching product options:', error);
            }
        };

        fetchProductOptions();
    }, []);


    // };

    return (
        <div className="create-product">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="serialNumber">Serial Number</label>
                <input type="text" id="serialNumber" value={serialNumber} onChange={handleSerialNumberChange} />

                <label htmlFor="expiryDate">Expiry Date (Format:2024-05-17)</label>
                <input type="date" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />

                <select value={selectedProductId} onChange={(e) => { console.log(e.target.value); setSelectedProductId(e.target.value)}}>
                    <option value="">Select a product</option>
                    {productOptions.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.description}
                        </option>
                    ))}
                </select>

                <p className='errorMessage'>{error && error}</p>
                <p className='successMessage'>{success && 'Product Item created'}</p>

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProductItem;
