import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class NewBook extends React.Component {

    constructor() {
        super();
            this.state = {
            query: '',
            books:[]
        }
    }

    bookStatus = (books) => {
        const bookStat = books.map(book =>{
            book.shelf = 'empty';
            this.props.currentBooks.forEach(secondBook =>{
                if(book.id === secondBook.id){
                    book.shelf = secondBook.shelf;
                }
            })
            return book
        })
        this.setState({
            books: bookStat
        })
    }

    queryUpdate = (query) =>{
        this.setState({query:query})
        if (query){
            BooksAPI.search(query, 25).then((books) => {
                books.length > 0 ? this.bookStatus(books):this.setState({books:[]})
            }).catch((e)=>{
                console.error('ERROR:' + {e})
            })
        }else this.setState({books:[]})
    }

    booksUpdate = (book, shelf) => { 
        var currentBook = this.state.books;
        const upBook = currentBook.filter (secondBook => secondBook.id === book.id)[0];
        upBook.shelf = shelf;
        this.setState({
            books: currentBook
        })
        this.props.initializeShelf(book, shelf);
    }
 
    render(){

        return(
<div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.queryUpdate(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.booksUpdate(book, e.target.value);
                      }}
                    >
                      <option disabled>
                        Add to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">Remove</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>   
        )
    }
}

export default NewBook;