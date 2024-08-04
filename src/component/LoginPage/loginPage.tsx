import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axios";
import '../../cssFile/loginPage.css';

const baseRoute = 'http://localhost:3100';
const loginRoute = '/login';
const userRoute = '/user';
let getUser = "";
let followers = "";
let following = "";
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

async function statusExists(username: string): Promise<boolean> {
    const res = await axiosInstance.post(`${baseRoute}${userRoute}/mystatusexists`, { username }, {
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

async function setStatus(username: string): Promise<boolean> {
    const res = await axiosInstance.post(`${baseRoute}${userRoute}/setstatus`, { username }, {
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
            setUsername(username);
            //if (!await statusExists(username)){
                //if(await setStatus(username)){
                    navigate("/MainPage");
                //}
          //  }
            //else {
               // if(await setStatus(username)){
                //    navigate("/MainPage");
               // }
           // }
        }
    } 

    const forgotPassetd = () => {
        navigate("/forgotPassword");
    }

    const signUp = () => {
        navigate("/signUp");
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
                    <div onClick={forgotPassetd}><h5>Forgot Password?</h5></div>
                    <div onClick={signUp}><h5>Sign up</h5></div>
                </form>
            </div>
        </>
    );
}

export const setUsername = (username: string) => {
    getUser = username;
};

export const setGetFollowers = (num: number) => {
    followers = num.toString();
}

export const setGetFollowing = (num: number) => {
    following = num.toString();
}

export const getUsername = () => getUser;
export const getFollowers = () => followers;
export const getFollowing = () => following;
export default LoginPage;
