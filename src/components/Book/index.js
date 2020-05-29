import React from "react";
import PropTypes from "prop-types";

function Book(props) {
  const { data, actions } = props;
  const { title, authors, imageLinks, shelf } = data;

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
        <div className="book-shelf-changer">
          {/* HERE WE WILL CALL API GETBOOKBYID TO GET ITS SHELF */}
          <select
            onChange={(e) => actions.onSelectShelf(data, e.target.value)}
            value={shelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
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
