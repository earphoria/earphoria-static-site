import React from 'react'
import PropTypes from 'prop-types'
import { withSiteData, RouteData } from 'react-static'
import { Container, Feed, List } from 'semantic-ui-react'
//
import logoImg from '../logo.png'

const DataList = ({ events }) => (
  <div>
    <Feed events={events} />
    {JSON.stringify(events.events.data)}
  </div>
)

const ExampleList = () => <List items={['Apples', 'Pears', 'Oranges']} />


export default withSiteData(() => (
<div>
  <Container>
    intro hero

  </Container>

 events
    <RouteData component={DataList}/>
social media buttons
subscribe
listen
  </div>
))
