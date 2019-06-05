import React, { Component } from "react";

export default class FindDriverTrips extends Component {
    constructor() {
        super();
        this.state = {
            allDrivers: [],
            loaded: false,
            driver_trips: [],
            trips_loaded: false
        };
    }

    componentDidMount() {
        this.getAllDrivers();
    }

    // Loads active drivers in select field
    getAllDrivers = () => {
        fetch("http://localhost:5000/driver/all", {
            method: "get"
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({drivers: 'all'})
        })
            .then(res => res.json())
            .then(allDrivers => {
                this.setState({
                    allDrivers: allDrivers,
                    loaded: true
                });
            });
    };

    handleFindDriverTrips = e => {
        e.preventDefault();
        let driver_id = document.getElementById("driver").value;
        let date = document.getElementById("date").value;
      
        if (driver_id === "" && date === "") {
            fetch("http://localhost:5000/trips/")
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        driver_trips: data,
                        trips_loaded: true
                    });
                });
        }
         else if (date === "" && driver_id !== "") {
            fetch("http://localhost:5000/trips/" + driver_id)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        driver_trips: data,
                        trips_loaded: true
                    });
                });
        }
        else if(driver_id === "" && date !== "") {
          fetch("http://localhost:5000/trips/date/" + date)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        driver_trips: data,
                        trips_loaded: true
                    });
                });
        }
        else if(driver_id !== "" && date !== "") {                      
          fetch("http://localhost:5000/trips/")
                .then(res => res.json())
                .then(data => {
                  let filtered = data.filter((val, index) => val.driver_id === driver_id && val.date.slice(0,10) === date )
            
                    this.setState({
                        driver_trips: filtered,
                        trips_loaded: true
                    });
                });
        }
    };
    openDriverTrip(e) {
        e.preventDefault();
        let trip_id = e.target.parentNode.id;
        let date = this.state.driver_trips[trip_id].date.slice(0, 10);
        let delivery_zone = this.state.driver_trips[trip_id].zone;
        let pcs = this.state.driver_trips[trip_id].pieces;
        let weight = this.state.driver_trips[trip_id].weight;
        let driver_name =
            this.state.driver_trips[trip_id].first_name +
            " " +
            this.state.driver_trips[trip_id].last_name;
        let table_data = JSON.parse(this.state.driver_trips[trip_id].pros);

        let table_markup = "";

        //Creates the driver trip table with shipment information

        table_data.forEach((pro, index) => {
            table_markup =
                table_markup +
                `
    <tr class='text-dark'>
      <td>${index + 1}</td>
      <td>${pro.vendor}</td>
      <td>${pro.pro}</td>
      <td>${pro.consignee}</td>
      <td>${pro.citystate}</td>
      <td>${pro.notes}</td>
      <td>${pro.pieces}</td>
      <td>${pro.weight}</td>
    </tr>
    `;
        });

        let win = window.open(
            "",
            "TRUCK MANIFEST",
            "toolbar=yes,directories=no, status=no, width=1440, height=920 "
        );
        win.document.head.insertAdjacentHTML(
            "afterbegin",
            `<link
  rel="stylesheet"
  href="https://bootswatch.com/4/lux/bootstrap.min.css"
  /><style>@page{size: A4 landscape}</style>`
        );

        win.document.body.classList.add("py-3");
        win.document.body.classList.add("px-5");
        win.document.body.classList.add("d-flex");
        win.document.body.classList.add("flex-column");
        let headerTemplate = `
  <div class='container-fluid text-center'>
  <h2>JSL Transportation Delivery Manifest</h2>
    <div class='text-left my-4'>
    <h5 class='my-3'>Date: ${date}</h5>
    <h5 class='my-3'>Driver: ${driver_name}</h5>
    <h5 class='my-3'>Delivery Zone: ${delivery_zone}</h5>
    </div>
  </div>
  <hr class='border border-primary my-3' />
`;
        let table = `
    <table class='table table-striped'>
    <thead class='text-dark'>
      <tr>
      <th>Stop:</th>
      <th>Vendor:</th>
      <th>Pro Number:</th>
      <th>Consignee:</th>
      <th>City/State:</th>
      <th>Apts:</th>
      <th>Pieces:</th>
      <th>Weight:</th>
      
      </tr>
    </thead>
    <tbody id='table_data'>
   ${table_markup}
    </tbody>
    
    </table>

`;
        let footerTemplate = `
<div style="position: absolute; bottom: 50px; right: 75px;">

<h5>Total Pcs:  ${pcs}</h5>
<h5>Total Weight: ${weight}</h5>
</div>
`;

        win.document.body.insertAdjacentHTML("afterbegin", headerTemplate);
        win.document.body.insertAdjacentHTML("beforeend", table);

        win.document.body.insertAdjacentHTML("beforeend", footerTemplate);
    }

    render() {
        return (
            <div className="container mt-5 text-center">
                <h1>Find Driver Trips</h1>

                <form
                    className=" mt-3"
                    onSubmit={e => this.handleFindDriverTrips(e)}
                >
                    <div className="row">
                        <div className="col">
                            <label className="mr-3" htmlFor="firstname">
                                Drivers:
                            </label>
                            <select
                                className="form-control border border-dark"
                                type="text"
                                id="driver"
                            >
                                <option value="">All Drivers</option>
                                {this.state.loaded === true
                                    ? this.state.allDrivers.map(driver => {
                                          return (
                                              <option
                                                  key={driver.id}
                                                  value={driver.id}
                                              >
                                                  {driver.first_name} {" "}
                                                  {driver.last_name}
                                              </option>
                                          );
                                      })
                                    : ""}
                            </select>
                        </div>

                        <div className="col">
                            <label className="mx-3" htmlFor="date">
                                Date:
                            </label>
                            <input
                                className="form-control border border-dark"
                                type="date"
                                id="date"
                            />
                        </div>

                        <div className="col">
                            <label className="mb-1" />
                            <input
                                type="submit"
                                className=" btn btn-success mt-4"
                            />

                            <button
                                className="btn btn-info mt-4 ml-5"
                                onClick={e => this.props.handleBackBtn(e)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </form>
                <hr className="my-5" />
                <table className="table table-hover" id="driver_trips">
                    <thead className="thead-dark">
                        <tr>
                            <th>Driver:</th>
                            <th>Date:</th>
                            <th>Zone:</th>
                            <th>Pieces:</th>
                            <th>Weight:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trips_loaded === true
                            ? this.state.driver_trips.map((trip, index) => {
                                  return (
                                      <tr
                                          className="text-dark"
                                          id={index}
                                          key={index}
                                          onClick={e => this.openDriverTrip(e)}
                                      >
                                          <td>
                                              {trip.first_name} {trip.last_name}
                                          </td>
                                          <td>{trip.date.slice(0, 10)} </td>
                                          <td>{trip.zone} </td>
                                          <td>{trip.pieces} </td>
                                          <td>{trip.weight} </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
        );
    }
}
