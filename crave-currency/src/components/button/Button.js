import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css'

const Button = ({ buttonLabel, onClickHandler }) => (
  <button 
    onClick={() => onClickHandler()}
    className={styles.Button}
  >
    {buttonLabel}
  </button>
);

Button.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired
};

export default Button;