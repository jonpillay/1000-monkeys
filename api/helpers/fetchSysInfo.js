// const cache = require('./createCache')
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config()

// import NodeCache from 'node-cache';

const NodeCache = require('node-cache')

console.log(process.env.AWS_FILE_KEY)

const cache = new NodeCache({ stdTTL: 3600 });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3

const fetchSysInfo = async () => {

  try {
    const cachedAiVer = cache.get('AiEngineVer')

    if (cachedAiVer) {
      console.log("SYSINFO already loaded")
      return "SYSINFOLOADED"
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: process.env.SYS_ASSETS_FILE_KEY

    }

    const sysInfoBuffer = await s3.getObject(params).promise()

    const SysInfoStr = sysInfoBuffer.Body.toString()

    const sysInfoJSON = JSON.parse(SysInfoStr)

    // console.log(sysInfoJSON.badWordsList)

    const AiEngineVer = sysInfoJSON.AiEngineVer

    const badWordsList = sysInfoJSON.badWordsList

    const unifiedCategories = sysInfoJSON.unifiedCategories

    try {
      cache.set('AiEngineVer', AiEngineVer)
      cache.set('badWordList', badWordsList)
      cache.set('unifiedCategories', unifiedCategories)

      const characters = Object.keys(unifiedCategories.character).sort()
      const genres = Object.keys(unifiedCategories.genre).sort()
      const artStyles = Object.keys(unifiedCategories.style).sort()

      return {AiEngineVer, characters, genres, artStyles}

      // const cachedCats = cache.get('unifiedCategories')
    } catch (error) {
      console.log(error)
      console.log("Unable to cache data")
    }


  } catch (error) {
    console.log(error)
    console.log("Could not fetch system info")
    // res.status(500).json({ error: 'Could not fetch system info'})

  }
}

module.exports = {fetchSysInfo}