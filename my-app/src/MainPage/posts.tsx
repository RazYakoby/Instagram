import heartIcon from '../heart-icon.jpg';
import heartRedIcom from '../heartRed-icon.jpg';
import '../cssFile/posts.css';
import { useEffect, useState } from 'react';

function Posts(){

    const images = [heartIcon, heartRedIcom];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const handleClick = (count:number) => {
      setCurrentImageIndex((count + 1) % images.length);
    };

    return(
        <>
            <nav className="post">
                <img src={heartIcon} className="img"></img>
                <div className='features'>
                    <button>comments</button>
                    <button name='like' onClick={ () => handleClick(currentImageIndex)}>
                        <img src={images[currentImageIndex]} alt='image' className='likes'/>
                    </button>
                </div>
            </nav>

            <nav className="post">
                <img src={heartRedIcom} className="img"></img>
                <div className='features'>
                    <button>comments</button>
                    <button name='like' onClick={ () => handleClick(currentImageIndex)}>
                        <img src={images[currentImageIndex]} alt='image' className='likes'/>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Posts;