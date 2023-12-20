import { useEffect, useState } from 'react'
import "./ProductList.css"
import EditProductModal from '../components/EditProductModal';
import DeleteModal from '../components/DeleteModal';

const ProductList = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProductModal, setEditProductModal] = useState(false);

    const [productId, setProductId] = useState(null);
    const [deleteProductModal, setDeleteProductModal] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product)
    setEditProductModal(true)
  }

  const handleDelete = (productId) => {
    setProductId(productId);
    setDeleteProductModal(true);
  };

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/product/get/all`).then(response=>response.json()).then((result)=>{
      setLoading(false);
      setProducts(result);
    })     
    },[products]);

    return (
        <>
         {loading && <h3>LOADING!!</h3>}
         {!loading &&  <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td><button onClick={()=>{handleEdit(product)}}>Edit</button></td>
            <td><button onClick={() => handleDelete(product.id)}>Delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>}

    {editProductModal && <EditProductModal product={editingProduct} onClose={()=>{setEditProductModal(false)} }/>}
    {deleteProductModal && <DeleteModal productId={productId} onClose={()=>{setDeleteProductModal(false)} }/>}
  </>
     );
}
 
export default ProductList;