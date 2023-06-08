const sdPromptBank = {
    character: {
        'Spiderman': {
            positivePrompts: ['{{Spiderman in superhero suit}}', 'human body', 'male', 'fine detail', 'red and blue', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        },
        'Rapunzel': {
            positivePrompts: ['{{Rapunzel}}', 'human body', 'female', 'very long blonde hair', 'fine detail', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        'Darth Vader': {
            positivePrompts: ['{{Darth Vader in full suit}}', 'human body', 'male', 'all black', 'fine detail', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        },
        'Wonder Woman': {
            positivePrompts: ['{{Wonder Woman in superhero suit}}', 'human body', 'female', 'black hair', 'fine detail', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        'Hermione Granger': {
            positivePrompts: ['{{Hermione Granger}}', 'human body', 'female', 'Hogwarts', 'wearing Hogwarts uniform', 'fine detail', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'male']
        },
        'Batman': {
            positivePrompts: ['{{Batman in batsuit}}', 'human body', 'male', 'fine detail', 'sharp focus'],
            negativePrompts: ['out of frame', 'disfigured', 'deformed', 'mutated hands', 'disproportioned', 'bad proportions', 'cross-eyed', 'low quality', 'blurry', 'female']
        }
    },

    genre: {
        'Dystopian': {
            positivePrompts: ['{{dystopian}}', 'oppressive', 'society', 'resistance', 'dark', 'sci-fi', 'synthwave neon retro', 'dramatic lighting', 'synthwave neon retro'],
            negativePrompts: ['utopia', 'harmony', 'peace', 'ideal', 'blurry'],
        },
        'Fairytale': {
            positivePrompts: ['{{fairytale}}', 'magic', 'enchanted', 'happily ever after', 'fantasy', 'adventure', 'highly detailed', 'intricate', 'elegant', 'clouds', 'vivid colours'],
            negativePrompts: ['dystopian', 'sci-fi', 'space', 'future', 'sorrow', 'blurry']
        },
        'Western': {
            positivePrompts: ['{{western}}', 'wild west', 'mountains', 'desert', 'sunset lighting', 'horses running in the back', 'warm colours', 'cowboys'],
            negativePrompts: ['fantasy', 'magical', 'grass fields', 'blurry']
        },
        'Cyberpunk': {
            positivePrompts: ['{{cyberpunk}}', 'steampunk', 'colourful neon lights', 'night cityscape', 'purple neon', 'skyscrapers with neon lights', 'highly detailed', 'futuristic'],
            negativePrompts: ['sunny daytime', 'suburbs', 'fantasy', 'magical', 'blurry']
        },
        'Sci-Fi': {
            positivePrompts: ['{{sci-fi}}', 'futuristic', 'space', 'spaceships', 'planets and moons', 'Jim Burns', 'new worlds', 'vivid colours', 'futuristic clothing'],
            negativePrompts: ['fantasy', 'magical', 'western']
        }

    },
    style: {
        'Cartoon': {
            positivePrompts: ['{{cartoon}}', 'funny', 'whimsical', 'colorful', 'lively', 'vivid', 'digital art', 'smooth', 'sharp focus', '4k', 'highly detailed', 'smooth drawn'],
            negativePrompts: ['dark', 'grim', 'sinister', 'serious', 'realistic', 'photorealistic', 'unreal engine']
        },
        'Realistic': {
            positivePrompts: ['{{realistic}}', 'vibrant', 'detailed', 'high-resolution', 'photorealistic', '8k', 'masterpiece', 'highly detailed', 'sharp focus', 'canon m50'],
            negativePrompts: ['cartoonish', 'abstract', 'surreal']
        },
        'Pixar': {
            positivePrompts: ['{{pixar graphics}}', 'disney graphics', 'unreal engine 5', '4k', 'highly detailed', 'high quality', 'surreal'],
            negativePrompts: ['realistic', 'painting', 'dark']
        },
        'Anime': {
            positivePrompts: ['{{anime}}', 'anime drawing', 'anime background', 'Makoto Shinkai', 'beautiful', 'highly detailed', 'high quality'],
            negativePrompts: ['realistic', '3D', 'watercolour', 'low quality:1.4']
        },
        'Painting': {
            positivePrompts: ['{{painting}}', 'handdrawn painting', 'paint brushstrokes', 'Jacques-Laurent Agasse', 'highly detailed', 'high quality'],
            negativePrompts: ['realistic', '3d', 'low quality:1.4', 'unreal engine', 'canon m50']
        },
    },
}

const retrieveAllDropdowns = () => {
    const dropdowns = {};
    for (const category in sdPromptBank) {
      dropdowns[category] = Object.keys(sdPromptBank[category]);
    }
    return dropdowns;
}
    
const matchSelectionCriteria = (userSelection) => {
const positivePrompts = [`((${userSelection["prompt"]}))`]
const negativePrompts = []
for (let key in userSelection) {
    if (sdPromptBank.hasOwnProperty(key)) {
    positivePrompts.push(sdPromptBank[key][userSelection[key]]['positivePrompts'])
    negativePrompts.push(sdPromptBank[key][userSelection[key]]['negativePrompts'])
    }
}
// console.log({positivePrompts: positivePrompts.flat().join(', '), negativePrompts: negativePrompts.flat().join(', ')})
return {positivePrompts: positivePrompts.flat().join(', '), negativePrompts: negativePrompts.flat().join(', ')}
}

module.exports = { 
    matchSelectionCriteria: matchSelectionCriteria,
    retrieveAllDropdowns: retrieveAllDropdowns 
};
