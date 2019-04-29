import React, { Component } from "react";

export default class CreateOutbound extends Component {
    constructor() {
        super();
        this.state = {
            vendor: "",
            date: "",
            carrier: "",
            trailerNumber: "",
            loader: "",
            destination: "",
            manifest: "",
            prosTo24: [],
            pros25To50: []
        };
    }
    handleVendorChange = e => {
        this.setState({
            vendor: e.target.value
        });
    };
    handleDateChange = e => {
        this.setState({
            date: e.target.value
        });
    };
    handleCarrierChange = e => {
        this.setState({
            carrier: e.target.value
        });
    };
    handleTrailerNumberChange = e => {
        this.setState({
            trailerNumber: e.target.value
        });
    };
    handleLoaderChange = e => {
        this.setState({
            loader: e.target.value
        });
    };
    handleDestinationChange = e => {
        this.setState({
            destination: e.target.value
        });
    };
    handleManifest = e => {
        this.setState({
            manifest: e.target.value
        });
    };

    handleCreateOutbound = e => {
        e.preventDefault();
        let allPros = document.getElementsByClassName("manifest-pro");
        let proList24 = [];
        let proList25To50 = [];
        for (let i = 0; i < allPros.length; i++) {
            if (allPros[i].value !== "") {
                if (i < 25) {
                    proList24.push(allPros[i].value);
                } else {
                    proList25To50.push(allPros[i].value);
                }
            }
        }

        while (proList24.length < 25) {
            proList24.push(" ");
        }
        while (proList25To50.length < 15) {
            proList25To50.push(" ");
        }
        this.setState({
            prosTo24: proList24,
            pros25To50: proList25To50
        });
        setTimeout(() => {
          console.log(this.state.prosTo24)
          console.log(this.state.pros25To50)
          this.calcShipments();
          this.calcWeight();
        },2000)
        document.getElementById('top-nav-bar').style.display = 'none'
        document.getElementById('input-outbound-form').style.display = 'none';
        document.getElementById('load-card').style.visibility = 'visible';
    };

    getPieces = (pro, pltOrWt) => {
        fetch(`http://localhost:5000/api/${pro}`)
            .then(res => res.json())
            .then(data => {
               
                if (data.length > 0 && !data.error) {
                    if (pltOrWt === "plt") {
                        document.getElementById(`${pro}plt`).textContent =
                            data[0].pallets;
                    } else {
                        document.getElementById(`${pro}wt`).textContent =
                            data[0].weight;
                    }
                } else {
                    return "";
                }
            });
    };
    calcShipments() {
      let count = 0
      this.state.prosTo24.forEach(ea => {
        if(ea !== " ") {
          count = count + 1;
        }
      })
      this.state.pros25To50.forEach(ea => {
        if(ea !== ' ') {
          count = count + 1;
        }
      })
      
     document.getElementById('total-shipments').innerText = count;
    }
    calcWeight() {
      let weight = 0;
      let weightFields = document.getElementsByClassName('weight');
      
      for(let i = 0; i < weightFields.length; i++) {
        console.log(weightFields[i].innerText)
        if(weightFields[i].innerText !== "") {
          weight = weight + parseInt(weightFields[i].innerText);
        }
        
      }
    
      document.getElementById('total-weight').innerText = weight;
    }

    render() {
        return (
            <div className=" my-2 container-fluid  px-5">
            <section id='input-outbound-form'>
                <form onSubmit={e => this.handleCreateOutbound(e)}>
                    <h1>Create an Outbound Manifest</h1>
                    <div>
                        <div className="row">
                            <div className="col">
                                <label className="text-dark" htmlFor="vendor">
                                    Vendor:
                                </label>
                                <input
                                    required
                                    name="vendor"
                                    placeholder="EDI"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.vendor}
                                    onChange={e => this.handleVendorChange(e)}
                                />
                            </div>
                            <div className="col">
                                <label className="text-dark" htmlFor="date">
                                    Date:
                                </label>
                                <input
                                    required
                                    name="date"
                                    type="date"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.date}
                                    onChange={e => this.handleDateChange(e)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="text-dark" htmlFor="carrier">
                                    Carrier:
                                </label>
                                <input
                                    required
                                    name="carrier"
                                    placeholder="West Trucking"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.carrier}
                                    onChange={e => this.handleCarrierChange(e)}
                                />
                            </div>
                            <div className="col">
                                <label className="text-dark" htmlFor="vendor">
                                    Trailer Number:
                                </label>
                                <input
                                    required
                                    name="vendor"
                                    
