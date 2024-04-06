const forgotPassword = () =>{
    return(
        <>
            <h1 className='title'>Sign in</h1>
            <label>Username:</label>
            <input type="text" id="username" name="username"/>
            <label>Password:</label>
            <input type="password" id="password" name="password"/>
            <button className='button-login' type="submit">Login</button>
        </>
    )
}

export default forgotPassword;