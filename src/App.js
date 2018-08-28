import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'
import NewBook from './NewBook'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
    books: []
  }


  //Get all the books from the BookApi

  componentDidMount(){
    this.updateBookData()
  }

  initializeShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then(response => {
      this.updateBookData()
    });
  };

  updateBookData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            })
    });    
  }

  render() {
    return (
      <div className='app'>
      <Route exact path="/" 
        render={() => <BookList currentBooks={this.state.books} />} 
        />
      <Route
        path="/search"
        render={()=><NewBook initializeShelf={this.initializeShelf} currentBooks={this.state.books} />} 
        /> 
      </div>
    );
    }
};

export default BooksApp