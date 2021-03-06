import React from "react";

import Shelf from "../Shelf";

import shelvesEnum from "../../helpers/shelvesEnum";

export default function ShelvesList(props) {
  const { data, actions } = props;

  const renderShelves = () => {
    const shelfArr = [];

    // Due to we group books array by shelf name,
    // We need to loop on the shelves to render three sectons
    for (const shelf in data) {
      if (data.hasOwnProperty(shelf)) {
        const booksList = data[shelf];
        shelfArr.push(
          <Shelf
            key={shelf}
            metadata={{ shelfName: shelvesEnum[shelf] }}
            data={booksList}
            actions={{ onChangeShelf: actions.onChangeShelf }}
          />
        );
      }
    }

    return shelfArr;
  };

  return <div>{renderShelves()}</div>;
}
