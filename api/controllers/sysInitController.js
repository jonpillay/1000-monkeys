const {fetchSysInfo} = require("../helpers/fetchSysInfo")

const SysInitController = {

  InitialiseSystem: async (req, res) => {

    try {
      const AiEngineVer = await fetchSysInfo()
      res.status(200).json({ sysInfo: AiEngineVer })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = SysInitController;