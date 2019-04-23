import React from 'react'

export default function InsertPickup() {

  let todaysDate = new Date();
  let date = todaysDate.toISOString().substr(0, 10)

  return (
    <section className="bg-light py-5" >
      <div className='container '>
        <p>Required**</p>
        <div className='form-inline'>
          <div className='form-group'>
            <label htmlFor='proNumber' className='mr-1'>Pro Number:</label>
            <input id='proNumber' name='proNumber' className='form-control border border-danger mr-3'></input>
            <label htmlFor='vendor' className='mr-1'>Vendor:</label>
            <input id='vendor' name='vendor' className='form-control border border-danger  mr-3' ></input>




            <label htmlFor='date' className='mr-1'>Date:</label>
            <input id='date' type='date' defaultValue={date} name='date' className='form-control border border-danger'></input>

          </div>
          <div className="mt-3 form-inline">
            <div className='form-group'>
              <label htmlFor='pieces' type='number' className='mr-1'>Pieces:    </label>
              <input id='pieces' name='pieces' className='form-control border border-danger  mr-3' ></input>

              <label htmlFor='pallets' type='number' className='mr-1'>Pallets:</label>
              <input id='pallets' name='pallets' className='form-control border border-danger  mr-3' ></input>

              <label htmlFor='weight' className='mr-1'>Weight:</label>
              <input style={{width: '220px'}} id='weight' name='weight' className='form-control border border-danger  ' ></input>

            </div>
            <button className='btn btn-success ml-auto mr-4 mt-4'>Submit</button>
          </div>
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
        <label htmlFor='from-city'>City:</label>
          <input type='text' id='from-city' name='from-city' className='form-control border border-primary'></input>

          <label htmlFor='from-state'>State:</label>
          <input type='text' id='from-state' name='from-state' className='form-control border border-primary'></input>

          <label htmlFor='from-zip'>Zipcode:</label>
          <input type='number' id='from-zip' name='from-zip' className='form-control border border-primary'></input>

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
        <label htmlFor='to-city'>City:</label>
          <input type='text' id='to-city' name='to-city' className='form-control border border-primary'></input>

          <label htmlFor='to-state'>State:</label>
          <input type='text' id='to-state' name='to-state' className='form-control border border-primary'></input>

          <label htmlFor='to-zip'>Zipcode:</label>
          <input type='number' id='to-zip' name='to-zip' className='form-control border border-primary'></input>

      </div>
    
    
    
    
    </div>

    </section>
  )
}


