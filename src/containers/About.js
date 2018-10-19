import React from 'react'
import { RouteData, withRouteData } from 'react-static'
import { List } from 'semantic-ui-react'

//
//



const DataList = ({ about }) => (

  <div>
    <h1>About</h1>
    {JSON.stringify(about)}
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
