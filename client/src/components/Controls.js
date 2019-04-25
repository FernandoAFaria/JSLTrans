import React from "react";
import InsertPickup from "./Dashboard/InsertPickup";
import InsertInbound from './Dashboard/InsertInbound';

//default Controls
//This holds all functions for displaying different dashboard components

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            component: "Controls"
        };
    }

    handleInsertPickup = e => {
        e.preventDefault();
        this.setState({
            component: "InsertPickup"
        });
    };
    handleInsertInbound = e => {
        e.preventDefault();
        this.setState({
            component: "InsertInbound"
        });
    };
    handleBackBtn = e => {
        e.preventDefault();
        this.setState({
            component: "Controls"
        });
    };

    render() {
        switch (this.state.component) {
            case "Controls":
                return (
                    <ControlCenter
                        handleInsertPickup={this.handleInsertPickup}
                        handleInsertInbound={this.handleInsertInbound}
                    />
                );

            case "InsertPickup":
                return <InsertPickup handleBackBtn={this.handleBackBtn} />;
            
            case "InsertInbound":
                return <InsertInbound handleBackBtn={this.handleBackBtn} />
                    

            default:
                return "";
        }
    }
}

//The actual Dashboard.  functions are passed from the CONTROLS component up above

const ControlCenter = props => {
    return (
        <section>
            {/* <nav id="sidebar" className="bg-primary">
            <ul className='list-group'>
                <li className='list-group-item' >Insert Pickup</li>
                <li className='list-group-item' >Insert Inbound</li>
                <li className='list-group-item' >Update Status</li>
                <li className='list-group-item' >Create Outbound</li>
            </ul>
             </nav> */}
            <div
                style={{ minHeight: "90vh" }}
                className="container-fluid text-center pt-5 bg-light">
                <h3 className="text-dark">Dashboard</h3>
                <a href="/" style={{ textDecoration: "none" }}>
                    
                    <div
                        className="card grow text-white bg-info mb-3 mx-auto"
                        style={{ maxWidth: "55vw" }}
                        onClick={(e) => props.handleInsertPickup(e)}
                    >
                        <div className="card-header">
                            Insert a Pickup Shipment
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">
                                Pickups made by our drivers or shipments dropped
                                on our dock to be loaded for outbound
                            </h5>
                            <p className="card-text" />
                        </div>
                    </div>
                </a>

                <div
                    className="card grow text-white bg-success mb-3 mx-auto"
                    style={{ maxWidth: "55vw" }}
                    onClick={(e) => props.handleInsertInbound(e)}
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
                    style={{ maxWidth: "55vw" }}
                >
                    <div className="card-header">
                        Update Status on a Shipment
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            Shipment delivered, brought back as an attempt, or
                            returned? Update here.
                        </h5>
                        <p className="card-text" />
                    </div>
                </div>
                <div
                    className="card grow text-white bg-warning mb-3 mx-auto"
                    style={{ maxWidth: "55vw" }}
                >
                    <div className="card-header">
                        Create an Outbound Manifest
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            Shipments transfered to another carrier.
                        </h5>
                        <p className="card-text" />
                    </div>
                </div>
            </div>
        </section>
    );
};
