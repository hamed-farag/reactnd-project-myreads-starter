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
  };

  componentDidMount() {
    getAllBooks().then((books) => {
      this.setState({
        books,
      });
    });
  }

  groupBooksByShelfName = () => {
    const { books } = this.state;
    const groupedBooksByShelfName = groupBy(books, "shelf");
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

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ShelvesList
            data={this.groupBooksByShelfName()}
            actions={{ onChangeShelf: this.handleSelectChange }}
          />
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
