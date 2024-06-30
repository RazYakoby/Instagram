import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/main';
import LoginPage from './loginPage';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';
import Setting from '../MainPage/setting';
import UploadPost from '../MainPage/uploadPost'; // Corrected from UploadPoat to UploadPost
import Posts from '../MainPage/posts';
import Main from '../MainPage/main';
import Explorer from '../MainPage/explorer';
import User from '../MainPage/user';
import UserPostPage from '../userPage/userPostPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<LoginPage />} />
                <Route path='/mainPage' element={<MainPage />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/main' element={<Main />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/uploadPost' element={<UploadPost />} />
                <Route path='/explorer' element={<Explorer />} />
                <Route path='/user' element={<User />} />
                <Route path='/userPostPage' element={<UserPostPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;