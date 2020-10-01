import React from 'react'
import Path from './Path'

class Scene extends React.Component {

  state = {
    edit: false,
    title: `${this.props.scene.title}`,
    text: `${this.props.scene.text}`,
    paths: [...this.props.scene.paths]
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onPathChange = (newPath, findIndex) => {
    let newPaths = this.state.paths.map((path, index) => {
      if (index === findIndex) {
        return newPath
      }
      return path
    })

    this.setState({
      paths: newPaths
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    // take info from paths and create new scenes or find existing scenes
    let needNewScenePaths = []

    // create paths for sending to backend (different slighly than state)
    let paths = []

    // iterate through paths, if it's scene title need post request to get scene id, if selected scene need path formated as scene_id

    this.state.paths.forEach(path => {
      if (path.scene_title){
        needNewScenePaths.push(path)
      } else {
        paths.push({
          "scene_id": path.selected_scene,
          "choice_text": path.choice_text
        })
      }
    })

    let promises = needNewScenePaths.map(path => 
      fetch("http://localhost:3001/scenes", {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          story_id: `${this.props.story.id}`,
          title: `${path.scene_title}`,
          text: '',
          paths: []
        })
      })
      .then(res => res.json())
      .then(newScene => {
        paths.push({
          "scene_id": newScene.id,
          "choice_text": path.choice_text
        })
      })
    )

    Promise.all(promises).then(() => this.sceneUpdate(paths))
  
    this.setState(prevState => ({
      edit: !prevState.edit
    }))
  }

  sceneUpdate = (paths) => {
    fetch(`http://localhost:3001/scenes/${this.props.scene.id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        story_id: `${this.props.story.id}`,
        title: `${this.state.title}`,
        text: `${this.state.text}`,
        paths: paths
      })
    })
    .then(res => res.json())
    .then(newScene => {
      // trigger fetch in story editor to render scenes
      this.props.getNewScenes()
    })
  }

  renderPaths = () => {
    return this.state.paths.map((path, index) => <Path key={index} scenes={this.props.scenes} index={index} path={path} onPathChange={this.onPathChange} />)
  }

  addAPath = () => {
    let newPath = { scene_title: '', choice_text: '', selected_scene: null }
    this.setState({
      paths: [...this.state.paths, newPath]
    })
  }

  displayForm = () => {
    this.setState(prevState => ({
      edit: !prevState.edit
    }))
  }

  render(){
    return(
      <div className="scene">
        <div className="scene-title">
          <h3>{this.props.scene.title ? this.props.scene.title : "Scene Title"}</h3>
          { !this.state.edit && <button onClick={this.displayForm} >Edit Scene</button> }
        </div>
        <div>
          {this.state.edit ? 
            <form onSubmit={this.onSubmit} className="scene-form">
            <div className="scene-info">
              <label>Scene Title:</label>
              <input onChange={this.onChange} type="text" name="title" value={this.state.title} />
            </div>
            <div className="scene-info">
              <label>Text:</label>
              <textarea rows="4" onChange={this.onChange} name="text" value={this.state.text} ></textarea>
            </div>
            <div className="path-area">
              <h4>Paths:</h4>
              {this.renderPaths()}
              <button type="button" onClick={this.addAPath}>+</button>
            </div>
            <div className="scene-submit">
              <input type="submit" value="Save"/>
            </div>
          </form>
          : null 
          }
        </div>
      </div>
    )
  }
}

export default Scene