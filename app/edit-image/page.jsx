'use client';

import { createContext, useRef, useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import Upload from '@components/Upload';

export const DataContext = createContext();

const EditImage = () => {
  const cropperRef = useRef(null);

  const [isCropped, setIsCropped] = useState(false);
  const [croppedImage1, setCroppedImage1] = useState(null);
  const [croppedImage2, setCroppedImage2] = useState(null);
  const [image, setImage] = useState('/assets/images/placeholder-image.jpg');

  const onChange = () => {
    setIsCropped(false);
    setCroppedImage1(null);
    setCroppedImage2(null);
  };

  const onCrop = () => {
    const canvas1 = cropperRef.current?.getCanvas();
    const canvas2 = cropperRef.current?.getCanvas()?.toDataURL();

    if (canvas1 && canvas2) {
      setIsCropped(true);
      setCroppedImage1(canvas1);
      setCroppedImage2(canvas2);
    }
  };

  const onSend = () => {
    if (croppedImage1) {
      const form = new FormData();
      croppedImage1.toBlob((blob) => {
        if (blob) {
          form.append('file', blob);
          console.log(blob);
        }
      }, 'image/jpeg');
    }

    if (croppedImage2) {
      // Konwersja DataURL na Blob
      fetch(croppedImage2)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'croppedImage.jpg', {
            type: 'image/jpeg',
          });

          const form = new FormData();
          form.append('file', file);

          const reader = new FileReader();
          reader.onload = (e) => {
            const arrayBuffer = e.target.result;

            // Utwórz Blob z ArrayBuffera
            const restoredBlob = new Blob([arrayBuffer], {
              type: 'image/jpeg',
            });

            // Utwórz URL obrazka z Bloba
            const restoredImageUrl = URL.createObjectURL(restoredBlob);

            window.open(restoredImageUrl);
          };
          reader.readAsArrayBuffer(blob);
        });
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

        <div className="h-min max-h-screen flex flex-col gap-3 items-center">
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
              <p className="text-base px-4 py-2">Crop Image</p>
            </button>
            {isCropped && (
              <button
                type="button"
                className="black_btn"
                onClick={() => onSend()}
              >
                <p className="text-base px-4 py-2">Send to Server</p>
              </button>
            )}
          </div>
        </div>
      </section>
    </DataContext.Provider>
  );
};

export default EditImage;
