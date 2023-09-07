'use client';

import { useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

import Upload from '@components/Upload';

const EditImage = () => {
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'
  );

  const onChange = (cropper) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
  };

  return (
    <section className="w-full flex-center flex-col pb-14">
      <h2 className="head_text text-center blue_gradient pb-10">
        Edit Image Below
      </h2>

      <div className="h-screen flex flex-col gap-3 items-center mt-5">
        <Upload />
        <Cropper
          src={image}
          onChange={onChange}
          className="cropper"
          backgroundClassName="cropperImage"
          stencilProps={{
            grid: true,
          }}
        />
        <button type="button" className="black_btn">
          <p className="text-base px-3 py-1">Crop Image</p>
        </button>
      </div>
    </section>
  );
};

export default EditImage;
