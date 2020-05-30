import React from "react";

import DropDown from "../Dropdown";

import { get as getBookById } from "../../services/BooksAPI";

import shelvesEnum from "../../helpers/shelvesEnum";

class BookShelfChanger extends React.Component {
  state = {
    isLoading: false,
  };

  handleOnClick = (book) => {
    const { actions } = this.props;
    if (!book.shelf) {
      this.setState({ isLoading: true }, () => {
        // if book.shelf not available, call api to get bookById
        // then set the shelf name
        getBookById(book.id).then((data) => {
          actions.onChangeShelf(data, data.shelf);
          this.setState({
            isLoading: false,
          });
        });
      });
    }
  };

  renderShelves() {
    const shelvesArr = [
      {
        label: "Move To ...",
        disabled: true,
      },
    ];

    for (const shelf in shelvesEnum) {
      if (shelvesEnum.hasOwnProperty(shelf)) {
        const shelfValue = shelvesEnum[shelf];
        shelvesArr.push({
          label: shelfValue,
          value: shelf,
        });
      }
    }

    return shelvesArr;
  }

  render() {
    const { data, actions } = this.props;
    const { isLoading } = this.state;

    return (
      <DropDown
        items={this.renderShelves()}
        selectedValue={data.shelf}
        loading={isLoading}
        onClick={() => this.handleOnClick(data)}
        onChange={(value) => {
          actions.onChangeShelf(data, value);
        }}
      />
    );
  }
}

export default BookShelfChanger;
