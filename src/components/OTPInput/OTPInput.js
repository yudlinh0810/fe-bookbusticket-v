import React, { useRef } from 'react';
import './OTPInput.scss';

const OTPInput = ({ length, email, onsubmit }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value) {
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) {
      e.target.value = value.replace(/[^0-9]/g, ''); //chỉ giứ lại số
    }
  };

  const handleVerify = () => {
    const otp = inputRefs.current.map((input) => input.value).join('');
    const data = { email, otp };
    onsubmit(data);
  };

  return (
    <div className='OTP-input-container'>
      <div className='input-container'>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength='1'
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onInput={handleInput}
            className='otp-input'
          />
        ))}
      </div>
      <button className='verify-btn' type='button' onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
};

export default OTPInput;
