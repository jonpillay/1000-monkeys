const {cache} = require('../helpers/createCache')
const {fetchSysInfo} = require('../helpers/fetchSysInfo')

const DCPromptDresser = async (promptDecription, userChoices) => {

  let promptTagsJSON = await cache.get("unifiedCategories")

  if (!promptTagsJSON) {
    console.log("This fired")
    await fetchSysInfo()
    promptTagsJSON = await cache.get("unifiedCategories")
  }
  
  const artStyle = userChoices['style']

  const stylePrompt = promptTagsJSON['style'][artStyle]['starterStylePrompts']

  const dressedPrompt = stylePrompt.concat(' '.concat(promptDecription))

  return dressedPrompt

}

module.exports = DCPromptDresser