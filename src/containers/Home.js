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
  Item,
  Message,
  Button,
} from 'semantic-ui-react'
//
import logoImg from '../logo.png'
import piano from '../../public/uploads/piano.jpg'

// helper, utility functions
function truncateString(s, n) {
  var cut = s.indexOf(' ', n)
  if (cut == -1) return s
  return s.substring(0, cut)
}

function random_item(items)
{

return items[Math.floor(Math.random()*items.length)];

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

function RandomRatingsCard({ ratings }) {
  console.log(ratings)
  let rating = random_item(ratings.ratings.data)
  if (rating.hasOwnProperty("review_text")){
    return (
      <Segment piled>
      <Card
        meta={new Date(rating.created_time).toDateString()}
        description={rating.review_text}
      />
    <Button onClick={RandomRatingsCard}> Cool </Button>
      </Segment>
    )
  } else {
    let rating = random_item(ratings.ratings.data)
  }

}

const RatingsCardGroup = ({ ratings }) => (
  <Card.Group>
    {ratings.ratings.data.map((rating, index) => {
          if(rating.review_text){
            return <Card
              key={index}
              meta={JSON.stringify(rating)}
              description={rating.review_text}
            />
          }
        }
      )
    }
  </Card.Group>
)

const Hero = ({title}) => <div><h1>{title}</h1></div>

const About = ({ aboutSite }) => <div>{aboutSite.about}</div>

const Ratings = ({ratings}) => <Message positive >{JSON.stringify(ratings.ratings)}</Message>

export default () => (
  <Container className="parallax" fluid style={{ backgroundImage: `url(${piano})` }}>
    <Segment>
      <SiteData component={Hero} />
    </Segment>
    <Segment>
      <SiteData component={About} />
    </Segment>
    <Segment>
      <RouteData component={RandomRatingsCard} />
      <RouteData component={Ratings} />
    </Segment>
    <RouteData component={UpcomingEvents} />

    <RouteData component={RatingsCardGroup} />


    social media buttons subscribe listen
  </Container>
)
