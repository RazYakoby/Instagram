import heartIcon from '../heart-icon.jpg';
import heartRedIcom from '../heartRed-icon.jpg';
import '../cssFile/posts.css';
import { useEffect, useState } from 'react';
import MessageDialog from '../component/MessageDialog';
import { cursorTo } from 'readline';

function Posts(){

    const images = [heartIcon, heartRedIcom];
    const [currentImageIndex, setCurrentImagesIndex] = useState(0);

    const handleClick = () => {
        setCurrentImagesIndex((currentImageIndex + 1) % images.length);
    }

    const [count, setCount] = useState(() => {
        const saveCount = localStorage.getItem('likeCount');
        return saveCount ? parseInt(saveCount, 10) : 0;
    });

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

    useEffect(() => {
        const like1 = document.getElementById('like1');
        const like2 = document.getElementById('like2');

        const handleClick1 = () => {
            if (images[currentImageIndex] === heartRedIcom) {
                setCount((prev) => {
                    const newCount = prev - 1;
                    localStorage.setItem('likeCount', newCount.toString());
                    return newCount;
                })
            } else {
                setCount((prev) => {
                    const newCount = prev + 1;
                    localStorage.setItem("likeCount", newCount.toString());
                    return newCount;
                })
            }
        };

        like1?.addEventListener('click', handleClick1);
        like2?.addEventListener('click', handleClick1);

        return () => {
            like1?.removeEventListener('click', handleClick1);
            like2?.removeEventListener('click', handleClick1);
        }
    }, [currentImageIndex, images]);

    return(
        <>
            <nav className='story'>
                <button className='storyButton'></button>
                <button className='storyButton'></button>
                <button className='storyButton'></button>
            </nav>
            <nav className="post">
                <img src={heartIcon} className="img" alt='heartIcon'></img>
                <div className='features'>
                <button id='Comment' onClick={handleOpen}>Comment</button>
                <MessageDialog open={open} onClose={handleClose} onConfirm={handleConfirm} comments={comments} />
                <button id='like1' name='like' onClick={handleClick}>
                    <img src={images[currentImageIndex]} alt='image' className='likes'/>
                </button>
                </div>
                <div>
                    <h4 className='counter'>{count}</h4>
                </div>
            </nav>

            <nav className="post">
                <img src={heartRedIcom} className="img" alt='heartRedIcon'></img>
                <div className='features'>
                <button id='Comment' onClick={handleOpen}>Comment</button>
                    <MessageDialog open={open} onClose={handleClose} onConfirm={handleConfirm} comments={comments} />
                    <button id='like2' onClick={handleClick}>
                        <img src={images[currentImageIndex]} alt='image' className='likes'/>
                    </button>
                </div>
                <div>
                    <h4 className='counter'>{count}</h4>
                </div>
            </nav>
        </>
    )
}

export default Posts;
