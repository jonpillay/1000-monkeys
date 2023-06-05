const sdPromptBank = {
    character: {
        spiderman: {
            positivePrompts: ['{{Spiderman in superhero suit}}', 'human body', 'male', 'fine detail', 'red and blue', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        },
        rapunzel: {
            positivePrompts: ['{{Rapunzel}}', 'human body', 'female', 'very long blonde hair', 'fine detail', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        darth_vader: {
            positivePrompts: ['{{Darth Vader}}', 'human body', 'male', 'all black', 'fine detail', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        },
        wonder_woman: {
            positivePrompts: ['{{Wonder Woman in superhero suit}}', 'human body', 'female', 'black hair', 'fine detail', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        hermione_granger: {
            positivePrompts: ['{{Hermione Granger}}', 'human body', 'female', 'Hogwarts', 'wearing hogwarts uniform', 'fine detail', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        batman: {
            positivePrompts: ['{{Batman in batsuit}}', 'human body', 'male', 'fine detail', 'sharp focus'],
            negativePrompts: ['disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        }
    },
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
        realistic: {
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
