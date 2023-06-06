import React, { useState, useEffect, useRef } from 'react'
import { GlobalStyle } from './styles'
import BooksContainer from './components/BooksComponent'
import Header from './components/Header'
import DetailPanel from './components/DetailPanel'
import Search from './components/Search'
import { Transition } from 'react-transition-group'
import { filter } from 'lodash-es'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://book-club-json.herokuapp.com/books'
        )
        const books = await response.json()
        setBooks(books)
        setFilteredBooks(books)
      } catch (errors) {
        console.log(errors)
      }
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
    setShowPanel(true)
  }
  const closePanel = () => {
    setShowPanel(false)
  }
  const nodeRef = useRef(null)

  const filterBooks = (searchTerm) => {
    const stringSearch = (bookAttribute, searchTerm) =>
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())

    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter(
          (book) =>
            stringSearch(book.title, searchTerm) ||
            stringSearch(book.author, searchTerm)
        )
      )
    }
  }

  const hasFiltered = filteredBooks.length !== books.length

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks} />
      </Header>
      <BooksContainer
        books={filteredBooks}
        pickBook={pickBook}
        isPanelOpen={showPanel}
        title={hasFiltered ? 'Search results' : 'All books'}
      />
      <Transition in={showPanel} timeout={300} nodeRef={nodeRef}>
        {(state) => (
          <DetailPanel
            book={selectedBook}
            closePanel={closePanel}
            state={state}
          />
        )}
      </Transition>
    </>
  )
}

export default App
