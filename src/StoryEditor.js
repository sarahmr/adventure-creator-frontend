import React, { useEffect, useState } from "react";
import SceneDisplayArea from "./SceneDisplayArea";
import StoryOptions from "./StoryOptions";
import StoryOptionsCollapsed from "./StoryOptionsCollapsed";

export default function StoryEditor(props) {
  const [story, setStory] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [sidebar, setSidebar] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/stories/${props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((story) => {
        setStory(story);
        getNewScenes();
      });
  });

  const addNewScene = () => {
    let newScene = {
      story_id: story.id,
      title: "",
      text: "",
      paths: [],
      position: {
        left: 200,
        top: 50,
      },
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/scenes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(newScene),
    })
      .then((res) => res.json())
      .then((newScene) => {
        setScenes([...scenes, newScene]);
      });
  };

  const getNewScenes = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/story-scenes/${story.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((scenes) => {
        // console.log(scenes)
        scenes.sort((a, b) => a.id - b.id);
        setScenes(scenes);
      });
  };

  const sidebarDisplay = () => {
    setSidebar(!sidebar);
  };

  const updateStory = (story) => {
    setStory(story);
  };

  return (
    <div className="story-editor">
      {sidebar ? (
        <StoryOptions
          story={story}
          sidebarDisplay={sidebarDisplay}
          updateStory={updateStory}
        />
      ) : (
        <StoryOptionsCollapsed sidebarDisplay={sidebarDisplay} />
      )}
      {/* <StoryOptions story={story} /> */}
      <SceneDisplayArea
        scenes={scenes}
        addNewScene={addNewScene}
        story={story}
        getNewScenes={getNewScenes}
      />
    </div>
  );
}
