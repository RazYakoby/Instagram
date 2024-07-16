import React, { useEffect, useState } from "react";
import "../../cssFile/explorer.css";
import Setting from "./setting";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const baseRoute = "http://localhost:3100";
const mainRoute = "/main";

async function GetPosts(): Promise<ImageData[]> {
  try {
    const res = await axiosInstance.post(`${baseRoute}${mainRoute}/mainpage`, {}, {
      validateStatus: (status) => true,
    });

    if (res.status === 200) {
      console.log("Response data:", JSON.stringify(res.data, null, 2));
      return Array.isArray(res.data) ? res.data : [];
    } else {
      console.error("Error response:", res.status, res.statusText);
      console.error("Response data:", JSON.stringify(res.data, null, 2));
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function GetAllUsers(): Promise<string[]> {
  try {
    const res = await axiosInstance.post(`${baseRoute}${mainRoute}/getallusers`, {}, {
      validateStatus: (status) => true,
    });

    if (res.status === 200) {
      console.log("Response data:", JSON.stringify(res.data, null, 2));
      return Array.isArray(res.data) ? res.data.map((user: any) => user.name) : [];
    } else {
      console.error("Error response:", res.status, res.statusText);
      console.error("Response data:", JSON.stringify(res.data, null, 2));
      return [];
    }
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return [];
  }
}

interface ImageData {
  name: string;
  src: string;
}

interface PostProps {
  mainImage: string;
  buttonImage?: string;
  onClick: () => void;
}

const Post: React.FC<PostProps> = ({ mainImage, buttonImage, onClick }) => {
  return (
    <div className="post-container">
      <nav className="posts">
        <img src={mainImage} className="postsImage" alt="postImage" onClick={onClick} />
        {buttonImage && <img src={buttonImage} className="postsImage" alt="buttonImage" />}
      </nav>
    </div>
  );
};

let srcPost = "";

function Explorer() {
  const [image, setImage] = useState<ImageData[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  useEffect(() => {
    rndImg();
  }, []);

  const rndImg = async () => {
    try {
      const img = await GetPosts();
      const shuffledArray = img.slice().sort(() => Math.random() - 0.5);
      setImage(shuffledArray);
    } catch (error) {
      console.error("Error setting random images:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (username: string) => {
    setSearchTerm(username);
    setShowSuggestions(false);
    navigate(`/user/${username}`);
  };

  useEffect(() => {
    const fetchFilteredOptions = async () => {
      try {
        const userNames = await GetAllUsers();
        const filtered = userNames.filter((name) =>
          name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
      } catch (error) {
        console.error("Error filtering usernames:", error);
        setFilteredOptions([]);
      }
    };

    fetchFilteredOptions();
  }, [searchTerm]);

  return (
    <>
      <div>
        <Setting />
      </div>
      <div>
        <input
          type="text"
          placeholder="Start typing..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {showSuggestions && searchTerm && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {filteredOptions.map((username, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(username)}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  border: "2px solid black",
                  color: "black",
                  background: "white",
                }}
              >
                {username}
              </li>
            ))}
          </ul>
        )}
      </div>
      <nav className="explorer-nav">
        {image.map((img, index) => (
          <Post
            key={index}
            mainImage={img.src}
            onClick={() => navigate("/userPostPage")}
          />
        ))}
      </nav>
    </>
  );
}

export const setSrcPost = (src: string) => {
    srcPost = src;
};

export const getSrcPost = () => srcPost;

export default Explorer;
