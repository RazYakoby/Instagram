import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from '../MainPage/main';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';
import '../cssFile/loginPage.css';
import Setting from '../MainPage/setting';
import UploadPoat from '../MainPage/uploadPost';
import Posts from '../MainPage/posts';
import Main from '../MainPage/main';
import Explorer from '../MainPage/explorer';
import User from '../MainPage/user';

function LoginPage(){

    return (
        <>
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
                <Route path='main' element={<Main/>}></Route>
                <Route path='/posts' element = {<Posts/>}></Route>
                <Route path='/setting' element={<Setting/>}></Route>
                <Route path='/uploadPost' element={<UploadPoat/>}></Route>
                <Route path='/explorer' element={<Explorer/>}></Route>
                <Route path='/user' element={<User/>}></Route>
            </Routes>
        </Router>
    )
}


export default App;

