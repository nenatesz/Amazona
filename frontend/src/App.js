import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import data from "./data";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProductsScreen from "./screens/ProductsScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./screens/PrivateRoute";


function App() {
  
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} =  userSignin; 
  const dispatch = useDispatch()
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const signoutHandler = () => {
     dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Amazona</Link>
            {/* <a href="/">Amazona</a> */}
          </div>
          <div className="header-links">
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
            </Link>
            {
               userInfo ? (
               <div className='dropdown'>
               <Link to="#">{userInfo.name} <i className='fa fa-caret-down'></i></Link>
               <ul className='dropdown-content'>
                 <li>
                   <Link to='/profile'>User Profile</Link>
                 </li>
                 <li>
                   <Link to="/orderhistory">Order History</Link>
                 </li>
                 <li>
                 <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                 </li>
               </ul>
               </div>):
               (<Link to="/signin">signin</Link>)
            }   
               {userInfo && userInfo.isAdmin && (
                 <div className='dropdown'>
                   <Link to='#admin'>
                     Admin <i className='fa fa-caret-down'></i>
                   </Link>
                   <ul className='dropdown-content'>
                     <li>
                       <Link to='/dashboard'>Dashborad</Link>
                     </li>
                     <li>
                       <Link to='/productlist'>products</Link>
                     </li>
                     <li>
                       <Link to='/orderlist'>Orders</Link>
                     </li>
                     <li>
                       <Link to='/userlist'>Users</Link>
                     </li>
                   </ul>
                 </div>
               )}      
         </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Dresses</a>
            </li>
            <li>
              <a href="index.html">blouses</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/products" component={ProductsScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
            <Route path="/" exact={true} component={HomeScreen}></Route>
          </div>
        </main>
        <footer className="footer row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
