import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; 
import Cookie from "js-cookie"
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer} from './reducers/cartReducers'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems }, userSignin: {userInfo}};
// reducer is a function that gets a state and an action, and returns a newer state based on that action.
const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,

})

// thunk allows us run async operation inside action in redux
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))


export default store;
