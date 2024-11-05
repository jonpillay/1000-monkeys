import badWordList from "../badWordList"

export const useSanitiseInput = () => {

  const punctuationRegEx = /[!"£$%^&*()_\-=+[\]{};:'@#~,<.>?\\|]+/g;

  const sanitiseInput = (formInput) => {

    const inputList = formInput.split(" ")

    // wordList = formInput.split(" ")
    const wordListTrimmed = inputList.map(word => word.trim().replace(punctuationRegEx, ""))

    const wordListFormatted = wordListTrimmed.filter((word) => !word == "")

    console.log(wordListFormatted)

    console.log(Array.isArray(badWordList))

    wordListFormatted.forEach(word => {

      console.log(word)

      if (badWordList.includes(word)) {

        console.log("Three")
        return false

      }
      return true   
    }
  )
  }

  return {sanitiseInput}

}