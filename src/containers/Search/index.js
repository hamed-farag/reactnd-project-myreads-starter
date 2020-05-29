import React from "react";
import { withRouter } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

import { search as searchService } from "../../services/BooksAPI";

class Search extends React.Component {
  state = { query: "" };

  handleSearch = (query) => {
    this.setState(
      {
        query: query.trim(),
      },
      () => {
        searchService(query.trim()).then((response) => {
          console.info(response);
        });
      }
    );
  };

  render() {
    const { history } = this.props;
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
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
