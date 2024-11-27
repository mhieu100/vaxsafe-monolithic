import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  theme,
} from "antd";
import { callLogout } from "../../config/api";
import { setLogoutAction } from "../../redux/slice/accountSlide";
import { useDispatch } from "react-redux";
const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
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
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const items = [
    {
      key: "1",
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "2",
      danger: true,
      label: <label onClick={handleLogout}>Đăng xuất</label>,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider  trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[activeMenu]}
            onClick={(e) => setActiveMenu(e.key)}
            items={[
              {
                key: "/admin",
                icon: <AppstoreOutlined />,
                label: <Link to="/admin">Dashboard</Link>,
              },
              {
                key: "/admin/users",
                icon: <UserOutlined />,
                label: <Link to="/admin/users">User</Link>,
              },
              {
                key: "/admin/vaccines",
                icon: <VideoCameraOutlined />,
                label: <Link to="/admin/vaccines">Vaccine</Link>,
              },
              {
                key: "/admin/centers",
                icon: <UploadOutlined />,
                label: <Link to="/admin/centers">Vaccine Center</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              paddingRight: 20,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
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
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
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
