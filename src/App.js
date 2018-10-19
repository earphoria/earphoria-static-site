import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

import './app.css'

const App = () => (
  <Router>
    <div>
      <nav>
        <Link exact to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/media">Media</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/news">News</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
)

export default hot(module)(App)
