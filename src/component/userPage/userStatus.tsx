import '../../cssFile/userStatus.css';
import Setting from "../MainPage/setting";

function userStatus () {

    const getUserName = () => {
        let name = "Raz"; // continue 
        return name;
    }

    const getPostCount = () => {
        let postCount = "5"; // continue
        return postCount;
    }

    const getFollowers = () => {
        let followers = "350"; // continue
        return followers;
    }

    const getFollowing = () => {
        let follwing = "100"; // continue
        return follwing;
    }

    return (
        <>
            <div>
                <Setting/>
            </div>
            <div className='nameStatus'>
                <div className='userStatus'>
                    <div>
                        <button className="buttonUser"></button>
                        <h4 className='userName'>{getUserName()}</h4>
                    </div>
                    <div>
                        <h4>posts</h4>
                        <h4 className='items'>{getPostCount()}</h4>
                    </div>
                    <div>
                        <h4>followers</h4>
                        <h4 className='items'>{getFollowers()}</h4>
                    </div>
                    <div>
                        <h4>following</h4>
                        <h4 className='items'>{getFollowing()}</h4>
                    </div>
                </div>
            </div>
            <div className='itemStatus'>
                <button><h4>edit profile</h4></button>
                <button><h4>share profile</h4></button>
                <button></button>
            </div>
        </>
    );
}

export default userStatus;