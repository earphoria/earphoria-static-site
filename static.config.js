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

async function getFacebook(...fields) {
    try {
        const response = await FB.api(  '/150963798340232',
          'GET',
          {"fields": fields,
            access_token: 'EAAgQp6fslW8BAFfHp6vsp4OZB2ZCqOed9uj7GZCqR4LpfZCyMkQImcZA5LFVtdqoQmbbFM3aVkAuWktGFf7aJaSNgaiXPszE2qdLSQish4IsnHG9iCUtmas2O3adgpvrjHu93lR39b6tCID7FAiKUvnORXe9Yex0JggZAYntQjegZDZD',
            time_filter: 'upcoming',
          });
          console.log(response)
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

async function getFacebookEvents() {
    try {
        const response = await FB.api( 'events',
          { id: 'hostelearphoria',
            'fields': 'id, name, description, start_time, cover',
            access_token: 'EAAgQp6fslW8BAFfHp6vsp4OZB2ZCqOed9uj7GZCqR4LpfZCyMkQImcZA5LFVtdqoQmbbFM3aVkAuWktGFf7aJaSNgaiXPszE2qdLSQish4IsnHG9iCUtmas2O3adgpvrjHu93lR39b6tCID7FAiKUvnORXe9Yex0JggZAYntQjegZDZD',
            time_filter: 'upcoming',
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
    title: 'React Static with Netlify CMS',
    aboutSite:  await getFacebook("about"),

  }),
  getRoutes: async () => {
    const posts = await getPosts()
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: async () => ({
          events: await getFacebookEvents(),

        })
      },
      {
        path: '/about',
        component: 'src/containers/About',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          about: await getFacebook("about", "location"),
        })
      },
      {
        path: '/projects',
        component: 'src/containers/Projects',
        getData: async () => ({
          //can specify fields from the facebook api response to include
          //can also expand nested fields https://developers.facebook.com/docs/graph-api/advanced/#fieldexpansion
          about: await getFacebook("about", "location"),
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
    </Head>
    <Body>{children}</Body>
  </Html>
),
}
