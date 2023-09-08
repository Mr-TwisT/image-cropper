'use client';

import { createContext, useRef, useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import Upload from '@components/Upload';

export const DataContext = createContext();

const EditImage = () => {
  const cropperRef = useRef(null);

  const [isCropped, setIsCropped] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState('/assets/images/placeholder-image.jpg');

  const onChange = () => {
    setIsCropped(false);
    setCroppedImage(null);
  };

  const onCrop = () => {
    const coordinates = cropperRef.current?.getCoordinates();
    const canvas = cropperRef.current?.getCanvas();
    // const canvas = cropperRef.current?.getCanvas()?.toDataURL();   BASE64

    if (coordinates && canvas) {
      setIsCropped(true);
      setCroppedImage(canvas);
    }
  };

  const onSend = () => {
    if (croppedImage) {
      const form = new FormData();
      croppedImage.toBlob((blob) => {
        if (blob) {
          form.append('file', blob);
          console.log(blob);
        }
      }, 'image/jpeg');
    }
  };

  return (
    <DataContext.Provider
      value={{
        image,
        setImage,
      }}
    >
      <section className="w-full flex-center flex-col pb-14">
        <h2 className="head_text text-center blue_gradient pb-10">
          Edit Image Below
        </h2>

        <div className="h-screen flex flex-col gap-3 items-center mt-5">
          <Upload />
          <Cropper
            src={image}
            ref={cropperRef}
            onChange={onChange}
            className="cropper"
            backgroundClassName="cropperImage"
            stencilProps={{
              grid: true,
            }}
          />
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="black_btn"
              onClick={() => onCrop()}
            >
              <p className="text-base px-3 py-1">Crop Image</p>
            </button>
            {isCropped && (
              <button
                type="button"
                className="black_btn"
                onClick={() => onSend()}
              >
                <p className="text-base px-3 py-1">Send to Server</p>
              </button>
            )}
          </div>
        </div>
      </section>
    </DataContext.Provider>
  );
};

export default EditImage;
