import { useState } from "react";
import "../cssFile/setting.css";

function Setting(){

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
                <h3>home</h3>
                <h3>upload Post</h3>
                <h3>explorer</h3>
                <h3>setting</h3>
            </div>
        </div>
    );
}

export default Setting;