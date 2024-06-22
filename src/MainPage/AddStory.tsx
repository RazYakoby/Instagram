import React, { useState } from 'react';
import '../cssFile/addStory.css';

interface StoryProps {
    image: string;
    onClick: () => void;
}

const Story: React.FC<StoryProps> = ({ image, onClick }) => {
    return (
        <button className="button-with-image" onClick={onClick}>
            <img src={image} alt="story" className="button-image" />
        </button>
    );
};

interface StoryViewerProps {
    stories: string[];
    initialIndex: number;
    onClose: () => void;
    addStory: (newStory: string, index: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose, addStory }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);

    const handleAddStory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                addStory(result, currentStoryIndex + 1);  
                setCurrentStoryIndex(currentStoryIndex + 1);
            };
            reader.readAsDataURL(file);
        }
    };

    const showNextStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
        if (currentStoryIndex === stories.length - 1) {onClose();}
    };

    const showPrevStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    };

    return (
        <div className="story-viewer">
            <button className="close-button" onClick={onClose}>Close</button>
            <button className="nav-button" onClick={showPrevStory}>Previous</button>
            <img src={stories[currentStoryIndex]} alt="Full Story" className="full-story-image" />
            <button className="nav-button" onClick={showNextStory}>Next</button>
            <label className="add-button-inside">  
                <input type="file" accept="image/*" onChange={handleAddStory} style={{ display: 'none' }} />
                Add Story
            </label>
        </div>
    );
};

const AddStory: React.FC = () => {
    const [stories, setStories] = useState<string[]>([]);
    const [newStories, setNewStories] = useState<string[]>([]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [followingStories, setFollowingStories] = useState<string[]>([]);

    const currentStoriesIndex = (index:number) => {
        for (let count = 0; count < stories.length; count++) {
            if (stories[count] === newStories[index]) {
                return count;
            }
        }
        return index;
    }

    const openViewer = (index: number) => {
        setCurrentIndex(currentStoriesIndex(index));
        setIsViewerOpen(true);
    };

    const closeViewer = () => {
        setIsViewerOpen(false);
        setCurrentIndex(null);
    };

    const addStory = (newStory: string, index: number) => {
        setStories((prevStories) => {
            const updatedStories = [...prevStories];
            updatedStories.splice(index, 0, newStory);
            return updatedStories;
        });

        if (currentIndex !== null && currentIndex >= index) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const getFollowingStories = () => {
        // use server to get the amount of stories of the following 
    }

    const addNewStory = (newStory: string) => {
        setNewStories((prevStories) => [...prevStories, newStory]);
    }

    const handleAddStory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                addStory(result, stories.length);
                openViewer(stories.length);
                addNewStory(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <nav className="inLine">
                {newStories.map((img, index) => (
                    <Story
                        key={index}
                        image={img}
                        onClick={() => openViewer(index)}
                    />
                ))}
                {followingStories.map((img, index) => (
                    <Story
                        key={index}
                        image={img}
                        onClick={() => openViewer(index)}
                    />
                ))}
            </nav>
            {isViewerOpen && currentIndex !== null && (
                <StoryViewer
                    stories={stories}
                    initialIndex={currentIndex}
                    onClose={closeViewer}
                    addStory={addStory}
                />
            )}
        </>
    );
};

export default AddStory;
