import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";

import { callRegister } from "../../config/api.auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await callRegister(name, email, password);
    if (res?.data?.email) {
      message.success('Đăng ký tài khoản thành công!');
      navigate('/login')
  } else {
      notification.error({
          message: res.error,
          description:
              res.message && Array.isArray(res.message) ? res.message[0] : res.message,
          duration: 5
      })
  }
  };
  return (
    <>
      <div className="text-center mt-5">
        <form className="form-signin" onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Đăng ký</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <label htmlFor="inputName" className="sr-only">
                Tên
              </label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                placeholder="Tên của bạn..."
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-lg-12">
              <label htmlFor="inputEmail" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-lg-12">
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
          </div>
          <button className="btn btn-primary btn-block mt-3" type="submit">
            Submit
          </button>
          <p className="mt-3 text-muted">
            Đã có tài khoản ! <a href="/login">Đăng nhập</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
