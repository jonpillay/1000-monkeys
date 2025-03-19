const roundStoryBookVoteAvg = (storyBook) => {
    
    const unroundedVote = storyBook.ratingsAverage[0]

    // check if number is interger or if is already a .5 value (which needs to be escaped otherwise Math.round() will round up)
    if (Number.isInteger(unroundedVote) || Number.isInteger(unroundedVote*2)) {
        return
    }

    const roundedVote = Math.round((unroundedVote*2)/2)

    storyBook.ratingsAverage[0] = roundedVote
}

const roundVoteAverageList = (storyBookList) => {

    for (let i = 0; i < storyBookList.length -1; i++) {

        roundStoryBookVoteAvg(storyBookList[i])
    }
}

module.exports = {roundStoryBookVoteAvg, roundVoteAverageList}