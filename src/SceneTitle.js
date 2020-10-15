import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';


export default function SceneTitle(props){
  let [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SCENE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div className="scene-title" ref={drag} >
      <h3>{props.scene.title ? props.scene.title : "Scene Title"}</h3>
      { !props.edit && <button onClick={props.displayForm} >Edit Scene</button> }
    </div>
  )
}