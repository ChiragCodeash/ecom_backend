import React from "react";

const Page404 = () => {
  return (
    <>
      <main
        className="container min-vh-100 d-flex justify-content-center
align-items-center"
      >
        {/* row */}
        <div className="row">
          {/* col */}
          <div className="col-12">
            {/* content */}
            <div className="text-center">
              <div className="mb-3">
                {/* img */}
                <img
                  src="../assets/images/error/404-error-img.png"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              {/* text */}
              <h1 className="display-4 ">Oops! the page not found.</h1>
              <p className="mb-4">
                Or simply leverage the expertise of our consultation team.
              </p>
              {/* button */}
              <a href="../index.html" className="btn btn-primary">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page404;
