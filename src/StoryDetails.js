import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RatingAndReviewForm from "./RatingAndReviewForm";
import Review from "./Review";

export default function StoryDetails(props) {
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [reviews, setReviews] = useState([]);

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
      .then((storyObj) => {
        setStory(storyObj);
        setReviews(storyObj.reviews);
      });
  }, [story, reviews, props.match.params.id]);

  const startStory = (id) => {
    navigate(`/play/${id}`);
  };

  const getNewReviews = (reviewObj) => {
    setReviews([...reviews, reviewObj]);
  };

  const renderReviews = () => {
    return reviews.map((review) => <Review key={review.id} review={review} />);
  };

  if (!(story && props.user)) {
    return null;
  }
  return (
    <div>
      <div className="story-details">
        <div className="story-details-title">
          <h2>{story.title}</h2>
          {props.user.id === story.user.id && (
            <>
              {" "}
              {story.published ? (
                <p className="status" style={{ backgroundColor: "#79d3a5" }}>
                  {" "}
                  Published
                </p>
              ) : (
                <p className="status">Draft</p>
              )}{" "}
            </>
          )}
        </div>
        <h4>
          <span>Written by </span>
          <Link to={`/author/${story.user.id}`}>{story.user.name}</Link>
        </h4>
        {props.user.id === story.user.id && (
          <div className="edit-details">
            <button
              onClick={() => {
                navigate(`/edit/${story.id}`);
              }}
            >
              Edit Story
            </button>
          </div>
        )}
        <p>Synopsis: {story.brief_description}</p>
      </div>
      <div className="story-buttons">
        <button onClick={() => startStory(story.id)}>Play</button>
      </div>
      <div className="reviews">
        <RatingAndReviewForm
          story={story}
          user={props.user}
          getNewReviews={getNewReviews}
        />
        {renderReviews()}
      </div>
    </div>
  );
}
