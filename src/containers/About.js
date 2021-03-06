import React from 'react'
import { RouteData, SiteData, withRouteData } from 'react-static'
import { List, Card } from 'semantic-ui-react'

//
//



const DataList = ({ data }) => (

  <div>
    <h1>About</h1>
    {JSON.stringify(data)}
  </div>
)

const About = ({ aboutSite }) => <div>{aboutSite.about}</div>

export default () => (
  <div>
    <RouteData component={DataList}/>
    <SiteData component={About}/>
  </div>
)

// export default () => (
//   <RouteData render={({ data }) => (
//     <div>
//       {JSON.stringify(data)}
//     </div>
//   )} />
// )
