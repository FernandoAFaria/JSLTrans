import React from "react";
import InsertShipment from "./Dashboard/InsertShipment";

import UpdateShipment from './Dashboard/UpdateShipment'

//default Controls
//This holds all functions for displaying different dashboard components

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            component: "Controls"
        };
    }
    componentDidMount(){
       this.searchProsByField('edi','status', 'picked up', 'edi-on-hand');
       this.searchProsByField('hercules','status', 'picked up', 'hercules-on-hand');
       this.searchProsByField('clear lane','status', 'picked up', 'clearlane-on-hand');
      
       
    }


    searchProsByField(vendor, field,  value, populate){

        //('EDI', 'STATUS', 'PICKED UP', 'edi-on-hand')
        fetch('http://localhost:5000/api/search', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                vendor: vendor,
                field: field,
                value: value
            })
        }).then(res => res.json())
        .then(data =>  {
            document.getElementById(populate).textContent = data.length;
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
                        handleInsertShipment={this.handleInsertShipment}
                        
                        handleUpdateShipment={this.handleUpdateShipment}
                    />
                );

            case "InsertShipment":
                return <InsertShipment handleBackBtn={this.handleBackBtn} />;
            
          

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
                        <td>Total On-Hand Shipments</td>
                        <td>Out For Delivery</td>
                    </tr>
                    </thead>
                    
               <tbody>
                   <tr>
                        <th>EDI:</th>
                       <td id='edi-on-hand'>1234</td>
                       <td id='edi-ofd'>123</td>
                    </tr>
                    <tr>
                        <th>CLEAR LANE:</th>
                       <td id='clearlane-on-hand'>1234</td>
                       <td id='clearlane-ofd'>123</td>
                    </tr>
                    <tr>
                        <th>HERCULES:</th>
                       <td id='hercules-on-hand'>1234</td>
                       <td id='hercules-ofd'>123</td>
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
