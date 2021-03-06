import React from "react";
import InsertShipment from "./Dashboard/InsertShipment";
import CreateOutbound from "./Dashboard/CreateOutbound";
import UpdateShipment from "./Dashboard/UpdateShipment";
import PrintTruckManifest from "./Dashboard/PrintTruckManifest";
import ModifyDrivers from "./Dashboard/ModifyDrivers";
import CreateDriverTrip from "./Dashboard/CreateDriverTrip";
import FindShipments from './Dashboard/FindShipments';
import FindDriverTrips from './Dashboard/FindDriverTrips';

//default Controls
//This holds all functions for displaying different dashboard components

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            component: "Controls"
        };
    }

    componentDidMount() {
        this.updateOnhandStatus();
    }

    //Updates Onhand Report

    updateOnhandStatus() {
        this.searchProsByField(
            "edi",
            "status_code",
            "picked up",
            "edi-on-hand-outbound"
        );
        this.searchProsByField(
            "hercules",
            "status_code",
            "picked up",
            "hercules-on-hand-outbound"
        );
        this.searchProsByField(
            "clear lane",
            "status_code",
            "picked up",
            "clearlane-on-hand-outbound"
        );
        // this.searchProsByField("edi", "status_code", "ofd", "edi-ofd");
        // this.searchProsByField("hercules", "status_code", "ofd", "hercules-ofd");
        // this.searchProsByField("clear lane", "status_code", "ofd", "clearlane-ofd");
        //inbound shipments

        this.searchProsByField(
            "clear lane",
            "status_code",
            "inbound",
            "clearlane-inbound"
        );
        this.searchProsByField("edi", "status_code", "inbound", "edi-inbound");
        this.searchProsByField(
            "hercules",
            "status_code",
            "inbound",
            "hercules-inbound"
        );
    }

    searchProsByField(vendor, field, value, populate) {
        //('EDI', 'STATUS', 'PICKED UP', 'edi-on-hand')
        fetch("http://localhost:5000/search", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                vendor: vendor,
                field: field,
                value: value
            })
        })
            .then(res => res.json())
            .then(data => {
                try {
                    document.getElementById(populate).textContent = data.length;
                } catch (err) {
                    console.log(err);
                }
            });
    }
    //Generates a new Window to print the On Hand
    printOnHand = (vendor, field, value) => {
        let win = window.open(
            "",
            "On Hand",
            "toolbar=yes,directories=no, status=no, width=1020, height=1280 "
        );

        win.document.body.classList.add("container");
        win.document.body.classList.add("py-5");
        win.document.body.insertAdjacentHTML(
            "afterbegin",
            `<h1 class="my-4">${vendor}</h1>`
        );

        fetch("http://localhost:5000/search", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                vendor: vendor,
                field: field,
                value: value
            })
        })
            .then(res => res.json())
            .then(data => {
                let table = document.createElement("table");
                table.classList.add("table");
                table.classList.add("table-striped");
                let html = "";

                data.forEach(pro => {
                    html =
                        html +
                        `
                    <tr class='my-2'>
                        <td><span class='mx-2 text-dark'>${pro.fromName}</span>
                        </td> 
                        <td> <span class='text-dark mx-2'>
                        ${pro.pro}
                        </span></td> 
                        <td><span class='mx-2 text-danger'>
                        ${pro.date}
                          </span></td> 
                        <td> <span class='text-dark mx-2'>
                        ${pro.pallets}
                        </span></td> <td><span class='text-dark mx-2'>
                        ${pro.weight}
                        </span>
                        <td> <span class='text-dark mx-2'>
                        ${pro.manifest}
                        </span>
                    </tr>`;
                });

                //inserts table data into the markup for formatting purposes
                let tableMarkup = `
                    <thead class="text-dark mb-3 text-center">
                        <tr>
                            <td>Customer Name</td>
                            <td>Pro Number</td>
                            <td>Date</td>
                            <td># Pallets</td>
                            <td>Weight</td>
                            <td>Manifest Number</td> 
                        </tr>
                        <tbody>
                        ${html}
                        </tbody>
                    </thead>
                    `;

                table.insertAdjacentHTML("beforeend", tableMarkup);
                win.document.body.insertAdjacentElement("beforeend", table);
                win.document.head.insertAdjacentHTML(
                    "afterbegin",
                    `<link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css" /> `
                );
            }).catch(err => console.log(err));
    };


    //Component switches

    handleBackBtn = e => {
        e.preventDefault();
        this.setState({
            component: "Controls"
        });
        this.updateOnhandStatus();
    };


    handleComponentChange = component => {
        this.setState({
            component: component
        });
    }


    render() {
        switch (this.state.component) {
            case "Controls":
                return (
                    <ControlCenter
                        handleComponentChange={this.handleComponentChange}
                        printOnHand={this.printOnHand}
                    
                    />
                );

            case "InsertShipment":
                return <InsertShipment handleBackBtn={this.handleBackBtn} />;

            case "CreateOutbound":
                return <CreateOutbound handleBackBtn={this.handleBackBtn} />;

            case "UpdateShipment":
                return <UpdateShipment handleBackBtn={this.handleBackBtn} />;

            case "PrintTruckManifest":
                return (
                    <PrintTruckManifest handleBackBtn={this.handleBackBtn} />
                );

            case "ModifyDrivers":
                return <ModifyDrivers handleBackBtn={this.handleBackBtn} />;

            case "CreateDriverTrip":
                return <CreateDriverTrip handleBackBtn={this.handleBackBtn} />;

            case "FindShipments":
                return <FindShipments handleBackBtn={this.handleBackBtn} />;

            case "FindDriverTrips":
                return <FindDriverTrips handleBackBtn={this.handleBackBtn} />;

            default:
                return "";
        }
    }
}

