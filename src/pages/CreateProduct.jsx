import { useState } from 'react';
import './CreateProduct.css';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";



const CreateProduct = () => {
    const auth = useSelector((state) => state.auth);
    const [sku, setSKU] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSkuChange = (e) => {
        setSKU(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const productDetails = {
            category,
            description,
            sku,
            price: Number(price),
        };
    
        console.log(productDetails);
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/product/create`, {
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
    
            console.log("Product created successfully", responseData);
            setSuccess(true);
            setError(null);
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (err) {
            console.error(err.message);
            setError(err.message); // Assuming setError is a state setter for displaying the error
        }
    };    

    return (
        <div className="create-product">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">SKU:</label>
                <input required={true} type="text" id="sku" value={sku} onChange={handleSkuChange} />

                <label htmlFor="price">Price:</label>
                <input required={true} type="text" id="price" value={price} onChange={handlePriceChange} />

                <label htmlFor="description">Description:</label>
                <input required={true} type='text' id="description" value={description} onChange={handleDescriptionChange} />
                
                <label htmlFor="category">Category:</label>
                <input required={true} type='text' id="category" value={category} onChange={handleCategoryChange} />
                <p className='errorMessage'>{error && error}</p>
                <p className='successMessage'>{success && 'Product created'}</p>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProduct;
