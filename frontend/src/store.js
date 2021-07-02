import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; 
// import Cookie from "js-cookie"
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducers';
import { cartReducer} from './reducers/cartReducers'
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';


// const cartItems = Cookie.getJSON("cartItems") || [];
// const userInfo = Cookie.getJSON("userInfo") || null;


// const initialState = {cart: {cartItems, shipping:{}, payment:{} }, userSignin: {userInfo}};
// reducer is a function that gets a state and an action, and returns a newer state based on that action.

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null
     },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem("shipping") ? JSON.parse(localStorage.getItem("shipping")) : {},
        payment: "payStack"
    },
   
   
}


const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})
let store;
// thunk allows us run async operation inside action in redux
if (process.env.NODE_ENV ===  'development') {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
     store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
}else{
     store = createStore(reducer, initialState, applyMiddleware(thunk))
}




export default store;
