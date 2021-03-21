import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions'
import CheckoutSteps from '../components/checkoutSteps';


function ShippingScreen (props){

    const userSignin = useSelector((state) => state.userSignin);
    const cart = useSelector((state)=> state.cart);
    const {shippingAddress} = cart;
    const { userInfo } = userSignin;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAdress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch()
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShipping({fullName, address, city, postalCode, country}))
        props.history.push("/payment")
    }



    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className='form'>
        <form onSubmit={submitHandler}>
            <div className='form-container'>
                <div>
                    <h2>Shipping Address</h2>
                </div>
                <div> 
                    <label htmlFor='fullName'>
                        Full Name
                    </label>
                    <input type='text' name='fullName' id='fullname' value={fullName} placeholder='Enter full name' required onChange={(e)=>setFullName(e.target.value)}>
                    </input>
                </div>
                <div> 
                    <label htmlFor='address'>
                        Address
                    </label>
                    <input type='text' name='address' id='address' value={address} placeholder='Enter address' required onChange={(e)=>setAdress(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='city'>
                        City
                    </label>
                    <input type='text' name='city' id='city' value={city} placeholder='Enter city' required onChange={(e)=>setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='postalCode'>
                        Postal Code
                    </label>
                    <input type='text' name='postalCode' id='postalCode' value={postalCode} placeholder='Enter postal code' required onChange={(e)=>setPostalCode(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='country'>
                        Country
                    </label>
                    <input type='text' name='country' id='country' value={country} placeholder='Enter country' required onChange={(e)=>setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button type='submit' className='button primary'>Continue</button>
                </div>
            </div>
        </form>
    </div>
    </div>
}


export default ShippingScreen;

