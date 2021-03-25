import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen(props){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state)=> state.userDetails);
    const { loading, user, error } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(()=> {
        if(!user){
            dispatch({ type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        }else{
            setName(user.name);
            setEmail(user.email);
        }     
    }, [dispatch, userInfo._id, user]);
 
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== repassword){
            alert('Password and Re-Enter Password Are Not a Match');
        } else{
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
        }
    };

    return <div>
        <form className='form' onSubmit={submitHandler}>
        <div className='form-container'>
        <h1>User Profile</h1>
        {
            loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox variant='danger'>{error}</MessageBox> :
            <>
            {loadingUpdate && (<LoadingBox></LoadingBox>)}
            {errorUpdate && (<MessageBox variant='danger'>{errorUpdate}</MessageBox>)}
            {successUpdate && (<MessageBox variant='success'>Profile Updated Successfully</MessageBox>)}
            <div>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input id='password' type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='repassword'>password</label>
                <input id='repassword' type='password' placeholder='re-Enter password' onChange={(e) => setRePassword(e.target.value)}></input>
            </div>
            <div>
                <label />
                <button type='submit' className='primary'>Update</button>
            </div>
            </>
        }
        </div>
        </form>
        </div>
    
}

export default ProfileScreen;