import React, { useEffect } from 'react';
import './dropWater.scss';

const DropWater = ({ children }) => {
  useEffect(() => {
    function liquid() {
      const container = document.querySelector('.box');
      const maxDrops = 14;

      // Kiểm tra số lượng giọt nước hiện tại
      if (container.getElementsByClassName('drops').length < maxDrops) {
        const drop = document.createElement('div');
        drop.classList.add('drops');
        container.appendChild(drop);

        const size = Math.random() * 20 + 15;
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${Math.min(
          Math.random() * container.clientWidth,
          container.clientWidth - size
        )}px`;

        // Xóa giọt nước khi hoàn thành animation
        drop.addEventListener('animationend', () => {
          container.removeChild(drop);
        });
      }
    }

    const intervalId = setInterval(liquid, 700);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div className='box mt-[82px]'>{children}</div>;
};

export default DropWater;
