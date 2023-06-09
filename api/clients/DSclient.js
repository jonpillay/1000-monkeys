const fs = require('fs');
const DSPromptGen = require('../prompts/DSPromptGen')
const imgBBUploader = require('../helpers/imgBBUploader')

const engineId = 'stable-diffusion-xl-beta-v2-2-2';
const apiHost = 'https://api.stability.ai';
const apiKey = process.env.DS_KEY;

if (!apiKey) throw new Error('Missing Stability API key.');

// const context_prompts = 'Matilda walking through the quaint streets of the village. A magnificent apothecary filled with sparkling potions and magical herbs. The wizard running the shop chatting with Matilda. Matilda selecting the perfect ingredients for her soup. The enchanting world surrounding Matilda.'

async function DSGenerateImage(prompts) {
  // console.log(prompts)
  const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
      
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompts,
        },
      ],
      cfg_scale: 7,
      clip_guidance_preset: 'FAST_BLUE',
      height: 512,
      width: 512,
      samples: 1,
      steps: 50,
      style_preset: 'enhance',
    }),
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  const imagePromises = responseJSON.artifacts.map(async (image, index) => {
    const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, image.base64);
    console.log(remoteImage.data.display_url);
    return remoteImage.data.display_url;
  });
  
  const imageUrls = await Promise.all(imagePromises);
  console.log(imageUrls);
  return imageUrls;
  
}

module.exports = DSGenerateImage

userinput = {
  character: 'Spiderman',
  genre: 'Western',
  style: 'Anime',
  prompt: 'Spiderman looking bored with a todo list, make sure you show the list of tasks, I want a human body form, no extra limbs, do not draw extra fingers',
  messageHistory: [],
  imageHistory: []
}

// const context = "Matilda and her children walking through the misty, cobblestone streets. Matilda wearing a cloak and carrying a wand. The gates of Hogwarts in the background. The magical world feeling alive and full of possibilities."

// // testing script

// console.log(DSPromptGen(userinput))

const prompts = DSPromptGen(userinput)

console.log(DSGenerateImage(prompts.prompts, prompts.art_style))