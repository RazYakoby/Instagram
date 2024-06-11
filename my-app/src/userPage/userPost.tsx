import React, { useState } from "react";
import '../cssFile/userPost.css';
import heartIcon from '../heart-icon.jpg';
import heartRedIcon from '../heartRed-icon.jpg';

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
    const post = [heartIcon, heartRedIcon]; // delete
    const [realPost, setRealPost] = useState([]); // do it as a list

    const getPost = () => {
        // select Post From PostTable where id={id}; something like that
        setRealPost([]); // put in all the posts
    }

    const PostImage = () => {
        // navigate to the post page
        // put all the posts that belong to specific id
    }

    return(
        <>
            <nav className="flexable">
                {// post => realPost
                post.map((img:any, index:number) => (
                    <MyPost
                        key={index}
                        post={img}
                        onclick={PostImage}
                    />
                ))}
            </nav>
        </>
    );
}

export default UserPost;