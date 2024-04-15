import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from '../MainPage/main';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';
import '../cssFile/loginPage.css';

function LoginPage(){

    return (
        <>
        <body>
            <h3 className='title'>Instagram</h3>
            <div className="login-container">
                <form className="prism">
                    <h1 className='title'>Login</h1>
                    <label>Username:</label>
                    <input type="text" id="username" name="username"/>
                    <label>Password:</label>
                    <input type="password" id="password" name="password"/>
                    <Link to={"/MainPage"}><button className='button-login' type="submit">Login</button></Link>
                    <Link to={"/forgotPassword"}><h5>Forgot Password?</h5></Link>
                    <Link to={"/signUp"}><h5>Sign up</h5></Link>
                </form>
            </div>
        </body>
        </>
    );
}

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/*' element={<LoginPage/>}></Route>
                <Route path='/mainPage' element={<MainPage/>}></Route>
                <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
                <Route path='/signUp' element={<SignUp/>}></Route>
            </Routes>
        </Router>
    )
}


export default App;

