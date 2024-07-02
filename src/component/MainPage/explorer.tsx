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

let srcPost = "";

function Explorer() {
    const [image, setImage] = useState<ImageData[]>([]);
    const navigate = useNavigate();
    let flag = false;

    const rndImg = async () => {
        const img = await GetPosts();
        const shuffledArray = img.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        setImage(shuffledArray);
    }

    useEffect(() => {
        if (flag === false){
            rndImg();
            flag = true;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === 'ArrowRight' || <Setting/>) {
                flag = false;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    const OpenPost = (src:string) => {
        setSrcPost(src);
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
                        onClick={() => OpenPost(img.src)}
                    />
                ))}
            </nav>
        </>
    );
}

export const setSrcPost = (src: string) => {
    srcPost = src;
};

export const getSrcPost = () => srcPost;

export default Explorer;
