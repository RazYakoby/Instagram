import { useState } from "react";
import "../cssFile/setting.css";
import { Link, useNavigate } from "react-router-dom";

function Setting(){

    const [isClick, setIsClick] = useState(true);

    const navigate = useNavigate();

    const currentPath = window.location.pathname;
      
    const Home = () => {
      if (currentPath === "/main") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else {
        navigate('/main');
      }
    }

    const UploadPost = () => {
        navigate('/uploadPost');
    }
  
    const handleOpen = () => { 
       setIsClick(!isClick);
    };

    const logOut = () => {
        navigate("/loginPage");
    }


    return(
        <div className="menu">
            <button className={isClick ? "button_style_unClick" : "button_style_click"} onClick={handleOpen} style={{ borderRadius: '10px'}} >menu</button>
            <div className={isClick ? "close_menu" : "open_menu"}>
                <div>
                    <h3><button id="button" onClick={Home}>Home</button></h3>
                    <h3><button id="button" onClick={UploadPost}>upload Post</button></h3>
                    <h3><button id="button">explorer</button></h3>
                    <h3><button id="button" onClick={logOut}>logOut</button></h3>
                </div>
            </div>
        </div>
    );
}

export default Setting;