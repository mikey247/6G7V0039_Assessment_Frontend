import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";

import "./ItemsList.css"
import { cartActions } from '../redux/cartRedux';

const ItemList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state variable for selected category
  const [selectedExpiry, setSelectedExpiry] = useState(""); // New state variable for selected expiry date

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart({ ...product, quantity: 1 }));
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/food-item/all`).then(response => response.json()).then((result) => {
      setLoading(false);
      setProducts(result);
    })
  }, []);

  // Filter products based on selected category and search term
  const currentDate = new Date();

  let filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.foodProduct.category === selectedCategory &&
          product.foodProduct.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products.filter(
        (product) =>
          product.foodProduct.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedExpiry === "expired") {
        filteredProducts = filteredProducts.filter(product => new Date(product.expiryDate) < currentDate);
      } else if (selectedExpiry === "non-expired") {
        filteredProducts = filteredProducts.filter(product => new Date(product.expiryDate) >= currentDate);
      }    

  return (
    <div>
      {auth.isLoggedIn && <Link to={"/item/create"}><h4>Add New Item</h4></Link>}
      <br />
      <div className='filters'>
        <div>
          <input
            className="search-box"
            type="text"
            placeholder="Search by description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=""> Filter by category: </label>
        <select className="product-select" name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {[...new Set(products.map((product) => product.foodProduct.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        </div>
          
          <div>
            <label htmlFor="">Filter by Expiry: </label>
          <select className='product-select' name="expiry" id="" value={selectedExpiry} onChange={(e)=> setSelectedExpiry(e.target.value)}>
            <option value="">All</option>
            <option value="expired">Expired</option>
            <option value="non-expired">Non-Expired</option>
          </select>
          </div>
            
      </div>
      
      {loading && <h3>LOADING!!</h3>}
      {!loading &&
      <table className='product-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Expiry Date</th>
            <th>Serial Number</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            {!auth.isLoggedIn && <th></th>}
          </tr>
        </thead>
       {filteredProducts.length === 0 ? ("No products found") : <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.expiryDate}</td>
              <td>{product.serialNumber}</td>
              <td>{product.foodProduct.sku}</td>
              <td>{product.foodProduct.description}</td>
              <td>{product.foodProduct.category}</td>
              <td>{product.foodProduct.price}</td>
              {!auth.isLoggedIn &&<td><button onClick={() => handleAddToCart({...product.foodProduct, serialNumber: product.serialNumber, expiryDate: product.expiryDate})}>Add to Cart</button></td>}
            </tr>
          ))}
        </tbody>}
      </table> 
      }
    </div>
  );
}

export default ItemList;

// {filteredProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <table className='product-table'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>SKU</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Price</th>
//               {auth.isLoggedIn && <th></th>}
//               {auth.isLoggedIn && <th></th>}
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map(product => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.sku}</td>
//                 <td>{product.description}</td>
//                 <td>{product.category}</td>
//                 <td>{product.price}</td>
//                 {auth.isLoggedIn && <td><button onClick={() => { handleEdit(product) }}>Edit</button></td>}
//                 {auth.isLoggedIn && <td><button onClick={() => handleDelete(product.id)}>Delete</button></td>}
//                 <td><button onClick={() => handleAddToCart(product)}>Add to Cart</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );