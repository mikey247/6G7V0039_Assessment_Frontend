import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/cartRedux";
import "./Cart.css";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(cartActions.addToCart({ ...product, quantity: 1 }));
    }

    const handleRemoveFromCart = (id)=> {
        dispatch(cartActions.removeFromCart(id));
    };

    return (
        <div className="cart">
            <h2 className="cart-title">Cart</h2>
            <div className="cart-list">
            {cart.products.map((product) => (
                <div key={product.id} className="product">
                    <div>
                        <h3 className="product-description">{product.description}</h3>
                        <p className="product-sku">SKU: {product.sku}</p>
                    </div>
                    <div>
                        <button onClick={()=>{handleAddToCart(product)}}>+</button>
                        <button onClick={()=>{handleRemoveFromCart(product.id)}}>-</button>
                    </div>
                    <div>
                        <p className="product-price">Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                </div>
            ))}
            </div>
            <p className="total-price">Total: ${cart.total}</p>
        </div>
    );
};

export default Cart;
