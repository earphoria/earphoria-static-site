import React from 'react'
import { withSiteData, RouteData } from 'react-static'
import { List } from 'semantic-ui-react'
//
import logoImg from '../logo.png'

const DataList = ({ data }) => (
  <div>
    <h1>Top 100 Spotify Songs</h1>
    <List items={[data]} />
  </div>
)

const ExampleList = () => <List items={['Apples', 'Pears', 'Oranges']} />

export default withSiteData(() => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Welcome to</h1>
    <img src={logoImg} alt="" style={{ display: 'block', margin: '0 auto' }} />
    <ExampleList />

    <RouteData component={DataList}/>
  </div>
))
