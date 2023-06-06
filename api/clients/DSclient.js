const fs = require('fs');
const DSPromptGen = require('../prompts/DSPromptGen')
const imgBBUploader = require('../helpers/imgBBUploader')

const engineId = 'stable-diffusion-v1-5';
const apiHost = 'https://api.stability.ai';
const apiKey = process.env.DS_KEY;

if (!apiKey) throw new Error('Missing Stability API key.');

const context_prompts = 'Matilda walking through the quaint streets of the village. A magnificent apothecary filled with sparkling potions and magical herbs. The wizard running the shop chatting with Matilda. Matilda selecting the perfect ingredients for her soup. The enchanting world surrounding Matilda.'

async function generateImage(prompts, style) {
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
      style_preset: style,
    }),
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  responseJSON.artifacts.forEach(async (image, index) => {
    console.log("upload started")
    const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, image.base64)
    fs.writeFileSync(
      `./out/v1_txt2img_${Date.now()}.png`,
      Buffer.from(image.base64, 'base64')
    );
    console.log(remoteImage.data.display_url)
    return remoteImage.data.display_url
  });
}

prompts = DSPromptGen({genre: 'fairytale', art_style: 'neon-punk'})

const context = "Matilda and her children walking through the misty, cobblestone streets. Matilda wearing a cloak and carrying a wand. The gates of Hogwarts in the background. The magical world feeling alive and full of possibilities."

// testing script

// console.log(context + prompts.prompts);


generateImage(context + prompts.prompts, prompts.art_style);