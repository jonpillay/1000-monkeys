const roundStoryBookVoteAvg = (storyBook) => {
    
  const unroundedVote = storyBook.ratingsAverage[0]

  // check if number is interger or if is already a .5 value (which needs to be escaped otherwise Math.round() will round up)
  if (Number.isInteger(unroundedVote) || Number.isInteger(unroundedVote*2)) {
      return
  }

  const roundedVote = Math.round(unroundedVote*10)/10

  storyBook.ratingsAverage[0] = roundedVote
}

const roundVoteAverageList = (storyBookList) => {

  for (let i = 0; i < storyBookList.length -1; i++) {

    roundStoryBookVoteAvg(storyBookList[i])
  }
}

const sortTopThirteen = (topTen) => {

  topTen.sort(function (rating1, rating2) {

    if (rating1.rating.avg > rating2.rating.avg) return -1;
    if (rating1.rating.avg < rating2.rating.avg) return 1;

    if (rating1.rating.votes > rating2.rating.votes) return -1;
    if (rating1.rating.votes < rating2.rating.votes) return 1;

    // this needs an else in the case that both values checked are equal

  })

  // make sure there are only thirteen elements at most. Using a three element buffer in case the candidate drops out/multiple operations at once
  topTen.splice(13, topTen.length)

  return topTen

}

const checkTopThirteenAdmission = (topThirteen, candStorybook) => {

  const candBookRatingObj = {
    storybookId: candStorybook._id,
    rating: {
      avg: candStorybook.ratingsAverage[0],
      votes: candStorybook.ratingsAverage[1]
    }
  }

  for (let i = 0; i < topThirteen.length -1; i++) {

    if (topThirteen[i].storybookId == candBookRatingObj.storybookId) {

      // if candidate storybook is already in the topThirteen, then check is it's new rating still makes the top thirteen

      topThirteen.splice([i], 1, candBookRatingObj)

      const returnTopThirteen = sortTopThirteen(topThirteen)

      return returnTopThirteen

    }

  }


  // if top ten has less than thirteen entries, insert storybook ratingsAverage, sort and return
  if (topThirteen.length < 13) {

    topThirteen.push(candBookRatingObj)

    const returnTopThirteen = sortTopThirteen(topThirteen)

    return returnTopThirteen

  }

  // if the candidate rating avg is greater than or equal to the lowest top thirteen rating then add into array and resort 
  if (topThirteen.slice(-1)[0].rating.avg >= candBookRatingObj.rating.avg) {
    
    topThirteen.push(candBookRatingObj)

    const returnTopThirteen = sortTopThirteen(topThirteen)

    return returnTopThirteen
  }

  // if the candidate rating does not meet any of the criteria, return false so the controller knows that no further operation need

  return false

}

module.exports = {roundStoryBookVoteAvg, roundVoteAverageList, checkTopThirteenAdmission}