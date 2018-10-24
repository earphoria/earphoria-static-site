import React from 'react'
import PropTypes from 'prop-types'
import { withSiteData, RouteData , Link} from 'react-static'
import { Card, Container, Feed, List , Image, Segment, Item} from 'semantic-ui-react'
//
import logoImg from '../logo.png'
import piano from '../../public/uploads/piano.jpg'

function regFirstWords(s, n) {
    // ?: non-capturing subsequent sp+word.Change {} if you want to require n instead of allowing fewer
    var a = s.match(new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (n - 1) + '}'));
    return  (a === undefined || a === null) ? '' : a[0];
}

function cutString(s, n){
    var cut= s.indexOf(' ', n);
    if(cut== -1) return s;
    return s.substring(0, cut)
}

const UpcomingEvents = ({ events }) => (
  <Card.Group>
      {events.data.map((event, index) => (
        <Card
          href={`https://www.facebook.com/events/${event.id}`}
          image={event.cover.source}
          header={event.name}
          meta={new Date(event.start_time).toDateString()}
          description={cutString(event.description, 250) + "..."}
          />
  ))}
</Card.Group>
)

const ExampleList = () => <List items={['Apples', 'Pears', 'Oranges']} />


export default withSiteData(() => (
<div className='parallax' fluid style={{backgroundImage: `url(${piano})`}}>
  <Container >
    intro hero

  </Container>


   <RouteData component={UpcomingEvents}/>


social media buttons
subscribe
listen
  </div>
))
