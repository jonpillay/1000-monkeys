const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config();

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

    const badWordList = await s3.getObject(params).promise()

    // console.log(JSON.parse(list.Body.toString()).badWordsList[0])

    const punctuationRegEx = /[!"£$%^&*()_\-=+[\]{};:'@#~,<.>?\\|]+/g;
  
    const badWordListTrimmed = badWordList.map(word => word.split(' ').trim().replace(punctuationRegEx, ""))
  
    const badWordListFormatted = badWordListTrimmed.filter((word) => word !== "")

    return badWordListFormatted

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unable to Fetch Sanitise Asset'})
  }

}

module.exports = fetchBadWordsList;