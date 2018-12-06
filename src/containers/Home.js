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
import RatingsCardGroup from './Ratings'
import {truncateString} from '../utils.js'
import { ParallaxBanner} from 'react-scroll-parallax'

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



const Hero = ({title, aboutSite}) => <div><h1>{title}</h1><p>{aboutSite.about}</p></div>




const RatingsList = ({ratings}) => <Message positive >{JSON.stringify(ratings.ratings)}</Message>

export default () => (
  <Container >
    <ParallaxBanner
        className={'bannerBg'}
        layers={[
            {
                amount: 0.3,
                children: (
                    <video
                        className={'video'}
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        muted
                        poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/boats-at-sea.jpg"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/boats-at-sea-720.mp4"
                    />
                ),
                slowerScrollRate: true,
            },
        ]}
    >
    <Segment>
            <SiteData component={Hero} />
    </Segment>

    </ParallaxBanner>
    <RouteData component={UpcomingEvents} />

    <RouteData component={RatingsCardGroup} />


    social media buttons subscribe listen
  </Container>
)
