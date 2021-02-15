import logo from './media/logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import TextInput from './components/textInput/TextInput';
import Button from './components/button/Button';
import Currency from './components/currency/Currency';

import { calculateChange } from './logic/currencyService.js';
import getUselessFact from './api/uselessFactService.js';

function App() {
  const [bill, setBill] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, updateChange] = useState([]);
  const [showPaymentNotEnough, setShowPaymentNotEnough] = useState(false);
  const [exactAmountPaid, updateExactAmountPaid] = useState(0);
  const [randomFact, setRandomFact] = useState(null);
  const [showRandomFact, setShowRandomFact] = useState(false);

  useEffect(async () => {
    const fact = await getUselessFact();
    setRandomFact(fact);
  }, [exactAmountPaid]);

  const handlePayment = (bill, payment) => {
    if (bill > payment) {
      setShowPaymentNotEnough(true);
      setRandomFact(null);
      setShowRandomFact(false);
    } else if (bill === payment) {
      updateExactAmountPaid(exactAmountPaid + 1);
      setShowRandomFact(true);
      setShowPaymentNotEnough(false);
      updateChange([]);
    } else {
      const change = calculateChange(bill, payment);
      updateChange(change);
      setShowPaymentNotEnough(false);
      setRandomFact(null);
      setShowRandomFact(false);
    }
  }

  return (
    <div className="Crave-app">
      <header>
        <img src={logo} className="Crave-logo" alt="logo" />
        <p>
          Elevating expectations for food delivery.
          <br></br>
          <a
            className="Crave-link"
            href="https://www.cravedelivery.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cravedelivery.com
          </a>
        </p>
      </header>
      <main>
        <div className='Customer-bill-input'>
          <TextInput
            id='customerBill'
            name='customerBill'
            placeholderText='We need'
            inputLabel='We need'
            onChangeHandler={setBill}
          />
        </div>
        <div className='Customer-payment-input'>
          <TextInput
            id='customerPayment'
            name='customerPayment'
            placeholderText='You pay'
            inputLabel='You pay'
            onChangeHandler={setPayment}
          />
        </div>
        <Button
          buttonLabel='Calculate Change'
          onClickHandler={() => handlePayment(bill, payment) }
        />
      </main>
      { change.length > 0 && !showPaymentNotEnough && 
        <section className='Customer-change'>
          <p>Your change will be:</p>
          <ul>
            {change.map(c => <li key={c.ccValue.toString()}><Currency value={c.ccValue} amount={c.ccAmount} /></li>)}
          </ul>
        </section>
      }
      {
        showPaymentNotEnough && 
        <section className='Insufficient-payment'>
          <p className='bold'>Your payment is not enough.</p>
          <p>Please pay a higher amount.</p>
        </section>
      }
      {
        randomFact !== null && showRandomFact &&
        <section className='Exact-amount'>
          <p className='bold'>You paid the exact amount!</p>
          <p>Here's a fun fact for you:</p>
          <br></br>
          <p>{randomFact}</p>
        </section>
      }
    </div>
  );
}

export default App;
