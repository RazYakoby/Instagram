import React, { useEffect, useState, useRef } from 'react';
import '../../cssFile/storyMemories.css';
import { axiosInstance } from '../../api/axios';
import { getUsername } from '../LoginPage/loginPage';
import { getUser } from '../MainPage/AddStory';
import { useNavigate } from 'react-router-dom';

const baseRoute = 'http://localhost:3100';
const mainRoute = '/user';

interface StoryProps {
    id: number;
    username: string;
    story: string;
    storyTitle: string;
}

const SetUserStories = async (story: StoryProps) => {
    try {
        const { username, story: src, storyTitle } = story;
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/mymemorystories`, { username, src, storyTitle }, {
            validateStatus: (status) => true
        });

        if (res.status === 200) {
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
};

const GetMyStories = async (username: string): Promise<StoryProps[][]> => {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/getmymemorystories`, { username }, {
            validateStatus: (status) => true
        });

        console.log('API Response:', res);

        if (res.status === 200) {
            // Assuming res.data is an array of objects, convert it to the expected array of arrays
            const myStoriesArray: StoryProps[][] = res.data.map((story: StoryProps) => [story]);
            return myStoriesArray;
        } else {
            console.error('Failed to fetch my stories:', res.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching my stories:', error);
        return [];
    }
};

async function MyStoryMemoryExists(username: string): Promise<boolean> {
    try {
        const res = await axiosInstance.post(`${baseRoute}${mainRoute}/mystoryMemoryexists`, { username }, {
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
let flag = false;

function isEmptyString(str: string): boolean {
    flag = true;
    return str === "";
}

const StoryMemories: React.FC = () => {
    const [stories, setStories] = useState<{ [username: string]: { [storyTitle: string]: StoryProps[] } }>({});
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentStoryUsername, setCurrentStoryUsername] = useState<string | null>(null);
    const [currentStoryTitle, setCurrentStoryTitle] = useState<string | null>(null);
    const [subStoryIndex, setSubStoryIndex] = useState<{ [username: string]: { [storyTitle: string]: number } }>({});
    const navigate = useNavigate();
    const username = getUsername();
    const otherUsername = getUser();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                let myStoriesArray: StoryProps[][] = [];
                if (isEmptyString(otherUsername)) {
                    const userExists = await MyStoryMemoryExists(username);
                    if (userExists===true) {
                        myStoriesArray = await GetMyStories(username);
                    }
                } else {
                    const userExists = await MyStoryMemoryExists(otherUsername);
                    if (userExists===true) {
                        myStoriesArray = await GetMyStories(otherUsername);
                    }
                }
    
                console.log('myStoriesArray:', myStoriesArray);

                // Check if myStoriesArray is valid
                if (!myStoriesArray || !Array.isArray(myStoriesArray)) {
                    console.error('Invalid or empty myStoriesArray:', myStoriesArray);
                    return;
                }

                // Initialize groupedStories with an empty object
                let groupedStories: { [username: string]: { [storyTitle: string]: StoryProps[] } } = {};
                let initialSubStoryIndex: { [username: string]: { [storyTitle: string]: number } } = {};

                // Iterate through myStoriesArray
                myStoriesArray.forEach((storyArray: StoryProps[]) => {
                    // Check if storyArray is valid
                    if (!Array.isArray(storyArray)) {
                        console.error('Invalid storyArray:', storyArray);
                        return;
                    }

                    storyArray.forEach((story: StoryProps, index: number) => {
                        const username = story.username;
                        const storyTitle = story.storyTitle;

                        // Ensure username and storyTitle are defined
                        if (username && storyTitle) {
                            if (!groupedStories[username]) {
                                groupedStories[username] = {};
                            }
                            if (!groupedStories[username][storyTitle]) {
                                groupedStories[username][storyTitle] = [];
                            }
                            groupedStories[username][storyTitle].push(story);

                            // Initialize subStoryIndex for each story
                            if (!initialSubStoryIndex[username]) {
                                initialSubStoryIndex[username] = {};
                            }
                            initialSubStoryIndex[username][storyTitle] = index;
                        }
                    });
                });

                // Update state with groupedStories and initialSubStoryIndex
                setStories(groupedStories);
                setSubStoryIndex(initialSubStoryIndex);
            } catch (error) {
                console.error('Error fetching or setting stories:', error);
            }
        };

        fetchStories();
    }, []);

    const openViewer = (username: string, storyTitle: string) => {
        setCurrentStoryUsername(username);
        setCurrentStoryTitle(storyTitle);
        setIsViewerOpen(true);
        setSubStoryIndex((prevIndex) => ({
            ...prevIndex,
            [username]: {
                ...prevIndex[username],
                [storyTitle]: 0 // Initialize to the first sub-story
            }
        }));
    };

    const closeViewer = () => {
        setIsViewerOpen(false);
        setCurrentStoryUsername(null);
        setCurrentStoryTitle(null);
        setSubStoryIndex((prevIndex) => ({
            ...prevIndex,
            [currentStoryUsername as string]: {
                ...prevIndex[currentStoryUsername as string],
                [currentStoryTitle as string]: 0 // Reset to the first sub-story index
            }
        }));
    };

    const handleAddStory = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result as string;
                const storyTitle = prompt("Enter story title:", "");
                if (!storyTitle) return;
                const newStory: StoryProps = {
                    id: Date.now(),
                    username: getUsername(),
                    story: result,
                    storyTitle: storyTitle,
                };

                await SetUserStories(newStory);
                setStories((prevStories) => {
                    const updatedStories = { ...prevStories };
                    if (!updatedStories[newStory.username]) {
                        updatedStories[newStory.username] = {};
                    }
                    if (!updatedStories[newStory.username][newStory.storyTitle]) {
                        updatedStories[newStory.username][newStory.storyTitle] = [];
                    }
                    updatedStories[newStory.username][newStory.storyTitle].push(newStory);
                    return updatedStories;
                });
                openViewer(newStory.username, newStory.storyTitle);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSubStory = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && currentStoryUsername !== null && currentStoryTitle !== null) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result as string;
                const newSubStory: StoryProps = {
                    id: Date.now(),
                    username: currentStoryUsername,
                    story: result,
                    storyTitle: currentStoryTitle,
                };
                await SetUserStories(newSubStory);
                setStories((prevStories) => {
                    const updatedStories = { ...prevStories };
                    if (!updatedStories[currentStoryUsername]) {
                        updatedStories[currentStoryUsername] = {};
                    }
                    if (!updatedStories[currentStoryUsername][currentStoryTitle]) {
                        updatedStories[currentStoryUsername][currentStoryTitle] = [];
                    }
                    updatedStories[currentStoryUsername][currentStoryTitle].push(newSubStory);
                    return updatedStories;
                });
                openViewer(currentStoryUsername, currentStoryTitle);
            };
            reader.readAsDataURL(file);
        }
    };

    const goToUserPage = (username: string) => {
        navigate(`/user/${username}`);
    };

    const handleNextStory = () => {
        if (currentStoryUsername && currentStoryTitle) {
            const currentSubStoryIndex = subStoryIndex[currentStoryUsername]?.[currentStoryTitle] || 0;
            const storiesForTitle = stories[currentStoryUsername]?.[currentStoryTitle];
            if (storiesForTitle && currentSubStoryIndex + 1 < storiesForTitle.length) {
                setSubStoryIndex((prevIndex) => ({
                    ...prevIndex,
                    [currentStoryUsername]: {
                        ...prevIndex[currentStoryUsername],
                        [currentStoryTitle]: currentSubStoryIndex + 1,
                    },
                }));
            } else {
                closeViewer();
            }
        }
    };

    const handlePreviousStory = () => {
        if (currentStoryUsername && currentStoryTitle) {
            const currentSubStoryIndex = subStoryIndex[currentStoryUsername]?.[currentStoryTitle] || 0;
            if (currentSubStoryIndex > 0) {
                setSubStoryIndex((prevIndex) => ({
                    ...prevIndex,
                    [currentStoryUsername]: {
                        ...prevIndex[currentStoryUsername],
                        [currentStoryTitle]: currentSubStoryIndex - 1,
                    },
                }));
            }
        }
    };

    return (
        <>
            <nav className="inLine1">
            {getUsername() === getUser() && 
                <label className="add-button">
                    <h4>Add</h4>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddStory}
                        style={{ display: 'none' }}
                    />
                </label>
                }

                {Object.keys(stories).map((username) =>
                    Object.keys(stories[username]).map((storyTitle) => (
                        <button
                            className="button-with-image1"
                            onClick={() => openViewer(username, storyTitle)}
                            key={`${username}-${storyTitle}`}
                        >
                            <img src={stories[username][storyTitle][0]?.story} alt={`${username}'s Stories`} className="button-image1" />
                            <span>{username} - {storyTitle}</span>
                        </button>
                    ))
                )}

            </nav>
            {isViewerOpen && currentStoryUsername !== null && currentStoryTitle !== null && (
                <div className="story-viewer">
                    <button className='user-button' onClick={() => goToUserPage(currentStoryUsername)}>
                        {currentStoryUsername}
                    </button>
                    <button className="close-button" onClick={closeViewer}>
                        Close
                    </button>

                    <img src={stories[currentStoryUsername][currentStoryTitle][subStoryIndex[currentStoryUsername]?.[currentStoryTitle] || 0]?.story || ''} alt="Full Story" className="full-story-image" />
                    <div>
                        <button className="nav-button" onClick={handlePreviousStory}>Previous</button>

                        <button className="nav-button" onClick={handleNextStory}>Next</button>
                    </div>

                    {getUsername() === currentStoryUsername &&
                        <label className="add-button-inside">
                            <input type="file" accept="image/*" onChange={handleAddSubStory} style={{ display: 'none' }} />
                            Add Sub-Story
                        </label>
                    }
                </div>
            )}
        </>
    );
};

export default StoryMemories;
