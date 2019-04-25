import React from 'react'

export default function InsertPickup(props) {
  console.log(props)
  
  let todaysDate = new Date();
  todaysDate.setHours(12, -todaysDate.getTimezoneOffset(), 0, 0)

  
  let date = todaysDate.toISOString().slice(0, 10);


  function handleSubmit(e){
    e.preventDefault();
    let pro = document.getElementById('proNumber').value;
    let vendor = document.getElementById('vendor').value.toUpperCase();
    let date = document.getElementById('date').value;
    let pieces = document.getElementById('pieces').value;
    let pallets = document.getElementById('pallets').value;
    let status = "Picked Up"
    let weight = document.getElementById('weight').value;
    let fromName = document.getElementById('from-name').value || "null";
    let fromStreet = document.getElementById('from-street').value || "null";
    let fromCity = document.getElementById('from-city').value || "null";
    let fromState = document.getElementById('from-state').value || "null";
    let fromZipcode = document.getElementById('from-zip').value || "null";
    let toName = document.getElementById('to-name').value || "null";
    let toStreet = document.getElementById('to-street').value || "null";
    let toCity = document.getElementById('to-city').value || "null";
    let toState = document.getElementById('to-state').value || "null";
    let toZipcode = document.getElementById('to-zip').value || "null";

    let body = {
      pro,vendor,date,pieces,pallets,status,weight,fromName,fromStreet,fromCity,fromState,fromZipcode,toName,toStreet,toCity,toState,toZipcode
    }
    fetch('http://localhost:5000/api', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then(res => {
      
      if(res.status === 200) {
        document.getElementById('success').style.display = 'block';
        setTimeout(() => {
          document.getElementById('success').style.display = 'none';
        }, 4500);
      } if(res.status === 401) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = 'That Pro Number Already Exists!';
        setTimeout(() => {
          document.getElementById('error').style.display = 'none';
        }, 6000);
      }
    })


  }

  return (
    <form className="bg-light py-5 " onSubmit={(e) => handleSubmit(e)} >
    <h3 className="text-dark  mb-5 text-center">Insert a pickup</h3>
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
            <input className='btn btn-success ml-auto mr-4 mt-4' type='submit' ></input>
          </div>
          <div id='success' style={{width: '100%', paddingleft: '125px', display: 'none'}} className='alert alert-success mt-3'>SUCCESS</div>
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

