import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";

import "./ProductList.css"
import EditProductModal from '../components/EditProductModal';
import DeleteModal from '../components/DeleteProductModal';
import { cartActions } from '../redux/cartRedux';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductModal, setEditProductModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state variable for selected category

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart({ ...product, quantity: 1 }));
  }

  const refreshList = () => {
    setRefresh(prev => !prev);
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setEditProductModal(true)
  }

  const handleDelete = (productId) => {
    setProductId(productId);
    setDeleteProductModal(true);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/product/get/all`).then(response => response.json()).then((result) => {
      setLoading(false);
      setProducts(result);
    })
  }, [refresh]);

  // Filter products based on selected category and search term
  const filteredProducts = selectedCategory
    ? products.filter(
      (product) =>
        product.category === selectedCategory &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products.filter((product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      {auth.isLoggedIn && <Link to={"/product/create"}><h4>Add New Product🤺</h4></Link>}
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

        <select className="product-select" name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {[...new Set(products.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {loading && <h3>LOADING!!</h3>}
      {!loading &&
      <table className='product-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            {auth.isLoggedIn && <th></th>}
            {auth.isLoggedIn && <th></th>}
            <th></th>
          </tr>
        </thead>
       {filteredProducts.length === 0 ? ("No products found") : <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              {auth.isLoggedIn &&  <td><button onClick={() => { handleEdit(product) }}>Edit</button></td>}
              {auth.isLoggedIn && <td><button onClick={() => handleDelete(product.id)}>Delete</button></td>}
              <td><button onClick={() => handleAddToCart(product)}>Add to Cart</button></td>
            </tr>
          ))}
        </tbody>}
      </table>
      
      }

      {editProductModal && <EditProductModal
        product={editingProduct}
        onClose={() => { setEditProductModal(false); refreshList(); }} />}
      {deleteProductModal && <DeleteModal
        productId={productId}
        onClose={() => { setDeleteProductModal(false); refreshList(); }} />}
    </div>
  );
}

export default ProductList;

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