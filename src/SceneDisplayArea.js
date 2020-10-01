import React from 'react'
import Scene from './Scene'

class SceneDisplayArea extends React.Component {

  displayScenes = () => {
    return this.props.scenes.map((scene) => <Scene 
      key={scene.id} 
      scene={scene} 
      addNewScene={this.props.addNewScene} 
      story={this.props.story} 
      scenes={this.props.scenes} 
      getNewScenes={this.props.getNewScenes} 
    />)
  }

  render(){
    return(
      <div className="scene-display">
        {this.displayScenes()}
        <div>
          <button className="scene-button" onClick={this.props.addNewScene}>Add New Scene</button>
        </div>
      </div>
    )
  }
}

export default SceneDisplayArea