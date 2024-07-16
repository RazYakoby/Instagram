import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserStatus from '../userPage/userStatus';
import StoryMemories from '../userPage/storyMemories';
import UserPost from '../userPage/userPost';

const User: React.FC = () => {
    const { username } = useParams<{ username?: string }>(); 

    return (
        <div>
            <div><UserStatus /></div>
            {username && <div><StoryMemories username={username} /></div>}
            {username && <div><UserPost username={username} /></div>}
        </div>
    );
}

export default User;
