const {cache} = require('../helpers/createCache')
const {fetchSysInfo} = require('../helpers/fetchSysInfo')

const requireSysInfo = async (req, res, next) => {

  const AiEngineVer = cache.get('AiEngineVer')

  if (AiEngineVer) {
    next()
  } else {
    try {
      const systemInfo = await fetchSysInfo()
      req.systemInfo = systemInfo
      next()
    } catch (error) {
      console.log(error)
      return res.status(503).json({ error: 'Cannot Load System Info' });
    }
  }
}

module.exports = requireSysInfo;