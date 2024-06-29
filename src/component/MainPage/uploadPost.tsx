import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../cssFile/uploadPost.css';
import Setting from './setting';
import { axiosInstance } from "../../api/axios";
import {getUsername} from "../LoginPage/loginPage";

const baseRoute = 'http://localhost:3100';
const uploadPostRoute = '/main';

async function setPost(username: string, src: string): Promise<boolean> {
    const res = await axiosInstance.post(`${baseRoute}${uploadPostRoute}/postupload`, { username, src }, {
        validateStatus: (status) => true
    });

    if (res.status !== 200) {
        console.log(res.data);
        return false;
    } else {
        console.log(res.data);
        return true;
    }
}


function Filter(data:ImageData, num:number, div:number) {
    const newImage = new Uint8ClampedArray(data.data);
    for (let val = 0; val < newImage.length; val += num) {
        const avg = (newImage[val] + newImage[val + 1] + newImage[val + 2]) / div;
        newImage[val] = avg;
        newImage[val + 1] = avg;
        newImage[val + 2] = avg;
    }   
    return new ImageData(newImage, data.width, data.height);;
}

function MathFilter(data:ImageData, num:number, number:number, times:number) {
    const newImage = new Uint8ClampedArray(data.data);
    for (let val = 0; val < newImage.length; val += num){
        newImage[val] = Math.min(newImage[val] + number * times, 255);
        newImage[val + 1] = Math.min(newImage[val + 1] + number * times, 255); 
        newImage[val + 2] = Math.min(newImage[val + 2] + number * times, 255); 
    }

    return new ImageData(newImage, data.width, data.height);;
}

function imageDataToDataURL(imageData:any) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx?.putImageData(imageData, 0, 0);
    return canvas.toDataURL(); 
    
  }


const filters = [[2,3],[6,8],[6,2],[10,4],[8,4]];
const mathFilters = [[4,173,0.5],[4,1,1.1]];

function ChangeFilter(data:ImageData, index:number, isMathFilter:boolean) :string {
    let filtered:ImageData;
    if (isMathFilter){
        filtered = MathFilter(data, mathFilters[index][0], mathFilters[index][1], mathFilters[index][2]);
    }
    else {
        filtered = Filter(data, filters[index][0], filters[index][1]);
    }
    return imageDataToDataURL(filtered);
}

function UploadPost(){
    const [imageSrc, setImageSrc] = useState('');

    const [imageData, setImageData] = useState<ImageData | null>(null);

    const username = getUsername();

    const navigate = useNavigate();

    const handleImageUpload = (e:any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
            let img = new Image;
            img.onload = () => {
                setImageSrc(img.src);
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (context) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                    const data = context.getImageData(0, 0, canvas.width, canvas.height);
                    setImageData(data);
                }
            };
            img.src = reader.result as string;
        };
      
      reader.readAsDataURL(file);
      
    }

    const UploadPost = async () => {
        if(await setPost(username, imageSrc)){
            navigate('/main');
        }
    }

    return (
        <div>
            <div>
                <Setting/>
            </div>
            <h4>username: {username}</h4>
            <input className='input_file' type="file" onChange={handleImageUpload}/>
            <nav>
                <img src={imageSrc} className="img_post" alt='img'></img>
                <div className="filter">
                {imageData?(
                    <>
                        <img id='img_filter' src={ChangeFilter(imageData, 1, true)} onClick={() => setImageSrc(ChangeFilter(imageData, 1, true))} alt='filter5'></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 2, false)} onClick={() => setImageSrc(ChangeFilter(imageData, 2, false))} alt='filter1'></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 3, false)} onClick={() => setImageSrc(ChangeFilter(imageData, 3, false))} alt='filter2'></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 4, false)} onClick={() => setImageSrc(ChangeFilter(imageData, 4, false))} alt='filter3'></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 0, true)} onClick={() => setImageSrc(ChangeFilter(imageData, 0, true))} alt='filter4'></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 0, false)} onClick={() => setImageSrc(ChangeFilter(imageData, 0, false))}></img>
                        <img id='img_filter' src={ChangeFilter(imageData, 1, false)} onClick={() => setImageSrc(ChangeFilter(imageData, 1, false))}></img>
                    </>
                )
                :null
                }
                </div>
            </nav>
            <button className='upload_post' onClick={UploadPost}>Upload</button>
        </div>
    )
}

export default UploadPost;