import Axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from '../actions/orderActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

function OrderScreen(props){

    // to get access to the cart from the store
    
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false); 
    const dispatch = useDispatch(); 
    const orderDetails = useSelector(state=> state.orderDetails);
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const {loading, error, order} = orderDetails
    useEffect(() => {
        const addPayPalScript = async () => {
           const { data } = await Axios.get('/api/config/paypal') 
        //    create a script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        //  onload runs when the src is downloaded in your browser and is ready for use
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
        };
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(detailsOrder(orderId));
        }else{
           if(!order.isPaid){
               if(!window.paypal){
                   addPayPalScript();
               } else{
                   setSdkReady(true);
               }
           }
           console.log(window.paypal) 
        }
       
    }, [dispatch, orderId, sdkReady, order, successPay]);
   
    const successPaymentHandler = (paymentResult) => {
         dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<LoadingBox></LoadingBox>):
    error ? (<MessageBox variant='danger'>{error}</MessageBox>) :   
    ( 
    <div>
        <h1>Order {order._id}</h1>
        <div className="cart">
        <div className="placeorder-info">
            <div>
                <h2>
                    Shipping
                </h2>
                <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                    <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p> 
                {order.isDeliverd ? (<MessageBox variant='success'>Delivered at {order.deliveredAt}</MessageBox>):
                (<MessageBox variant='danger'>Not Delivered </MessageBox>)}
            </div>
            <div>
                <h3>
                    Payment
                </h3>
                <p>
                    <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (<MessageBox variant='success'>Paid at {order.paidAt}</MessageBox>):
                (<MessageBox variant='danger'>Not Paid </MessageBox>)}
            </div>
            <div>
            <ul className='placeorder-list-container'>
                    <h3>Order Items</h3>
                {
                    order.orderItems.map((item) => 
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
                    <div>${order.itemsPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>
                        <strong>Tax</strong>
                    </div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>
                        <strong>Order Total</strong>
                        </div>
                    <div>${order.totalPrice.toFixed(2)}</div>
                </li>
            {
                !order.isPaid && (
                    <li>
                        {!sdkReady ? (<LoadingBox></LoadingBox>) :
                        (
                            <div className='full-width'>
                              {errorPay && <MessageBox variant='danger'>{errorPay}</MessageBox>}
                              {loadingPay && <LoadingBox></LoadingBox>}
                              <PayPalButton  amount= {order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                            </div> 
                        )
                        }
                    </li>
                )
            } 
            </ul>
        </div>
    </div>
    </div>
    )   
}

export default OrderScreen; 