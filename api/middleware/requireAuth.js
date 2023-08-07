const JWT = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Login Required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const {_id} = JWT.verify(token, process.env.JWT_SIGNATURE)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Cannot authorise request." })
  }
}

module.exports = requireAuth;