import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  updateBook = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  render() {
    const { books, shelfTitle } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(
              (book) =>
              (<li>
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

export default BookShelf