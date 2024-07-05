import React, { useState, useEffect } from 'react';
import '../../cssFile/addStory.css';
import { axiosInstance } from "../../api/axios";
import { getUsername } from "../LoginPage/loginPage";
import { useNavigate } from 'react-router-dom';

const baseRoute = 'http://localhost:3100';
const mainRoute = '/main';

async function SetUserStories(story: StoryProps) {
    try {
        const { username, story: src } = story;
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/userstories`, { username, src }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', JSON.stringify(res.data, null, 2));
            return Array.isArray(res.data) ? res.data : [];
        } else {
            console.error('Error response:', res.status, res.statusText);
            console.error('Response data:', JSON.stringify(res.data, null, 2));
            return [];
        }
    } catch (error) {
        console.error('Error setting user stories:', error);
        return [];
    }
}

async function GetStories(username: string): Promise<StoryProps[]> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/getuserstories`, { username }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', JSON.stringify(res.data, null, 2));
            return Array.isArray(res.data) ? res.data : [];
        } else {
            console.error('Failed to fetch stories:', res.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching user stories:', error);
        return [];
    }
}

async function GetMyStories(username: string): Promise<StoryProps[]> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/getmystories`, { username }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', JSON.stringify(res.data, null, 2));
            return Array.isArray(res.data) ? res.data : [];
        } else {
            console.error('Failed to fetch my stories:', res.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching my stories:', error);
        return [];
    }
}

async function MyStoryExists(username: string): Promise<boolean> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/mystoryexists`, { username }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', res.data);
            return true;
        } else {
            console.error('Error checking if my story exists:', res.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error checking if my story exists:', error);
        return false;
    }
}

async function UserStoryExists(username: string): Promise<boolean> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/userstoryexists`, { username }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
            console.log('Response data:', res.data);
            return true;
        } else {
            console.error('Error checking if user story exists:', res.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error checking if user story exists:', error);
        return false;
    }
}

interface StoryProps {
    username: string;
    story: string;
    onClick: () => void;
}

interface StoryViewerProps {
    stories: StoryProps[];
    initialIndex: number;
    onClose: () => void;
    addStory: (newStory: StoryProps, index: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose, addStory }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentStoryIndex(initialIndex);
    }, [initialIndex]);

    const handleAddStory = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result as string;
                const newStory: StoryProps = {
                    username: getUsername(),
                    story: result,
                    onClick: () => {}
                };
                await SetUserStories(newStory);
                addStory(newStory, stories.length);
                setCurrentStoryIndex(stories.length);
            };
            reader.readAsDataURL(file);
        }
    };

    const goToUserPage = (username:string) => {
        navigate(`/user/${username}`);
    }

    const showNextStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
        if (currentStoryIndex === stories.length - 1) {
            onClose();
        }
    };

    const showPrevStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    };

    if (!stories || stories.length === 0) {
        return null;
    }

    return (
        <div className="story-viewer">
            <button className='user-button' onClick={() => goToUserPage(stories[currentStoryIndex].username)}>{stories[currentStoryIndex].username}</button>
            <button className="close-button" onClick={onClose}>Close</button>
            <img src={stories[currentStoryIndex]?.story} alt="Full Story" className="full-story-image" />
            <div>
            <button className="nav-button" onClick={showPrevStory}>Previous</button>
                <button className="nav-button" onClick={showNextStory}>Next</button>
            </div>
            {getUsername() === stories[currentStoryIndex]?.username &&
            <>
                <label className="add-button-inside">
                    <input type="file" accept="image/*" onChange={handleAddStory} style={{ display: 'none' }} />
                    Add Story
                </label>
            </>
            }
        </div>
    );
};

const AddStory: React.FC = () => {
    const [stories, setStories] = useState<StoryProps[]>([]);
    const [myStories, setMyStories] = useState<StoryProps[]>([]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            const username = getUsername();
            if (await MyStoryExists(username)) {
                const myStory = await GetMyStories(username);
                setMyStories(myStory);
            }
            if (await UserStoryExists(username)) {
                const fetchedStories = await GetStories(username);
                setStories(fetchedStories);
            }
        };
        fetchStories();
    }, []);

    const openViewer = (index: number, isMyStories: boolean) => {
        setCurrentIndex(index);
        setIsViewerOpen(true);
        setFlag(true);
    };

    const closeViewer = () => {
        setIsViewerOpen(false);
        setCurrentIndex(null);
        setFlag(false);
    };

    const addStory = (newStory: StoryProps, index: number) => {
        setStories((prevStories) => {
            const updatedStories = [...prevStories];
            updatedStories.splice(index, 0, newStory);
            return updatedStories;
        });

        if (currentIndex !== null && currentIndex >= index) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleAddStory = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result as string;
                const newStory: StoryProps = {
                    username: getUsername(),
                    story: result,
                    onClick: () => {}
                };
                await SetUserStories(newStory);
                addStory(newStory, myStories.length);
                openViewer(myStories.length, true);
            };
            reader.readAsDataURL(file);
        }
    };

    const groupStoriesByUsername = (stories: StoryProps[], mainUsername: string) => {
        const groupedStories = stories.reduce((acc: { [key: string]: StoryProps[] }, story) => {
            if (story.username !== mainUsername) {
                if (!acc[story.username]) {
                    acc[story.username] = [];
                }
                acc[story.username].push(story);
            }
            return acc;
        }, {});
        return groupedStories;
    };

    const groupedStories = groupStoriesByUsername(stories, getUsername());

    return (
        <>
            <nav className="inLine">
                {(myStories.length === 0) ? (
                    <label className="add-button">
                        <h4>Add</h4>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddStory}
                            style={{ display: 'none' }}
                        />
                    </label>
                ) : (
                    <button className="button-with-image" onClick={() => openViewer(0, true)}>
                        <img src={myStories[0].story} alt="My Stories" className="button-image" />
                        <span>{getUsername()}</span>
                    </button>
                )}
                {Object.keys(groupedStories).map((username) => (
                    <button
                        className="button-with-image"
                        onClick={() => openViewer(stories.findIndex(s => s.username === username), false)}
                        key={username}
                    >
                        <img src={groupedStories[username][0].story} alt={`${username}'s Stories`} className="button-image" />
                        <span>{username}</span>
                    </button>
                ))}
            </nav>
            {isViewerOpen && currentIndex !== null && (
                <StoryViewer
                    stories={(currentIndex === 0 && !flag ) ? myStories : stories}
                    initialIndex={currentIndex}
                    onClose={closeViewer}
                    addStory={addStory}
                />
            )}
        </>
    );
};

export default AddStory;
