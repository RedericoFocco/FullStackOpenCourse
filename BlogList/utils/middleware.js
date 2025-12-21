const jwt = require('jsonwebtoken')

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

const userExtractor = (request, response, next) => {
  // code that extracts the token
    
    const authorization = request.get('authorization')
    //startswith fails as it actually starts with '
    //logger.info("startsWith test:", authorization.startsWith("'Bearer "))
    console.log('authorization.startsWith',authorization.startsWith("Bearer"))
    /*if (authorization && authorization.startsWith("'Bearer")) {
        //logger.info("valid authorization")
        const bearer=authorization.replace("'Bearer ", '')
        
        const decodedToken = jwt.verify(bearer.slice(0,-1),process.env.SECRET)
        
        if(!decodedToken.id)
        {
            console.log("token not valid")
            return response.status(401).json("invalid jwt")
        }
        
        return {"userId":decodedToken.id,"username":decodedToken.username}
    }*/

    if (authorization && authorization.startsWith("Bearer")) {
        //logger.info("valid authorization")
        const bearer=authorization.replace("Bearer ", '')
        console.log('bearer',bearer)
        const decodedToken = jwt.verify(bearer,process.env.SECRET)
        if(!decodedToken.id)
        {
            console.log("token not valid")
            return response.status(401).json("invalid jwt")
        }
        
        return {"userId":decodedToken.id,"username":decodedToken.username}
    }
    console.log('out')
    //logger.info("invalid authorization - no Bearer prefix")
    return response.status(401).json({error:"token missing or invalid"})
    //next()
}

module.exports={tokenExtractor,userExtractor}