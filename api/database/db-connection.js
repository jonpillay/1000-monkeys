const mongoose = require('mongoose')

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Mongo")
  } catch (error) {
    console.log(error)
}
}

module.exports = connectToMongo;