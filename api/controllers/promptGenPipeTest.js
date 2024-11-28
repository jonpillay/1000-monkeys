const DCPromptDresser = require('../promptGeneration/DCPromptDresser')
const genPromptTags = require('../promptGeneration/DSPromptTagger')

const prompt = "Vader stands tall in a desert landscape, igniting his crimson lightsaber as ninjas fall around him."

const userChoices = {"character": "Darth Vader", "genre": "Western", "style": "Anime"}

const dressedPrompt = DCPromptDresser(prompt, userChoices)

console.log(dressedPrompt)

const promptTags = genPromptTags(userChoices)

const finalPrompt = dressedPrompt.concat(promptTags['positiveTagString'].concat(" Negative prompt: ").concat(promptTags['negativeTagString']))



console.log(finalPrompt)