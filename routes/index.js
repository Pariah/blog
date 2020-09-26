const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const path = require('path')
const _ = require('lodash')
const lipsum = require(path.join(__dirname, '..', 'lipsum.js'))

const posts = []

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    lipsum: lipsum('index'),
    posts: posts,
  })
})

router.get(['/contact', '/about'], (req, res) => {
  const path = req.originalUrl.replace('/', '')
  res.render(path, {
    lipsum: lipsum(path),
  })
})

router.get('/compose', (req, res) => {
  res.render('compose')
})

router.post('/compose', (req, res) => {
  router.use(bodyParser.urlencoded({ extended: true }))
  const post = {
    /** @namespace req.body.composeTitle */
    title: req.body.composeTitle,
    /** @namespace req.body.composePost */
    post: req.body.composePost,
  }
  posts.push(post)
  res.redirect('/')
})

router.get('/posts/:blogTitle', (req, res) => {
  /** @namespace req.params.blogTitle */
  const blogTitle = _.kebabCase(req.params.blogTitle)
  posts.forEach((post) => {
    if (blogTitle === _.kebabCase(post.title)) {
      res.render('post', {
        title: post.title,
        post: post.post,
      })
    }
  })
})

module.exports = router
