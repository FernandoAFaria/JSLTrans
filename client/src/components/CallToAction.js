import React from "react";
import backgroundImg from "../assets/imgs/trucking.jpg";
import "../assets/css/landing.css";

export default function Landing() {
    return (
        <div className="callToAction"
            
            style={{
                background: `linear-gradient(to top,rgba(45, 52, 54,.7), rgba(9,132,227, .60)) ,url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom center",
                minHeight: "750px",
                position: "relative"
            }}
        >
            <div className="text-white text-center rgba-stylish-strong ">
                <div className="landing-container">
                    {/* Left Landing */}
                    <div>
                        <h1 className="mb-5 display-4 text-white">Welcome to JSL Transportation</h1>
                        <h3 className="mb-5 text-white">
                            Servicing NJ, NYC, Brooklyn, Queens, Long Island
                        </h3>
                        <p className="mb-5 text-white">
                            Specializing in LTL, Trailer Loads, Warehousing, and more!
                        </p>
                    </div>
                    {/* Request a quote section */}

                    <div className=" req-quote shadow" style={{ minWidth: "500px", background: 'rgba(0,0,0,.5)' }}>
                        <h5 className="card-header bg-warning text-center py-4">
                            <strong>Request a quote.</strong>
                        </h5>

                        <div className="card-body px-lg-5 pt-0 mt-5">
                            <form
                                className="text-center"
                                style={{ color: "#757575" }}
                            >
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
                                    <input
                                        type="text"
                                        id="requestFrom"
                                        className="form-control"
                                        placeholder="Picking up at:"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="requestEmail"
                                        className="form-control"
                                        placeholder="Deliverying to:"
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        placeholder="Description of merchandise"
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
                                    Request Quote
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
