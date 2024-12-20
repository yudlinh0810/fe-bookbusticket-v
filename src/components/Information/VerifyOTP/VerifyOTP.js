import React from 'react';
import './verify_otp.scss';
import Header from '../../Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPInput from '../../OTPInput/OTPInput';
import { fetchCustomer, verifyEmail } from '../../../services/Customer';
import { toast } from 'react-toastify';
import useUserStore from '../../../stores/UserStore';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email || null;
  const { user, setUser } = useUserStore();
  console.log('user', user);

  const handleOTPVerify = async (data) => {
    const res = await verifyEmail(data);
    console.log('res', res);
    if (res[0].status !== 'OK') {
      toast.error('Bạn đã nhập sai mã OTP');
    } else {
      const detail = await fetchCustomer(res[0]);
      console.log('detail', detail);
      const result = {
        id: detail.id,
        email: detail.email,
        name: detail.name,
        phone: detail.phone,
        portrait: detail.portrait,
        role_id: detail.role_id,
        status_id: detail.status_id,
        address: detail.address,
        day_birth: detail.day_birth,
      };
      setUser(result);
      toast.success('Đăng ký tài khoản thành công');
      navigate('/', {
        state: { email: data.email, name: data.name },
      });
    }
  };
  return (
    <>
      <Header />
      <div className='full'>
        <div id='verify-OTP-container'>
          <img
            src='https://w7.pngwing.com/pngs/553/212/png-transparent-email-computer-icons-email-miscellaneous-blue-angle-thumbnail.png'
            alt='Email_img'
            id='verify-otp-img'
          />
          <h3>Please check your email</h3>
          <p>We've sent a code to {email}</p>
          <OTPInput length={6} email={email} onsubmit={handleOTPVerify} />
          <div className='footer'>
            <p>Didn't get the code?</p>
            <p className='underline'>Click to the send.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
