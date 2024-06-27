import React, { useState, useEffect } from 'react';
import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';
import '../../cssFile/posts.css';
import MessageDialog from '../MessageDialog';
import { axiosInstance } from "../../api/axios";
import {getUsername} from "../LoginPage/loginPage";
import { any } from 'prop-types';
import { json } from 'node:stream/consumers';

const baseRoute = 'http://localhost:3100';
const mainRoute = '/main';

async function GetPost(): Promise<string[]> {
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

interface PostProps {
    mainImage: string;
    buttonImage: string;
    likeId: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, likeId: string) => void;
    count: number;
}

const Post: React.FC<PostProps> = ({ mainImage, buttonImage, likeId, onClick, count }) => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<string[]>([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleConfirm = (text: string) => {
        setComments([...comments, text]);
        setOpen(false);
    };

    return (
        <nav className="post">
            <img src={mainImage} className="img" alt="image"></img>
            <div className='features'>
                <button id='Comment' onClick={handleOpen}>Comment</button>
                <MessageDialog open={open} onClose={handleClose} onConfirm={handleConfirm} comments={comments} />
                <button name='like' onClick={(e) => onClick(e, likeId)}>
                    <img src={buttonImage} alt='button image' className='likes' />
                </button>
            </div>
            <div>
                <h4 className='counter'>{count}</h4>
            </div>
        </nav>
    );
};

const Posts: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [buttonImages, setButtonImages] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchData = async () => {
            const srcList = await GetPost();
            setImages(srcList);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem('likes') || '{}');
        setLikes(savedLikes);
        const savedButtonImages = JSON.parse(localStorage.getItem('buttonImages') || '{}');
        setButtonImages(savedButtonImages);
    }, []);

    const Like = (event: React.MouseEvent<HTMLButtonElement>, likeId: string) => {
        const newButtonImages = { ...buttonImages };
        newButtonImages[likeId] = (newButtonImages[likeId] || 0) + 1;
        setButtonImages(newButtonImages);
        localStorage.setItem('buttonImages', JSON.stringify(newButtonImages));

        const newLikes = { ...likes };
        const currentImage = images[newButtonImages[likeId] % images.length];

        if (currentImage === heartRedIcon) {
            newLikes[likeId] = (newLikes[likeId] || 0) - 1;
        } else {
            newLikes[likeId] = (newLikes[likeId] || 0) + 1;
        }

        setLikes(newLikes);
        localStorage.setItem('likes', JSON.stringify(newLikes));
    };

    return (
        <>
            {images.length > 0 ?
             (images.map((img, index) => {
                const likeId = `like${index}`;
                const buttonImageIndex = buttonImages[likeId] || 0;
                const buttonImage = buttonImageIndex % images.length === index ? heartRedIcon : heartIcon;
                return (
                    <Post
                        key={likeId}
                        mainImage={img}
                        buttonImage={buttonImage}
                        likeId={likeId}
                        onClick={Like}
                        count={likes[likeId] || 0}
                    />
                );
            })) : (
                <p>Loading image...</p>
            )}
        </>
    );
};

export default Posts;
