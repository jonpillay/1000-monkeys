export const useSanitiseInput = () => {

  // const punctuationRegEx = /[!"£$%^&*()_\-=+[\]{};:'@#~,<.>?\\|]+/g;

  const sanitiseInput = async (formInput) => {

    // const response = await fetch(`api/checkinput?input=${encodeURIComponent(formInput)}`)

    try {

      const reqBody = {
        input: formInput
      }

      const response = await fetch("/api/checkinput", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      
      const data = await response.json()

      console.log(data)
      if (data.decision == 1) {
        return true
      } else if (data.decision == 0) {
        console.log("HERE")
      } else {
        console.log(data.error)
        return data.error
      }

    } catch (error) {
      console.log(error)
      return error
    }

    // if (response.ok) {
    //   if (response.decision) {
    //     if (response.decision == 1) {
    //       return true
    //     } else if (response.decision == 0) {
    //       return false
    //     } else {
    //       console.log(response.error)
    //       return response.error
    //     }
    //   } else {
    //     console.log(response.error)
    //     return response.error
    //   }
    // } else {
    //   console.log(response.error)
    //   return response.error
    // }

  //   const inputList = formInput.split(" ")

  //   const wordListTrimmed = inputList.map(word => word.trim().replace(punctuationRegEx, ""))

  //   const wordListFormatted = wordListTrimmed.filter((word) => !word == "")

  //   console.log(wordListFormatted)

  //   console.log(wordListFormatted.length)

  //   if (wordListFormatted.length == 1) {
  //     if (badWordList.includes(wordListFormatted[0])) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   }

  //   let strSafe = true

  //   for (let i = 0; i < wordListFormatted.length; i++) {

  //     for (let j = 0; j < badWordList.length; j++) {

  //       let wordSplit = badWordList[j].split(' ')

  //       if (wordSplit.length == 1) {
  //         if (wordListFormatted[i] == badWordList[j]) {
  //           return false
  //         }
  //       }

  //       // If the 'bad word' is two or more words
  //       if (wordSplit.length > 1) {
  //         // check if the first word from input matched with the bad word first word
  //         if (wordSplit[0] == wordListFormatted[i]) {
  //           // check if at the end of user input
  //           if (i+1 <= wordListFormatted.length) {
  //             // check if next words from each list match
  //             if (wordSplit[1] == wordListFormatted[i+1]) {
  //               // check if at end of the bad words and not at end of input
  //               if (wordSplit.length > 2 && wordListFormatted.length > i+2) {
  //                 // check if the next words match
  //                 if (wordSplit[2] == wordListFormatted[i+2]) {
  //                   return false
  //                 }
  //               } else {
  //                 return false
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  // }
  // return true
}

  return {sanitiseInput}

}