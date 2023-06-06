import React, { useState, useEffect } from 'react'
import { GlobalStyle } from './styles'
import BooksContainer from './components/BooksComponent'
import Header from './components/Header'
import DetailPanel from './DetailPanel'
import { Transition } from 'react-transition-group'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

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
    setShowPanel(true)
  }
  const closePanel = () => {
    setShowPanel(false)
  }
  const nodeRef = React.useRef(null)
  return (
    <>
      <GlobalStyle />
      <Header />
      <BooksContainer
        books={books}
        pickBook={pickBook}
        isPanelOpen={showPanel}
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
