import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/checkoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


function PlaceOrderScreen(props){

    // to get access to the cart from the store
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const cart = useSelector(state => state.cart)
    const {cartItems, shippingAddress, payment} = cart;  
    const dispatch = useDispatch()

    if(!shippingAddress.address){
        props.history.push("/shipping")
    } else if(!payment){
        props.history.push("/payment")
    }

    const toPrice = (num) => Number(num.toFixed(2));

    const placeOrderHandler = () => {
       dispatch(createOrder({...cart, orderItems: cartItems}))
    }

    

    const itemsPrice = toPrice(cartItems.reduce((a,c) => a + c.price* c.qty, 0));
    const shippingPrice = itemsPrice > 100 ? toPrice(0) : toPrice(10);
    const taxPrice = toPrice(0.75 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
  

    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, dispatch, props.history, order]);

    

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="cart">
        <div className="placeorder-info">
            <div>
                <h2>
                    Shipping
                </h2>
                <div>
                    <b>Name:</b> {cart.shippingAddress.fullName} <br/>
                    <b>Address:</b> {cart.shippingAddress.address}, {cart.shippingAddress.city},
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </div>
            </div>
            <div>
                <h3>
                    Payment
                </h3>
                <div>
                    <b>Method:</b> {cart.payment.paymentMethod}
                </div>
            </div>
            <div>
            <ul className='placeorder-list-container'>
                    <h3>Order Items</h3>
                {
                    cartItems.length === 0 ?
                    <div>Cart is Empty</div> 
                    :
                    cartItems.map(item => 
                        <li key={item.product}>
                            
                            <div>
                            <img src={item.image} alt="product" />
                            </div>
                                                
                      
                            <div>
                                <Link to={`/product/${item.product}`}> 
                                {item.name}
                                </Link>
                            </div> 
                            <div>
                                {item.qty} x ${item.price} = {item.qty * item.price}
                            </div>
                           
                        </li>
                    )
                }
            </ul>
            </div>            
        </div>
        <div className="placeorder-action">
            <ul>
                    <h2>Order Summary</h2>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice.toFixed(2)}</div>
                </li>
                <li>
                    <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
                </li>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
            </ul>
        </div>
    </div>
    </div>
       
    
}

export default PlaceOrderScreen 