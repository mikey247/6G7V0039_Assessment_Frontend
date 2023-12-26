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

    const handleSubmit = (e) => {
        e.preventDefault();

        const productObject = {
            category,
            description,
            sku,
            price: Number(price),
        }
        console.log(productObject);
        fetch(`${import.meta.env.VITE_API_URL}/product/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(productObject)
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log("Product created successfuly", data)
            setTimeout(()=>{
                navigate('/');
            }, 2000)
        })
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

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProduct;
