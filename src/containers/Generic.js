import React from 'react'
import { RouteData, SiteData, withRouteData } from 'react-static'
import { Card, List } from 'semantic-ui-react'

//
//



const DataList = ({ data }) => (

  <div>
    <Card>{JSON.stringify(data)}</Card>
  </div>
)

const About = ({ aboutSite }) => <div>{aboutSite.about}</div>

export default () => (
  <div>
    <RouteData component={DataList}/>
  </div>
)

// export default () => (
//   <RouteData render={({ data }) => (
//     <div>
//       {JSON.stringify(data)}
//     </div>
//   )} />
// )
