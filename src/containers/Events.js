import React from 'react'
import { RouteData, SiteData, withRouteData } from 'react-static'
import { Button, Icon, Item, Image , List } from 'semantic-ui-react'
import {truncateString} from '../utils.js'
import Markdown from 'react-markdown'

const DisplayEvents = ({ data }) => (
  <Item.Group>
    {data.data.map((event, index) => (
      <Item
        key={index}
        image={event.cover.source}
        header={event.name}
        meta={new Date(event.start_time).toDateString()}
        description={<Markdown source={event.description} escapeHtml={false} />}
        extra={ <Button href={`https://www.facebook.com/events/${event.id}`} primary floated='right'>
            More Info
            <Icon name='right chevron' />
          </Button>}
      />
    ))}
  </Item.Group>
)

const DataList = ({ data }) => (

  <div>
    <Card>{JSON.stringify(data)}</Card>
  </div>
)


export default () => (
  <div>
    <RouteData component={DisplayEvents}/>
  </div>
)
