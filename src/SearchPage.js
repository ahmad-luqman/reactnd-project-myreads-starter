import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

class SearchPage extends React.Component {
  state = {
    books: [],
    query: ''
  }

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  updateBook = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  handleChange = (event) => {
    var query = event.target.value
    this.setState(() => {
      return {query: query}
    })
    this.searchBooks(query)
  }

  searchBooks(query) {
    BooksAPI.search(query)
      .then((books) => {
        if (books && books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = books.filter((book) => (book.authors))
          books.map((book)=>(book.shelf="none"))
          this.setState(() => ({
            books
          }))
        }
      })
  }

  render() {
    return(
        <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search" >Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && this.state.books.map(
              (book) =>
              (<li key={book.id}>
                <BookItem
                  book={book}
                  onUpdateBookShelf={(shelf) => {
                      this.updateBook(book, shelf)
                    }
                  }
                />
              </li>)
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage