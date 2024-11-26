import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section>
      <nav
        className="bg-white navbar navbar-expand-lg navbar-light pg-lib-item py-lg-1"
        data-navbar-id="{bs-navbar}"
      >
        <div className="container">
          <Link className="fw-bold navbar-brand fs-4" to="/">
            <span>Your Logo</span>
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
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-lg-3 py-lg-4" to="/shop">
                  Shop
                </Link>
              </li>
            </ul>
            <div className="d-flex flex-wrap gap-2 py-1">
              <Link
                to="/login"
                className="btn btn-outline-primary pb-2 pe-4 ps-4 pt-2"
              >
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary pb-2 pe-4 ps-4 pt-2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
