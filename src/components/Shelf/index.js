import React from "react";

import Book from "../Book";

export default function Shelf(props) {
  const { metadata, data } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{metadata.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data.map((book) => {
            return (
              <li key={book.id}>
                <Book data={book} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
