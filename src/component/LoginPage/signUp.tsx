import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";

const baseRoute = 'http://localhost:3100';
const loginRoute = '/login';
async function signUpRequest(username:string, password:string) {
    const res = await axiosInstance.post(`${baseRoute}${loginRoute}/signup`, { username, password}, {
        validateStatus: (status) => true
    });
    if (res.status !== 200) {
        alert("Error: " + res.data);
        return false;
    } else {
        alert(res.data);
        return true;
    }
}

function SignUp () {
    const navigate = useNavigate();

    const SignUpUser = async () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if(await signUpRequest(username, password)){
            navigate('/loginPage');
        }
    }

    return(

        <>
         <div className="login-container">
            <h1 className='title'>Sign in</h1>
            <label>Username:</label>
            <input type="text" id="username" name="username"/>
            <label>Password:</label>
            <input type="password" id="password" name="password"/>
            <button className='button-login' type="submit" onClick={SignUpUser}>Login</button>
        </div>
        </>
    )
}

export default SignUp;