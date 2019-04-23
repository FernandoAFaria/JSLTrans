import React from "react";

export default function OurTeam() {
    return (
        <div id="team" className="container-fluid text-center my-5">
            <h1>Our Team</h1>
            <div
                className="mx-auto mb-5"
                style={{ width: "80px", border: "2px solid grey" }}
            />
            <p>
                Each member of our team is a specialist in his or her field.
                Together, we make sure you’re investing where the best returns
                are, while building loyalty across every touchpoint.
            </p>
            {/* Jay */}

            <div className="card my-5 border-white inline">
                <div className="card-img-top">
                    <i
                        className="fas fa-user-tie  "
                        style={{ fontSize: "125px" }}
                    />
                    <h4 className="card-title my-3">Jay</h4>
                </div>
                <div className="card-body">
                    <p>
                        a little about jay a little about jay a little about jay
                        a little about jay a little about jay
                    </p>
                </div>
            </div>
            {/* Leon */}

            <div className="card my-5 border-white inline">
                <div className="card-img-top">
                    <i
                        className="fas fa-user-tie  "
                        style={{ fontSize: "125px" }}
                    />
                    <h4 className="card-title my-3">Leon</h4>
                </div>
                <div className="card-body">
                    <p>
                        a little about Leon a little about Leon a little about
                        Leon a little about Leon a little about Leon
                    </p>
                </div>
            </div>
            {/* Scott */}

            <div className="card my-5 border-white inline">
                <div className="card-img-top">
                    <i
                        className="fas fa-user-tie  "
                        style={{ fontSize: "125px" }}
                    />
                    <h4 className="card-title my-3">Scott</h4>
                </div>
                <div className="card-body">
                    <p>
                        a little about Scotty a little about Scotty a little
                        about Scotty a little about Scotty a little about Scotty
                    </p>
                </div>
            </div>
        </div>
    );
}
