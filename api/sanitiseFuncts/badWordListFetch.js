const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config();

console.log(process.env.AWS_ACCESS_KEY_ID)

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3

const fetchBadWordsList = async () => {

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: process.env.AWS_FILE_KEY
  }

  try {

    const badWordListBuffer = await s3.getObject(params).promise()

    const badWordListStr = badWordListBuffer.Body.toString()

    const badWordListJSON = JSON.parse(badWordListStr)

    const badWordList = badWordListJSON.badWordsList

    const punctuationRegEx = /[!"£$%^&*()_\-=+[\]{};:'@#~,<.>?\\|]+/g;

    return badWordList

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unable to Fetch Sanitise Asset'})
  }

}

fetchBadWordsList()

// module.exports = fetchBadWordsList;