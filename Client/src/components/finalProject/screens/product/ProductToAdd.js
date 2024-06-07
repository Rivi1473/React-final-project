import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addToShoppingCart } from '../../features/orders/ordersSlice'
import ShoppingCart from "../order/ShoppingCart";
import '../../ProductDetails.css';

const ProductToAdd = () => {
    const { state } = useLocation();
    const { p } = state;
    const [quantity, setQuantity] = useState(1);
    const dis = useDispatch()
    const [showCart, setShowCart] = useState(false)

    const addToCart = () => {
        dis(addToShoppingCart({ p, quantity }))
        setShowCart(true)
        setTimeout(() => {
            setShowCart(false)
        }, 5000)
    }
    useEffect(() => {
        if (showCart) {
            const timer = setTimeout(() => {
                setShowCart(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showCart]);

    return (<>
        <div className="shopping-cart-container">
            {showCart && <ShoppingCart show='true'></ShoppingCart>}
        </div>
        <div className="product-details-container">
            <img src={p.imgUrl} alt={p.name} className="product-image" />
            <div className="product-details">
                <h2>{p.description}</h2>
                <p>price:{p.price}</p>
                <p>category:{p.category}</p>
                <div className="quantity-container">
                    <div className="quantity-controls">
                        <button className="quantity-button" onClick={() => setQuantity(prevQuantity => prevQuantity - 1)} disabled={quantity === 1}>
                            <span>-</span>
                        </button>
                        <span>{quantity}</span>
                        <button className="quantity-button" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>
                            <span>+</span>
                        </button>
                    </div>
                    <button className="add-to-cart-button" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div></>
    );
}

export default ProductToAdd;