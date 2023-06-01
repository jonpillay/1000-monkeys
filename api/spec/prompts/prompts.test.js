const { matchSelectionCriteria } = require('../../prompts/prompts');

describe('matchSelectionCriteria', () => {
    const userSelection = { genre: 'dystopia', style: 'cartoon' };
  
    it('returns the expected criteria for genre and style', () => {
      const expectedCriteria = {
        negativePrompts: "utopia, harmony, peace, ideal, happy, dark, grim, sinister, serious, realistic, photorealistic, unreal engine",
        positivePrompts: "oppressive, society, resistance, dystopian, dark, photorealistic dark sci-fi concept art, trending on artstation, synthwave neon retro, realistic proportions, dramatic lighting, synthwave neon retro, funny, whimsical, colorful, lively, cartoon, vivid, digital art, smooth, sharp focus, 4k, highly detailed, smooth drawn"
      };
  
      const result = matchSelectionCriteria(userSelection);
      expect(result).toEqual(expectedCriteria);
    });
});