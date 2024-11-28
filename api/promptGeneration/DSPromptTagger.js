const promptTagsJSON = require('./promptTags.json')

// const matchSelectionCriteria = (userSelection) => {
//   const positivePrompts = []
//   const negativePrompts = []
//   for (let key in userSelection) {
//       if (promptTags.hasOwnProperty(key)) {
//           positivePrompts.push(promptTags[key][userSelection[key]]['positivePrompts'])
//           negativePrompts.push(promptTags[key][userSelection[key]]['negativePrompts'])
//       }
//   }
//   return {positivePrompts: positivePrompts.flat().join(', '), negativePrompts: negativePrompts.flat().join(', ')}
// }

const genPromptTags = (userSelections) => {

  const positivePrompts = []
  const negativePrompts = []

  for (selectionField in userSelections) {
    console.log(selectionField)
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

// genPromptTags({'style': 'Anime'})