import React from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../../stores/UserStore';
import logo from '../../assets/images/logo_vexe.gif';

const Header = () => {
  const location = useLocation();
  const { user, clearUser } = useUserStore();
  const handleLogOut = () => {
    clearUser();
  };
  return (
    <div className='header-container'>
      <div className='header-left'>
        <Link to={'/'}>
          <img src={logo} alt='logo' width={200} height={200} />
        </Link>
        <a className='h-l-content' href='/'>
          Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển
        </a>
        <div className='h-l-icon'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={15} width={15}>
            <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
          </svg>
        </div>
      </div>
      <ul className='header-right'>
        <li className='hd-r-li-w '>Đơn hàng của tôi</li>
        <li className='hd-r-li-w '>Mở bán vé trên Vereghe</li>
        <li className='hd-r-li-w '>Trở thành đối tác</li>
        <li className='hd-r-li'>
          <a href='/'>
            <img
              src='https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/vn-flag.svg'
              alt='vn-flag'
              width={26}
              height={26}
            ></img>
          </a>
        </li>
        {location.pathname === '/login-register' ? null : (
          <li className='hd-r-li'>
            {user?.name ? (
              <div className='btn-hd-r-li'>
                <div className='username'>{user?.name}</div>
                <div className='hidden'>
                  <div className='feat'>
                    <Link to={'/user-profile'} className='feat-info'>
                      Thông tin cá nhân
                    </Link>
                  </div>
                  <p className='feat' onClick={handleLogOut}>
                    Đăng xuất
                  </p>
                </div>
              </div>
            ) : (
              <Link to={'/login-register'} className='btn-hd-r-li'>
                Đăng Nhập
              </Link>
            )}
          </li>
        )}
        <li className='hd-r-li-w '>
          <div className='hd-r-support'>
            <div className='h-d-icon'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={16} width={16}>
                <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
              </svg>
            </div>
            <a href='/'>Hotline 24/7</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
