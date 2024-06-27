import { useState } from "react";
import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';
import '../../cssFile/explorer.css';
import Setting from "./setting";

interface PostProps {
    mainImage: string;
    buttonImage: string;
    onClick: () => void;
}

const Post: React.FC<PostProps> = ({mainImage, buttonImage, onClick}) => {

    return (
        <div className="post-container">
            <nav className="posts">
                <img src={mainImage} className="postsImage" alt="postImage" />
                {buttonImage && <img src={buttonImage} className="postsImage" alt="buttonImage" onClick={onClick} />}
            </nav>
        </div>
    );
}

function Explorer() {
    const image = [heartIcon, heartRedIcon];

    const OpenPost = () => {
        console.log('Post opened');
    };

    return(
        <>
            <div>
                <Setting/>
            </div>
            <input className="search"/>
            <nav className="explorer-nav">
                {image.map((img, index) => (
                    <Post
                        key={index}
                        mainImage={img}
                        buttonImage=""
                        onClick={OpenPost}
                    />
                ))}
            </nav>
        </>
    );
}

export default Explorer;
