import UserStatus from '../userPage/userStatus';
import StoryMemories from '../userPage/storyMemories';
import UserPost from '../userPage/userPost';

function User() {

    return(
        <div>
            <div><UserStatus/></div>
            <div><StoryMemories/></div>
            <div><UserPost/></div>
        </div>
    )
}

export default User;