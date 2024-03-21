import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EmailValidation, PasswordValidation } from "../../Validation";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/CreateContext";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "chirag@gmail.com",
    password: "Chir@g123",
  });

  const handleForm = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    var isValidate;
    isValidate = EmailValidation(loginData.email);
    if (!isValidate.status) {
      return isValidate;
    }
    isValidate = PasswordValidation(loginData.password);
    if (!isValidate.status) {
      return isValidate;
    }
    return { status: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidationMsg = validation();
    if (!ValidationMsg.status) {
      toast.success(ValidationMsg.message, {
        position: "top-right",
      });
    } else {
      Login(loginData);
    }
  };
  return (
    <>
      <main className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center g-0 min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
            <a
              href="#"
              className="form-check form-switch theme-switch btn btn-light btn-icon rounded-circle d-none "
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              />
            </a>
            {/* Card */}
            <div className="card smooth-shadow-md">
              {/* Card body */}
              <div className="card-body p-6">
                <div className="mb-4">
                  <a href="../index.html">
                    <img
                      src="../assets/images/brand/logo/logo-2.svg"
                      className="mb-2 text-inverse"
                      alt="Image"
                    />
                  </a>
                  <p className="mb-6">Please enter your user information.</p>
                </div>
                {/* Form */}
                <form>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginData.email}
                      className="form-control"
                      name="email"
                      placeholder="Email address here"
                      onChange={handleForm}
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={loginData.password}
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      onChange={handleForm}
                    />
                  </div>
                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center  mb-4">
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberme"
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div>
                    {/* Button */}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    </div>
                    {/* <div className="d-md-flex justify-content-between mt-4">
                      <div className="mb-2 mb-md-0">
                        <Link to={"/registration"} className="fs-5">
                          Create An Account{" "}
                        </Link>
                      </div>
                      <div>
                        <Link to={"/resetpass"} className="text-inherit fs-5">
                          Forgot your password?
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
