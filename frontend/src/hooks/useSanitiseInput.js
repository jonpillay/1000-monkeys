import badWordList from "../badWordList"

export const useSanitiseInput = () => {

  const punctuationRegEx = /[!"£$%^&*()_\-=+\[\]{};:'@#~,<.>?\\|\/]+/g;

  const SanitiseInput = (formInput) => {

    const inputList = formInput.split(" ")

    // wordList = formInput.split(" ")
    const wordListTrimmed = inputList.map(word => word.trim().replace(punctuationRegEx, ""))

    console.log(wordListTrimmed)
  }

  return {SanitiseInput}

}