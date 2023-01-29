import React, { useEffect, useState } from "react";
import StoryEditor from "./StoryEditor";
import SiteNavBar from "./SiteNavBar";
import StoriesList from "./StoriesList";
import PlayArea from "./PlayArea";
import { Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./LogIn";
import UserStories from "./UserStories";
import Register from "./Register";
import StoryDetails from "./StoryDetails";

export default function AdventureCreator() {
  const [currentUser, setCurrentUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/autologin`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            handleLogin(data.user, data.image);
          }
        });
    }
  });

  const handleLogin = (user, image) => {
    user["image"] = image;
    setCurrentUser({ user });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(
      {
        currentUser: null,
      },
      () => {
        navigate("/");
      }
    );
  };

  const createStory = (event) => {
    event.preventDefault();
    // create a story
    fetch(`${process.env.REACT_APP_SERVER_URL}/stories`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        title: "",
        published: false,
        user_id: `${currentUser.id}`,
        brief_description: "",
      }),
    })
      .then((res) => res.json())
      .then((newStory) => {
        navigate(`/edit/${newStory.id}`);
      });
  };

  return (
    <>
      <SiteNavBar
        handleLogout={handleLogout}
        user={currentUser}
        createStory={createStory}
      />
      <Routes>
        <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
        <Route path="/edit/:id" element={<StoryEditor />} />
        <Route
          path="/story/:id"
          element={<StoryDetails user={currentUser} />}
        />
        <Route path="/play/:id" element={<PlayArea />} />
        <Route
          path="/author/:id"
          element={<UserStories user={currentUser} />}
        />
        <Route
          path="/register"
          element={<Register handleLogin={handleLogin} />}
        />
        <Route path="/" element={<StoriesList />} />
      </Routes>
    </>
  );
}
