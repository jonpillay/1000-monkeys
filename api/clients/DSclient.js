// This is javascript code

const fs = require('fs');
const DSPromptGen = require('../prompts/DSPromptGen')
const imgBBUploader = require('../helpers/imgBBUploader')

const engineId = 'stable-diffusion-xl-beta-v2-2-2';
const apiHost = 'https://api.stability.ai';
const apiKey = process.env.DS_KEY;

const axios = require('axios');
const FormData = require('form-data')
// import FormData from "form-data";

if (!apiKey) throw new Error('Missing Stability API key.');

async function DSGenerateImage(prompts) {

  const requestForm = new FormData();

  const finPrompt = prompts.concat(" (artstation)")

  requestForm.append('prompt', JSON.stringify([{ text: prompts }]));
  requestForm.append('cfg_scale', 3);
  requestForm.append('clip_guidance_preset', "FAST_BLUE");
  requestForm.append('height', 512);
  requestForm.append('width', 800);
  requestForm.append('samples', 1);
  requestForm.append('steps', 25);
  requestForm.append('sampler', 'DPM++ 2M Karras');
  requestForm.append('output_format', 'png');

  const payload = {
    text_prompts: prompts,
    height: 512,
    width: 800,
    samples: 1,
    steps: 50,
  }

  const requestBody = {
    text_prompts: [
      {
        text: prompts
      }
    ],
    output_format: 'web_p',
    cfg_scale: 7,
    clip_guidance_preset: "FAST_BLUE",
    height: 512,
    width: 800,
    samples: 1,
    steps: 30
  };

  try {
    const response = await axios.post(
      `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
      requestForm,
      {
        headers: { 
          Authorization: `Bearer ${apiKey}`, 
          Accept: "application/json",
          ...requestForm.getHeaders()
          },
        },
      );

    const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, response.data.image)

    return remoteImage.data.url

  } catch (error) {
    console.error("Status Code:", error.response.status);
    console.error("Headers:", error.response.headers);
    console.error("Data:", error.response.data);  // Server's error message
    // console.error("Error With SD API ", error)
  }
}

module.exports = DSGenerateImage