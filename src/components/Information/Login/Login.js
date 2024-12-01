import React, { useRef, useEffect, useState } from 'react';
import './login.scss';
import Header from '../../Header/Header';
import DropWater from '../../Animations/DropWater/DropWater';
import { login, register } from '../../../services/Customer';
import { toast } from 'react-toastify';

const Login = () => {
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [customer, setCustomer] = useState(null);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // In ra từng mục trong formData
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const data = Object.fromEntries(formData.entries());
    console.log('Data Object:', data); // Log đối tượng data sau khi chuyển đổi

    try {
      const res = await register(data);
      if (res.status !== 'OK') {
        toast.error('Đăng ký thất bại');
        throw new Error('Network response was not ok');
      }
      const result = await res.data;
      setCustomer(result);
      console.log(customer);
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    console.log('Data Object:', data);

    try {
      const res = await login(data);
      console.log(res[0]);
      console.log(res[0].status);
      if (res[0]['status'] === 'OK') {
        const result = res[0].access_token;
        localStorage.setItem('access_token', res[0].access_token);
        console.log('access', localStorage.getItem('access_token'));
        setCustomer(result);
        toast.success('Đăng nhập thành công');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.log('ERR', error);
    }
  };

  useEffect(() => {
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;
    const container = containerRef.current;

    const handleRegisterClick = () => {
      container.classList.add('active');
    };

    const handleLoginClick = () => {
      container.classList.remove('active');
    };

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', handleRegisterClick);
      loginBtn.addEventListener('click', handleLoginClick);

      return () => {
        registerBtn.removeEventListener('click', handleRegisterClick);
        loginBtn.removeEventListener('click', handleLoginClick);
      };
    }
  }, []);

  return (
    <>
      <DropWater>
        <Header />
        <div className='full'>
          <div className='container' id='container' ref={containerRef}>
            <div className='form-container sign-up'>
              <form onSubmit={handleRegisterSubmit}>
                <h1>Create Account</h1>
                <span>or use your email for registration</span>
                <input type='email' name='email' placeholder='Email' />
                <input type='text' name='name' placeholder='Name' />
                <input type='password' name='password' placeholder='Password' />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' />
                <button type='submit'>Sign Up</button>
              </form>
            </div>
            <div className='form-container sign-in'>
              <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                <span>or use your email password</span>
                <input type='email' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <a href='/'>Forget Your Password?</a>
                <button type='submit'>Sign In</button>
              </form>
            </div>
            <div className='toggle-container'>
              <div className='toggle'>
                <div className='toggle-panel toggle-left'>
                  <h1>Welcome Back!</h1>
                  <p>Log in to use all site features</p>
                  <button className='hidden' ref={loginBtnRef}>
                    Sign In
                  </button>
                </div>
                <div className='toggle-panel toggle-right'>
                  <h1>Hello, Friend!</h1>
                  <p>Register with your personal details to use all of site features</p>
                  <button type='button' className='hidden' ref={registerBtnRef}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropWater>
    </>
  );
};

export default Login;
