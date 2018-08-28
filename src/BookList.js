import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";

class BookList extends React.Component{
    state ={}

    initializeShelf = (bookId, event) => {
        var currentBooks = this.props.currentBooks;
        const curBook = currentBooks.filter(curBook => curBook.id === bookId)[0];
        curBook.shelf = event.target.value;
        BooksAPI.update(curBook, event.target.value).then(response => {
            this.setState({
                books: currentBooks
            })
        })
    }

    render(){
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
            
              <BookShelf
                key="currently"
                books={this.props.currentBooks.filter(curBook => curBook.shelf === "currentlyReading")}
                initializeShelf={this.initializeShelf}
                shelfTitle="Currently Reading"
              />

              <BookShelf
                key="wantToRead"
                books={this.props.currentBooks.filter(curBook => curBook.shelf === "wantToRead")}
                initializeShelf={this.initializeShelf}
                shelfTitle="Want to Read"
              />

              <BookShelf
                key="read"
                books={this.props.currentBooks.filter(curBook => curBook.shelf === "read")}
                initializeShelf={this.initializeShelf}
                shelfTitle="Read"
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add book</Link>
            </div>
          </div>
        );
      }
    }
export default BookList
