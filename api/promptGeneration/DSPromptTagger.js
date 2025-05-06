const {cache} = require('../helpers/createCache')
const {fetchSysInfo} = require('../helpers/fetchSysInfo')

const genPromptTags = async (userSelections) => {

  let promptTagsJSON = await cache.get("unifiedCategories")

  if (!promptTagsJSON) {
    await fetchSysInfo()
    promptTagsJSON = await cache.get("unifiedCategories")
  }

  const positivePrompts = []
  const negativePrompts = []

  for (const [field, selection] of Object.entries(userSelections)) {

    let positiveTags
    let negativeTags
    
    if (promptTagsJSON.hasOwnProperty(field) && promptTagsJSON[field].hasOwnProperty(selection)) {

      positiveTags = promptTagsJSON[field][selection].positivePrompts || []
      negativeTags = promptTagsJSON[field][selection].negativePrompts || []

    }

    positivePrompts.push(...positiveTags)
    negativePrompts.push(...negativeTags)
  }

  const tagsObject = {positiveTagString: positivePrompts.flat().join(', '), negativeTagString: negativePrompts.flat().join(', ')}

  return tagsObject

}

module.exports = genPromptTags