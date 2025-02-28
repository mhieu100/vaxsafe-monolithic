import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { callLogout } from '../../config/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';

const { Header } = Layout;

const NavbarTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res && +res.statusCode === 200) {
      dispatch(setLogoutAction({}));
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  const items = [
    {
      label: `Welcome ${user?.fullname}`,
    },


    user.roleName !== 'PATIENT'
      ? {
        key: 'system',
        label: <Link to='/admin'>Trang quản trị</Link>,
      }
      : {
        key: 'profile',
        label: <Link to='/profile'>Hồ sơ</Link>,
      },
    {
      key: 'logout',
      danger: true,
      label: <label onClick={handleLogout}>Đăng xuất</label>,
    },
  ];

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 200px',
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[current]}
          items={[
            {
              key: '/',
              label: <Link to='/'>Trang chủ</Link>,
            },
            {
              key: '/shop',
              label: <Link to='/shop'>Kho vaccine</Link>,
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        {isAuthenticated ? (
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Space>
              <Avatar shape='square' icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button type='primary'>
              <Link to='/login' className='no-underline'>Đăng nhập</Link>
            </Button>
            <Button color='danger' variant='solid'>
              <Link to='/register'>Đăng ký</Link>
            </Button>
          </Space>
        )}
      </Header>
    </>
  );
};

export default NavbarTop;
