const fs = require('fs')
const klaw = require('klaw')
const path = require('path')
const matter = require('gray-matter')
const FB = require('fb');
import React, { Component } from 'react'

function getPosts () {
  const items = []
  // Walk ("klaw") through posts directory and push file paths into items array //
  const getFiles = () => new Promise(resolve => {
    // Check if posts directory exists //
    if (fs.existsSync('./src/posts')) {
      klaw('./src/posts')
        .on('data', item => {
          // Filter function to retrieve .md files //
          if (path.extname(item.path) === '.md') {
            // If markdown file, read contents //
            const data = fs.readFileSync(item.path, 'utf8')
            // Convert to frontmatter object and markdown content //
            const dataObj = matter(data)
            // Create slug for URL //
            dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            // Remove unused key //
            delete dataObj.orig
            // Push object into items array //
            items.push(dataObj)
          }
        })
        .on('error', e => {
          console.log(e)
        })
        .on('end', () => {
          // Resolve promise for async getRoutes request //
          // posts = items for below routes //
          resolve(items)
        })
    } else {
      // If src/posts directory doesn't exist, return items as empty array //
      resolve(items)
    }
  })
  return getFiles()
}

function getFacebook () {
  FB.api(
  '/150963798340232',
  'GET',
  {"fields":"events",
    access_token: 'EAAgQp6fslW8BADIBuQBqCA4OPgOts1cqtON1Xna1J8uH2zZCkwZCAnls8DZAypu6uMhnXPsTATZCZAQ9Pe56SjN1hZAqGsq34HrzIN5GLJqAjbS1yV8IgWVGCZC3eVo69wqPtWRe1PXSEfpEWsAuRheLLhsJ9tTUSsWZCGE7Y0kFrHjMqNwYMw8IqOahexpOauTI6me5ZC3GTGgZDZD'},
  function (response) {
  if(!response || response.error) {
   console.log(!response ? 'error occurred' : response.error);
   return;
  }
  console.log(response.id);
  console.log(response.name);
});

}


export default {

  getSiteData: () => ({
    title: 'React Static with Netlify CMS',
  }),
  getRoutes: async () => {
    const posts = await getPosts()
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: async () => ({
          data: await getFacebook()
        })
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.data.slug}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
  <Html lang="en-US">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
    </Head>
    <Body>{children}</Body>
  </Html>
),
}
