import React from 'react'
import { Link } from 'react-router-dom'

const ResetPass = () => {
  return (
    <>
        <main className="container d-flex flex-column">
  <div
    className="row align-items-center justify-content-center g-0
  min-vh-100"
  >
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
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" />
      </a>
      {/* Card */}
      <div className="card smooth-shadow-md">
        {/* Card body */}
        <div className="card-body p-5">
          <div className="mb-4">
            <a href="../index.html">
              <img
                src="../assets/images/brand/logo/logo-2.svg"
                className="mb-2  text-inverse"
                alt="Image"
              />
            </a>
            <p className="mb-6">
              Don't worry, we'll send you an email to reset your password.
            </p>
          </div>
          {/* Form */}
          <form>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
                required=""
              />
            </div>
            {/* Button */}
            <div className="mb-3 d-grid">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
            <span>
              Don't have an account? <Link to={"/login"}>sign in</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

    </>
  )
}

export default ResetPass