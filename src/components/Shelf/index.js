import React from "react";

import Book from "../Book";

export default function Shelf(props) {
  const { metadata, data, actions } = props;

  return (
    <div className="bookshelf">
      {metadata && metadata.shelfName && (
        <h2 className="bookshelf-title">{metadata.shelfName}</h2>
      )}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  data={book}
                  actions={{ onSelectShelf: actions.onSelectShelf }}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
