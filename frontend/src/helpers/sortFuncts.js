export const sortByNewest = (bookList) => {

  const bookListCopy = JSON.parse(JSON.stringify(bookList))

  bookListCopy.sort((a, b) => parseInt( b._id.substring(0, 8), 16) * 1000 - parseInt( a._id.substring(0, 8), 16) * 1000)

  return bookListCopy

}

export const sortByRating = (bookList) => {

  const bookListCopy = JSON.parse(JSON.stringify(bookList))

  bookListCopy.sort((a, b) => b.ratingsAverage[0] - a.ratingsAverage[0])

  return bookListCopy

}

export const sortByNewToYou = (bookList, booksRead, userID) => {

  const bookListCopy = JSON.parse(JSON.stringify(bookList))

  // bookListCopy.sort((a, b) => {
  //   if (booksRead.includes(a.id) - booksRead.includes(b.id)) {
  //     return -1;
  //   } else if (booksRead.includes(a.id) - booksRead.includes(b.id)) {
  //     return 1;
  //   } else {
  //     return parseInt( b._id.substring(0, 8), 16) * 1000 - parseInt( a._id.substring(0, 8), 16) * 1000
  //   }
  // })

  bookListCopy.sort((a,b) => booksRead.includes(a._id) - booksRead.includes(b._id))

  bookListCopy.filter((book) => book.authorID != userID)

  return bookListCopy

}

export const reverseBookListOrder = (bookList) => {

  const bookListCopy = JSON.parse(JSON.stringify(bookList))

  const reversedBookList = bookListCopy.reverse()

  return reversedBookList

}