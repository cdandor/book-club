import React from 'react'
import { Panel, P, Em, Close, CloseWrapper, BG } from './styles'
import Book from '../components/Book'
const DetailPanel = ({ book, closePanel }) => (
  <>
    <BG onClick={closePanel} />
    <Panel>
      <CloseWrapper onClick={closePanel}>
        <Close />
      </CloseWrapper>
      <Book book={book} isLarge={true} />
      {/* <figure>
      <img alt='' src={book.image} />
      <h3>{book.title}</h3>
      <h4>by {book.author}</h4>
    </figure> */}

      <P>{book.description}</P>
      <P>
        <Em>Published in {book.published}</Em>
      </P>
    </Panel>
  </>
)

export default DetailPanel
