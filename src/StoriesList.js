import React, { useEffect, useState } from "react";
import Story from "./Story";
import { useNavigate } from "react-router-dom";

export default function StoriesList() {
  let navigate = useNavigate();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/stories`)
      .then((res) => res.json())
      .then((storyObjArr) => {
        storyObjArr.sort((a, b) => a.id - b.id);
        setStories(storyObjArr);
      });
  });

  const startStory = (id) => {
    // console.log(id);
    navigate(`/play/${id}`);
  };

  const renderStoriesList = () => {
    return stories.map((story) => (
      <Story key={story.id} story={story} startStory={startStory} />
    ));
  };

  return <div className="stories-list">{renderStoriesList()}</div>;
}
