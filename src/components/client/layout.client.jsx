import Footer from "./footer.client";
import Header from "./header.client";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutClient;
