import { useNavigate } from 'react-router-dom';
import '../cssFile/loginPage.css';
import { axiosInstance } from "../api/axios";

const baseRoute = 'http://localhost:3100';
const loginRoute = '/login';
async function canLogin(username: string, password: string): Promise<boolean> {
    const res = await axiosInstance.post(`${baseRoute}${loginRoute}/loginpage`, { username, password}, {
        validateStatus: (status) => true
    });

    if (res.status !== 200) {
        alert("Error: " + res.data);
        return false;
    } else {
        console.log(res.data);
        return true;
    }
}

function LoginPage() {
    const navigate = useNavigate();

    const login = async () => {    
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (await canLogin(username, password)) {
            navigate("/MainPage");
        }
    } 

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
                    <div className='button-login' onClick={login}>Login</div>
                    <div><h5>Forgot Password?</h5></div>
                    <div><h5>Sign up</h5></div>
                </form>
            </div>
        </>
    );
}


export default LoginPage;
