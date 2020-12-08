import React from 'react'

class Path extends React.Component {

  state = {
    scene_title: '',
    selected_scene: '',
    choice_text: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.onPathChange(this.state, this.props.index)
    })
  }

  render(){
    console.log(this.props.path, "here")
    return(
      <div className="path">
        <div className="path-details">
          <input onChange={this.onChange} type="text" placeholder="New Scene" name="scene_title" value={this.props.path.scene_title} />
        </div>
        <div className="path-details">
          {
            this.props.scenes.length > 1 ? 
            <>
            <label><span className="path-details"> or </span></label>
            <select name="selected_scene" onChange={this.onChange} value={this.props.path.scene_id ? this.props.path.scene_id : this.props.path.selected_scene}>
              <option>Select A Scene</option>
              {this.props.scenes.map(scene => 
                <option key={scene.id} value={scene.id}>{scene.title}</option>
              )}
            </select>
          </> : null
          }
        </div>
        <div className="path-details">
          <input onChange={this.onChange} type="text" placeholder="Choice Text" name="choice_text" value={this.props.path.choice_text} />
        </div>
        
      </div>
    )
  }
}

export default Path