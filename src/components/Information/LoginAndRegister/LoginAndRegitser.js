import React, { useRef, useEffect } from 'react';
import './login_register.scss';
import Header from '../../Header/Header';
import DropWater from '../../Animations/DropWater/DropWater';
import { login, register } from '../../../services/Customer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await register(data);
      if (res[0].status !== 'OK') {
        toast.error('Đăng ký thất bại');
      } else {
        toast.success('Đã gửi mã OTP đến email của bạn');
        navigate('/verify-email', {
          state: { email: data.email, name: data.name, password: data.password },
        });
      }
    } catch (error) {
      console.log('ERR 27', error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    try {
      const res = await login(data);
      if (res[0]['status'] === 'OK') {
        localStorage.setItem('access_token', res[0].access_token);
        toast.success('Đăng nhập thành công');
        navigate('/');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.log('ERR 46', error);
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
          <div id='r-l-container' ref={containerRef}>
            <div className='form-container sign-up'>
              <form onSubmit={handleRegisterSubmit}>
                <h1>Create Account</h1>
                <span>or use your email for registration</span>
                <input className='lg-input' type='email' name='email' placeholder='Email' />
                <input className='lg-input' type='text' name='name' placeholder='Name' />
                <input
                  className='lg-input'
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <input
                  className='lg-input'
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                />
                <button className='lg-button' type='submit'>
                  Sign Up
                </button>
              </form>
            </div>
            <div className='form-container sign-in'>
              <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                <span>or use your email password</span>
                <input className='lg-input' type='email' name='email' placeholder='Email' />
                <input
                  className='lg-input'
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <a href='/'>Forget Your Password?</a>
                <button className='lg-button' type='submit'>
                  Sign In
                </button>
              </form>
            </div>
            <div className='toggle-container'>
              <div className='toggle'>
                <div className='toggle-panel toggle-left'>
                  <h1>Welcome Back!</h1>
                  <p>Log in to use all site features</p>
                  <button className='lg-button hidden' ref={loginBtnRef}>
                    Sign In
                  </button>
                </div>
                <div className='toggle-panel toggle-right'>
                  <h1>Hello, Friend!</h1>
                  <p>Register with your personal details to use all of site features</p>
                  <button type='button' className='lg-button hidden' ref={registerBtnRef}>
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
