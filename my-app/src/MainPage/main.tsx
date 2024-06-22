import Posts from "./posts";
import Setting from "./setting";
import AddStory from "./AddStory";

const MainPage = () => {

    return(
      <div>
        <div><AddStory/></div>
        <div><Posts/></div>
        <div><Setting/></div>
      </div>
    );
  }
  
  export default MainPage;