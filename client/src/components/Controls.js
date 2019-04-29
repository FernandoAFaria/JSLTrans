import React from "react";
import InsertShipment from "./Dashboard/InsertShipment";
import CreateOutbound from './Dashboard/CreateOutbound';
import UpdateShipment from './Dashboard/UpdateShipment';

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
        // try {
        //     this.updateStatuses();
        // } catch(err){

        // }
       
        this.updateStatuses();
    }

    updateStatuses() {
        this.searchProsByField('edi', 'status', 'picked up', 'edi-on-hand-outbound');
        this.searchProsByField('hercules', 'status', 'picked up', 'hercules-on-hand-outbound');
        this.searchProsByField('clear lane', 'status', 'picked up', 'clearlane-on-hand-outbound');
        this.searchProsByField('edi', 'status', 'ofd', 'edi-ofd');
        this.searchProsByField('hercules', 'status', 'ofd', 'hercules-ofd');
        this.searchProsByField('clear lane', 'status', 'ofd', 'clearlane-ofd');
    }

    searchProsByField(vendor, field, value, populate) {

        //('EDI', 'STATUS', 'PICKED UP', 'edi-on-hand')
        fetch('http://localhost:5000/api/search', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vendor: vendor,
                field: field,
                value: value
            })
        }).then(res => res.json())
            .then(data => {
                document.getElementById(populate).textContent = data.length;
            })
    }

    printOnHand = (vendor, field, value) => {


        let win = window.open("", "On Hand", "toolbar=yes,directories=no, status=no, width=1020, height=1280 ")
        win.document.head.insertAdjacentHTML('afterbegin', `<link
       rel="stylesheet"
       href="https://bootswatch.com/4/lux/bootstrap.min.css"
   />`)
        win.document.body.classList.add('container')
        win.document.body.classList.add('py-5')
        win.document.body.insertAdjacentHTML('afterbegin', `<h1>${vendor}</h1>`)



        fetch('http://localhost:5000/api/search', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vendor: vendor,
                field: field,
                value: value
            })
        }).then(res => res.json())
            .then(data => {
                let table = document.createElement('table')
                data.forEach((pro) => {
                    

                    let html = `
                    <tr class='my-1'>
                        <td class='mx-2'>Customer Name: <span class='mx-2 text-dark'>${pro.fromName}</span>
                        </td> 
                        <td class='mx-2'>Pro Number: <span class='text-dark mx-2'>${pro.pro}</span></td> 
                        <td class='mx-2'>Date: <span class='mx-2 text-danger'>${pro.date}</span></td> 
                        <td> Pallets: <span class='text-dark mx-2'>${pro.pallets}</span></td> <td class='mx-2'> Weight: <span class='text-dark mx-2'>${pro.weight}</span>
                    </tr>`

                    table.insertAdjacentHTML('beforeend', html)

                })
                win.document.body.insertAdjacentElement('beforeend', table);
            })

    }

    handleInsertShipment = e => {
        e.preventDefault();
        this.setState({
            component: "InsertShipment"
        });
    };

    handleUpdateShipment = e => {
        e.preventDefault();
        this.setState({
            component: "UpdateShipment"
        });
    };
    handleCreateOutbound = e => {
        e.preventDefault();
        this.setState({
            component: "CreateOutbound"
        });
    };
    handleBackBtn = e => {
        e.preventDefault();
        this.setState({
            component: "Controls"
        });
        this.updateStatuses();
    };

    render() {
        switch (this.state.component) {
            case "Controls":
                return (
                    <ControlCenter
                        handleInsertShipment={this.handleInsertShipment}
                        printOnHand={this.printOnHand}
                        handleUpdateShipment={this.handleUpdateShipment}
                        handleCreateOutbound={this.handleCreateOutbound}
                    />
                );

            case "InsertShipment":
                return <InsertShipment handleBackBtn={this.handleBackBtn} />;

            case "CreateOutbound":
                return <CreateOutbound handleBackBtn={this.handleBackBtn} />;

            case "UpdateShipment":
                return <UpdateShipment handleBackBtn={this.handleBackBtn} />

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
            <table id='on-hand-totals' className='my-5 ml-auto mr-auto text-left'>
                <thead>
                    <tr>
                        <td>Customer</td>
                        <td>Total On-Hand Outbounds</td>
                        
                        <td>Out For Delivery</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th>EDI:</th>
                        {/* vendor, field, value */}
                        <td ><span id='edi-on-hand-outbound'></span><button onClick={() => props.printOnHand('EDI', 'status', 'picked up')} className='btn btn-sm ml-3 '>view</button></td>
                        
                        <td ><span id='edi-ofd'></span></td>
                    </tr>
                    <tr>
                        <th>CLEAR LANE:</th>
                        <td ><span id='clearlane-on-hand-outbound'></span><button onClick={() => props.printOnHand('CLEAR LANE', 'status', 'picked up')} className='btn btn-sm ml-3 '>view</button></td>
                        
                        <td ><span id='clearlane-ofd'></span></td>
                    </tr>
                    <tr>
                        <th>HERCULES:</th>
                        <td ><span id='hercules-on-hand-outbound'></span><button onClick={() => props.printOnHand('HERCULES', 'status', 'picked up')} className='btn btn-sm ml-3 '>view</button></td>
                     
                        <td ><span id='hercules-ofd'></span></td>
                    </tr>

                </tbody>

            </table>
            <div
                style={{ minHeight: "90vh" }}
                className="container-fluid text-center pt-5 bg-light">
                <h3 className="text-dark">Dashboard</h3>


                <div
                    className="card grow text-white bg-info mb-3 mx-auto"
                    style={{ maxWidth: "55vw" }}
                    onClick={(e) => props.handleInsertShipment(e)}
                >
                    <div className="card-header">
                        Insert a Shipment
                        </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            Pickups, Inbounds, or Customer Drop Off
                            </h5>
                        <p className="card-text" />
                    </div>
                </div>



                <div
                    className="card grow text-white bg-danger mb-3 mx-auto"
                    style={{ maxWidth: "55vw" }}
                    onClick={(e) => props.handleUpdateShipment(e)}
                >
                    <div className="card-header">
                        Update a Shipment
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
                    onClick={(e) => props.handleCreateOutbound(e)}
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
