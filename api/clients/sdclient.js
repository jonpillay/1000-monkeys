const generateImage = (positivePrompt, negativePrompt) => {
  return fetch("https://stablediffusionapi.com/api/v3/text2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.GPT_KEY,
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
        const error = new Error(`HTTP Error: Status ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then((result) => {
      if (result.status === "error") {
        console.log(result.message)
        const error = new Error(`${result.message}`);
        error.status = 400;
        throw error;
      }
      return result.output[0];
    });
};

module.exports = { generateImage: generateImage };
