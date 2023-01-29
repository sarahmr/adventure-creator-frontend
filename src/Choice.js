import React from "react";

export default function Choice({ changeScene, choice }) {
  const handleChange = () => {
    changeScene(choice.scene_id);
  };
  return (
    <div className="choice-card" onClick={handleChange}>
      {choice.choice_text}
    </div>
  );
}
