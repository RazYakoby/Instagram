import heartIcon from '../heart-icon.jpg';
import heartRedIcom from '../heartRed-icon.jpg';
import '../cssFile/posts.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Posts(){

    const images = [heartIcon, heartRedIcom];
    const images2 = useParams();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [count, setCount] = useState( () => {
        const saveCount = localStorage.getItem('likeCount');
        return saveCount ? parseInt(saveCount, 10) : 0;
    });

    const handleClick = (count:number) => {
      setCurrentImageIndex((count + 1) % images.length);
    };

    useEffect(() => {
        const storedImageUrl = localStorage.getItem('imageUrl');
        if (storedImageUrl) {
            setImageUrl(storedImageUrl);
        }
        const like = document.getElementById('like');
        const handleClick = () => {
    
          if (images[currentImageIndex] === heartRedIcom) {
            setCount((prevCount) => {
              const newCount = prevCount - 1;
              localStorage.setItem('likeCount', newCount.toString());
              return newCount;
            });
          }
            else{
                setCount((prevCount) => {
                  const newCount = prevCount + 1;
                  localStorage.setItem('likeCount', newCount.toString());
                  return newCount;
                });
              }
            };
        
            if(like){
            like.addEventListener('click', handleClick);
        
            return () => {
              like.removeEventListener('click', handleClick);
            };
        }

          }, [currentImageIndex, images]);


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
                        <text>{count}</text>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Posts;