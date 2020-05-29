import React from "react";
import { withRouter } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

import Book from "../../components/Book";

import { search as searchService } from "../../services/BooksAPI";

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

  render() {
    const { history } = this.props;
    const { books, isLoading, error } = this.state;

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
            <div className="system-message">Loading</div>
          ) : (
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book data={book} />
                </li>
              ))}
            </ol>
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
