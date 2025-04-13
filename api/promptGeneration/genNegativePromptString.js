const negativeGeneralPrompts = "portrait, twins, duplicates, doppelganger"

const genNegativePromptString = (negativePrompts) => {
  if (negativePrompts != "") {

    const finalNegativePromptString = negativeGeneralPrompts.concat(", ").concat(negativePrompts)
    return finalNegativePromptString

  } else {

    return negativeGeneralPrompts
  }
  
}

module.exports = genNegativePromptString