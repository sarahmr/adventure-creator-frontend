import React, { useState } from "react";

export default function Path(props) {
  const [sceneTitle, setSceneTitle] = useState("");
  const [selectedScene, setSelectedScene] = useState("");
  const [choiceText, setChoiceText] = useState("");

  const onChange = (event) => {
    // do a better job with these change handlers
    // TODO learn more about onPathChange
    if (event.target.name === "sceneTitle") {
      setSceneTitle(event.target.value, () =>
        props.onPathChange(sceneTitle, selectedScene, choiceText, props.index)
      );
    } else if (event.target.name === "selectedScene") {
      setSelectedScene(event.target.value, () =>
        props.onPathChange(sceneTitle, selectedScene, choiceText, props.index)
      );
    } else if (event.target.name === "choiceText") {
      setChoiceText(event.target.value, () =>
        props.onPathChange(sceneTitle, selectedScene, choiceText, props.index)
      );
    }
  };

  return (
    <div className="path">
      <div className="path-details">
        <input
          onChange={onChange}
          type="text"
          placeholder="New Scene"
          name="sceneTitle"
          value={props.path.scene_title}
        />
      </div>
      <div className="path-details">
        {props.scenes.length > 1 ? (
          <>
            <label>
              <span className="path-details"> or </span>
            </label>
            <select
              name="selectedScene"
              onChange={onChange}
              value={
                props.path.scene_id
                  ? props.path.scene_id
                  : props.path.selected_scene
              }
            >
              <option>Select A Scene</option>
              {props.scenes.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.title}
                </option>
              ))}
            </select>
          </>
        ) : null}
      </div>
      <div className="path-details">
        <input
          onChange={onChange}
          type="text"
          placeholder="Choice Text"
          name="choiceText"
          value={props.path.choice_text}
        />
      </div>
    </div>
  );
}
