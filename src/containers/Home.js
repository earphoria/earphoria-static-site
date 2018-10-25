import React from 'react'
import PropTypes from 'prop-types'
import { SiteData, withSiteData, RouteData, Link, withRouteData } from 'react-static'
import {
  Card,
  Container,
  Feed,
  List,
  Image,
  Segment,
  Item
} from 'semantic-ui-react'
//
import logoImg from '../logo.png'
import piano from '../../public/uploads/piano.jpg'

function truncateString(s, n) {
  var cut = s.indexOf(' ', n)
  if (cut == -1) return s
  return s.substring(0, cut)
}

const UpcomingEvents = ({ events }) => (
  <Card.Group>
    {events.data.map((event, index) => (
      <Card
        key={index}
        href={`https://www.facebook.com/events/${event.id}`}
        image={event.cover.source}
        header={event.name}
        meta={new Date(event.start_time).toDateString()}
        description={truncateString(event.description, 250) + '...'}
      />
    ))}
  </Card.Group>
)

const Hero = ({title}) => <div><h1>{title}</h1></div>

const About = ({ aboutSite }) => <div>{aboutSite.about}</div>

export default () => (
  <Container className="parallax" fluid style={{ backgroundImage: `url(${piano})` }}>
    <Segment>
      <SiteData component={Hero} />
    </Segment>
    <Segment>
      <SiteData component={About} />
    </Segment>
    <RouteData component={UpcomingEvents} />
    social media buttons subscribe listen
  </Container>
)
