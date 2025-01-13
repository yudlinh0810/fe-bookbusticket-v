import React, { useEffect, useState } from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../../stores/UserStore';
import logo from '../../assets/images/logo_vexe.gif';

const Header = () => {
  const location = useLocation();
  const { user, clearUser } = useUserStore();
  const [menuShow, setMenuShow] = useState(false);
  const handleLogOut = () => {
    clearUser();
  };
  const handleClickMenuShow = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
    setMenuShow((prev) => {
      const newState = !prev;
      navbar.style.display = newState ? 'block' : 'none';
      return newState;
    });
  };
  // useEffect(() => {
  //   const handleOutSideClick = (e) => {
  //     const navbar = document.querySelector('.navbar');
  //     if (navbar && !navbar.contains(e.target)) {
  //       setMenuShow(false);
  //     }
  //   };

  //   document.addEventListener('click', handleOutSideClick);

  //   return () => document.removeEventListener('click', handleOutSideClick);
  // }, []);
  const handleClickMenuClose = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
    setMenuShow((prev) => {
      const newState = false;
      navbar.style.display = 'none';
      return newState;
    });
  };

  return (
    <header className='header__container'>
      <div className='header__left'>
        <Link to={'/'} className='header__logo'>
          <img src={logo} alt='logo' width={200} height={200} />
        </Link>
        <Link className='header__left__content' to='/'>
          <p className='title'>
            Vexetienich{' '}
            <span className='content'>
              Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển
            </span>
          </p>
        </Link>
        <div className='header__left__icon'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={15} width={15}>
            <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
          </svg>
        </div>
      </div>
      <label className='menu__icon menu__btn'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' onClick={handleClickMenuShow}>
          <path d='M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z' />
        </svg>
      </label>
      <ul className='event-list'>
        <li className='event-item '>Đơn hàng của tôi</li>
        <li className='event-item '>Mở bán vé trên Vexetienich</li>
        <li className='event-item '>Trở thành đối tác</li>
        <li className='hd-r-li'>
          <Link to={'/'}>
            <img
              src='https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/vn-flag.svg'
              alt='vn-flag'
              width={26}
              height={26}
            ></img>
          </Link>
        </li>
        {location.pathname === '/login-register' ? null : (
          <li className='event-item action'>
            {user ? (
              <div className='btn-hd-r-li'>
                <div className='username'>{user?.name}</div>
                {user?.id.slice(0, 3) === 'CTM' ? (
                  <div className='hidden' style={{ zIndex: '10' }}>
                    <Link to={'/user-profile'} className='feat'>
                      <div className='ft-item'>Thông tin cá nhân</div>
                    </Link>
                    <Link to={'/'} className='feat'>
                      <div className='ft-item' onClick={handleLogOut}>
                        Đăng xuất
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className='hidden' style={{ zIndex: '10' }}>
                    <Link to={'/user-profile'} className='feat'>
                      <div className='ft-item'>Thông tin cá nhân</div>
                    </Link>
                    <Link to={'/admin'} className='feat'>
                      <div className='ft-item'>Quản lý hệ thống</div>
                    </Link>
                    <Link to={'/'} className='feat'>
                      <div className='ft-item' onClick={handleLogOut}>
                        Đăng xuất
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={'/login-register'}
                className='btn-hd-r-li'
                style={{ backgroundColor: '#38b6ff', color: '#fff', textDecoration: 'none' }}
              >
                Đăng Nhập
              </Link>
            )}
          </li>
        )}
        <li className='event-item '>
          <div className='hd-r-support'>
            <div className='h-d-icon'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={16} width={16}>
                <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
              </svg>
            </div>
            <Link to={'/'}>Hotline 24/7</Link>
          </div>
        </li>
      </ul>
      {/* responsive mobile */}
      {/* <nav className={`navbar ${menuShow ? 'show' : ''}`}> */}
      <ul className={`nav__list navbar ${menuShow ? 'show' : ''}`}>
        <li className='nav__item'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 384 512'
            width={25}
            onClick={handleClickMenuClose}
          >
            <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
          </svg>
        </li>
        <li className='nav__item'>{user?.name}</li>
        <li className='nav__item'>
          {user ? (
            <ul className='actions'>
              <li>
                <Link to={'/user-profile'} className='feat'>
                  <p className='ft-item'>Thông tin cá nhân</p>
                </Link>
              </li>
              <li>
                <Link to={'/'} className='feat'>
                  <p className='ft-item'>Thông tin hóa đơn</p>
                </Link>
              </li>
              <li>
                <Link to={'/'} className='feat'>
                  <p className='ft-item'>Tài xế yêu thích</p>
                </Link>
              </li>
              <li>
                <Link to={'/'} className='feat'>
                  <p className='ft-item' onClick={handleLogOut}>
                    Đăng xuất
                  </p>
                </Link>
              </li>
            </ul>
          ) : (
            <button className='btn-login'>Đăng nhập</button>
          )}
        </li>
      </ul>
      {/* </nav> */}
    </header>
  );
};

export default Header;
