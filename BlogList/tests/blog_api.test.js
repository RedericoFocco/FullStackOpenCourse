const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')

const Blog = require('../models/blogs')
const { log } = require('node:console')

const api = supertest(app)


const initialBlogs = [
  {
    "title": "test3",
    "author": "fero3",
    "url": "https://test.fero.com",
    "likes": 130
  },
  {
    "title": "test24",
    "author": "fero4",
    "url": "https://test.fero.com",
    "likes": 140
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

test('all blogs returned',async()=>{
  const blogsReturned = await api.get('/api/blogs')
  assert.strictEqual(blogsReturned.body.length,initialBlogs.length)
})

test('id not _id',async()=>{
  const blogsReturned = await api.get('/api/blogs')
  const idAsKey = listHelper.keysWithId(blogsReturned.body)
  assert.strictEqual(idAsKey,true)
})

after(async () => {
  await mongoose.connection.close()
})