import React, { useState, useEffect } from "react";
import '../../cssFile/userPost.css';
import heartIcon from '../../heart-icon.jpg';
import heartRedIcon from '../../heartRed-icon.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseRoute = 'http://localhost:3100';
const userRoute = '/user'; 

async function GetPost(username: string) : Promise<string[]> {
    try {
        alert(username);
        const response = await axios.post(`${baseRoute}${userRoute}/userposts`, { username }, {
            validateStatus: (status) => true
        });

        if (response.status === 200) {
            console.log('User posts:', response.data); 
            return response.data; 
        } else {
            console.error('Failed to fetch user posts:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return [];
    }
}

interface MyPostProps {
    post: string;
    onClick: () => void;
}

const MyPost: React.FC<MyPostProps> = ({ post, onClick }) => (
    <img src={post} className="sizeOfTheImg" onClick={onClick} />
);

interface UserPostProps {
    username: string;
}

const UserPost: React.FC<UserPostProps> = ({ username }) => {
    const [posts, setPosts] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const srcList = await GetPost(username);
                setPosts(srcList);
                console.log(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        
        fetchData();
    }, [username]);

    const handlePostClick = () => {
        navigate("/userPostPage");
    }

    return (
        <nav className="flexable">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <MyPost key={index} post={post} onClick={handlePostClick} />
                ))
            ) : (
                <p>No posts yet</p>
            )}
        </nav>
    );
}

export default UserPost;
