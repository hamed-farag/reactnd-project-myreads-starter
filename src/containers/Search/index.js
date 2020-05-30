import React from "react";
import { withRouter } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import update from "immutability-helper";

import groupBy from "../../helpers/groupBy";

import ShelvesList from "../../components/ShelvesList";

import {
  search as searchService,
  update as updateBookService,
} from "../../services/BooksAPI";

class Search extends React.Component {
  state = { isLoading: false, query: "", books: [], error: null };

  handleSearch = (query) => {
    if (query.trim() !== "") {
      this.setState(
        {
          query: query.trim(),
          isLoading: true,
        },
        () => {
          searchService(query.trim()).then((response) => {
            if (response) {
              if (response.error) {
                this.setState({
                  books: [],
                  isLoading: false,
                  error: response.error,
                });
              } else {
                this.setState({
                  books: response,
                  isLoading: false,
                  error: null,
                });
              }
            }
          });
        }
      );
    } else {
      // incase user write less then 3 charachters, it will reset the state
      this.setState({
        books: [],
        isLoading: false,
        error: null,
      });
    }
  };

  groupBooksIntoOneShelf = () => {
    const { books } = this.state;
    const groupBooksIntoOneShelf = groupBy(books, "dummy-property");
    return groupBooksIntoOneShelf;
  };

  handleSelectChange = (selectedBook, shelfName) => {
    const { books } = this.state;
    // update book in state

    const selectedBookIndex = books.findIndex(
      (book) => book.id === selectedBook.id
    );

    const updatedShelf = update(books[selectedBookIndex], {
      shelf: { $set: shelfName },
    });

    const newBooks = update(books, {
      $splice: [[selectedBookIndex, 1, updatedShelf]],
    });

    this.setState({ books: newBooks }, () => {
      // update book in db
      updateBookService(selectedBook, shelfName);
    });
  };

  render() {
    const { history } = this.props;
    const { isLoading, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.push("/")}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={3}
              debounceTimeout={300}
              placeholder="Search by title or author"
              onChange={(e) => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isLoading ? (
            <div className="system-message">Loading...</div>
          ) : (
            <ShelvesList
              data={this.groupBooksIntoOneShelf()}
              actions={{ onChangeShelf: this.handleSelectChange }}
            />
          )}
          {error && !isLoading && (
            <div className="system-message">
              No Books Found, Please try to search with another keyword!
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
