import React, { useState } from 'react'
import Scene from './Scene'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants' 

function SceneDisplayArea(props) {
  let [scenes, setScenes] = useState({
    a: { top: 20, left: 80 },
    b: { top: 180, left: 20 }
  })

  let [, drop] = useDrop({
    accept: ItemTypes.SCENE,
    drop(item, monitor) {
      // let delta = monitor.getItem();
      monitor.getItem()
      // let left = Math.round(item.left + delta.x)
      // let top = Math.round(item.top + delta.y)
      // moveScene(item.id, left, top)
      return undefined
    }
  })

  // let moveScene = (id, left, top) => {
  //   setScenes(update(scenes, {
  //     [id]: {
  //       $merge: { left, top },
  //     },
  //   }))
  // }

  let displayScenes = () => {
    return props.scenes.map((scene) => <Scene 
      key={scene.id} 
      scene={scene} 
      addNewScene={props.addNewScene} 
      story={props.story} 
      scenes={props.scenes} 
      getNewScenes={props.getNewScenes} 
    />)
  }

  return(
    <div className="scene-display">
      <div ref={drop} className="scene-drag-area">
        {displayScenes()}
      </div>
      <div>
        <button className="scene-button" onClick={props.addNewScene}>Add New Scene</button>
      </div>
    </div>
  )
  
}

export default SceneDisplayArea