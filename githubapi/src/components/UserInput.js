import React from 'react';

// button style and details
const UserInput = (props) => {
    return(
    <form onSubmit={props.retrieveInfo}>
        <input 
        style= {{margin:"10px"}} 
        placeholder='Github Username'
        type="text" 
        name="username"
        autoComplete='off'
        />
        <button id="Search"> Search </button>
    </form>
    );
}

export default UserInput;

