import React, { useState, useEffect } from "react";
import { GlobalStyle } from "./styles";
import BooksContainer from "./components/BooksComponent";
import Header from "./components/Header";
const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://book-club-json.herokuapp.com/books"
        );
        const books = await response.json();
        setBooks(books);
      } catch (errors) {
        console.log(errors);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <BooksContainer books={books} />
    </>
  );
};

export default App;
