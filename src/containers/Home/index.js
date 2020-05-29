import React from "react";
import { withRouter } from "react-router-dom";

import ShelvesList from "../../components/ShelvesList";

import { getAll as getAllBooks } from "../../services/BooksAPI";

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

  render() {
    const { history } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ShelvesList data={this.groupBooksByShelfName()} />
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
