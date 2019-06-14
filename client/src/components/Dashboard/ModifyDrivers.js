import React, { Component } from "react";

export default class ModifyDrivers extends Component {
  constructor() {
    super();
    this.state = {
      allDrivers: [],
      loaded: false,
      currentDriverID: 0
    };
  }
  componentDidMount() {
    //fetch all divers and load into state
    this.getAllDrivers();
 
      window.scrollTo(0,0);
    
  }

  getAllDrivers = () => {
    fetch("http://73.10.32.79:8137/driver/all", {
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

  handleInsertDriver = e => {
    e.preventDefault();
    document.getElementById("insert-message").style.display = "none";
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let vehicle = document.getElementById("vehicle").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    //Lets check if Driver exists first

    fetch("http://73.10.32.79:8137/driver/find", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: firstname, lastname: lastname })
    })
      .then(res => res.json())
      .then(myData => {
        if (myData.length > 0) {
          //dirver found
          document.getElementById("insert-message").textContent =
            "Driver Already in System";
          document.getElementById("insert-message").style.display = "block";
        } else {
          //if no driver found, inserts the driver

          const driverData = {
            firstname: firstname,
            lastname: lastname,
            vehicle: vehicle,
            phone: phone,
            address: address
          };

          fetch("http://73.10.32.79:8137/driver", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(driverData)
          }).then(response => {
            if (response.status === 200) {
              document.getElementById("insert-message").textContent =
                "Driver inserted.";
              document.getElementById("insert-message").style.display = "block";
              document.getElementById("firstname").value = "";
              document.getElementById("lastname").value = "";
              document.getElementById("vehicle").value = "";
              document.getElementById("phone").value = "";
              document.getElementById("address").value = "";
              this.getAllDrivers();
            } else {
              document.getElementById("insert-message").textContent =
                "Something went wrong: " + response.statusText;
              document.getElementById("insert-message").style.display = "block";
            }
          });
        }
      });
  };

  handleModifyDriver = e => {
    e.preventDefault();

    document.getElementById("insert-message").style.display = "none";

    let firstname = document.getElementById("firstname-modify").value;
    let lastname = document.getElementById("lastname-modify").value;
    let vehicle = document.getElementById("vehicle-modify").value;
    let phone = document.getElementById("phone-modify").value;
    let address = document.getElementById("address-modify").value;
    let status = document.getElementById("status-modify").value;
    let notes = document.getElementById("notes-modify").value || " ";
    let id = this.state.currentDriverID;
    //Lets check if Driver exists first
    let modifiedData = {
      firstname,
      lastname,
      vehicle,
      phone,
      address,
      status,
      notes,
      id
    };

    fetch("http://73.10.32.79:8137/driver/", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedData)
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          currentDriverID: 0
        });
        document.getElementById("insert-message").textContent =
          "Change Successful";
        document.getElementById("insert-message").style.display = "block";
        document.getElementById("firstname-modify").value = "";
        document.getElementById("lastname-modify").value = "";
        document.getElementById("vehicle-modify").value = "";
        document.getElementById("phone-modify").value = "";
        document.getElementById("address-modify").value = "";
        document.getElementById("status-modify").value = "";
        document.getElementById("notes-modify").value = "";

        this.getAllDrivers();
      } else {
        document.getElementById("insert-message").textContent =
          "Something went wrong: " + response.statusText;
        document.getElementById("insert-message").style.display = "block";
      }
    });
  };

  handlePullDriverData = e => {
    e.preventDefault();
    document.getElementById("insert-message").style.display = "none";
    let firstname = document.getElementById("firstname-modify").value;
    let lastname = document.getElementById("lastname-modify").value;
    fetch("http://73.10.32.79:8137/driver/find", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: firstname, lastname: lastname })
    })
      .then(res => res.json())
      .then(myData => {
        if (myData.length === 0) {
          document.getElementById("insert-message").textContent =
            "DRIVER NOT FOUND ";
          document.getElementById("insert-message").style.display = "block";
        } else {
          const { vehicle, phone, address, status, notes } = myData[0];
          document.getElementById("phone-modify").value = phone;
          document.getElementById("address-modify").value = address;
          document.getElementById("vehicle-modify").value = vehicle;
          document.getElementById("status-modify").value = status;
          document.getElementById("notes-modify").value = notes;
          this.setState({
            currentDriverID: myData[0].id
          });
        }
      });
  };

  handleDeleteDriver = e => {
    e.preventDefault();

    document.getElementById("insert-message").style.display = "none";
    let name = e.target.id;
    let splitName = name.split(" ");
    let firstname = splitName[0];
    let lastname = splitName[2] || splitName[1];

    fetch("http://73.10.32.79:8137/driver", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: firstname, lastname: lastname })
    }).then(res => {
      if (res.status === 200) {
        this.getAllDrivers();
        document.getElementById("insert-message").textContent =
          "Driver Deleted.";
        document.getElementById("insert-message").style.display = "block";
      } else {
        alert("Couldnt delete driver, something went wrong");
      }
    });
  };

  render() {
    return (
      <div className="container my-5">
        <h1 className="mt-5">Insert a Driver</h1>
        <form className=" mt-3" onSubmit={e => this.handleInsertDriver(e)}>
          <div className="row">
            <div className="col">
              <label className="mr-3" htmlFor="firstname">
                First Name:
              </label>
              <input
                required
                className="form-control border border-dark"
                type="text"
                id="firstname"
              />
            </div>

            <div className="col">
              <label className="mx-3" htmlFor="lastname">
                Last Name:
              </label>
              <input
                required
                className="form-control border border-dark"
                type="text"
                id="lastname"
              />
            </div>

            <div className="col">
              <label className="mx-3" htmlFor="vehicle">
                Vehicle Type:
              </label>
              <input
                required
                className="form-control border border-dark"
                type="text"
                id="vehicle"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="mr-3" htmlFor="phone">
                Phone Number:
              </label>
              <input
                required
                className="form-control border border-dark"
                type="tel"
                id="phone"
              />
            </div>

            <div className="col">
              <label className="mx-3" htmlFor="address">
                Address:
              </label>
              <input
                required
                className="form-control border border-dark"
                type="text"
                id="address"
              />
            </div>

            <div className="col">
              <label className="mb-1" />
              <input type="submit" className=" btn btn-success mt-4" />

              <button
                className="btn btn-info mt-4 ml-5"
                onClick={e => this.props.handleBackBtn(e)}
              >
                Back
              </button>
            </div>
          </div>

          <div className="row">
            <div
              id="insert-message"
              style={{ display: "none" }}
              className="col mt-5 alert alert-success text-center"
            />
          </div>
        </form>

        <hr className="my-5 border border-dark" />

        <div>
          <h1>Modify a Driver</h1>
          <form>
            <div className="row">
              <div className="col">
                <label className="mr-3" htmlFor="firstname-modify">
                  First Name:
                </label>
                <input
                  required
                  className="form-control border border-dark mb-1"
                  type="text"
                  id="firstname-modify"
                />
              </div>

              <div className="col">
                <label className="mx-3" htmlFor="lastname-modify">
                  Last Name:
                </label>
                <input
                  required
                  className="form-control border border-dark mb-1"
                  type="text"
                  id="lastname-modify"
                />
              </div>

              <div className="col">
                <label />
                <button
                  className="btn btn-primary mt-4 ml-5"
                  onClick={e => this.handlePullDriverData(e)}
                >
                  Fetch
                </button>
              </div>

              <div className="col">
                <label />
                <button
                  className="btn btn-danger mt-4 ml-5"
                  onClick={e => this.handleModifyDriver(e)}
                >
                  Modify
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label className="mr-3" htmlFor="phone">
                  Phone Number:
                </label>
                <input
                  required
                  className="form-control border border-dark"
                  type="tel"
                  id="phone-modify"
                />
              </div>

              <div className="col">
                <label className="mx-3" htmlFor="address">
                  Address:
                </label>
                <input
                  required
                  className="form-control border border-dark"
                  type="text"
                  id="address-modify"
                />
              </div>

              <div className="col">
                <label className="mx-3" htmlFor="vehicle">
                  Vehicle Type:
                </label>
                <input
                  required
                  className="form-control border border-dark"
                  type="text"
                  id="vehicle-modify"
                />
              </div>

              <div className="col">
                <label className="mx-3" htmlFor="vehicle">
                  Status:
                </label>
                <select
                  required
                  className="form-control border border-dark"
                  type="text"
                  id="status-modify"
                  placeholder="truck, trailer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="col">
                <label className="mx-3" htmlFor="notes">
                  Notes:
                </label>
                <input
                  required
                  name="notes"
                  className="form-control border border-dark"
                  type="text"
                  id="notes-modify"
                />
              </div>
            </div>
          </form>
        </div>

        <hr className="my-5 border border-dark" />
        <div style={{ minHeight: "500px" }}>
          <h1> Drivers listed below</h1>

          <table className="table table-hover my-5">
            <thead className="thead-dark">
              <tr className="text-dark">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Vehicle Type</th>
                <th>Status</th>
                <th>Notes</th>
                <th />
              </tr>
            </thead>
            <tbody className="table-striped">
              {this.state.loaded === true
                ? this.state.allDrivers.map((driver, index) => {
                    return (
                      <tr key={index} className="text-dark">
                        <td>{driver.first_name}</td>
                        <td>{driver.last_name}</td>
                        <td>{driver.address}</td>
                        <td>{driver.phone}</td>
                        <td>{driver.vehicle}</td>
                        <td>{driver.status}</td>
                        <td>{driver.notes}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            id={driver.first_name + " " + driver.last_name}
                            onClick={e => this.handleDeleteDriver(e)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
