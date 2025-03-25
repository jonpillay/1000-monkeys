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
    const cachedAiVer = cache.get('AiVer')

    if (cachedAiVer) {
      return "SYSINFOLOADED"
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: process.env.AWS_FILE_KEY

    }

    const sysInfoBuffer = await s3.getObject(params).promise()

    const SysInfoStr = sysInfoBuffer.Body.toString()

    const sysInfoJSON = JSON.parse(SysInfoStr)

    const AiEngineVer = sysInfoJSON.AiEngineVer

    const badWordList = sysInfoJSON.badWordsList

    const unifiedCategories = sysInfoJSON.unifiedCategories

    try {
      cache.set('AiEngineVer', AiEngineVer)
      cache.set('badWordList', badWordList)
      cache.set('unifiedCategories', unifiedCategories)

      console.log(AiEngineVer)

      // const cachedCats = cache.get('unifiedCategories')

      console.log(cachedCats)
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

fetchSysInfo()