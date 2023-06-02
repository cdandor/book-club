import React, { useState, useEffect } from 'react'
import { GlobalStyle } from './styles'
import BooksContainer from './components/BooksComponent'
import Header from './components/Header'
import DetailPanel from './DetailPanel'
const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://book-club-json.herokuapp.com/books'
        )
        const books = await response.json()
        setBooks(books)
      } catch (errors) {
        console.log(errors)
      }
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
  }
  const closePanel = () => {
    setSelectedBook(null)
  }
  console.log(selectedBook)
  return (
    <>
      <GlobalStyle />
      <Header />
      <BooksContainer
        books={books}
        pickBook={pickBook}
        isPanelOpen={selectedBook !== null}
      />
      {selectedBook && (
        <DetailPanel book={selectedBook} closePanel={closePanel} />
      )}
    </>
  )
}

export default App
