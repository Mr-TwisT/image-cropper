import { useRef, useEffect, useContext } from 'react';
import { DataContext } from '@app/edit-image/page';

const Upload = () => {
  const inputRef = useRef(null);

  const { image, setImage } = useContext(DataContext);

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onLoadImage = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const blob = URL.createObjectURL(files[0]);
      setImage(blob);
    }
    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div>
      <button
        type="button"
        className="black_btn w-1/2 mx-auto"
        onClick={onUpload}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="upload-file-input cursor-pointer ml-3"
        />
      </button>
    </div>
  );
};

export default Upload;
