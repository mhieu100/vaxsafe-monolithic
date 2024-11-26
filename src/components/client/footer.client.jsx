const Footer = () => {
  return (
    <section className="bg-dark text-white">
      <footer className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 ms-auto flex-grow-1">
              <div className="mb-5 mb-lg-0">
                <div className="mb-4">
                  <h3 className="fw-semibold">Logo</h3>
                </div>
                <p>
                  Tempora dolorem voluptatum nam vero assumenda voluptate,
                  facilis ad eos obcaecati tenetur veritatis eveniet distinctio
                  possimus.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-4 fs-5 fw-medium">Company</h4>
                <ul className="list-unstyled">
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      About
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Services
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Team
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-4 fs-5 fw-medium">Support</h4>
                <ul className="list-unstyled">
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="text-decoration-none text-reset fw-light"
                    >
                      Support
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="text-decoration-none text-reset">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-4 fs-5 fw-medium">
                  Get in Touch
                </h4>
                <h6>
                  <a
                    href="#"
                    className="text-decoration-none text-reset fw-light"
                  >
                    <i className="bi bi-envelope me-3"></i>
                    Support@megakit.com
                  </a>
                </h6>
                <h6>
                  <a
                    href="#"
                    className="text-decoration-none text-reset fw-light"
                  >
                    <i className="bi bi-headset me-3"></i>
                    +23-456-6588
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center fw-light">© Copyright 2024</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
