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
import {Animated} from "react-animated-css"


// helper, utility functions
function truncateString(s, n) {
  var cut = s.indexOf(' ', n)
  if (cut == -1) return s
  return s.substring(0, cut)
}

function random_item(items)
{

let itemIndex = Math.floor(Math.random()*items.length)
console.log(itemIndex)
return items[itemIndex]


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

function RatingsCard({ ratings }) {
  let rating = random_item(ratings.ratings.data)
    return (
      <Segment piled>
        {JSON.stringify(rating)}
      </Segment>
    )
}

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRating: this.props.ratings.ratings.data[0],
      clicked: false,
      isVisible: true
    }
  }

  toggleVisible () {
  this.setState({
    isVisible: !this.state.isVisible
  })
}
  toggle = e => this.setState(state => ({ index: state.index === 2 ? 0 : state.index + 1 }))

  randomEntry = () => {
    this.setState({
      clicked: true,
      selectedRating: random_item(this.props.ratings.ratings.data),
      isVisible: false
    })
  }

  render() {
    return (

      <div>

      <div className="Rating">
                  <Segment piled>
        <Button onClick={this.randomEntry}>Random Rating</Button>
          <button onClick={this.toggleVisible.bind(this)} >
    Click to show modal
  </button>
  {!this.state.isHidden && <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}> {JSON.stringify(this.state.selectedRating)} </Animated>
}



            </Segment>

      </div>

  </div>
    )
  }
}

const RatingsCardGroup = ({ ratings }) => (

  <Card.Group>
    {ratings.ratings.data.map((rating, index) => {
            return <Card
              key={index}
              meta={new Date(rating.created_time).toDateString()}
              description={rating.review_text}
            />
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
      <RouteData component={Rating} />
    </Segment>
    <RouteData component={UpcomingEvents} />

    <RouteData component={RatingsCardGroup} />


    social media buttons subscribe listen
  </Container>
)
