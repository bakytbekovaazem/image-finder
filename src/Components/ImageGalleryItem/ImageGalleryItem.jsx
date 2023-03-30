import React from "react";

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  modalToggler,
}) => {
  return (
    <>
      <li
      key={id}
        className="ImageGalleryItem"
        onClick={() => modalToggler(largeImageURL)}
      >
        <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
      </li>
    </>
  );
};

export default ImageGalleryItem;
