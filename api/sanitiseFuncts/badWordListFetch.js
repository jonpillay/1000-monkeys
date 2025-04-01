const s3 = require('../clients/AWSS3client')

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

module.exports = fetchBadWordsList;