import React from 'react';

// user input with textbox and buttons
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

