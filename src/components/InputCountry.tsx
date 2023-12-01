import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IErrors } from '../types/types';
import { useAppSelector } from '../hooks/reduxHoks';

interface IInputCountry {
  ref: React.RefObject<HTMLSelectElement>;
  errors: Partial<IErrors>;
}

const InputCountry: React.FC<IInputCountry> = ({ ref, errors }) => {
  const [inputValue, setInputValue] = useState('');
  const countries = useAppSelector((state) => state.countries);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (country: string) => {
    setInputValue(country);
    onSelect(country);
  };

  return (
    <div>
      <select id="countrySelect" ref={countryRef}>
        <option value="">Выберите страну</option>
          <option value="latvia">
            Latvia
          </option>
          <option value="georgia">
            Georgia
          </option>
          <option value="canada">
            Canada
          </option>
      </select>
      {errors.country ? <p className='error-message'>{errors.country}</p> : null}
    </div>
  );
};

export default Autocomplete;
