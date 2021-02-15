import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.css';

const TextInput = ({ id, name, placeholderText, inputLabel, onChangeHandler }) => {
  const [userInput, updateUserInput] = useState('');

  /* Only allows numeric values */
  const handleUserInput = (evt) => {
    if (!evt.target.validity.patternMismatch) {
      updateUserInput(evt.target.value);
      onChangeHandler(evt.target.value);
    }
  }

  const includeInputLabel = inputLabel.length > 0;

  return (
    <div className={styles.TextInputShared}>
      {includeInputLabel && 
        <label htmlFor={id} className={styles.TextInputLabel}>{inputLabel}</label>
      }
      <input 
        type="text"
        pattern="[0-9]*" 
        id={id}
        name={name}
        placeholder={placeholderText}
        value={userInput}
        className={styles.TextInputEntry}
        onChange={e => handleUserInput(e)}
      />
    </div>
  )
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
  inputLabel: PropTypes.string,
};

export default TextInput;