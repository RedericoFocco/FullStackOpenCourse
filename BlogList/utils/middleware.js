
const tokenExtractor = (request, response, next) => {
  // code that extracts the token
    const authorization = request.get('authorization')
    //startswith fails as it actually starts with '
    //logger.info("startsWith test:", authorization.startsWith("'Bearer "))
    if (authorization && authorization.startsWith("'Bearer")) {
        //logger.info("valid authorization")
        return authorization.replace("'Bearer ", '')
    }
    //logger.info("invalid authorization - no Bearer prefix")
    return response.status(401).json({error:"token missing or invalid"})
    //next()
}

module.exports={tokenExtractor}