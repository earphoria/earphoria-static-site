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


async function getFacebook(endpoint, ...args) {
    try {
        console.log(args)
        const response = await FB.api( endpoint,
          'GET',
          args);
        return response
    }
    catch(error) {
        if(error.response.error.code === 'ETIMEDOUT') {
            console.log('request timeout');
        }
        else {
            console.log('error', error.message);
        }
    }
}

async function getFacebookEvents(time_filter) {
    try {
        const response = await FB.api( 'events',
          { id: 'hostelearphoria',
            'fields': 'id, name, description, start_time, cover',
            access_token: 'EAAgQp6fslW8BAA3dZAqxk0jT0JqPJxNheMXcUb9puXOsajA5AkugXfXcmJnsZB5NgCkFYOgoKvRsrZCyZCrW0m4UziSLZBBDXIpKfyTok1imehgDyllsDZBCWPhD8uhzNFvNqM8V9TTn5rIt6IOF5LPUKY6DwRaNMULKZBrCUqt1eOknc34jVz9cd4w0gSW2fNQYGLjL3KhbQZDZD',
            time_filter: time_filter,
          });

        return response
    }
    catch(error) {
        if(error.response.error.code === 'ETIMEDOUT') {
            console.log('request timeout');
        }
        else {
            console.log('error', error.message);
        }
    }
}


export default {

  getSiteData: async () => ({
    title: 'Hostel Earphoria',
    aboutSite:  await FB.api('hostelearphoria',
      {
        'fields': 'about, location',
        access_token: 'EAAgQp6fslW8BAA3dZAqxk0jT0JqPJxNheMXcUb9puXOsajA5AkugXfXcmJnsZB5NgCkFYOgoKvRsrZCyZCrW0m4UziSLZBBDXIpKfyTok1imehgDyllsDZBCWPhD8uhzNFvNqM8V9TTn5rIt6IOF5LPUKY6DwRaNMULKZBrCUqt1eOknc34jVz9cd4w0gSW2fNQYGLjL3KhbQZDZD',
      }),
  }),
  getRoutes: async () => {
    const posts = await getPosts()
    const about = await FB.api( 'hostelearphoria',
      {
        'fields': 'about, location',
        access_token: 'EAAgQp6fslW8BAA3dZAqxk0jT0JqPJxNheMXcUb9puXOsajA5AkugXfXcmJnsZB5NgCkFYOgoKvRsrZCyZCrW0m4UziSLZBBDXIpKfyTok1imehgDyllsDZBCWPhD8uhzNFvNqM8V9TTn5rIt6IOF5LPUKY6DwRaNMULKZBrCUqt1eOknc34jVz9cd4w0gSW2fNQYGLjL3KhbQZDZD',
      })
    const events = await getFacebookEvents('upcoming')
    const ratings = await FB.api( 'hostelearphoria',
      {
        'fields': 'ratings{review_text, created_time, has_review:true}',
        access_token: 'EAAgQp6fslW8BAA3dZAqxk0jT0JqPJxNheMXcUb9puXOsajA5AkugXfXcmJnsZB5NgCkFYOgoKvRsrZCyZCrW0m4UziSLZBBDXIpKfyTok1imehgDyllsDZBCWPhD8uhzNFvNqM8V9TTn5rIt6IOF5LPUKY6DwRaNMULKZBrCUqt1eOknc34jVz9cd4w0gSW2fNQYGLjL3KhbQZDZD',
      })

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: async () => ({
          about: about,
          events: events,
          ratings: ratings,

        })
      },
      {
        path: '/about',
        component: 'src/containers/About',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          data: about,
        })
      },
      {
        path: '/ratings',
        component: 'src/containers/Ratings',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          ratings: ratings,
        })
      },
      {
        path: '/events',
        component: 'src/containers/Events',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          data: await getFacebookEvents(),
        })
      },
      {
        path: '/projects',
        component: 'src/containers/Projects',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          projects: [],
        })
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
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </Head>
    <Body>{children}</Body>
  </Html>
),
}
