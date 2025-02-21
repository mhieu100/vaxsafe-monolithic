import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import NavbarTop from './header.client';

const { Content } = Layout;

const LayoutClient = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavbarTop />
      <Content style={{ padding: '24px 200px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutClient;
