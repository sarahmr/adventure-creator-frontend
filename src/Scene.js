import React, { useState } from "react";
import Path from "./Path";
import SceneTitle from "./SceneTitle";
import Modal from "react-modal";

export default function Scene(props) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.scene.title);
  const [text, setText] = useState(props.scene.text);
  const [paths, setPaths] = useState([...props.scene.paths]);
  const [showModal, setShowModal] = useState(false);

  const onChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "text") {
      setText(event.target.value);
    }
  };

  const onPathChange = (newPath, findIndex) => {
    let newPaths = paths.map((path, index) => {
      if (index === findIndex) {
        return newPath;
      }
      return path;
    });

    setPaths(newPaths);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // take info from paths and create new scenes or find existing scenes
    let needNewScenePaths = [];

    // create paths for sending to backend (different slighly than state)
    let paths = [];

    // console.log(paths)
    // iterate through paths, if it's scene title need post request to get scene id, if selected scene need path formated as scene_id
    paths.forEach((path) => {
      if (path.scene_title) {
        needNewScenePaths.push(path);
      } else {
        paths.push({
          scene_id: path.selected_scene || path.scene_id,
          choice_text: path.choice_text,
        });
      }
    });

    // console.log(paths)
    if (needNewScenePaths.length > 1) {
      // set left positions to be props.left first then add 50 each time
      for (let i = 0; i < needNewScenePaths.length; i++) {
        needNewScenePaths[i].position = {};
        if (i === 0) {
          // console.log(props.left)
          needNewScenePaths[i].position.left = props.left;
        } else {
          // console.log(needNewScenePaths[i - 1].position.left)
          needNewScenePaths[i].position.left =
            needNewScenePaths[i - 1].position.left + 100;
        }
        // console.log(needNewScenePaths[i].position.left)
      }
      // console.log(needNewScenePaths)
    }

    let promises = needNewScenePaths.map((path) =>
      fetch(`${process.env.REACT_APP_SERVER_URL}/scenes`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          story_id: `${props.story.id}`,
          title: `${path.scene_title}`,
          text: "",
          paths: [],
          position: {
            left: path.position.left,
            top: props.top + 150,
          },
        }),
      })
        .then((res) => res.json())
        .then((newScene) => {
          paths.push({
            scene_id: newScene.id,
            choice_text: path.choice_text,
          });
        })
    );

    Promise.all(promises).then(() => sceneUpdate(paths));

    displayForm();
  };

  const sceneUpdate = (paths) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/scenes/${props.scene.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        story_id: `${props.story.id}`,
        title: title,
        text: text,
        paths: paths,
        position: {
          left: props.left,
          top: props.top,
        },
      }),
    })
      .then((res) => res.json())
      .then((newScene) => {
        // trigger fetch in story editor to render scenes
        props.getNewScenes();
      });
  };

  const renderPaths = () => {
    // console.log(paths)
    return paths.map((path, index) => (
      <Path
        key={index}
        scenes={props.scenes}
        index={index}
        path={path}
        onPathChange={onPathChange}
      />
    ));
  };

  const addAPath = () => {
    let newPath = { scene_title: "", choice_text: "", selected_scene: null };
    setPaths([...paths, newPath]);
  };

  const displayForm = () => {
    setEdit(!edit);
    setShowModal(!showModal);
  };

  // TODO what is this doing?
  Modal.setAppElement(document.getElementById("root"));
  return (
    <div className="scene">
      <SceneTitle
        edit={edit}
        scene={props.scene}
        displayForm={displayForm}
        top={props.top}
        left={props.left}
        // hideSourceOnDrag={props.hideSourceOnDrag}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={displayForm}
        className="edit-modal"
      >
        <div className="modal-inside">
          <div className="exit-modal-button">
            <button onClick={displayForm}>X</button>
          </div>
          {edit ? (
            <form onSubmit={onSubmit} className="scene-form">
              <div className="scene-info">
                <label>Scene Title:</label>
                <input
                  onChange={onChange}
                  type="text"
                  name="title"
                  value={title}
                />
              </div>
              <div className="scene-info">
                <label>Text:</label>
                <textarea
                  rows="4"
                  onChange={onChange}
                  name="text"
                  value={text}
                ></textarea>
              </div>
              <div className="path-area">
                <h4>Paths:</h4>
                {renderPaths()}
                <button type="button" onClick={addAPath}>
                  +
                </button>
              </div>
              <div className="scene-submit">
                <input type="submit" value="Save" />
              </div>
            </form>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
