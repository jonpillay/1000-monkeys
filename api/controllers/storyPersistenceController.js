const StoryBook = require('../database/models/storyBookModel')

const StoryPersistenceController = {
  SaveStory: async (req, res) => {

    const {storyPages, genre} = req.body

    const user_id = req.user._id

    try {

      const story = await StoryBook.saveStory(storyPages, genre)

      res.status(200).json({ error: "Story saved" })
    } catch (error) {

      res.status(400).json({error: error.message })
    }
    // res.json({ mssg: 'user logged in (kinda)' })
  },

  UpdateStory: async (req, res) => {

    const {story_id, storyPages, genre} = req.body

    const storyBook = StoryBook.findById(story_id)

    const user_id = req.user._id

    console.log(storyBook.user_id)

    if (storyBook.user_id != user_id) {
      res.status(400).json({error: "Must be story creator to update" })
    }

    try {

      const story = await StoryBook.saveStory(user_id, storyPages, genre)

      res.status(200).json({ error: "Story saved" })
    } catch (error) {

      res.status(400).json({error: error.message })
    }
    // res.json({ mssg: 'user logged in (kinda)' })
  },




  SignUpUser: async (req, res) => {
    const {email, password} = req.body
    const authEmail = req.user

    console.log(authEmail)

    // if (authEmail != email) {
    //   throw Error("Invalid request")
    //   res.status(400).json({error: "invalid request"})
    // } 

    try {
      const user = await User.signup(email, password)

      const JWT = genLoginJWT(user._id, user.isSuper)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  CreateUser: async (req, res) => {
    console.log("This is the req obj!")
    console.log(req.body)
    const {email, invite_code} = req.body

    try {
      const user = await User.newUser(email, invite_code)

      res.status(200).json({message: "user created"})
    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message})
    }
  },
  Activation: async (req, res) => {
    const {email, invite_code} = req.body

    try {
      const user = await User.activate(email, invite_code)

      // JWT should be a seperate one for activation only
      const JWT = genActivationJWT(user.email, user.invite_code)

      res.status(200).json({ email: email, token: JWT, error:"made it" })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}


module.exports = StoryPersistenceController
