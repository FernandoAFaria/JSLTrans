import React from 'react'

export default function Controls() {
  return (
    <div
    style={{ minHeight: "90vh" }}
    className="container-fluid text-center pt-5  bg-dark"
>
    <a href='/' style={{textDecoration: 'none'}}><div
        className="card grow text-white bg-info mb-3 mx-auto"
        style={{ maxWidth: "75vw" }}
    >
        <div className="card-header">Insert a Pickup Shipment</div>
        <div className="card-body">
            <h5 className="card-title">
                Pickups made by our drivers or shipments dropped on our
                dock to be loaded for outbound
            </h5>
            <p className="card-text" />
        </div>
    </div>
    </a>
    <div
        className="card grow text-white bg-success mb-3 mx-auto"
        style={{ maxWidth: "75vw" }}
    >
        <div className="card-header">
            Insert an Inbound Shipment
        </div>
        <div className="card-body">
            <h5 className="card-title">
                Shipments arriving for delivery
            </h5>
            <p className="card-text" />
        </div>
    </div>
    <div
        className="card grow text-white bg-danger mb-3 mx-auto"
        style={{ maxWidth: "75vw" }}
    >
        <div className="card-header">Update Status on a Shipment</div>
        <div className="card-body">
            <h5 className="card-title">Shipment delivered, brought back as an attempt, or returned?  Update here.</h5>
            <p className="card-text" />
        </div>
    </div>
    <div
        className="card grow text-white bg-warning mb-3 mx-auto"
        style={{ maxWidth: "75vw" }}
    >
        <div className="card-header">Create an Outbound Manifest</div>
        <div className="card-body">
            <h5 className="card-title">Shipments transfered to another carrier.</h5>
            <p className="card-text" />
        </div>
    </div>
</div>
  )
}

