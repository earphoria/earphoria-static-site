import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import {Menu, Segment } from 'semantic-ui-react'
//
import Routes from 'react-static-routes'
import { ParallaxProvider } from 'react-scroll-parallax';
import './app.css'

const navItems = [
  { key: 'Home', active: true, name: 'Home' },
  { key: 'About', name: 'About' },
  { key: 'events', name: 'Upcoming Events' }
]

const App = () => (
  <ParallaxProvider>
  <Router>
    <div>
      <nav>
        <Menu>
        <Menu.Item> <Link exact to="/">Home</Link></Menu.Item>
        <Menu.Item> <Link to="/about">About</Link></Menu.Item>
        <Menu.Item> <Link to="/events">Events</Link></Menu.Item>
        <Menu.Item> <Link to="/ratings">Reviews</Link></Menu.Item>
        <Menu.Item> <Link to="/media">Media</Link></Menu.Item>
        <Menu.Item> <Link to="/projects">Projects</Link></Menu.Item>
        <Menu.Item> <Link to="/news">News</Link></Menu.Item>
        <Menu.Item> <Link to="/contact">Contact</Link></Menu.Item>
        </Menu>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
</ParallaxProvider>
)

export default hot(module)(App)
