import React from 'react';
import './RadioGroup.scss';

const RadioGroup = ({ contentArr, selectedValue, onChange }) => {
  return (
    <div className='list-radio arrange'>
      <h4>Sắp xếp</h4>
      <div className='radio'>
        <label className='radio-container'>
          <input
            className='input-radio'
            type='radio'
            name='arrange'
            onChange={() => onChange(0)}
            checked={selectedValue === 0}
          />
          <p className='content'>Mặc định</p>
        </label>
      </div>
      {Array.isArray(contentArr) && contentArr.length > 0
        ? contentArr.map((item, index) => {
            return (
              <div className='radio' key={index}>
                <label className='radio-container'>
                  <input
                    className='input-radio'
                    type='radio'
                    name='arrange'
                    onChange={() => onChange(item.number)}
                    checked={selectedValue === item.number}
                  />
                  <p className='content'>{item.content}</p>
                </label>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default RadioGroup;
