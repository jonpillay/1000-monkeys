const { matchSelectionCriteria } = require('../../prompts/prompts');

describe('matchSelectionCriteria', () => {
  it('displays Darth Vader under specific criteria', () => {
    const userSelection = {prompt: "goes to the bank", character:'Darth Vader', genre: 'Dystopian', style: 'Cartoon' };
    const expectedCriteria = {
      positivePrompts: "goes to the bank, {{Darth Vader}}, human body, male, all black, fine detail, sharp focus, {{dystopian}}, oppressive, society, resistance, dark, sci-fi, synthwave neon retro, dramatic lighting, synthwave neon retro, {{cartoon}}, funny, whimsical, colorful, lively, vivid, digital art, smooth, sharp focus, 4k, highly detailed, smooth drawn",
      negativePrompts: "disfigured, deformed, mutated hands, disproportioned, bad proportions, cross-eyed, low quality, blurry, female, utopia, harmony, peace, ideal, blurry, dark, grim, sinister, serious, realistic, photorealistic, unreal engine"
    };

    const result = matchSelectionCriteria(userSelection);
    expect(result).toEqual(expectedCriteria);
  });

  
  it('displays Hermione Granger under specific criteria', () => {
    const userSelection = {prompt: "goes to the bank", character:'Hermione Granger', genre: 'Cyberpunk', style: 'Anime' };
    const expectedCriteria = {
      positivePrompts: "goes to the bank, {{Hermione Granger}}, human body, female, Hogwarts, wearing Hogwarts uniform, fine detail, sharp focus, {{cyberpunk}}, steampunk, colourful neon lights, night cityscape, purple neon, skyscrapers with neon lights, highly detailed, futuristic, {{anime}}, anime drawing, anime background, Makoto Shinkai, beautiful, highly detailed, high quality",
      negativePrompts: "disfigured, deformed, mutated hands, disproportioned, bad proportions, cross-eyed, low quality, blurry, male, sunny daytime, suburbs, fantasy, magical, blurry, realistic, 3D, watercolour, low quality:1.4"
    };

    const result = matchSelectionCriteria(userSelection);
    expect(result).toEqual(expectedCriteria);
  });
});
