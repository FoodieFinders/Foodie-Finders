import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from 'react-bootstrap';

/* eslint-disable */
const ImageUpload = ({ message, setPicture }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setPicture(imageList[0].data_url);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg']}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          dragProps,
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
};

export default ImageUpload;
