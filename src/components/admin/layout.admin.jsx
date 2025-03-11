import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  theme,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { callLogout } from '../../config/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';
const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.account.user);

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      key: 'home',
      label: <Link to='/'>Trang chủ</Link>,
    },
    {
      key: 'profile',
      label: <Link to='/profile'>Trang cá nhân</Link>,
    },
    {
      key: 'logout',
      danger: true,
      label: <label onClick={handleLogout}>Đăng xuất</label>,
    },
  ];

  const menuSidebar = [
    {
      key: '/admin',
      icon: <AppstoreOutlined />,
      label: <Link to='/admin'>Dashboard</Link>,
      roles: ['ADMIN', 'DOCTOR', 'CASHIER']
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to='/admin/users'>User</Link>,
      roles: ['ADMIN']
    },
    {
      key: '/admin/vaccines',
      icon: <VideoCameraOutlined />,
      label: <Link to='/admin/vaccines'>Vaccine</Link>,
      roles: ['ADMIN', 'DOCTOR', 'CASHIER']
    },
    {
      key: '/admin/centers',
      icon: <UploadOutlined />,
      label: <Link to='/admin/centers'>Center</Link>,
      roles: ['ADMIN', 'DOCTOR', 'CASHIER']
    },

    {
      key: '/admin/permissions',
      icon: <UploadOutlined />,
      label: <Link to='/admin/permissions'>Permission</Link>,
      roles: ['ADMIN']
    },
    {
      key: '/admin/roles',
      icon: <UserSwitchOutlined />,
      label: <Link to='/admin/roles'>Role</Link>,
      roles: ['ADMIN']
    },
    {
      label: 'Appointment',
      icon: <MenuFoldOutlined />,
      children: [
        { key: '/admin/appointments', label: <Link to='/admin/appointments'>Appointments</Link>, roles: ['CASHIER'] },
        { key: '/admin/my-schedule', label: <Link to='/admin/my-schedule'>My Schedule</Link>, roles: ['DOCTOR'] },
      ],
      roles: ['DOCTOR', 'CASHIER']
    },
  ];

  const filterMenuByRole = (menuItems, userRole) => {
    return menuItems
      .filter(item => item.roles.includes(userRole))
      .map(item => {
        if (item.children) {
          const filteredChildren = filterMenuByRole(item.children, userRole);
          return { ...item, children: filteredChildren };
        }
        return item;
      });
  };

  const filteredMenuSidebar = filterMenuByRole(menuSidebar, user.roleName);


  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[activeMenu]}
            onClick={(e) => setActiveMenu(e.key)}
            items={filteredMenuSidebar}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar shape='square' icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
