import React, { useEffect, useState } from "react";
import Choice from "./Choice";
import { useNavigate, withRouter } from "react-router-dom";

export default function PlayArea(props) {
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [currentScene, setCurrentScene] = useState({});

  useEffect(() => {
    fetch(
      // TODO there's a more up to date react router way to do the below
      `${process.env.REACT_APP_SERVER_URL}/stories/${props.match.params.id}`
    )
      .then((res) => res.json())
      .then((story) => {
        story.scenes.sort((a, b) => a.id - b.id);
        setStory(story);
        setCurrentScene({ currentScene: story.scenes[0] });
      });
  });

  const playAgain = () => {
    setCurrentScene({ currentScene: story.scenes[0] });
  };

  const renderChoices = () => {
    return currentScene.paths.map((choice, index) => (
      <Choice key={index} choice={choice} changeScene={changeScene} />
    ));
  };

  const changeScene = (scene_id) => {
    let nextScene = story.scenes.find((scene) => scene.id === Number(scene_id));

    console.log(nextScene);
    setCurrentScene({ currentScene: nextScene });
  };

  if (!story) {
    return null;
  }
  return (
    <div className="play-area">
      <div>
        <h2>{story.title}</h2>
      </div>
      <div>
        <h4>{currentScene.title}</h4>
        <p>{currentScene.text}</p>
      </div>
      <div className="choices-display">
        {currentScene.paths.length > 0 ? (
          renderChoices()
        ) : (
          <>
            <div onClick={playAgain} className="choice-card">
              Play Again
            </div>
            <div
              onClick={() =>
                // TODO redirect or Navigate?
                navigate(`/story/${story.id}`)
              }
              className="choice-card"
            >
              Leave a Review
            </div>
          </>
        )}
      </div>
    </div>
  );
}
