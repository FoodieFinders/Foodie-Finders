import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { Container, Card, Image, Button } from 'react-bootstrap';
import { useHours } from '../../api/hours/useHours';
import ReactDOM from "react-dom";

function ImageUpload({message}) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload-image-wrapper">
            <Button
              variant="secondary"
              onClick={onImageUpload}
              {...dragProps}
            >
              {message}
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="300" />
                <div className="image-item-btn-wrapper">
                  <Button variant="secondary" onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button variant="secondary" onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}


export default ImageUpload;
