const { matchSelectionCriteria } = require('../../prompts/prompts');

describe('matchSelectionCriteria', () => {
    const dystopia = {
      positiveKeywords: ['oppressive', 'society', 'resistance', 'dystopian', 'dark', 'funny', 'whimsical', 'colorful', 'lively'],
      negativeKeywords: ['utopia', 'harmony', 'peace', 'ideal', 'happy']
    };
  
    const fairytale = {
      positiveKeywords: ['magic', 'enchanted', 'happily ever after', 'fantasy', 'adventure'],
      negativeKeywords: ['dark', 'grim', 'tragedy', 'horror', 'sorrow']
    };
  
    const cartoon = {
      positiveKeywords: ['funny', 'whimsical', 'colorful', 'lively'],
      negativeKeywords: ['dark', 'grim', 'sinister', 'serious']
    };
  
    const photorealistic = {
      positiveKeywords: ['vibrant', 'detailed', 'realistic', 'high-resolution'],
      negativeKeywords: ['cartoonish', 'abstract', 'surreal']
    };
  
    const selectionCriteriaArray = [dystopia, fairytale, cartoon, photorealistic];
  
    const userSelectionData = { char: 'spiderman', genre: 'dystopia', style: 'cartoon' };
  
    it('returns the expected criteria for genre and style', () => {
      const expectedCriteria = {
        genre: {
          positiveKeywords: [],
          negativeKeywords: []
        },
        style: {
          positiveKeywords: [],
          negativeKeywords: ['dark', 'grim', 'sinister', 'serious']
        }
      };
  
      const result = matchSelectionCriteria(selectionCriteriaArray, userSelectionData);
      console.log(result)
      expect(result).toEqual(expectedCriteria);
    });
});