                                    className="form-control border border-dark mx-3"
                                    value={this.state.trailerNumber}
                                    onChange={e =>
                                        this.handleTrailerNumberChange(e)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="text-dark" htmlFor="vendor">
                                    Destination:
                                </label>
                                <input
                                    required
                                    name="vendor"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.destination}
                                    onChange={e =>
                                        this.handleDestinationChange(e)
                                    }
                                />
                            </div>
                            <div className="col">
                                <label className="text-dark" htmlFor="vendor">
                                    Loader:
                                </label>
                                <input
                                    required
                                    name="vendor"
                                    type="text"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.loader}
                                    onChange={e => this.handleLoaderChange(e)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button
                                    className="btn btn-danger mt-5 ml-3"
                                    onClick={this.props.handleBackBtn}
                                >
                                    Back
                                </button>
                            </div>
                            <div className="col">
                                <label className="text-dark" htmlFor="manifest">
                                    Manifest Number:
                                </label>
                                <input
                                    required
                                    name="manifest"
                                    type="number"
                                    className="form-control border border-dark mx-3"
                                    value={this.state.manifest}
                                    onChange={e => this.handleManifest(e)}
                                />
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="container-fluid mx-5">
                            <p>Pros:</p>
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                            <input className="manifest-pro mx-2 my-2" />
                        </div>
                        <div className="container-fluid">
                            <button className="btn btn-success ml-5 mt-4">
                                GENERATE
                            </button>
                        </div>
                    </div>
                </form>

                <hr className="my-1" />
</section>

                <div id='load-card' className="container-fluid header py-4 border border-dark px-5">
                    <h2>{this.state.vendor} Load Card</h2>
                    <div className="row mt-4 mb-2">
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Carrier: {this.state.carrier}
                            </h5>
                        </div>
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Origin: JSL Transportation
                            </h5>
                        </div>
                    </div>

                    <div className="row my-3 ">
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Trailer Number: {this.state.trailerNumber}
                            </h5>
                        </div>
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Loaded By: {this.state.loader}
                            </h5>
                        </div>
                    </div>
                    <div className="row my-3 ">
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Manifest Number: {this.state.manifest}
                            </h5>
                        </div>
                        <div className="col">
                            <h5
                                style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Date: {this.state.date}
                            </h5>
                        </div>
                    </div>
                    <hr className="border border-dark my-2" />

                    <div id="outbound-manifest-created">
                        <table id="outbound-table">
                            <thead>
                                <tr>
                                    <td className="sm" />
                                    <td className="xl">
                                        <h5>PRO NUM</h5>
                                    </td>
                                    <td className="lg">
                                        <h5>Pieces</h5>
                                    </td>
                                    <td className="lg">
                                        <h5>Weight</h5>
                                    </td>
                                    <td className="sm">
                                        <h5>INT</h5>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.prosTo24.map((pro, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-dark">
                                                {index + 1}
                                            </td>
                                            <td>{pro}</td>
                                            <td id={pro + "plt"}>
                                                {this.getPieces(pro, "plt")}
                                            </td>
                                            <td className='weight' id={pro + "wt"}>
                                                {this.getPieces(pro, "wt")}
                                            </td>
                                            <td />
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div id="right-form">
                            <div className="destination-field">
                                {this.state.destination}
                            </div>
                            <table className="ml-3" id="outbound-table-right">
                                <thead>
                                    <tr>
                                        <td className="sm" />
                                        <td className="xl">
                                            <h5>PRO NUM</h5>
                                        </td>
                                        <td className="xl">
                                            <h5>Pieces</h5>
                                        </td>
                                        <td className="xl">
                                            <h5>Weight</h5>
                                        </td>
                                        <td className="sm">
                                            <h5>INT</h5>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pros25To50.map((pro, index) => {
                                        return (
                                            <tr key={index+26}>
                                                <td className="text-dark">
                                                    {index + 26}
                                                </td>
                                                <td>{pro}</td>
                                                <td id={pro + "plt"}>
                                                    {this.getPieces(pro, "plt")}
                                                </td>
                                                <td className='weight' id={pro + "wt"}>
                                                    {this.getPieces(pro, "wt")}
                                                </td>
                                                <td />
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row mt-5'>
                      <div className='col'>
                                      <h5>Total Shipments:</h5>
                    
                      
                                      <h5 id='total-shipments'  style={{
                                      maxWidth: "375px",
                                      borderBottom: "2px solid black"
                                  }}> </h5>
                      </div>
                      <div className='col'>
                                    <h5>Total Weight:</h5>
                   
                    
                                    <h5 id='total-weight'  style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}> </h5>
                    </div>

                    <div className='col'>
                                    <h5>Photo Half:</h5>
                   
                    
                                    <h5  style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}> </h5>
                    </div>
                    <div className='col'>
                                    <h5>Photo Tail:</h5>
                   
                    
                                    <h5   style={{
                                    maxWidth: "375px",
                                    borderBottom: "2px solid black"
                                }}> </h5>
                    </div>
                    
                    
                    </div>
                    <div className='row'>
                    <div className='col py-5'>
                                      <h5>Seal Number:</h5>
                    
                      
                                      <h5  style={{
                                      maxWidth: "375px",
                                      borderBottom: "2px solid black"
                                  }}> </h5>
                      </div>
                      <div className='col py-5'>
                                      <h5>Trailer Capacity:</h5>
                    
                      
                                      <h5  style={{
                                      maxWidth: "375px",
                                      borderBottom: "2px solid black"
                                  }}> </h5>
                      </div>
                    
                      <div className='col border border-dark py-5'>
                                      <h5>Weight at Nose:</h5>
                    
                      
                                      <h5  style={{
                                      maxWidth: "375px"
                                  }}> </h5>
                      </div>
                      <div className='col border border-dark py-5'>
                                      <h5>Wt Tail:</h5>
                    
                      
                                      <h5  style={{
                                      maxWidth: "375px"
                                  }}> </h5>
                      </div>
                    </div>
                </div>
            </div>
        );
    }
}
