import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions"
import MessageBox from "../components/MessageBox";


function CartScreen(props){

    // to get access to the cart from the store
    
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;
    console.log(cartItems)
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch()
    
    
    const removeFromCartHandler = (productId) => {
       dispatch(removeFromCart(productId));
    };
    

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const checkOutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }



    return (
       <div className="cart">
        <div className="cart-list">
                    <h3>Shopping Cart</h3>
                {cartItems.length === 0 ?
                    <MessageBox>Cart is empty. <Link to='/'>Go Shopping</Link>
                    </MessageBox> 
                    :
                    (                       
                    <ul className="cart-list-container">
                            {
                              cartItems.map((item) => 
                                <li key={item.product}>
                                    <div className="cart-image">
                                    <img src={item.image} alt={item.name}></img>
                                    </div>
                                    <div className="cart-name">
                                        <Link to={`/product/${item.product}`}> 
                                        {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => 
                                                <option key={x + 1} value={x + 1}> {x + 1} </option>
                                                )}
                                        </select>
                                       
                                        <button type="button" className='primary' onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </button>
                                        
                                    </div>
                                  
                                    <div className="cart-price">
                                        Price: ${item.price}
                                    </div>
                                
                                </li>
                            )   
                            }
                        </ul>


                    )
                   
                }
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) 
                :
                $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkOutHandler} className="button primary" disabled= {cartItems.length === 0}>
                Proceed to Checkout
            </button>
        </div>
    </div>
    )
}

export default CartScreen 