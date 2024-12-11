import React, { useState, useEffect, useRef } from 'react';
import './Slide.scss';

const Slide = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = (index) => {
    setCurrentSlide(index >= data.length ? 0 : index);
    resetInterval();
  };

  const autoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    autoSlide();
  };

  useEffect(() => {
    autoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className='slider-container'>
      <div
        className='slides'
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {Array.isArray(data) && data.length > 0 ? (
          data.map((slide, index) => (
            <div className='slide' key={index}>
              <img src={slide.image} alt={`banner-${index}`} />
            </div>
          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
      <div className='slider-dots'>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => nextSlide(index)}
            ></span>
          ))}
      </div>
    </section>
  );
};

export default Slide;
