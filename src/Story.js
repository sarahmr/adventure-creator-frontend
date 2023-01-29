import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Story(props) {
  const navigate = useNavigate();

  const storyDetails = () => {
    navigate(`/story/${props.story.id}`);
  };

  return (
    <div className="story-card" onClick={storyDetails}>
      <div className="story-info">
        <h2>{props.story.title}</h2>
        <h4>
          <span>Written by </span>
          <Link
            to={`/author/${props.story.user.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {props.story.user.name}
          </Link>
        </h4>
        {props.user && props.userProfile && (
          <>
            {props.user.id === props.userProfile.id && (
              <>
                {props.story.published ? (
                  <p className="status" style={{ backgroundColor: "#79d3a5" }}>
                    {" "}
                    Published
                  </p>
                ) : (
                  <p className="status">Draft</p>
                )}{" "}
              </>
            )}
          </>
        )}
      </div>
      <div className="rating">
        {props.story.avg_rating === null ? (
          <p>Be the first to play and review this story!</p>
        ) : (
          <p>
            <span>Average Rating: </span>
            <span
              className={
                props.story.avg_rating >= 1 ? "filled-stars" : "empty-stars"
              }
            >
              {props.story.avg_rating >= 1 ? "★" : "☆"}
            </span>
            <span
              className={
                props.story.avg_rating >= 2 ? "filled-stars" : "empty-stars"
              }
            >
              {props.story.avg_rating >= 2 ? "★" : "☆"}
            </span>
            <span
              className={
                props.story.avg_rating >= 3 ? "filled-stars" : "empty-stars"
              }
            >
              {props.story.avg_rating >= 3 ? "★" : "☆"}
            </span>
            <span
              className={
                props.story.avg_rating >= 4 ? "filled-stars" : "empty-stars"
              }
            >
              {props.story.avg_rating >= 4 ? "★" : "☆"}
            </span>
            <span
              className={
                props.story.avg_rating >= 5 ? "filled-stars" : "empty-stars"
              }
            >
              {props.story.avg_rating >= 5 ? "★" : "☆"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
