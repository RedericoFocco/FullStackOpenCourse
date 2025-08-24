const { totalmem } = require("os")

const dummy = (blogs) => {
  return 1
}

const totaLikes = (blogsLikes) => 
{
    const reducer = (sum, item) => {
    console.log('[list helper] item',item)
    return sum + item.likes
  }

  return blogsLikes.length === 0
    ? 0
    : blogsLikes.reduce(reducer, 0) 
}

module.exports = {
  totaLikes
}