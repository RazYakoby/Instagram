import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios';

const baseRoute = 'http://localhost:3100';
const loginRoute = '/login';

async function updateYourPassword(username: string, password: string, newpassword: string): Promise<boolean> {
  const res = await axiosInstance.post(`${baseRoute}${loginRoute}/forgotpassword`, { username, password, newpassword }, {
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

function ForgotPassword() {
  const navigate = useNavigate();

  const createNewPassword = async () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const newpassword = (document.getElementById('newPassword') as HTMLInputElement).value;

    if (await updateYourPassword(username, password, newpassword)) {
      navigate('/loginPage');
    }
  }

  return (
    <div className="login-container">
      <h1 className='title'>Forgot Password</h1>
      <label>Username:</label>
      <input type="text" id="username" name="username" />
      <label>Password:</label>
      <input type="password" id="password" name="password" />
      <label>New Password:</label>
      <input type="password" id="newPassword" name="newPassword" />
      <button className='button-login' onClick={createNewPassword}>Update Password</button>
    </div>
  );
}

export default ForgotPassword;
