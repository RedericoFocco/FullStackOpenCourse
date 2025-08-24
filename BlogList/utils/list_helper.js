const { totalmem } = require("os")

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
    : blogsLikes.reduce((max,curr)=>max.a>curr.a?max:curr)
}

module.exports = {totalLikes,mostLikes}