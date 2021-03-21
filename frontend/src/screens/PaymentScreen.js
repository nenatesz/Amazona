import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions'
import CheckoutSteps from '../components/checkoutSteps';


function PaymentScreen (props){
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
       props.history.push("/shipping");
    };
    const [paymentMethod, setPaymentMethod] = useState('payStack');
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePayment({paymentMethod}))
        props.history.push("/placeorder")
    }

    return <div> 
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className='form'>
        <form onSubmit={submitHandler}>
            <div className='form-container'>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div> 
                    <div>  
                    <input type='radio' name='paymentMethod' id='paymentMethod' value='paystack'
                    required checked  
                    onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor='paymentMethod'>
                        Paystack
                    </label>
                    </div> 
                </div>
                <div> 
                    <div>  
                    <input type='radio' name='paymentMethod' id='paymentMethod' value='flutterwave'
                    required   
                    onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor='paymentMethod'>
                        flutterwave
                    </label>
                    </div> 
                </div>
                <div>
                    <button type='sumbit' className='button primary'>Continue</button>
                </div>
            </div>
        </form>
    </div>
    </div>
}


export default PaymentScreen;

