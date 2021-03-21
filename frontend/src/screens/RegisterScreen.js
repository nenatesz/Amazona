import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


function RegisterScreen(props) {


     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [repassword, setrePassword] = useState("");

     const userRegister = useSelector(state => state.userRegister);
     const { loading, userInfo, error} = userRegister;

     const dispatch = useDispatch();
     const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
     useEffect (() => {
       if(userInfo){
           props.history.push(redirect)
       }
    
    }, [userInfo, props.history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== repassword){
           alert("password and confirm password are not a match")
        } else{
            dispatch(register(name, email, password))
        }         
    }

    return <div className="form">

    <form onSubmit={submitHandler}>
    <div className="form-container">
               <div>
                   <h2>Create Account</h2>
               </div>
               <div>
                   {loading && <LoadingBox></LoadingBox>}
                   {error && <MessageBox variant='danger'>{error}</MessageBox>}
               </div>
               <div>
                  <label htmlFor="name">
                      Name
                   </label>
                   <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}>                      
                   </input>
              </div> 
              <div>
                  <label htmlFor="email">
                      Email
                   </label>
                   <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}>                      
                   </input>
              </div> 
             
              <div>
                  <label htmlFor="password">
                      Password
                   </label>
                   <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)}>                      
                   </input>
              </div>
              <div>
                  <label htmlFor="password">
                     Re-Enter Password
                   </label>
                   <input type="password" name="repassword" id="repassword" required onChange={(e) => setrePassword(e.target.value)}>                      
                   </input>
              </div>
              <div>
                  <button type="submit" className="button primary full-width">
                     Register
                  </button>
              </div>  
              <div>
                  Already have an Acccount?{' '}
                   <Link to= {`/signin?redirect=${redirect}`}>Sigin In</Link>
              </div>
           </div>
    </form>
    </div>

} 

export default RegisterScreen;

