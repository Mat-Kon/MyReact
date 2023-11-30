import React, { ChangeEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';

const maxSizeInBytes = 5 * 1024 * 1024;

const InputImage = () => {
  // const dispatch = useDispatch();
  const [isLavid, setValid] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleImageUpload = (event: ChangeEvent) => {
    const targetElem = event.target as HTMLInputElement;
    const selectedFile = targetElem.files && targetElem.files[0];
    // const isToManyFails = targetElem.files && targetElem.files.length > 1;

    // if (isToManyFails) {

    // }

    if (selectedFile) {
      if (selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpeg') {
        setValid(false);
      }
      if (selectedFile.size > maxSizeInBytes) {
        setValid(false);
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        // dispatch({ type: 'SAVE_IMAGE', payload: base64Image });
      };
    }
  };

  return (
    <label htmlFor='file'>Choose a picture
      <input type="file" accept=".png,.jpeg" name='file' id='file' onChange={handleImageUpload}/>
    </label>
  );
};

export default InputImage;
