import React, { useEffect, useState } from "react";
import Story from "./Story";

export default function UserStories(props) {
  const [stories, setStories] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [edit, setEdit] = useState("inactive");

  useEffect(() => {
    fetch(
      // TODO props.match.params -- still work?
      `${process.env.REACT_APP_SERVER_URL}/user-stories/${props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((storyObj) => {
        storyObj.sort((a, b) => a.id - b.id);
        setStories(storyObj);
      });

    fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((userObj) => {
        userObj.user["image"] = userObj.image;
        setUserProfile(userObj.user);
      });
  }, [props.match.params, stories, userProfile]);

  const renderStories = () => {
    return stories.map((story) => (
      <Story
        key={story.id}
        story={story}
        user={props.user}
        userProfile={userProfile}
      />
    ));
  };

  const editBio = () => {
    setEdit("active");
  };

  const changeBio = (evt) => {
    let bio = evt.target.value;

    let editedUser = {
      ...userProfile,
      bio: bio,
    };

    setUserProfile(editedUser);
  };

  const editSubmit = (evt) => {
    evt.preventDefault();

    fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }
    )
      .then((res) => res.json())
      .then((userObj) => {
        console.log(userObj);
        setEdit("inactive");
      });
  };

  if (!(props.user && userProfile)) {
    return null;
  }
  return (
    <div>
      {userProfile.id === props.user.id ? (
        <>
          <div className="user-details">
            <img src={userProfile.image} alt="author" />
            <h2>Hello {userProfile.name}!</h2>
            {edit === "inactive" ? (
              <p>{userProfile.bio}</p>
            ) : (
              <form onSubmit={editSubmit}>
                <label>Edit Your Bio</label>
                <input
                  onChange={changeBio}
                  name="bio"
                  value={userProfile.bio}
                ></input>
                <input type="submit" />
              </form>
            )}
            <button onClick={editBio}>Edit Bio</button>
          </div>
          <div className="stories-list">
            <h3>Stories</h3>
            {renderStories()}
          </div>
        </>
      ) : (
        <>
          <div className="user-details">
            <img src={userProfile.image} alt="author" />
            <h2>{userProfile.name}</h2>
            <p>{userProfile.bio}</p>
          </div>
          <div className="stories-list">
            <h3>Stories</h3>
            {renderStories()}
          </div>
        </>
      )}
    </div>
  );
}
