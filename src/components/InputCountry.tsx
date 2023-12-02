import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { IErrors } from '../types/types';
import { useAppSelector } from '../hooks/reduxHoks';

interface IInputCountry {
  selectRef: React.RefObject<HTMLInputElement>;
  errors: Partial<IErrors>;
}

const InputCountry: React.FC<IInputCountry> = ({ selectRef, errors }) => {
  const [inputValue, setInputValue] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const countriesList = useAppSelector((state) => state.countries.countries);

  const handlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLocaleLowerCase());
    const curValue = event.target.value.toLocaleLowerCase();
    const filteredCountries = countriesList.filter(country => country.slice(0, curValue.length).toLowerCase().includes(curValue)) ?? null;
    if (curValue.length) {
      setCountries(filteredCountries);
    } else {
      setCountries([]);
    }
  };

  const handlerRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setCountries([]);
  };

  return (
    <div className='country-container'>
      <label className="input__country" htmlFor="country">
        <input type="text" id="inputValue" value={inputValue} onChange={handlerInput} ref={selectRef}/>
        <ul className='country-list'>
          {countries.length ? (countries.map((country) => (
            <li key={country} value={country.toLocaleLowerCase()}>
              <label htmlFor={country.toLocaleLowerCase()}>
                <input type='radio' name='country'  id={country.toLocaleLowerCase()} value={country} onChange={handlerRadio}/>
                {country}
              </label>
            </li>
          ))) : null}
        </ul>
      </label>
      {errors.country ? <p className='error-message'>{errors.country}</p> : null}
    </div>
  );
};

export default InputCountry;
