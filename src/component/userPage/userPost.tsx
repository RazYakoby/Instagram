import React, { useState, useEffect } from "react";
import '../../cssFile/userPost.css';
import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';
import axios from "axios";
import { axiosInstance } from "../../api/axios";
import { getUsername } from "../LoginPage/loginPage";

const baseRoute = 'http://localhost:3100'; // Replace with your server URL
const userRoute = '/user'; // Assuming '/user' is the route where userPageServer is mounted

// Example usage in your client-side code
async function GetPost(username: string) {
    try {
        const response = await axios.post(`${baseRoute}${userRoute}/userposts`, { username }, {
            validateStatus: (status) => true // Example of custom status validation
        });

        if (response.status === 200) {
            console.log('User posts:', response.data); // Logging fetched user posts
            return response.data; // Returning fetched data
        } else {
            console.error('Failed to fetch user posts:', response.statusText);
            throw new Error('Failed to fetch user posts'); // Throw an error if status is not 200
        }
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // Propagate the error for further handling
    }
}


interface post {
    post: string;
    onclick: () => void;
}

const MyPost: React.FC<post> = ({post, onclick}) => {

    return(
        <>
            <img src={post} className="sizeOfTheImg" onClick={onclick}></img>
        </>
    );
}

const UserPost: React.FC = () => {
    const [post, setPost] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const srcList = await GetPost(getUsername());
            setPost(srcList);
        };
        fetchData();
    }, []);

    const PostImage = () => {
        // navigate to the post page
        // put all the posts that belong to specific id
    }

    return(
        <>
            <nav className="flexable">
                { post.length > 0 ? (
                post.map((img:any, index:number) => (
                    <MyPost
                        key={index}
                        post={img}
                        onclick={PostImage}
                    />
                ))) :
                <p>No posting yet</p>
                }
            </nav>
        </>
    );
}

export default UserPost;