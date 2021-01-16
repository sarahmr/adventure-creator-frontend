import React from 'react'
import LeftArrow from './assets/angle-double-left-solid.svg'

export default function StoryOptionsCollapsed(props) {

  let expand = () => {
    props.sidebarDisplay()
  }

  return (
    <div className="story-options-collapsed" >
      <button className="side-collapse-button" onClick={expand} >
        <img className="side-collapse" src={ LeftArrow } />
      </button>
    </div>
  )
}