import { useEffect, useState } from "react";
import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';
import '../../cssFile/explorer.css';
import Setting from "./setting";
import axios from "axios";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const baseRoute = 'http://localhost:3100';
const mainRoute = '/main';

async function GetPosts(): Promise<ImageData[]> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/mainpage`, {}, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', JSON.stringify(res.data, null, 2)); // Pretty-print JSON data
            return Array.isArray(res.data) ? res.data : [];
        } else {
            console.error('Error response:', res.status, res.statusText);
            console.error('Response data:', JSON.stringify(res.data, null, 2)); // Pretty-print JSON data
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

interface ImageData {
    name: string;
    src: string;
}

interface PostProps {
    mainImage: string;
    buttonImage: string;
    onClick: () => void;
}

const Post: React.FC<PostProps> = ({mainImage, buttonImage, onClick}) => {

    return (
        <div className="post-container">
            <nav className="posts">
                <img src={mainImage} className="postsImage" alt="postImage" onClick={onClick} />
                {buttonImage && <img src={buttonImage} className="postsImage" alt="buttonImage" />}
            </nav>
        </div>
    );
}

let userPostName = "";

function Explorer() {
    const [image, setImage] = useState<ImageData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
            const img = await GetPosts();
            setImage(img);
        }
        fetchData();
    })

    const OpenPost = (username:string) => {
        setUserPostname(username);
        navigate("/userPostPage");
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
                        mainImage={img.src}
                        buttonImage=""
                        onClick={() => OpenPost(img.name)}
                    />
                ))}
            </nav>
        </>
    );
}

export const setUserPostname = (username: string) => {
    userPostName = username;
};

export const getUserPostname = () => userPostName;

export default Explorer;
