import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
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
        <Route exact path="/" render={() => (
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
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={({history}) => (
          <SearchPage
            onChangeShelf={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
