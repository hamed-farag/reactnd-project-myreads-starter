import React from "react";
import PropTypes from "prop-types";

import BookShelfChanger from "../BookShelfChanger";

function Book(props) {
  const { data, actions } = props;
  const { title, authors, imageLinks } = data;

  const defaultBookImage = "/assets/images/default-book.jpg";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${
              imageLinks && imageLinks.smallThumbnail
                ? imageLinks.smallThumbnail
                : defaultBookImage
            })`,
          }}
        />
        <BookShelfChanger
          data={data}
          actions={{ onChangeShelf: actions.onChangeShelf }}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.map((author) => `${author},`)}
      </div>
    </div>
  );
}

Book.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
  }),
};

export default Book;
