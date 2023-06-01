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
    
const matchSelectionCriteria = (userSelection) => {
const positivePrompts = []
const negativePrompts = []
for (let key in userSelection) {
    positivePrompts.push(sdPromptBank[key][userSelection[key]]['positivePrompts'])
    negativePrompts.push(sdPromptBank[key][userSelection[key]]['negativePrompts'])
}
return {positivePrompts: positivePrompts.flat().join(', '), negativePrompts: negativePrompts.flat().join(', ')}
}

module.exports = { matchSelectionCriteria };