//The actual Dashboard.  functions are passed from the CONTROLS component up above

const ControlCenter = props => {
    return (
        <section>
            <div className="mt-3 mb-5 text-center container">
                {/* Dashboard On Hand Totals */}
                <h5>On Hand Shipments</h5>
                <hr />

                <div className="row">
                    <div className="col">
                        <div
                            style={{ background: "#00b894", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand("EDI", "status_code", "picked up")
                            }
                        >
                            <p>On-Hand Outbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="edi-on-hand-outbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">EDI</div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div
                            style={{ background: "#0984e3", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand(
                                    "CLEAR LANE",
                                    "status_code",
                                    "picked up"
                                )
                            }
                        >
                            <p>On-Hand Outbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="clearlane-on-hand-outbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">
                                    Clear Lane
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div
                            style={{ background: "#6c5ce7", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand(
                                    "HERCULES",
                                    "status_code",
                                    "picked up"
                                )
                            }
                        >
                            <p>On-Hand Outbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="hercules-on-hand-outbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">
                                    Hercules
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div
                            style={{ background: "#00b894", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand("EDI", "status_code", "inbound")
                            }
                        >
                            <p>On-Hand Inbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="edi-inbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">EDI</div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div
                            style={{ background: "#0984e3", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand(
                                    "CLEAR LANE",
                                    "status_code",
                                    "inbound"
                                )
                            }
                        >
                            <p>On-Hand Inbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="clearlane-inbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">
                                    Clear Lane
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div
                            style={{ background: "#6c5ce7", minWidth: '190px' }}
                            className="text-center customer-card-container"
                            onClick={() =>
                                props.printOnHand(
                                    "HERCULES",
                                    "status_code",
                                    "inbound"
                                )
                            }
                        >
                            <p>On-Hand Inbound</p>
                            <div className="customer-card">
                                <div>
                                    <span
                                        id="hercules-inbound"
                                        className="display-5 mr-2"
                                    >loading</span>
                                </div>
                                <div className="customer-card-name ">
                                    Hercules
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Onhand Cards */}
            <div
                className="bg-primary bg-dark text-center"
                style={{ minHeight: "90vh", width: "100vw" }}
            >
                {/* Pro */}

                <div className="container py-5">
                <h4 className='text-white'>Shipments</h4>
                <hr className='border-secondary'></hr>
                    <div className="row ">
                        <div className="col text-center">
                            <div
                                style={{minHeight: '100%'}}
                                className="card grow text-white bg-info mx-auto"
                                
                                onClick={e => props.handleComponentChange("InsertShipment")}
                            >
                                <div className="card-header py-3 font-bold"><h3 className="text-white">

                                    Insert a Shipment
                                </h3>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-3">
                                        Pickups, Inbounds, or Customer Drop Off
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="card grow text-white bg-danger mb-3 mx-auto"
                                style={{minHeight: '100%'}}
                                onClick={e => props.handleComponentChange("UpdateShipment")}
                            >
                                <div className="card-header  py-3 font-bold"><h3 className="text-white">

                                    Update a Shipment
                                </h3>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-3">
                                        Shipment delivered, brought back as an
                                        attempt, or returned? Update here.
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Manifest */}
                <div className="container py-5">
                <h4 className='text-white '>Outbounds</h4>
                <hr className='border-secondary'></hr>
                    <div className="row">
                        <div className="col">
                            <div
                                className="card grow text-dark bg-secondary mb-3 mx-auto"
                                style={{minHeight: '100%'}}
                                onClick={e => props.handleComponentChange("CreateOutbound")}
                            >
                                <div className="card-header py-3 font-bold"><h4 className="text-dark">

                                    Create an Outbound Manifest
                                </h4>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-2">
                                        Shipments transfered to another carrier.
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="card grow text-white bg-dark mb-3 mx-auto"
                                style={{minHeight: '100%'}}
                                onClick={e => props.handleComponentChange("PrintTruckManifest")}
                            >
                                <div className="card-header py-3 font-bold"><h3 className="text-white">

                                    Print a Truck Manifest
                                </h3>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-3" >
                                        Print by Manifest Number
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Driver */}
                <div className="container"> 
                <h4 className='text-white mt-5'>Drivers & Trips</h4>
                <hr className='border-secondary'></hr>
                    <div className="row">
                        <div className="col">
                            <div
                                className="card grow text-white bg-warning mb-3 mx-auto"
                                style={{minHeight: '100%'}}
                                onClick={e => props.handleComponentChange("CreateDriverTrip")}
                            >
                                <div className="card-header py-3 font-bold"><h3 className="text-white">

                                    Create a driver trip
                                </h3>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-3">
                                        Shipments Out For Delivery
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="card grow text-white bg-success mb-3 mx-auto"
                                style={{minHeight: '100%'}}
                                onClick={e => props.handleComponentChange("ModifyDrivers")}
                            >
                                <div className="card-header py-3 font-bold"><h4 className="text-white">

                                    Driver Functions
                                </h4>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pt-3">
                                        Add, Remove, Update a Driver
                                    </h5>
                                    <p className="card-text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                             {/* Reports*/}
                <div className="container pt-5 mt-5"> 
                <h4 className='text-white'>Reports</h4>
                <hr className='border-secondary'></hr>
                    <div className="row">
                        <div className="col">
                            <div style={{background: '#a55eea', minHeight: '190px'}}
                                className="card grow text-white  mb-3 mx-auto px-2 py-3"
                                
                                onClick={e => props.handleComponentChange("FindShipments")}
                            >
                                
                                    <h3 className='text-white'>Find Shipments</h3>
                                
                                <div className="card-body">
                                    <p className="card-text"> Search by Vendor,Date, etc.</p> 
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div style={{background: '#0fb9b1', minHeight: '190px'}}
                                className="card grow text-white mb-3 mx-auto px-2 py-3"
                                
                                onClick={e => props.handleComponentChange("FindDriverTrips")}
                            >
                                <h3 className='text-white'>Find Driver Trips</h3>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        
                                    </h5>
                                    <p className="card-text">Search by Date or Driver</p> 
                                </div>
                            </div>
                        </div>

                        {/* <div className="col">
//                             <div style={{background: '#eb3b5a', height: '160px'}}
//                                 className="card grow text-white mb-3 mx-auto px-2 py-3"
                                
//                                 onClick={e => props.handleModifyDrivers(e)}
//                             >
//                                <h3 className='text-white'>Find Driver Trips</h3>
//                                 <div className="card-body">
//                                     <p className="card-text">Find driver trips</p> 
//                                 </div>
//                             </div>
//                         </div> */}

                    </div>
                </div>


            </div>
        </section>
    );
};
