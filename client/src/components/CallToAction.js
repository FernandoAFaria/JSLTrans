import React from "react";

import "../assets/css/landing.css";

export default function Landing() {
  return (
    <div className="callToAction">
      <div className="text-white text-center rgba-stylish-strong ">
        <div className="landing-container">
          {/* Left Landing */}
          <div>
            <h1
              style={{ fontSize: "calc(2vw + 16px)" }}
              className="mb-5 text-white"
            >
              Welcome to JSL Transportation
            </h1>
            <h3 className="mb-5 text-white">
              Servicing NJ, NYC, Brooklyn, Queens, Long Island
            </h3>
            <p className="mb-5 text-white">
              Specializing in LTL, Trailer Loads, Warehousing, and more!
            </p>
          </div>
          {/* Request a quote section */}

          <div className=" req-quote shadow border border-dark">
            <h5 className="card-header bg-danger text-center py-4">
              <span className="text-white mt-2">Request a quote.</span>
            </h5>

            <div className="card-body px-lg-5 pt-0 mt-5">
              <form className="text-center" style={{ color: "#757575" }}>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    id="requestName"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <input
                    required
                    type="email"
                    id="requestEmail"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="requestPhone"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Information, pickup location, delivery, type of freight, ect..."
                    required
                    id="requestBody"
                    className="form-control"
                    style={{ height: "100px" }}
                  />
                </div>

                <button
                  className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                  type="submit"
                >
                  Get Pricing
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
