const generateImage = (positivePrompt, negativePrompt) => {
  return fetch("https://stablediffusionapi.com/api/v3/text2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.SD_KEY,
      prompt: positivePrompt,
      negative_prompt: negativePrompt,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      seed: null,
      guidance_scale: 7.5,
      safety_checker: "yes",
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: "embeddings_model_id",
      webhook: null,
      track_id: null,
    }),
    redirect: "follow",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.status === "error") {
        throw new Error(`${result.message}`);
      }
      return result.output[0];
    });
};

module.exports = { generateImage: generateImage };
