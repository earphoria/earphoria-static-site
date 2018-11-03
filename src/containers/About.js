import React from 'react'
import { RouteData, withRouteData } from 'react-static'
import { List } from 'semantic-ui-react'

//
//



const DataList = ({ data }) => (

  <div>
    <h1>About</h1>
    {JSON.stringify(data)}
  </div>
)

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
