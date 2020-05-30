import React from "react";
import { withRouter } from "react-router-dom";
import update from "immutability-helper";

import ShelvesList from "../../components/ShelvesList";

import {
  getAll as getAllBooks,
  update as updateBookService,
} from "../../services/BooksAPI";

import groupBy from "../../helpers/groupBy";

class Home extends React.Component {
  state = {
    books: [],
    isLoading: true,
  };

  componentDidMount() {
    getAllBooks().then((books) => {
      this.setState({
        books,
        isLoading: false,
      });
    });
  }

  groupBooksByShelfName = () => {
    const { books } = this.state;
    const groupedBooksByShelfName = groupBy(books, "shelf", "none");
    return groupedBooksByShelfName;
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
    const { books, isLoading } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        {isLoading ? (
          <div className="system-message">Loading...</div>
        ) : (
          books.length > 0 && (
            <div className="list-books-content">
              <ShelvesList
                data={this.groupBooksByShelfName()}
                actions={{ onChangeShelf: this.handleSelectChange }}
              />
            </div>
          )
        )}
        {books.length === 0 && !isLoading && (
          <div className="system-message">
            No Books Found, Please search for a book and try to add it to a
            shelf.
          </div>
        )}
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
