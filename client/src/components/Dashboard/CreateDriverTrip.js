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
    let pro = document.getElementById(id).value;
    let consignee = document.getElementById(`${id}-consignee`);
    let citystate = document.getElementById(`${id}-citystate`);
    let pcs = document.getElementById(`${id}-pcs`);
    let weight = document.getElementById(`${id}-weight`);
    let stop = document.getElementById(`${id}-stop`);
    let vendor = document.getElementById(`${id}-vendor`);

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
            pcs.innerText = data[0].pieces;
            weight.innerText = data[0].weight;
            stop.value = id.slice(4, id.length);
            vendor.innerText = data[0].vendor;
            //Stops adding fields if an old value is clicked
            if (!stopCountCopy.includes(parseInt(stop.value) + 1)) {
              stopCountCopy.push(this.state.stopCount.length + 1);
            }
            this.setState({
              stopCount: stopCountCopy,
              pros: [...this.state.pros, data[0]]
            });
          }
        });
    } else {
      //clears the fields if the pro# is deleted
      consignee.value = ""
      citystate.value = ""
      pcs.innerText = ""
      weight.innerText = ""
      stop.value = ""
      vendor.innerText = ""
    }
  }

  async createMapQuestMap() {
    //https://www.mapquestapi.com/staticmap/v5/map?key=ypVqLLcJIipNIuhONCGOT7wAISFEODCG&locations=Denver,CO||Boulder,CO&size=1100,500@2x
    
    let mapUrl = ""
    
    this.state.pros.forEach((pro,index) => {
      mapUrl = mapUrl + `${pro.toZipcode}|marker-${index+1}||`
    })
    const img = new Image();
    
  fetch(`https://www.mapquestapi.com/staticmap/v5/map?key=ypVqLLcJIipNIuhONCGOT7wAISFEODCG&locations=${mapUrl}&size=400,300@2x&format=png`)
    .then(response => response.body.getReader())
    .then(reader => {
      const stream = new ReadableStream({
        start(controller) {
          function push(){
            reader.read().then(({done, value}) => {
              if(done) {
                 controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            })
          }
          push();
        }
      })
      return new Response(stream)
    })
    .then(data => data.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => img.src = url)
    .catch(err => console.log(err))
    
    img.width = "520"
    img.height = '350'
    img.style.position = 'fixed'
    img.style.bottom = '45px'
    img.style.left = '15px'
 
    return img;
  }

  calculateByClassColumn(className) {
    let columns = document.getElementsByClassName(className);
    let count = 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].innerText !== "") {
        count += parseInt(columns[i].innerText)
      }
    }
    return count;
  }

  async printDriverTrip(e) {
    e.preventDefault();
    let weight = this.calculateByClassColumn('weight');
    let pcs = this.calculateByClassColumn('pcs')
    let driverId = document.getElementById('driverId').value
    const img = await this.createMapQuestMap();

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
        win.document.body.classList.add('d-flex');
        win.document.body.classList.add('flex-column');
        let headerTemplate =
          `
        <div class='container-fluid text-center'>
        <h2>JSL Transportation Delivery Manifest</h2>
          <div class='text-left my-4'>
          <h5 class='my-3'>Date: ${date}</h5>
          <h5 class='my-3'>Driver: ${driver[0].first_name} ${driver[0].last_name}</h5>
          <h5 class='my-3'>Delivery Zone: ${deliveryZone}</h5>
          </div>
        </div>
        <hr class='border border-primary my-3' />
      `;
        let footerTemplate = `
      <div style="position: absolute; bottom: 50px; right: 75px;">
      
      <h5>Total Pcs:  ${pcs}</h5>
      <h5>Total Weight: ${weight}</h5>
      </div>
      `;
        win.document.body.insertAdjacentHTML('afterbegin', headerTemplate)
        win.document.body.insertAdjacentElement('beforeend', form)
        win.document.body.insertAdjacentHTML('beforeend', footerTemplate)
        win.document.body.insertAdjacentElement('beforeend', img)

      })
  }

  submitDriverTrip(e) {
    e.preventDefault();
    const driverId = document.getElementById("driverId").value;
    const date = document.getElementById("date").value;
    const deliverZone = document.getElementById("zone").value;
    let totalWeight = this.calculateByClassColumn('weight');
    let pcs = this.calculateByClassColumn('pcs')
    let pros = [];
    let pro = document.getElementsByClassName("pro");
    let notes = document.getElementsByClassName("notes");

    for (let i = 0; i < pro.length; i++) {
      if (pro[i].value !== "") {
        pros.push({
            pro: pro[i].value,
            notes: notes[i].value || " ",
            weight: document.getElementById(`stop${i + 1}-weight`).textContent,
            pieces: document.getElementById(`stop${i + 1}-pcs`).textContent,
            vendor: document.getElementById(`stop${i + 1}-vendor`).textContent,
            consignee: document.getElementById(`stop${i + 1}-consignee`).value,
            citystate: document.getElementById(`stop${i + 1}-citystate`).value
        });
      }
    }
    const driverTripData = {
      driverId,
      date,
      zone: deliverZone,
      pros,
      pieces: pcs,
      weight: totalWeight
    };
    fetch("http://localhost:5000/trips", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverTripData)
    })
      .then(response => response.json())
      .then(myData => {

        if (myData.affectedRows === 1) {
          document.getElementById("insert-message").textContent =
            "DRIVER TRIP CREATED";
          this.updateStatuses();
          
        } else {
          document.getElementById("insert-message").textContent =
            "Something went wrong, driver trip not created";
        }
      });
  }

  //Update Status on pros showing Out for Delivery + date
  updateStatuses() {
    let pro = document.getElementsByClassName("pro");
    let date = document.getElementById('date').value
    let status = `OFD on ${date}`;
    let status_code = "ofd"
    for (let i = 0; i < pro.length; i++) {
      if (pro[i].value !== "") {
        //Create a fetch for each good pro
        //Check if pro is in system first
        fetch(`http://localhost:5000/pro/${pro[i].value}`)
          .then(res => res.json())
          .then(data => {
            //if pro exists then update status
            if (data.length !== 0) {
              let bodyData = {
                pro: pro[i].value,
                status: status,
                status_code: status_code
              }
              fetch('http://localhost:5000/pro/updateStatus', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
              }).then(response => {
                console.log(response.status)
              })
            }
          })
      }
    }

    //clear the form
    setTimeout(() => {
      this.clearForm();
    },1500)
  }

  //Clear the form
  clearForm(){
    this.setState({
      lastTripID: 0,
      pros: [],
      stopCount: [1, 2]
    })
    let proField = document.getElementsByClassName('pro');
    let stop = document.getElementsByClassName('stop');
    let vendor = document.getElementsByClassName('vendor');
    let consignee = document.getElementsByClassName('consignee');
    let citystate = document.getElementsByClassName('citystate');
    let apts = document.getElementsByClassName('apts');
    let pcs = document.getElementsByClassName('pcs');
    let weight = document.getElementsByClassName('weight');
    for(let i = 0; i < proField.length; i++){
        proField[i].value = ""
    }
    for(let i = 0; i < proField.length; i++){
      proField[i].value = ""
    }
      for(let i = 0; i < stop.length; i++){
        stop[i].value = ""
    }
    for(let i = 0; i < vendor.length; i++){
      vendor[i].textContent = ""
    }
    for(let i = 0; i < consignee.length; i++){
      consignee[i].value = ""
    }
    for(let i = 0; i < citystate.length; i++){
      citystate[i].value = ""
    }
    for(let i = 0; i < apts.length; i++){
      apts[i].value = ""
    }
    for(let i = 0; i < pcs.length; i++){
      pcs[i].textContent = ""
    }
    for(let i = 0; i < weight.length; i++){
      weight[i].textContent  = ""
    }
  }

  render() {
    return (
      <div className="container-fluid px-5 my-5 text-center">
        <h1 className="mt-5">Create a Driver Trip</h1>
        <form className="form mt-5" onSubmit={e => this.submitDriverTrip(e)}>
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
                required
                className="form-control border border-danger"
                name="date"
                type="date"
                id="date"
              />
            </div>

            <div className="col">
              <label htmlFor="zone">Delivery Zone:</label>
              <input
                required
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
              <input type='submit'
                className="btn btn-danger my-4"

              >

              </input>
            </div>
          </div>
          <div className="row">
            <div className="col alert  text-center">
              <div className='alert alert-success' id="insert-message"> </div>
            </div>
          </div>
        </form>

        <p>Pros</p>
        <table id="driver-trip-table" className=" table-striped ">
          <thead className="text-dark border" >
            <tr style={{ height: "25px" }}>
              <th>#</th>
              <th>Vendor</th>
              <th>Pro#</th>
              <th>Consignee</th>
              <th>City/State</th>
              <th>Apts</th>
              <th style={{ width: "50px" }}>Pcs</th>
              <th style={{ width: "75px" }}>Weight</th>
              <th style={{ width: "125px" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stopCount.map(val => {
              return (
                <tr key={val}>

                  <td><input

                    id={"stop" + val + "-stop"}
                    style={{ width: "50px", background: 'transparent' }}
                    className="border border-white stop"
                  />
                  </td>
                  <td className='vendor' id={"stop" + val + "-vendor"}
                    style={{ width: "50px" }}></td>
                  <td>
                    <input
                      className="pro border"
                      id={"stop" + val}
                      tabIndex={val}
                      onBlur={e => {
                        this.populateProInfo(e.target.id);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      style={{ background: 'transparent' }}
                      id={"stop" + val + "-consignee"}
                      className="border border-white consignee"
                    />
                  </td>
                  <td>
                    <input
                      style={{ background: 'transparent' }}
                      id={"stop" + val + "-citystate"}
                      className="border border-white citystate"
                    />
                  </td>
                  <td>
                    <input
                      style={{ background: 'transparent' }}
                      id={"stop" + val + "-apts"}
                      className="border notes apts"
                    />
                  </td>
                  <td
                    id={"stop" + val + "-pcs"}
                    className="border border-white pcs"
                    style={{ width: "50px" }}
                  >
                  </td>
                  <td id={"stop" + val + "-weight"} className="border border-white weight mx-3" style={{ width: "125px" }} >
                  </td>
                  <td style={{ background: 'white' }}><input type='text' className='form-control'></input></td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
