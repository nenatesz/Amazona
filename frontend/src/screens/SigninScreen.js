import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch() 
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

    useEffect(() =>{
              if (userInfo){
                  console.log(userInfo)
                   props.history.push(redirect)
              }
        
        // if userinfo state changes, this line of code will run
    }, [props.history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password)); 
        console.log(userInfo)
         
    }
    
    return <div className="form">
       <form onSubmit={submitHandler}>
           <div className="form-container">
               <div>
                   <h1>Sign In</h1>
               </div>
               <div>
                   {loading && <LoadingBox></LoadingBox>}
                   {error && <MessageBox variant="danger">{error}</MessageBox>}
               </div>
              <div>
                  <label htmlFor="email">
                      Email
                   </label>
                   <input type="email" name="email" id="email"
                   placeholder="Enter email"
                   required onChange={(e) => setEmail(e.target.value)}>                      
                   </input>
              </div> 
              <div>
                  <label htmlFor="password">
                      Password
                   </label>
                   <input type="password" name="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}>                      
                   </input>
              </div>
              <div>
                  <label />
                  <button type="submit" className="button primary">
                     Sign In
                  </button>
              </div>  
              <div>
                  <label />  
                  <div>
                  New customer? {' '}                 
                  <Link to={`/register?redirect=${redirect}`} className="button secondary">Create account</Link>
              </div>
              </div>
           </div>
       </form>
    </div>
}

export default SigninScreen;
