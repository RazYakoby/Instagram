import React, { useState, useEffect } from "react";
import '../../cssFile/userStatus.css';
import Setting from "../MainPage/setting";
import { getUsername, getFollowers, getFollowing } from "../LoginPage/loginPage";
import { getUser } from "../MainPage/AddStory";
import { getAmountOfPost } from "../userPage/userPost";
import axios from "axios";

const baseRoute = 'http://localhost:3100';
const userRoute = '/user'; 

interface StatusResponse {
    status: any;
}

async function GetStatus(username: string): Promise<StatusResponse> {
    try {
        const response = await axios.post(`${baseRoute}${userRoute}/getstatus`, { username }, {
            validateStatus: (status) => true
        });

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            return {
                status: response.data[0]
            };
        } else {
            console.error('Failed to fetch user status:', response.statusText);
            return {
                status: 0
            };
        }
    } catch (error) {
        console.error('Error fetching user status:', error);
        return {
            status: 0
        };
    }
}

async function updateFollowers(username: string, followers: number): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/updatefollowers`, { username, followers }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
  }

async function updateFollowing(username: string, following: number): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/UpdateFollowing`, { username, following }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function updatepullFollowers(username: string, followers: number): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/updatepullfollowers`, { username, followers }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
  }

async function updatepullFollowing(username: string, following: number): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/UpdatepullFollowing`, { username, following }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function updateFollowersUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/updatefollowersuser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function updateFollowingUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/updatefollowingsuser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function pushToFollowersUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/pushtofollowersuser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function pushToFollowingUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/pushtofollowinguser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function pullToFollowersUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/pulltofollowersuser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function pullToFollowingUser(username: string, user: string): Promise<boolean> {
    const res = await axios.post(`${baseRoute}${userRoute}/pulltofollowinguser`, { username, user }, {
      validateStatus: (status) => true
    });
  
    if (res.status !== 200) {
      alert("Error: " + res.data);
      return false;
    } else {
      console.log(res.data);
      return true;
    }
}

async function getuserFollowers(username: string): Promise<StatusResponse> {
    try {
        const response = await axios.post(`${baseRoute}${userRoute}/getfollowers`, { username }, {
            validateStatus: (status) => true
        });

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            return {
                status: response.data[0]
            };
        } else {
            console.error('Failed to fetch user status:', response.statusText);
            return {
                status: 0
            };
        }
    } catch (error) {
        console.error('Error fetching user status:', error);
        return {
            status: 0
        };
    }
}

async function getuserFollowing(username: string): Promise<StatusResponse> {
    try {
        const response = await axios.post(`${baseRoute}${userRoute}/getfollowing`, { username }, {
            validateStatus: (status) => true
        });

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            return {
                status: response.data[0]
            };
        } else {
            console.error('Failed to fetch user status:', response.statusText);
            return {
                status: 0
            };
        }
    } catch (error) {
        console.error('Error fetching user status:', error);
        return {
            status: 0
        };
    }
}

const isFollowing = async (user: string): Promise<boolean> => {
    const followingList = (await getuserFollowing(getUsername())).status;
    for (let i = 0; i < followingList.user.length; i++) {
        if (followingList.user[i].toString() === user) {
            return true;
        }
    }
    return false;
}

const UserStatus: React.FC = () => {
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [mainuserFollowers, setMainuserFollowers] = useState(0);
    const [mainuserFollowing, setMainuserFollowing] = useState(0);
    const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFollowersResponse = await getuserFollowers(getUser());
                const userFollowingResponse = await getuserFollowing(getUser());
                const mainUserFollowersResponse = await getuserFollowers(getUsername());
                const mainUserFollowingResponse = await getuserFollowing(getUsername());
                setFollowers(userFollowersResponse.status.user.length.toString());
                setFollowing(userFollowingResponse.status.user.length.toString());
                setMainuserFollowers(mainUserFollowersResponse.status.user.length.toString());
                setMainuserFollowing(mainUserFollowingResponse.status.user.length.toString());
                const followingStatus = await isFollowing(getUser());
                setIsUserFollowing(followingStatus);
    
                console.log("Fetched data:", followers, following, mainuserFollowers, mainuserFollowing);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [followers, following, mainuserFollowers, mainuserFollowing]);
    

    const onFollow = async () => {
        if (isUserFollowing){
            if (await updatepullFollowers(getUser(), followers)) {
                    if (await pullToFollowersUser(getUser(), getUsername())) {
                        console.log("true");
                    }
            }
            if (await updatepullFollowing(getUsername(), mainuserFollowing)) {
                    if (await pullToFollowingUser(getUsername(), getUser())) {
                        console.log("true");
                    }
            }
        }
        else {
            if (await updateFollowers(getUser(), followers)) {
                if ((await getuserFollowers(getUser())).status.user.length > 0) {
                    if (await pushToFollowersUser(getUser(), getUsername())) {
                        console.log("true");
                    }
                } else {
                    if (await updateFollowersUser(getUser(), getUsername())) {
                        console.log("false");
                    }
                }
            } else {
                console.log("false");
            }
            if (await updateFollowing(getUsername(), mainuserFollowing)) {
                if ((await getuserFollowing(getUsername())).status.user.length > 0) {
                    if (await pushToFollowingUser(getUsername(), getUser())) {
                        console.log("true");
                    }
                } else {
                    if (await updateFollowingUser(getUsername(), getUser())) {
                        console.log("false");
                    }
                }
            } else {
                console.log("false");
            }
        }
        setIsUserFollowing(prevFlag => !prevFlag);
    };

    return (
        <>
            <div>
                <Setting />
            </div>
            <div className='nameStatus'>
                <div className='userStatus'>
                    <div>
                        <button className="buttonUser"></button>
                        <h4 className='userName'>{getUser()}</h4>
                    </div>
                    <div>
                        <h4>posts</h4>
                        <h4 className='items'>{getAmountOfPost()}</h4>
                    </div>
                    <div>
                        <h4>followers</h4>
                        <h4 className='items'>{followers}</h4>
                    </div>
                    <div>
                        <h4>following</h4>
                        <h4 className='items'>{following}</h4>
                    </div>
                </div>
            </div>
            <div className='itemStatus'>
                {getUsername() !== getUser() && (
                    <>
                        <button id='followButton' className={isUserFollowing ? "following" : "follow"} onClick={onFollow}>
                            <h4>{isUserFollowing ? "following" : "follow"}</h4>
                        </button>
                        <br />
                    </>
                )}
                <button><h4>edit profile</h4></button>
                <button><h4>share profile</h4></button>
                <button></button>
            </div>
        </>
    );
}

export default UserStatus;
