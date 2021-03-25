import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

function AdminRoute({component: Component, ...rest}) {

const userSignin = useSelector(state => state.userSignin);
const { userInfo } = userSignin;

return(
    <Route
    {...rest} render={(props) => userInfo && userInfo.Admin ? (
        <Component {...props}></Component>) : (
            <Redirect to='/signin' />
        )
    }
    ></Route>
)

}
export default AdminRoute 