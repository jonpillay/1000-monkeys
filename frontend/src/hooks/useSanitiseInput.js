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

      if (data.decision == 1) {
        return true
      } else if (data.decision == 0) {
        return false
      } else {
        console.log(data.error)
        return data.error
      }

    } catch (error) {
      console.log(error)
      return error
    }
  }

  return {sanitiseInput}

}