import React from 'react'

class Choice extends React.Component {

  handleChange = () => {
    this.props.changeScene(this.props.choice.scene_id)
  }

  render(){
    return (
      <div className="choice-card" onClick={this.handleChange}>
        {this.props.choice.choice_text}
      </div>
    )
  }
}

export default Choice