import React, { useEffect, useState } from "react";
import RightArrow from "./assets/angle-double-right-solid.svg";
import redirect from "react-router-dom";

export default function StoryOptions(props) {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [briefDescription, setBriefDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTitle(props.story.title);
    setPublished(props.story.published);
    setBriefDescription(props.story.brief_description);
  }, [props, title, published, briefDescription, message]);

  const onChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "briefDescription") {
      setBriefDescription(event.target.value);
    }
  };

  const changeStoryStatus = () => {
    setPublished(!published);
  };

  const saveDraft = () => {
    // save draft
    // make a patch request to update title and maybe published
    fetch(`${process.env.REACT_APP_SERVER_URL}/stories/${props.story.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        title: title,
        published: published,
        brief_description: briefDescription,
      }),
    })
      .then((res) => res.json())
      .then((storyObj) => {
        // console.log(storyObj)
        setMessage("Saved!");
        props.updateStory(storyObj);
        setTimeout(() => setMessage(""), 1500);
      });
  };

  const storyToDelete = (id) => {
    // delete story from database
    fetch(`${process.env.REACT_APP_SERVER_URL}/stories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((deletedStory) => {
        redirect(`/author/${props.story.user.id}`);
      });
  };

  const collapse = () => {
    props.sidebarDisplay();
  };

  return (
    <div className="story-options">
      <button className="side-collapse-button" onClick={collapse}>
        <img alt="right arrow" className="side-collapse" src={RightArrow} />
      </button>
      <div className="title-description">
        <div>
          <label>Story Title:</label>
          <br />
          <input onChange={onChange} type="text" name="title" value={title} />
        </div>
        <div>
          <label>Brief Description:</label>
          <br />
          <textarea
            rows="3"
            onChange={onChange}
            type="text"
            name="briefDescription"
            value={briefDescription}
          />
        </div>
      </div>
      <div className="publish-save">
        <div>
          <label>Publish</label>
          <input
            type="checkbox"
            name="published"
            onChange={changeStoryStatus}
            checked={published}
          />
        </div>
        <div>{message}</div>
        <div>
          <button
            onClick={() => {
              storyToDelete(props.story.id);
            }}
          >
            Delete Story
          </button>
          <button onClick={saveDraft} style={{ backgroundColor: "#6cc2d6" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
