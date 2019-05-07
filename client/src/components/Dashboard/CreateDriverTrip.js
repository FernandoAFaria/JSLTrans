import React, { Component } from "react";

export default class CreateDriverTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drivers: [],
      lastTripID: 0,
      driversLoaded: false,
      pros: [],
      stopCount: [1, 2]
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/driver/all")
      .then(res => res.json())
      .then(drivers => {
        this.setState({
          drivers: drivers,
          driversLoaded: true
        });
      });
  }

  populateProInfo(id) {
    let stopCountCopy = this.state.stopCount;
    stopCountCopy.push(this.state.stopCount.length + 1);

    let pro = document.getElementById(id).value;
    let consignee = document.getElementById(`${id}-consignee`);
    let citystate = document.getElementById(`${id}-citystate`);
    let pcs = document.getElementById(`${id}-pcs`);
    let weight = document.getElementById(`${id}-weight`);
    let stop = document.getElementById(`${id}-stop`);

    if (pro !== "") {
      fetch(`http://localhost:5000/pro/${pro}`)
        .then(res => res.json())
        .then(data => {
          if (data.length === 0) {
            stop.value = id.slice(4, id.length);
            consignee.value = "Not Found";
            this.setState({
              stopCount: stopCountCopy
            });
          } else {
            consignee.value = data[0].toName;
            citystate.value = data[0].toCity + " " + data[0].toState;
            pcs.value = data[0].pieces;
            weight.value = data[0].weight;
            stop.value = id.slice(4, id.length);

            this.setState({
              stopCount: stopCountCopy
            });
          }
        });
    }
  }

  calculateByClassColumn(className){
    let columns = document.getElementsByClassName(className);
    let count = 0;
    for(let i = 0; i < columns.length; i++){
      if(columns[i].value !==""){
        count += parseInt(columns[i].value)
      }
    }
    return count;
  }

  printDriverTrip(e) {
    e.preventDefault();
    let weight = this.calculateByClassColumn('weight');
    let pcs = this.calculateByClassColumn('pcs')
    let driverId = document.getElementById('driverId').value

    //This will fetch the driver's name
    fetch(`http://localhost:5000/driver/single/${driverId}`)
    .then(res => res.json())
    .then(driver => {
      //once it got the drivers info, will create the window and populate the results

      let date = document.getElementById('date').value;
      let deliveryZone = document.getElementById('zone').value
      let form = document.getElementById("driver-trip-table").cloneNode(true);
      let win = window.open(
        "",
        "TRUCK MANIFEST",
        "toolbar=yes,directories=no, status=no, width=1280, height=720 "
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
      win.document.body.classList.add('d-flex');
      win.document.body.classList.add('flex-column');
      let headerTemplate = 
      `
        <div class='container-fluid text-center'>
        <h2>JSL Transportation Delivery Manifest</h2>
          <div class='text-left my-4'>
          <h5 class='my-2'>Date: ${date}</h5>
          <h5 class='my-2'>Driver: ${driver[0].first_name} ${driver[0].last_name}</h5>
          <h5 class='my-2'>Delivery Zone: ${deliveryZone}</h5>
          </div>
        </div>
        <hr />
      `;
      let footerTemplate = `
      <div style="position: absolute; bottom: 20px; right: 50px;">
      
      <h5>Total Pcs:  ${pcs}</h5>
      <h5>Total Weight: ${weight}</h5>
      </div>
      `;
      win.document.body.insertAdjacentHTML('afterbegin', headerTemplate)
      win.document.body.insertAdjacentElement('beforeend', form)
      win.document.body.insertAdjacentHTML('beforeend', footerTemplate)

    })
    
    
  }

  submitDriverTrip(e) {
    e.preventDefault();
    const driverId = document.getElementById("driverId").value;
    const date = document.getElementById("date").value;
    const deliverZone = document.getElementById("zone").value;
    let pros = [];
    let pro = document.getElementsByClassName("pro");
    let notes = document.getElementsByClassName("notes");

    for (let i = 0; i < pro.length; i++) {
      if (pro[i].value !== "") {
        pros.push({ pro: pro[i].value, notes: notes[i].value || " " });
      }
    }
    const driverTripData = {
      driverId,
      date,
      zone: deliverZone,
      pros
    };
    fetch("http://localhost:5000/trips", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverTripData)
    })
      .then(response => response.json())
      .then(myData => {
        console.log(myData);
        if (myData.affectedRows === 1) {
          document.getElementById("insert-message").textContent =
            "DRIVER TRIP CREATED";
            this.updateStatuses();
        } else {
          document.getElementById("insert-message").textContent =
            "Something went wrong, nothing added";
        }
      });
  }

  //Update Status on pros showing Out for Delivery + date
  updateStatuses(){
    let pro = document.getElementsByClassName("pro");
    let date = document.getElementById('date').value
    let status = `OFD on ${date}`
    for (let i = 0; i < pro.length; i++) {
      if(pro[i].value !== "") {
        //Create a fetch for each good pro
      //Check if pro is in system first
      fetch(`http://localhost:5000/pro/${pro[i].value}`)
      .then(res => res.json())
      .then(data => {
        //if pro exists then update status
        if(data.length !== 0) {
          let bodyData = {
            pro:pro[i].value,
            status: status
          }
          fetch('http://localhost:5000/pro/updateStatus', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
          }).then(response => console.log(response))
        }
      })


      }
    
    }

    //clear the form
  }

  //Clear the form

  render() {
    return (
      <div className="container-fluid px-5 my-5 text-center">
        <h1 className="mt-5">Create a Driver Trip</h1>
        <form className="form mt-5">
          <div className="row">
            <div className="col">
              <label htmlFor="driver">Driver:</label>
              <select
                id="driverId"
                className="form-control border border-danger"
              >
                {this.state.driversLoaded === true
                  ? this.state.drivers.map(driver => {
                      if (driver.status === "Active") {
                        return (
                          <option
                            key={driver.id}
                            value={driver.id}
                          >
                            {driver.first_name +
                              " " +
                              driver.last_name +
                              " -- " +
                              driver.vehicle}
                          </option>
                        );
                      } else {
                        return "";
                      }
                    })
                  : null}
              </select>
            </div>

            <div className="col">
              <label htmlFor="date">Route Date:</label>
              <input
                className="form-control border border-danger"
                name="date"
                type="date"
                id="date"
              />
            </div>

            <div className="col">
              <label htmlFor="zone">Delivery Zone:</label>
              <input
                className="form-control border border-danger"
                name="zone"
                type="text"
                id="zone"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-info my-4"
                onClick={e => this.props.handleBackBtn(e)}
              >
                Back
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-success my-4"
                onClick={e => this.printDriverTrip(e)}
              >
                Print
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-danger my-4"
                onClick={e => this.submitDriverTrip(e)}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col alert  text-center">
              <h1 id="insert-message"> </h1>
            </div>
          </div>
        </form>

        <p>Pros</p>
        <table id="driver-trip-table" className="table-striped">
          <thead className="text-dark border">
            <tr style={{ height: "25px" }}>
              <th style={{ width: "50px" }}>#</th>
              <th >Pro#</th>
              <th>Consignee</th>
              <th>City/State</th>
              <th>Apts</th>
              <th style={{ width: "50px" }}>Pcs</th>
              <th style={{ width: "100px" }}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stopCount.map(val => {
              return (
                <tr key={val}>
                  <td>
                    <input
                      id={"stop" + val + "-stop"}
                      style={{ width: "50px" }}
                      className="border"
                    />
                  </td>
                  <td>
                    <input
                      className="pro"
                      id={"stop" + val}
                      tabIndex={val}
                      onBlur={e => {
                        this.populateProInfo(e.target.id);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      id={"stop" + val + "-consignee"}
                      className="border"
                    />
                  </td>
                  <td>
                    <input
                      id={"stop" + val + "-citystate"}
                      className="border"
                    />
                  </td>
                  <td>
                    <input
                      id={"stop" + val + "-apts"}
                      className="border notes"
                    />
                  </td>
                  <td>
                    <input
                      id={"stop" + val + "-pcs"}
                      className="border pcs"
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>
                    <input id={"stop" + val + "-weight"} className="border weight" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
