import React, { useState, useEffect } from 'react';
import heartIcon from '../heart-icon.jpg';
import heartRedIcon from '../heartRed-icon.jpg';
import '../cssFile/posts.css';
import MessageDialog from '../component/MessageDialog';

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
            <img src={mainImage} className="img" alt='heartIcon'></img>
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
    const images = [heartIcon, heartRedIcon];
    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [buttonImages, setButtonImages] = useState<{ [key: string]: number }>({});

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
        if (images[buttonImages[likeId] % images.length] === heartRedIcon){
            newLikes[likeId] = (newLikes[likeId] || 0) - 1;
        }
        else {
            newLikes[likeId] = (newLikes[likeId] || 0) + 1;  
        }
        setLikes(newLikes);
        localStorage.setItem('likes', JSON.stringify(newLikes));
    };

    return (
        <>
            {images.map((img, index) => {
                const likeId = `like${index}`;
                const buttonImageIndex = buttonImages[likeId] || 0;
                return (
                    <Post
                        key={likeId}
                        mainImage={img} 
                        buttonImage={images[buttonImageIndex % images.length]}
                        likeId={likeId}
                        onClick={Like}
                        count={likes[likeId] || 0}
                    />
                );
            })}
        </>
    );
};

export default Posts;

