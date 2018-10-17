import React from 'react'
import { withRouteData, RouteData, Link } from 'react-static'
//
const BlogList = ({ posts }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
{JSON.stringify(posts)}
  </div>
)

export default () => (
  <div>
    <RouteData component={BlogList}/>
  </div>
)



// export default withRouteData(({ posts }) => (
//   <div>
//     <h1>It's blog time.</h1>
//     <br />
//     All Posts:
//     <ul>
//       {posts.map(post => (
//         <li key={post.data.slug}>
//           <Link to={`/blog/post/${post.data.slug}`}>{post.data.title}</Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// ))
