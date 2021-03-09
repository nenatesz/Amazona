import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";


function RegisterScreen(props) {


     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [repassword, setrePassword] = useState("");

     const userRegister = useSelector(state => state.userRegister);
     const { loading, userInfo, error} = userRegister;

     const dispatch = useDispatch();

     useEffect (() => {

    
        return () => {
    
        }
    
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    }

    return <div className="form">

    <form onSubmit={submitHandler}>
    <ul className="form-container">
               <li>
                   <h2>Create Account</h2>
               </li>
               <li>
                   {loading && <div>Loading...</div>}
                   {error && <div>{error}</div>}
               </li>
               <li>
                  <label htmlFor="name">
                      Name
                   </label>
                   <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>                      
                   </input>
              </li> 
              <li>
                  <label htmlFor="email">
                      Email
                   </label>
                   <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>                      
                   </input>
              </li> 
             
              <li>
                  <label htmlFor="password">
                      Password
                   </label>
                   <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>                      
                   </input>
              </li>
              <li>
                  <label htmlFor="password">
                     Re-Enter Password
                   </label>
                   <input type="password" name="repassword" id="repassword" onChange={(e) => setrePassword(e.target.value)}>                      
                   </input>
              </li>
              <li>
                  <button type="submit" className="button primary full-width">
                     Register
                  </button>
              </li>  
              <li>
                  Already have an Acccount? <Link to="/signin">Sigin-in</Link>
              </li>
           </ul>

    </form>
    </div>

} 

export default RegisterScreen;

