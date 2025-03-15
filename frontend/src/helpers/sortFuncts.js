export const sortByNewest = (bookList) => {

  const bookListCopy = bookList.map((book) => book)

  bookListCopy.sort((a, b) => parseInt( b._id.substring(0, 8), 16) * 1000 - parseInt( a._id.substring(0, 8), 16) * 1000)

  return bookListCopy

}