const forgotPassword = () =>{
    return(
        <>
            <div className="login-container">
                <h1 className='title'>forgot Pasword</h1>
                <label>Username:</label>
                <input type="text" id="username" name="username"/>
                <label>Password:</label>
                <input type="password" id="password" name="password"/>
                <label>new Password</label>
                <input type='password' id='newPassword' name='newPassword'></input>
                <button className='button-login' type="submit">Login</button>
            </div>
        </>
    )
}

export default forgotPassword;