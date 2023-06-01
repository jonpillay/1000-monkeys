const okResponse = {
  status: "success",
  generationTime: 1.7244384288787842,
  id: 19295314,
  output: [
    "https://cdn.stablediffusionapi.com/generations/d5ceead1-e7ef-4d7f-913d-84816e4534da-0.png",
  ],
  meta: {
    H: 512,
    W: 512,
    enable_attention_slicing: "true",
    file_prefix: "d5ceead1-e7ef-4d7f-913d-84816e4534da",
    guidance_scale: 7.5,
    model: "runwayml/stable-diffusion-v1-5",
    n_samples: 1,
    negative_prompt:
      "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime (blurry)++ (low quality)++ (low resolution)++",
    outdir: "out",
    prompt:
      "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner))",
    revision: "fp16",
    safetychecker: "yes",
    seed: 810093609,
    steps: 20,
    vae: "stabilityai/sd-vae-ft-mse",
  },
};

const invalidResponse = {
  status: "error",
  message: "Invalid API Request",
  tip: "1. Make sure you are passing Content-Type: application/json in header. 2. Make sure you are doing POST request with valid JSON. 3. Make sure your JSON does not have error, use jsonlint to validate json array",
};

const invalidURLResponse = {
  message: "",
};

module.exports = {
  okResponse: okResponse,
  invalidResponse: invalidResponse,
  invalidURLResponse: invalidURLResponse
}