import React, { Component } from 'react'

export default class Tracking extends Component {

  componentDidMount(){
    fetch(`http://localhost:5000/api/${this.props.match.params.pro}`)
    .then(res => {
     return res.json()
    }).then(data => {
     

      if(data.length === 0 || data.error){
        document.getElementById('number').textContent = "No information available";
        
      } else {
        document.getElementById('number').textContent = data[0].pro;
        document.getElementById('vendor').textContent = data[0].vendor;
        document.getElementById('date').textContent = data[0].date;
        document.getElementById('status').textContent = data[0].status;
        document.getElementById('pallets').textContent = data[0].pallets;
      }

    })
    
    
  }
  
  render() {
    
    return (
      <div className='container pt-5'>
        <p className="my-4">Pro Number:  </p><h5 id='number'> </h5>
        <p className="my-4">Vendor:  </p><h5 id='vendor'> </h5>
        <p className="my-4">Date:  </p><h5 id='date'> </h5>
        <p className="my-4">Status:  </p><h5 className=' py-2 px-2 btn-success' id='status'> </h5>
        <p className="my-4">Pallets:  </p><h5 id='pallets'> </h5>
      </div>
    )
  }
}

