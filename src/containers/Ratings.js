import React from 'react'
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
import piano from '../../public/uploads/piano.jpg'

const RatingsCardGroup = ({ ratings }) => (

  <Card.Group>
    {
      ratings.ratings.data.map((rating, index) => {
          if(rating.review_text){
            return(<Card
              key={index}
              meta={new Date(rating.created_time).toDateString()}
              description={rating.review_text}
            />)
          }
        }
      )
    }
  </Card.Group>
)

export default () => (
  <Container>

    <RouteData component={RatingsCardGroup} />


    social media buttons subscribe listen
  </Container>

)
