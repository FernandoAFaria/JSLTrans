import React, { Component } from 'react'

export default class CreateDriverTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drivers: [],
      lastTripID: 0,
      driversLoaded: false,
      pros: [],
      stopCount: [1,2]
    }
  }
  componentDidMount(){
    fetch('http://localhost:5000/driver/all')
    .then(res => res.json())
    .then(drivers => {
      this.setState({
        drivers: drivers,
        driversLoaded: true
      })
    })
  }

  populateProInfo(id) {

    let stopCountCopy = this.state.stopCount;
    stopCountCopy.push(this.state.stopCount.length + 1)

    let pro = document.getElementById(id).value;
    let consignee = document.getElementById(`${id}-consignee`)
    let citystate = document.getElementById(`${id}-citystate`)
    let pcs = document.getElementById(`${id}-pcs`)
    let weight = document.getElementById(`${id}-weight`)
    let stop = document.getElementById(`${id}-stop`)

    if(pro !== "") {
      fetch(`http://localhost:5000/pro/${pro}`)
      .then(res => res.json())
      .then(data => {

        if(data.length === 0) {
          stop.value = id.slice(4, id.length)
          consignee.value = "Not Found";
          this.setState({
            stopCount: stopCountCopy
          })

        } else {

          consignee.value = data[0].toName;
          citystate.value = data[0].toCity + " " + data[0].toState;
          pcs.value = data[0].pieces;
          weight.value = data[0].weight;
          stop.value = id.slice(4, id.length)

     
          this.setState({
            stopCount: stopCountCopy
          })

      
        }
       
      })
    }
 
  }

  submitDriverTrip(e){
    e.preventDefault()
    const driver_id = document.getElementById('driverId').value;
    const date = document.getElementById('date').value;
    const deliverZone = document.getElementById('zone').value;
    let pros = [];
    let pro = document.getElementsByClassName('pro');
    let notes = document.getElementsByClassName('notes');
    
    for(let i = 0; i < pro.length; i++) {
        if(pro[i].value !== ""){
          pros.push({pro: pro[i].value, notes: notes[i].value || " "})
        }
    }
    const driverTripData = {
      driver_id,
      date,
      zone: deliverZone,
      pros
    }
    fetch('http://localhost:5000/trips', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(driverTripData)
    }).then(response => response.json())
      .then(myData => {
        console.log(myData)
        if(myData.affectedRows === 1){
          document.getElementById('insert-message').textContent = 'DRIVER TRIP CREATED'
        } else {

          document.getElementById('insert-message').textContent = 'Something went wrong, nothing added'
        }
      })
  }
  printDriverTrip(e){
    e.preventDefault()
    const driver = document.getElementById('driverId').value;
    const date = document.getElementById('date').value;
    const deliverZone = document.getElementById('zone').value;

    let form = document.getElementById('driver-trip-table');
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
    win.document.body.innerHTML =
    `
      <div class='text-center'>
      <h1>JSL Driver Trip</h1>
      <div><h3>${driver}</h3></div>
        <div id='root' class="ml-auto mr-auto"></div>
      </div>
    
    
    `

    win.document.body.classList.add("container-fluid");
    win.document.body.classList.add("py-3");
    win.document.getElementById('root').appendChild(form)
  }

  

  render() {
    return (
      
      <div className='container-fluid px-5 my-5 text-center'>
      
        <h1>Create a Driver Trip</h1>
        <form className='form my-5'>
        <div className='row'>
          <div className='col'>
            <label htmlFor='driver'>Driver:</label>
            <select id='driverId' className='form-control border border-danger'>
              {this.state.driversLoaded === true ?
              this.state.drivers.map(driver => {
                if(driver.status === "Active"){
                  return (
                    <option className={`${driver.first_name}_${driver.last_name}`} key={driver.id} value={`${driver.first_name}_${driver.last_name}`}>{driver.first_name + " " + driver.last_name + " --- " + driver.vehicle}</option>
                  ) 
                } else {
                  return "";
                }
               
              })  
            : null
            }

            </select>
          
          </div>

          <div className='col'>
            <label htmlFor='date'>Route Date:</label>
            <input className='form-control border border-danger' name='date' type='date' id='date'></input>
          
          </div>
        
          <div className='col'>
            <label htmlFor='zone'>Delivery Zone:</label>
            <input className='form-control border border-danger' name='zone' type='text' id='zone'></input>
          
          </div>
          
        </div>
        <div className='row'>
            <div className='col'>
              <button className='btn btn-info my-4' onClick={(e) => this.props.handleBackBtn(e)}>Back</button>
            </div>
            <div className='col'>
            <button className='btn btn-success my-4' onClick={(e) => this.printDriverTrip(e)}>Print</button>
            </div>
            <div className='col'>
              <button className='btn btn-danger my-4' onClick={(e) => this.submitDriverTrip(e)}>Submit</button>
            </div>
        </div>
        <div className='row'>
            <div className='col alert  text-center'>
              <h1 id='insert-message'> </h1>
            </div>
        </div>
        </form>

<p>Pros</p>
        <table id='driver-trip-table' className='table-striped'>
          <thead className='text-dark'>
            <tr style={{height: '25px'}}>
              <th style={{width: '50px'}}>#</th>
              <th>Pro#</th>
              <th>Consignee</th>
              <th>City/State</th>
              <th>Apts</th>
              <th>Pcs</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>

{this.state.stopCount.map(val => {
  return (

    <tr key={val}>
    <td ><input id={'stop'+val+'-stop'} style={{width: '50px'}} className='border'></input></td>
    <td><input className='pro' id={'stop'+val} tabIndex={val} onBlur={(e) => {this.populateProInfo(e.target.id)}}></input></td>
    <td><input id={'stop'+val+'-consignee'} className='border'></input></td>
    <td><input id={'stop'+val+'-citystate'} className='border'></input></td>
    <td><input  id={'stop'+val+'-apts'} className='border border-warning notes'></input></td>
    <td ><input id={'stop'+val+'-pcs'} className='border' style={{width: '50px'}}></input></td>
    <td ><input id={'stop'+val+'-weight'} className='border'></input></td>
  </tr>

  )
})}

            



          </tbody>
      </table> 

      
      </div>
    )
  }
}
