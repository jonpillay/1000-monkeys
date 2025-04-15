const {cache} = require('./createCache')
const s3 = require('../clients/AWSS3client')

const fetchSysInfo = async () => {

  const cachedAiVer = cache.get("AiEngineVer") || null

  try {

    if (cachedAiVer) {

      const unifiedCategories = cache.get("unifiedCategories")

      const AiEngineVer = cachedAiVer 
      const characters = Object.keys(unifiedCategories.character).sort()
      const genres = Object.keys(unifiedCategories.genre).sort()
      const artStyles = Object.keys(unifiedCategories.style).sort()

      return {AiEngineVer, characters, genres, artStyles, releaseLog}
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: process.env.SYS_ASSETS_FILE_KEY

    }

    const sysInfoBuffer = await s3.getObject(params).promise()

    const SysInfoStr = sysInfoBuffer.Body.toString()

    const sysInfoJSON = JSON.parse(SysInfoStr)

    const AiEngineVer = sysInfoJSON.AiEngineVer

    const badWordsList = sysInfoJSON.badWordsList

    const unifiedCategories = sysInfoJSON.unifiedCategories

    const releaseLog = sysInfoJSON.ReleaseLog

    try {
      cache.set("AiEngineVer", AiEngineVer)
      cache.set("badWordList", badWordsList)
      cache.set("unifiedCategories", unifiedCategories)

      const characters = Object.keys(unifiedCategories.character).sort()
      const genres = Object.keys(unifiedCategories.genre).sort()
      const artStyles = Object.keys(unifiedCategories.style).sort()

      return {AiEngineVer, characters, genres, artStyles, releaseLog}

    } catch (error) {
      console.log(error)
      console.log("Unable to cache data")
      throw new Error("Sys Info Not Loading")
    }


  } catch (error) {
    console.log(error)
    console.log("Could not fetch system info")
    throw new Error("Sys Info Not Loading")
  }
}

module.exports = {fetchSysInfo}