const {fetchSysInfo} = require("../helpers/fetchSysInfo")

const SysInitController = {

  InitialiseSystem: async (req, res) => {

    try {
      const sysInfo = await fetchSysInfo()
      res.status(200).json({ sysInfo: sysInfo })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = SysInitController;