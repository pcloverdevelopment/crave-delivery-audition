import React from 'react';
import PropTypes from 'prop-types';
import styles from './Currency.module.css';

const Currency = ({ value, amount }) => (
  <div className={styles.Currency}>
    <div>
      <p className={styles.CurrencyAmount}>{amount}</p>
      <p className={styles.CurrencyValue}>{value} CC</p>
    </div>
  </div>
);

Currency.propTypes = {
  value: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};

export default Currency;