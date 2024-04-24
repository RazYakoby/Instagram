import { useState } from "react";
import "../cssFile/setting.css";
import MainPage from "./main";
import Posts from "./posts";
import loginPage from "../LoginPage/loginPage";
import { Link, useNavigate } from "react-router-dom";

function Setting(){

    const navigate = useNavigate();

    class Setting {
       open(): boolean {
       return true;
     }
    }

      const instance = new Setting();
      const postPage = Posts();
      
      const Home = () => {
      if (typeof instance.open === typeof Setting && instance.open()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else {
        navigate('/setting');
      }
    }

    const UploadPost = () => {
        navigate('/uploadPost');
    }
      

    const [isClick, setIsClick] = useState(false);
    const [count, setCount] = useState(0);
  
    const handleOpen = () => { 
        setCount(count + 1);      
        setIsClick(count % 2 === 0);
    };




    return(
        <div className="menu">
            <button className={isClick ? "button_style_unClick" : "button_style_click"} onClick={handleOpen} style={{ borderRadius: '10px'}} >menu</button>
            <div className={isClick ? "close_menu" : "open_menu"}>
                <div>
                    <h3><button id="button" onClick={Home}>Home</button></h3>
                    <h3><button id="button" onClick={UploadPost}>upload Post</button></h3>
                    <h3><button id="button">explorer</button></h3>
                    <h3><button id="button">setting</button></h3>
                </div>
            </div>
        </div>
    );
}

export default Setting;