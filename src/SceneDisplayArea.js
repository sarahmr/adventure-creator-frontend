import React, { useState } from 'react'
import Scene from './Scene'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants' 

function SceneDisplayArea(props) {
  let [scenes, setScenes] = useState({
  })

  let [, drop] = useDrop({
    accept: ItemTypes.SCENE,
    drop(item, monitor) {
      let delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      moveScene(item.id, left, top)
      return undefined
    }
  })

  let moveScene = (id, left, top) => {
    let newScenes = { 
      ...scenes,
      [id]: { left, top }
    }
    setScenes(newScenes)
  }

  let displayScenes = () => {
    return props.scenes.map((scene) => <Scene 
      key={scene.id} 
      scene={scene} 
      addNewScene={props.addNewScene} 
      story={props.story} 
      scenes={props.scenes} 
      getNewScenes={props.getNewScenes}
      left={scenes[scene.id] ? scenes[scene.id].left : 0}
      top={scenes[scene.id] ? scenes[scene.id].top : 0} 
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