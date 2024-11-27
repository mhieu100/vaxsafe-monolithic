import { useState } from "react";
import { callRegister } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("user_test");
  const [email, setEmail] = useState("user_test@gmail.com");
  const [password, setPassword] = useState("12345");
  const [address, setAddress] = useState("Viet Nam");
  const [phone, setPhone] = useState("0388335845");
  const [date, setDate] = useState("2003-11-20");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await callRegister(name, email, password , phone, date, address);
    if (res?.data?.patientId) {
      message.success('Đăng ký tài khoản thành công!');
      navigate('/login')
  } else {
      notification.error({
          message: "Đăng ký tài khoản thất bại",
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
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <label htmlFor="inputAddress" className="sr-only">
                Địa chỉ
              </label>
              <input
                type="text"
                id="inputAddress"
                className="form-control"
                placeholder="Địa chỉ nhà..."
                autoFocus
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="inputPhone" className="sr-only">
                Số điện thoại
              </label>
              <input
                type="text"
                id="inputPhone"
                className="form-control"
                placeholder="Số điện thoại..."
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="inputDate" className="sr-only">
                Ngày sinh
              </label>
              <input
                type="date"
                id="inputDate"
                className="form-control"
                autoFocus
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
