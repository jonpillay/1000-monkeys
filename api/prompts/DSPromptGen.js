const sdPromptBank = {
  genre: {
      dystopia: {
          positivePrompts: ['oppressive', 'society', 'resistance', 'dystopian', 'dark', 'photorealistic dark sci-fi concept art', 'trending on artstation, synthwave neon retro', 'realistic proportions', 'dramatic lighting', 'synthwave neon retro'],
          negativePrompts: ['utopia', 'harmony', 'peace', 'ideal', 'happy'],
      },
      fairytale: {
          positivePrompts: ['magic', 'enchanted', 'happily ever after', 'fantasy', 'adventure', 'highly detailed', 'intricate', 'elegant', 'clouds', 'vivid colours'],
          negativePrompts: ['dark', 'grim', 'tragedy', 'horror', 'sorrow', 'dystopian', 'sci-fi', 'space', 'future']
      },
  },
  style: {
      cartoon: {
          positivePrompts: ['funny', 'whimsical', 'colorful', 'lively', 'cartoon', 'vivid', 'digital art', 'smooth', 'sharp focus', '4k', 'highly detailed', 'smooth drawn'],
          negativePrompts: ['dark', 'grim', 'sinister', 'serious', 'realistic', 'photorealistic', 'unreal engine']
      },
      photorealistic: {
          positivePrompts: ['vibrant', 'detailed', 'realistic', 'high-resolution', 'photorealistic', '8k', 'masterpiece', 'detailed', 'sharp focus', 'highly detailed'],
          negativePrompts: ['cartoonish', 'abstract', 'surreal']
      },
  },
}

  
const DSPromptGen = (userSelection) => {
const prompts = []
let art_style = ""
for (let key in userSelection) {
  if (key == 'art_style') {
    art_style = userSelection[key]
  } else {
    prompts.push(sdPromptBank[key][userSelection[key]]['positivePrompts'])
    let negPrompts = sdPromptBank[key][userSelection[key]]['negativePrompts']
    prompts.push(negPrompts.join(':-1.0, ') + ':-1.0')
  }
}
return {prompts: prompts.flat().join(', '), art_style: art_style}
}

module.exports = DSPromptGen;

// testing script

// console.log(DSPromptGen({genre: 'fairytale', style: 'cartoon', art_style: 'neon-punk'}))

