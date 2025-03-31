const {cache} = require('../helpers/createCache')

// const promptTagsJSON = require('./promptTags.json')

const genPromptTags = (userSelections) => {

  const promptTagsJSON = cache.get("unifiedCategories")

  const positivePrompts = []
  const negativePrompts = []

  for (selectionField in userSelections) {
    if (promptTagsJSON.hasOwnProperty(selectionField)) {
      if (promptTagsJSON[selectionField].hasOwnProperty(userSelections[selectionField])) {
        positivePrompts.push(promptTagsJSON[selectionField][userSelections[selectionField]]['positivePrompts'])
        negativePrompts.push(promptTagsJSON[selectionField][userSelections[selectionField]]['negativePrompts'])
      }
    }
  }

  const tagsObject = {positiveTagString: positivePrompts.flat().join(', '), negativeTagString: negativePrompts.flat().join(', ')}

  return tagsObject

}

module.exports = genPromptTags