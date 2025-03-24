export const useCheckWordFormatting = () => {

  const checkWordFormatting = (inputCheck) => {
      /*
      checkWordFormatting is an algorithm for detecting word inputs that contain punctuation to disguise offensive words.
      To use a non offensive word as an example, 'soap' would be 's*ap'. The issue arising from the sanitiseInput function
      being able to match bad words exactly, but if a word is disguised with punctuation it will pass - but then when passed
      to the LLM will be picked up in its original meaning due to the LLM's ability to be able to contextually understand.

      */

      const inputWords = inputCheck.split(" ")

      // Two regex patterns. One to match all punctuation (to match for punctuation at end of the word)
      // and one to match all punct (minus) hyphens (hyphen seperate words are handles in sanitise input)
      const punctuationRegEx = /[!"£$%^&*()_\-=+/[\]{};:'@#~,<.>?\\|]+/g;
      const punctuationRegExNoHyphen = /[!"£$%^&*/()_\=+[\]{};:'@#~,<.>?\\|]+/g;
  
  
      for (let i = 0; i < inputWords.length; i++) {
  
      let checkWord = ""
  
      // trim any extra whitespace left over from input (double spacebar tap)
      const inputWordTrim = inputWords[i].toLowerCase().trim()
  
      // check to see if the last character in the word is puntuiation and remove if so
      if (inputWordTrim.substring(inputWordTrim.length - 1, inputWordTrim.length).match(punctuationRegExNoHyphen)) {
          checkWord = inputWordTrim.substring(0, inputWordTrim.length - 1)
      } else {
          checkWord = inputWordTrim
      }
      
      const wordLength = checkWord.length
  
      const formattedWord = checkWord.replace(punctuationRegEx, "")
  
      // identify if there is punctuation contained within the word
      if (wordLength != formattedWord.length) {
  
          // identify if the punctuation in the word is allowed (don't, etc...). A single apostrophy or hyphen should be the only puncuation.
          
          // if difference in length between the two is more that one, do not pass (assumed word disguising attempt)
          if (wordLength - formattedWord.length > 1) {
            console.log("numerous punct firing")
              return false
          }

          const wordSplit = checkWord.split('')
          console.log(wordSplit)
          console.log(wordSplit[wordSplit.length-1])
          console.log(wordSplit[wordSplit.length-2])
          // check if the punctuation is an allowed apostrophe in different cases

          // s (that's, Sarah's)
          if (wordSplit[wordSplit.length-2] == "'" && wordSplit[wordSplit.length-1] == "s") {
            console.log("This should fire")
              continue
          }

          // d (I'd, you'd)
          if (wordSplit[wordSplit.length-2] == "'" && wordSplit[wordSplit.length-1] == "d") {
              continue
          }

          // n't on the end (couldn't, shouldn't)
          if (wordSplit[wordSplit.length-2] == "'" && wordSplit[wordSplit.length-3] == "n" && wordSplit[wordSplit.length-1] == "t" && wordSplit[0] != "c" && wordSplit[1] != "u") {
              continue
          }

          // ll on the end (we'll, I'll)
          if (wordSplit[wordSplit.length-3] == "'" && wordSplit[wordSplit.length-2] == "l" && wordSplit[wordSplit.length-1] == "l") {
              continue
          }

          // ve on the end (could've, should've)
          if (wordSplit[wordSplit.length-3] == "'" && wordSplit[wordSplit.length-2] == "v" && wordSplit[wordSplit.length-1] == "e") {
              continue
          }

          // if none of the allowed cases are met, return false
          return false
  
      }
    }
  
    return true
    }

  return {checkWordFormatting}
}