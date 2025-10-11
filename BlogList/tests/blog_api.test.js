const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')

const Blog = require('../models/blogs')
const { log } = require('node:console')
const { first } = require('lodash')

const api = supertest(app)


const initialBlogs = [
  {
    "title": "test3",
    "author": "fero3",
    "url": "https://test.fero.com"
  },
  {
    "title": "test24",
    "author": "fero4",
    "url": "https://test.fero.com"
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id not _id',async()=>{
  const blogsReturned = await api.get('/api/blogs')
  const idAsKey = listHelper.keysWithId(blogsReturned.body,'id')
  assert.strictEqual(idAsKey,true)
})

test('no like are 0 likes',async()=>{
  const blogsReturned = await api.get('/api/blogs')
  const zeroLikes = listHelper.keysWithId(blogsReturned.body,'likes') //not so strong as just one can have likes element to pass? 
  assert.strictEqual(zeroLikes,true)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "fe",
    url: "https://test.fero.com",
    likes: "3",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  assert(contents.includes('async/await simplifies making async calls'))
  assert.strictEqual(response.body.length,initialBlogs.length+1) //doimg in other test not sure they executed in order, right? 
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    author: "fe",
    url: "https://test.fero.com",
    likes: "3",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a valid blog can be put ', async () => {
  const blogGood = (await api.get("/api/blogs")).body
  const goodId = blogGood[0].id
  const newLikes = {
    likes: "3"
  } 
  await api
    .put(`/api/blogs/${goodId}`)
    .send(newLikes)
    .expect(200)
})

test('a valid blog can be deleted ', async () => {
  const blogGood = (await api.get("/api/blogs")).body
  const goodId = blogGood[0].id
  await api
    .delete(`/api/blogs/${goodId}`)
    .expect(200)
})

after(async () => {
  await mongoose.connection.close()
})