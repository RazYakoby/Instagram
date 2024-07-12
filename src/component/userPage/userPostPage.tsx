import React, { useState, useEffect } from "react";
import '../../cssFile/posts.css';
import MessageDialog from '../MessageDialog';
import axios from "axios";
import { axiosInstance } from "../../api/axios";
import { getSrcPost } from "../MainPage/explorer";

import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';

const baseRoute = 'http://localhost:3100';
const userRoute = '/user';

interface ImageData {
    name: string;
    src: string;
}

interface PostProps {
    userName: string;
    mainImage: string;
    buttonImage: string;
    likeId: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, likeId: string) => void;
    count: number;
}

const Post: React.FC<PostProps> = ({ mainImage, userName, buttonImage, likeId, onClick, count }) => {
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
            <div className='imageDetails'>
                <button className='userNameButton'></button>
                <h4 className='userNameText'>{userName}</h4>
            </div>
            <div>
                <img src={mainImage} className="img" alt="image" />
            </div>
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

const UserPostPage: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const likeImages = [heartIcon, heartRedIcon];
    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [buttonImages, setButtonImages] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const src = getSrcPost(); // Make sure getSrcPost() returns the correct value
                const response = await axios.post(`${baseRoute}${userRoute}/userpostsnstatus`, { src }, {
                    validateStatus: (status) => true
                });

                if (response.status === 200) {
                    console.log('User posts:', response.data); // Logging fetched user posts
                    const srcList: ImageData[] = response.data.map((item: any) => ({ name: item.name, src: item.src }));
                    setImages(srcList);
                } else {
                    console.error('Failed to fetch user posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
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
        const currentImage = likeImages[newButtonImages[likeId] % likeImages.length];

        if (currentImage === heartRedIcon) {
            newLikes[likeId] = (newLikes[likeId] || 0) - 1;
        } else {
            newLikes[likeId] = (newLikes[likeId] || 0) + 1;
        }

        setLikes(newLikes);
        localStorage.setItem('likes', JSON.stringify(newLikes));
    };

    return (
        <div>
            {images.length > 0 ?
                (images.map((img, index) => {
                    const likeId = `like${index}`;
                    const buttonImageIndex = buttonImages[likeId] || 0;
                    const buttonImage = buttonImageIndex % likeImages.length === index ? heartRedIcon : heartIcon;
                    return (
                        <Post
                            key={likeId}
                            userName={img.name}
                            mainImage={img.src}
                            buttonImage={buttonImage}
                            likeId={likeId}
                            onClick={Like}
                            count={likes[likeId] || 0}
                        />
                    );
                })) : (
                    <p>Loading images...</p>
                )}
        </div>
    );
};

export default UserPostPage;
