import React from 'react';

// button style and details
const UserForm = (props) => {
    return(
    <form onSubmit={props.retrieveInfo}>
        <input 
        style= {{margin:"30px"}} 
        placeholder='Github Username'
        type="text" 
        name="username"
        //autoComplete='off'
        color='blue'
        />
        <button id="Search"> Search </button>
    </form>
    );
}

export default UserForm;

