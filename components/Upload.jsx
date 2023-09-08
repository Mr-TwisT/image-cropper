import { useRef, useEffect, useContext } from 'react';
import { DataContext } from '@app/edit-image/page';

const Upload = () => {
  const { image, setImage } = useContext(DataContext);

  const inputRef = useRef(null);

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
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onLoadImage}
        className="upload-file-input black_btn cursor-pointer w-1/2 h-1/2 mx-auto"
      />
    </div>
  );
};

export default Upload;
