const { totalmem } = require("os")
const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogsLikes) => 
{
    const reducer = (sum, item) => {
    //console.log('[list helper] item',item)
    return sum + item.likes
  }

  return blogsLikes.length === 0
    ? 0
    : blogsLikes.reduce(reducer, 0) 
}

const mostLikes = (blogsLikes) => 
{
  return blogsLikes.length === 0
    ? []
    : blogsLikes.reduce((max,curr)=>max.likes>curr.likes?max:curr)
}

const mostBlogsPerAuthor = (blogsLikes) => 
{
  return blogsLikes.length === 0
    ? []
    :  _(blogsLikes)
    .groupBy(x=>x.author)
    .map((value,key)=>({author:key,totalBlogs:value.length}))
    .value()
    .reduce((max,curr)=>max.totalBlogs>curr.totalBlogs?max:curr)
}

const authorMostLikes = (blogsLikes) => 
{
  return blogsLikes.length === 0
    ? []
    :  _(blogsLikes)
    .groupBy(x=>x.author)
    .map((value,key)=>({author:key,mostLikes:value.reduce((max,curr)=>max.likes>curr.likes?max:curr).likes}))
    .value()
    .reduce((max,curr)=>max.mostLikes>curr.mostLikes?max:curr)
}

const keysWithId = (blogs) => 
{
  return blogs.some(obj=>'id' in obj) 
}

module.exports = {totalLikes,mostLikes,mostBlogsPerAuthor,authorMostLikes,keysWithId}