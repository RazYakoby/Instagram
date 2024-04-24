import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import '../cssFile/uploadPost.css';
import { read } from 'fs';

function UploadPost(){
    const [imageSrc, setImageSrc] = useState('');
    const [blackAndWhiteFilterSrc, SetblackAndWhiteFilterSrc] = useState('');
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const [filter3, setFilter3] = useState('');
    const [filter4, setFilter4] = useState('');
    const [filter5, setFilter5] = useState('');
    const [getImage, setImage] = useState('');
    const [getnormalFilter, setNormalFilter] = useState('');
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const img = new Image;
    const navigate = useNavigate();

    const handleImageUpload = (e:any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result as string);
        setImage(img.src);
        setNormalFilter(reader.result as string);
        setIsImageChanged(true);
      }
      
      reader.readAsDataURL(file);
      
    }

    useEffect(() => {
        if (!isImageChanged) return;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                //const data = imageData.data;
                const data:any[] = [imageData, imageData, imageData, imageData, imageData, imageData];
                for (let val = 0; val < data[0].data.length; val += 4) {
                    const avg = (data[0].data[val] + data[0].data[val + 1] + data[0].data[val + 2]) / 3;
                    data[0].data[val] = avg;
                    data[0].data[val + 1] = avg;
                    data[0].data[val + 2] = avg;
                }

                context.putImageData(data[0], 0, 0);
                SetblackAndWhiteFilterSrc(canvas.toDataURL());
                
                for (let val = 0; val < data[1].data.length; val += 6){
                    const avg = (data[1].data[val] + data[1].data[val + 1] + data[1].data[val + 2]) / 2;
                    data[1].data[val] = avg;
                    data[1].data[val + 1] = avg;
                    data[1].data[val + 2] = avg;
                }
    
                context.putImageData(data[1], 0, 0);
                setFilter1(canvas.toDataURL());

                for (let val = 0; val < data[2].data.length; val += 10){
                    const avg = (data[2].data[val] + data[2].data[val + 1] + data[2].data[val + 2]) / 4;
                    data[2].data[val] = avg;
                    data[2].data[val + 1] = avg;
                    data[2].data[val + 2] = avg;
                }

                context.putImageData(data[2], 0, 0);
                setFilter2(canvas.toDataURL());

                for (let val = 0; val < data[3].data.length; val += 8){
                    const avg = (data[3].data[val] + data[3].data[val + 1] + data[3].data[val + 2]) / 4;
                    data[3].data[val] = avg;
                    data[3].data[val + 1] = avg;
                    data[3].data[val + 2] = avg;
                }

                context.putImageData(data[3], 0, 0);
                setFilter3(canvas.toDataURL());

                for (let val = 0; val < data[4].data.length; val += 4){
                    data[4].data[val] = Math.min(data[4].data[val] + 173 * 0.5, 255);     // Red channel
                    data[4].data[val + 1] = Math.min(data[4].data[val + 1] + 216 * 0.5, 255); // Green channel
                    data[4].data[val + 2] = Math.min(data[4].data[val + 2] + 230 * 0.5, 255); // Blue channel
                }

                context.putImageData(data[4], 0, 0);
                setFilter4(canvas.toDataURL());

                for (let val = 0; val < data[5].data.length; val += 4){
                    data[5].data[val] = Math.min(data[5].data[val] * 1.1, 255); // Red
                    data[5].data[val + 1] = Math.min(data[5].data[val + 1] * 1.1, 255); // Green
                    data[5].data[val + 2] = Math.min(data[5].data[val + 2] * 1.2, 255); // Blue
                }

                context.putImageData(data[5], 0, 0);
                setFilter5(canvas.toDataURL());
            }
        };
        setIsImageChanged(false);
        img.src = imageSrc;
    }, [imageSrc]);

    const ChangeTonormalFilter = () => {
        setImageSrc(getnormalFilter);
    }

    const ChangeToBlackWhtieFilter = () => {
        setImageSrc(blackAndWhiteFilterSrc);
    }

    const ChangeToFilter1 = () => {
        setImageSrc(filter1);
    }

    const ChangeToFilter2 = () => {
        setImageSrc(filter2);
    }
    const ChangeToFilter3 = () => {
        setImageSrc(filter3);
    }
    const ChangeToFilter4 = () => {
        setImageSrc(filter4);
    }
    const ChangeToFilter5 = () => {
        setImageSrc(filter5);
    }

    const UploadPost = () => {
        navigate('/main');
    }

    return (
        <div>
            <input className='input_file' type="file" onChange={handleImageUpload}/>
            <nav>
                <img src={imageSrc} className="img_post" alt='img'></img>
                <div className="filter">
                    <img id='img_filter' src={getnormalFilter} onClick={ChangeTonormalFilter}></img>
                    <img id='img_filter' src={blackAndWhiteFilterSrc} onClick={ChangeToBlackWhtieFilter}></img>
                    <img id='img_filter' src={filter3} onClick={ChangeToFilter3}></img>
                    <img id='img_filter' src={filter1} onClick={ChangeToFilter1}></img>
                    <img id='img_filter' src={filter2} onClick={ChangeToFilter2}></img>
                    <img id='img_filter' src={filter4} onClick={ChangeToFilter4}></img>
                    <img id='img_filter' src={filter5} onClick={ChangeToFilter5}></img>
                </div>
            </nav>
            <button className='upload_post' onClick={UploadPost}>Upload<img src={imageSrc}></img></button>
        </div>
    )
}

export default UploadPost;