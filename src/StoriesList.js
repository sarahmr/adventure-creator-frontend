import React from 'react'
import Story from './Story'
import { withRouter } from 'react-router-dom'

class StoriesList extends React.Component {

  state = {
    stories: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/stories')
    .then(res => res.json())
    .then(storyObjArr => {
      storyObjArr.sort((a, b) => a.id - b.id)
      this.setState({
        stories: storyObjArr
      })
    })
  }

  startStory = (id) => {
    console.log(id)
    this.props.history.push(`/play/${id}`)
  }

  renderStoriesList = () => {
    return this.state.stories.map((story) => <Story key={story.id} story={story} startStory={this.startStory} />)
  }

  render() {
    return (
      <div className="stories-list">
        {this.renderStoriesList()}
      </div>
    )
  }
}

export default withRouter(StoriesList);