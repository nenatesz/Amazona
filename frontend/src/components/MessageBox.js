import React from 'react';

// props.children will show the contents of messagebox in the palce it has been used
function MessageBox(props){

    return(
        <div className={`alert alert-${props.variant}` || 'info'}>{props.children}</div>
    )
}

export default MessageBox;