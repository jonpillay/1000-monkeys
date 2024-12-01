const negativeGeneralPrompts = "portrait:1.6, twins:1.6, duplicates:1.6, doppelganger:1.6"

const genNegativePromptString = (negativePrompts) => {
  if (negativePrompts != "") {

    const finalNegativePromptString = negativeGeneralPrompts.concat(", ").concat(negativePrompts)
    return finalNegativePromptString

  } else {

    return negativeGeneralPrompts
  }
  
}

module.exports = genNegativePromptString