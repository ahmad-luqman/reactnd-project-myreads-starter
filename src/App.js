import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}
                  shelfTitle="Currently Reading"
                  onChangeShelf={this.updateBook}
                />
                <BookShelf
                  books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}
                  shelfTitle="Want to Read"
                  onChangeShelf={this.updateBook}
                />
                <BookShelf
                  books={this.state.books.filter((book) => (book.shelf === "read"))}
                  shelfTitle="Read"
                  onChangeShelf={this.updateBook}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
