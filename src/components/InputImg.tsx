import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHoks';
import { setImg } from '../redux/slices/imgSlice';
import { IErrors } from '../types/types';
// import { useDispatch } from 'react-redux';

const maxSizeInBytes = 5 * 1024 * 1024;

interface IInputImgProps {
  imgRef: React.RefObject<HTMLInputElement>,
  errors: Partial<IErrors>,
}

const InputImage: React.FC<IInputImgProps> = ({ imgRef, errors }) => {
  const dispatch = useAppDispatch();
  const [isValid, setValid] = useState(false);
  const [_, setBaseImage] = useState<string>('');
  const [errMessage, setErrMessage] = useState('');

  const handleImageUpload = (event: ChangeEvent) => {
    const targetElem = event.target as HTMLInputElement;
    const selectedFile = targetElem.files && targetElem.files[0];
    const isToManyFails = targetElem.files && targetElem.files.length > 1;

    if (isToManyFails) {
      setValid(false)
      setErrMessage('You can load one image!');
    }

    if (!selectedFile) {
      setValid(false)
      setErrMessage('You need load one image!');
    }

    if (selectedFile) {
      if (selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpeg') {
        setValid(false);
        setErrMessage('Only .png and .jpeg formats are allowed');
      }
      if (selectedFile.size > maxSizeInBytes) {
        setValid(false);
        setErrMessage('Maximum of 5 MB')
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const base64Image = reader.result as string;
        setBaseImage(base64Image);
        dispatch(setImg(base64Image));
      };
    }
  };

  return (
    <label className="input__file" htmlFor='file'>Choose a picture
      <input type="file" accept=".png,.jpeg" name='file' id='file' onChange={handleImageUpload} ref={imgRef} />
        {errors.img ?
          <p className='error-message'>{errors.img}</p>
          : isValid ?
          null
          : <p className='error-message'>{errMessage}</p>}
    </label>
  );
};

export default InputImage;
