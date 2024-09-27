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

  console.log(prompts)

  // const foramtttedPrompt = {
  //   "text": prompts,
  // }

  const requestForm = new FormData();

  requestForm.append('prompt', JSON.stringify([{ text: prompts }]));  // Wrap prompt in array as the API expects
  requestForm.append('cfg_scale', 7);
  requestForm.append('clip_guidance_preset', "FAST_BLUE");
  requestForm.append('height', 512);
  requestForm.append('width', 800);
  requestForm.append('samples', 1);
  requestForm.append('steps', 50);
  requestForm.append('sampler', 'k_lms');
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
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
      requestForm,
      {
        headers: { 
          Authorization: `Bearer ${apiKey}`, 
          Accept: "application/json",
          ...requestForm.getHeaders()
          },
        },
      );

    console.log(response.data)

    const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, response.data.image)

    console.log(remoteImage)

  } catch (error) {
    console.error("Status Code:", error.response.status);
    console.error("Headers:", error.response.headers);
    console.error("Data:", error.response.data);  // Server's error message
    // console.error("Error With SD API ", error)
  }
}

  // const response = await axios.post(
  //   `https://api.stability.ai/v2beta/stable-image/generate/core`,
  //   requestForm,
  //   {
  //     headers: { 
  //       Authorization: `Bearer ${apiKey}`, 
  //       Accept: "application/json" 
  //       },
  //     },
  //   );

  // if(response.status === 200) {
  //   console.log("BE HERE THOUGH")
  //   // const responseJSON = await response.json();
  //   // const imagePromises = responseJSON.artifacts.map(async (image, index) => {
  //   const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, image.base64);
  
  //   return remoteImage.data.display_url;
    
  //   // const imageUrls = await Promise.all(imagePromises);
  
  //   // return imageUrls[0];
  // } else {
  //   console.log("this is where it eneded is DSClient")
  //   console.log(await response.text())
  //   throw new Error(`Non-200 response: ${await response.text()}`);
  // }



  // if (!response.ok) {
  //   console.log("this is where it eneded is DSClient")
  //   console.log(await response.text())
  //   throw new Error(`Non-200 response: ${await response.text()}`);

  // }

  // const responseJSON = await response.json();
  // const imagePromises = responseJSON.artifacts.map(async (image, index) => {
  // const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, image.base64);

  // return remoteImage.data.display_url;
  // });
  
  // const imageUrls = await Promise.all(imagePromises);

  // return imageUrls[0];
  
// }

module.exports = DSGenerateImage