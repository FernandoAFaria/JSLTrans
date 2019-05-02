import React from 'react'

export default function InsertShipment(props) {

  let todaysDate = new Date();
  todaysDate.setHours(12, -todaysDate.getTimezoneOffset(), 0, 0)  
  let date = todaysDate.toISOString().slice(0, 10);


  function clearForm(){
     document.getElementById('proNumber').value = ""
     document.getElementById('vendor').value = ""
    
     document.getElementById('pieces').value = "";
     document.getElementById('pallets').value = "";
    
     document.getElementById('weight').value = "";
     document.getElementById('from-name').value = "" 
     document.getElementById('from-street').value = "" 
     document.getElementById('from-city').value = "" 
     document.getElementById('from-state').value = "" 
     document.getElementById('from-zip').value = "" 
     document.getElementById('to-name').value = "" 
     document.getElementById('to-street').value = "" 
     document.getElementById('to-city').value = "" 
     document.getElementById('to-state').value = "" 
     document.getElementById('to-zip').value = "" 
  }


  function handleSubmit(e){
    e.preventDefault();
    let pro = document.getElementById('proNumber').value;
    let vendor = document.getElementById('vendor').value.toUpperCase();
    let date = document.getElementById('date').value;
    let pieces = document.getElementById('pieces').value;
    let pallets = document.getElementById('pallets').value;
    let status = document.getElementById('shipment-type').value
    let manifest = document.getElementById('manifest').value || " ";
    let weight = document.getElementById('weight').value;
    let fromName = document.getElementById('from-name').value || " ";
    let fromStreet = document.getElementById('from-street').value || " ";
    let fromCity = document.getElementById('from-city').value || " ";
    let fromState = document.getElementById('from-state').value || " ";
    let fromZipcode = document.getElementById('from-zip').value || " ";
    let toName = document.getElementById('to-name').value || " ";
    let toStreet = document.getElementById('to-street').value || " ";
    let toCity = document.getElementById('to-city').value || " ";
    let toState = document.getElementById('to-state').value || " ";
    let toZipcode = document.getElementById('to-zip').value || " ";

    let body = {
      pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode,manifest
    }
    fetch('http://localhost:5000/api', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then(res => {
      
      if(res.status === 200) {
        document.getElementById('success').style.display = 'block';
        document.getElementById('error').style.display = 'none';
        clearForm();
       

      } if(res.status === 401) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = 'That Pro Number Already Exists!';
        
      }
    }).catch(err => {
      
      document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = "Error: " + err;
    }) 


  }

  return (
    <form className="bg-light py-5 " onSubmit={(e) => handleSubmit(e)} >
    <h3 className="text-dark  mb-5 text-center">Insert a Shipment</h3>
      <div className='container '>
        <p>Required**</p>
        
        <div className='form-inline'>
          <div className='form-group'>
            <label htmlFor='proNumber' className='mr-1'>Pro Number:</label>
            <input required id='proNumber' name='proNumber' className='form-control border border-danger mr-3'></input>
            <label htmlFor='vendor' className='mr-1'>Vendor:</label>
            <input required id='vendor' defaultValue="EDI" name='vendor' type='text' className='form-control border border-danger  mr-3' ></input>




            <label htmlFor='date' className='mr-1'>Date:</label>
            <input required id='date' type='date' defaultValue={date} name='date' className='form-control border border-danger'></input>

          </div>
          <div className="mt-3 form-inline">
            <div className='form-group'>
              <label htmlFor='pieces' type='number' className='mr-1'>Pieces:    </label>
              <input required id='pieces' name='pieces' className='form-control border border-danger  mr-3' ></input>

              <label htmlFor='pallets' type='number' className='mr-1'>Pallets:</label>
              <input required id='pallets' name='pallets' className='form-control border border-danger  mr-3' ></input>

              <label htmlFor='weight' className='mr-1'>Weight:</label>
              <input required style={{width: '220px'}} id='weight' name='weight' className='form-control border border-danger  ' ></input>

            </div>
            <button className='btn btn-danger  mr-4 mt-4'  onClick={(e) => props.handleBackBtn(e)} >Back</button>
            <label className="ml-auto mt-4" htmlFor='shipment-type'>Shipment Type: </label>
            <select id='shipment-type' name='shipment-type' className='form-control border border-danger mt-4'>
              <option default value='Picked Up'>Pickup</option>
              <option value='Inbound'>Inbound</option>
              <option value='Customer Drop Off'>Customer Drop</option>
              <option>Other</option>
            </select>
            <label htmlFor='manifest' className='mr-1 mt-4 ml-3'>Inbound M#:</label>
              <input style={{width: '220px'}} id='manifest' name='manifest' className='form-control border border-danger  mt-4' ></input>

            <input className='btn btn-success ml-auto mr-4 mt-4' type='submit' ></input>
          </div>
          <div id='success' style={{width: '100%', paddingleft: '125px', display: 'none'}} className='alert alert-success mt-3'>Insert Successful</div>
          <div id='error' style={{width: '100%', paddingleft: '125px', display: 'none'}} className='alert alert-danger mt-3'>Something Went Wrong</div>
        </div>
      </div>



<hr />
    <div className='container my-4'>
    <p>Pickup Information**</p>
      
        <div className='form-group'>
          <label htmlFor='from-name'>Customer Name:</label>
          <input type='text' id='from-name' name='from-name' className='form-control border border-primary'></input>
          <label htmlFor='from-street'>Street Address:</label>
          <input type='text' id='from-street' name='from-street' className='form-control border border-primary'></input>
        
        </div>
        <div className='form-inline'>
        <div className='form-group'>
        <label htmlFor='from-city'>City:</label>
          <input type='text' id='from-city' name='from-city' className='form-control border border-primary'></input>

          <label htmlFor='from-state'>State:</label>
          <input type='text' id='from-state' name='from-state' className='form-control border border-primary'></input>

          <label htmlFor='from-zip'>Zipcode:</label>
          <input type='number' id='from-zip' name='from-zip' className='form-control border border-primary'></input>
          </div>
      </div>
 
    
    
    
    </div>


    <hr />
    <div className='container my-4'>
    <p>Delivery Information**</p>
      
        <div className='form-group'>
          <label htmlFor='to-name'>Customer Name:</label>
          <input type='text' id='to-name' name='to-name' className='form-control border border-primary'></input>
          <label htmlFor='to-street'>Street Address:</label>
          <input type='text' id='to-street' name='to-street' className='form-control border border-primary'></input>
        
        </div>
        <div className='form-inline'>
        <div className='form-group'>
        <label htmlFor='to-city'>City:</label>
          <input type='text' id='to-city' name='to-city' className='form-control border border-primary'></input>

          <label htmlFor='to-state'>State:</label>
          <input type='text' id='to-state' name='to-state' className='form-control border border-primary'></input>

          <label htmlFor='to-zip'>Zipcode:</label>
          <input type='number' id='to-zip' name='to-zip' className='form-control border border-primary'></input>
          </div>
      </div>
    
    
    
      
    </div>
   
    </form>
  )
}


