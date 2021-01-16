import React, { useEffect, useState } from 'react'
import Scene from './Scene'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants' 
import Line from './Line'

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

  // patch request to update position on backend
  useEffect(() => {
    for (let scene in scenes) {
      // console.log(scene, scenes[scene].top, scenes[scene].left)
      fetch(`http://localhost:3001/scenes/${scene}`, {
        method: "PATCH",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          position: {
            top: scenes[scene].top,
            left: scenes[scene].left
          }
        })
      })
      .then(res => res.json())
      .then(sceneObjArr => {
        // console.log(sceneObjArr)
      })
    }
  })

  let displayScenes = () => {
    // console.log(props.scenes, scenes)
    return props.scenes.map((scene) => <Scene 
      key={scene.id} 
      scene={scene} 
      story={props.story} 
      scenes={props.scenes} 
      getNewScenes={props.getNewScenes}
      left={scenes[scene.id] ? scenes[scene.id].left : scene.position.left}
      top={scenes[scene.id] ? scenes[scene.id].top : scene.position.top} 
    />)
  }

  let renderLines = () => {
    let lineList = []
    // console.log(props.scenes)
    // where scenes are rendered; if a scene is connected through a path -- connect with a line
    props.scenes.forEach(scene => {
      // if a scene has paths -- connect scene to paths with a line if there isn't one there already
      if (scene.paths) {
        scene.paths.forEach(path => {
          // console.log(path, props.scenes)
          let scene2 = props.scenes.find(scene => scene.id === Number(path.scene_id))
          // console.log(scene, scene2)
          lineList.push(<Line 
            key={scene2.id + scene.id}
            x1={(scenes[scene.id] ? scenes[scene.id].left : scene.position.left) + 100} 
            y1={(scenes[scene.id] ? scenes[scene.id].top : scene.position.top) + 60} 
            x2={(scenes[scene2.id] ? scenes[scene2.id].left : scene2.position.left) + 100} 
            y2={scenes[scene2.id] ? scenes[scene2.id].top : scene2.position.top} 
            style={{ stroke: 'red', strokeWidth: 2}}  />)
        })
      }
    })

    return lineList
  }

  return(
    <div className="scene-display">
      <div ref={drop} className="scene-drag-area">
        {displayScenes()}
        <svg style={{ height: "75vh", width: "100%" }}>
          {renderLines()}
        </svg>
      </div>
      <div>
        <button className="scene-button" onClick={props.addNewScene}>Add New Scene</button>
      </div>
    </div>
  )
  
}

export default SceneDisplayArea