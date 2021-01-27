import React from 'react';
import SceneDisplayArea from './SceneDisplayArea'
import StoryOptions from './StoryOptions'
import { withRouter } from 'react-router-dom'
import StoryOptionsCollapsed from './StoryOptionsCollapsed'

class StoryEditor extends React.Component {

  state = {
    story: null,
    scenes: [],
    sidebar: true
  }

  // fetch the newly created story from url
  componentDidMount() {
    fetch(`http://localhost:3001/stories/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(story => {
      this.setState({ story })
      this.getNewScenes()
    })
  }

  addNewScene = () => {
    let newScene = {
      story_id: this.state.story.id,
      title: '',
      text: '',
      paths: [],
      position: {
        "left": 200,
        "top": 50
      }
    }

    fetch("http://localhost:3001/scenes", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(newScene)
    })
    .then(res => res.json())
    .then(newScene => {
      this.setState({
        scenes: [...this.state.scenes, newScene]
      })
    })  
  }

  getNewScenes = () => {
    fetch(`http://localhost:3001/story_scenes/${this.state.story.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      },
    })
    .then(res => res.json())
    .then(scenes => {
      // console.log(scenes)
      scenes.sort((a, b) => a.id - b.id)
      this.setState({
        scenes 
      })
    })
  }

  sidebarDisplay = () => {
    this.setState(prevState => ({
      sidebar: !prevState.sidebar
    }))
  }
  
  updateStory = (story) => {
    this.setState({ story })
  }

  render() {
    return (
      <div className="story-editor">
        { this.state.sidebar? 
          <StoryOptions story={this.state.story} sidebarDisplay={this.sidebarDisplay} updateStory={this.updateStory} /> 
          : 
          <StoryOptionsCollapsed sidebarDisplay={this.sidebarDisplay} />
        }
        {/* <StoryOptions story={this.state.story} /> */}
        <SceneDisplayArea scenes={this.state.scenes} addNewScene={this.addNewScene} story={this.state.story} getNewScenes={this.getNewScenes} />
      </div>
    )
  }
}

export default withRouter(StoryEditor);