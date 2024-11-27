import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../config/api";
import { setLogoutAction } from "../../redux/slice/accountSlide";
import { message } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res && +res.statusCode === 200) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  return (
    <section>
      <nav
        className="bg-white navbar navbar-expand-lg navbar-light pg-lib-item py-lg-1"
        data-navbar-id="{bs-navbar}"
      >
        <div className="container">
          <Link className="fw-bold navbar-brand fs-4" to="/">
            <span>Logo</span>
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#{bs-navbar}"
            aria-controls="{bs-navbar}"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="{bs-navbar}">
            <ul className="mb-2 mb-lg-0 me-lg-auto navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link px-lg-3 py-lg-4"
                  aria-current="page"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-lg-3 py-lg-4" to="/shop">
                  Kho vaccine
                </Link>
              </li>
            </ul>
            <div className="d-flex flex-wrap gap-2 py-1">
              {isAuthenticated && user ? (
                <li
                  className="nav-item dropdown"
                  style={{ listStyleType: "none" }}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.fullName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Hồ sơ
                      </a>
                    </li>
                    {user.role !== "PARTIENT" ? (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Trang quản lý
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <label className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                      </label>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary pb-2 pe-4 ps-4 pt-2"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary pb-2 pe-4 ps-4 pt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
