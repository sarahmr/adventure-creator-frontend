import React from 'react'
import Choice from './Choice'
import { withRouter } from 'react-router-dom'

class PlayArea extends React.Component {

  state = {
    story: null,
    currentScene: {}
  }

  componentDidMount() {
    // fetch story based on id from route
    fetch(`http://localhost:3001/stories/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(story => {
      story.scenes.sort((a, b) => a.id - b.id)
      this.setState({ story, currentScene: story.scenes[0] })
    })
  }

  renderChoices = () => {
    return this.state.currentScene.paths.map((choice, index) => <Choice key={index} choice={choice} changeScene={this.changeScene} />)
  }

  changeScene = (scene_id) => {
    let nextScene = this.state.story.scenes.find(scene => scene.id === Number(scene_id))

    console.log(nextScene)

    this.setState({
      currentScene: nextScene
    })
  }

  render() {
    if (!this.state.story) {
      return null
    }
    return (
      <div className="play-area">
        <div>
          <h2>{this.state.story.title}</h2>
        </div>
        <div>
          <h4>{this.state.currentScene.title}</h4>
          <p>{this.state.currentScene.text}</p>
        </div>
        <div className="choices-display">
          {this.state.currentScene.title ? this.renderChoices() : null}
        </div>
      </div>
    )
  }
}

export default withRouter(PlayArea);