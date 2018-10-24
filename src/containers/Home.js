import React from 'react'
import PropTypes from 'prop-types'
import { withSiteData, RouteData } from 'react-static'
import { Container, Feed, List , Image, Segment} from 'semantic-ui-react'
//
import logoImg from '../logo.png'
import piano from '../../public/uploads/piano.jpg'


const DataList = ({ events }) => (
  <div>
    <Feed events={events} />
    {JSON.stringify(events.events.data)}
  </div>
)

const ExampleList = () => <List items={['Apples', 'Pears', 'Oranges']} />


export default withSiteData(() => (
<div className='parallax' fluid style={{backgroundImage: `url(${piano})`}}>
  <Container >
    intro hero

  </Container>

 <Segment raised> events </Segment>
    <RouteData component={DataList}/>
social media buttons
subscribe
listen
  </div>
))
