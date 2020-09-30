import React from 'react'

class StoryOptions extends React.Component {

  state = {
    title: '',
    published: false,
    brief_description: '',
    message: ''
  }

  componentDidUpdate(prevProps){
    if (prevProps.story !== this.props.story) {
      this.setState({
        title: this.props.story.title,
        published: this.props.story.published,
        brief_description: this.props.story.brief_description
      })
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeStoryStatus = () => {
    this.setState(prevState => ({
      published: !prevState.published
    }))
  }

  saveDraft = () => {
    // save draft
    // make a patch request to update title and maybe published
    fetch(`http://localhost:3001/stories/${this.props.story.id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        published: this.state.published,
        brief_description: this.state.brief_description
      })
    })
    .then(res => res.json())
    .then(storyObj => {
      console.log(storyObj)
      this.setState({message: "Saved!"})
      setTimeout(() => this.setState({message: ''}), 1500)
    })
  }

  render(){
    return (
      <div className="story-options">
        <div className="title-description">
          <div>
            <label>Story Title:</label><br/>
            <input onChange={this.onChange} type="text" name="title" value={this.state.title} />
          </div>
          <div>
            <label>Brief Description:</label><br/>
            <textarea onChange={this.onChange} type="text" name="brief_description" value={this.state.brief_description} />
          </div>
        </div>
        <div className="publish-save">
          <div>
            <label>Publish</label>
            <input type='checkbox' name="published" onChange={this.changeStoryStatus} checked={this.state.published} />
          </div>
          <div>{this.state.message}</div>
          <button onClick={this.saveDraft} style={{alignSelf: "flex-end"}}>Save</button>
        </div>
      </div>
    )
  }
}

export default StoryOptions