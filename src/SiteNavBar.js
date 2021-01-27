import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import CompassLogo from './assets/compass.png'

class SiteNavBar extends React.Component {

  render() {
    return (
      <header className="navbar">
        <div className="logo" onClick={() => this.props.history.push('/')}>
          <img src={ CompassLogo } alt="compass" height="75px" />
          <h2 className="site-title" >Labyrinth</h2>
        </div>
        <div className="nav-links">
          <NavLink className="nav-link" activeClassName="selected" exact to="/" >See all Stories</NavLink>
          { this.props.user ? 
            <>
              <NavLink className="nav-link" activeClassName="selected" to={`/author/${this.props.user.id}`} >Your Stories</NavLink>
              <NavLink className="nav-link" activeClassName="selected" to={`/edit`} onClick={this.props.createStory} >Create a Story</NavLink>
              <NavLink className="nav-link" activeClassName="selected" to='/login' onClick={this.props.handleLogout} >Log Out</NavLink>
            </> 
            : 
            <NavLink className="nav-link" activeClassName="selected" to='/login' >Log In</NavLink>
          }
        </div>
      </header>
    )
  }
}

export default withRouter(SiteNavBar)