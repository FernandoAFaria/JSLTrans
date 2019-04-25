import React from 'react'

export default function InsertPickup(props) {
  


  function handleSubmit(e){
    e.preventDefault();
    let allProNumbers = [];
    let proNumbers = document.getElementsByClassName('pros');
    for(let i = 0; i < proNumbers.length; i++) {
      if(proNumbers[i].value !== ""){
        allProNumbers.push(proNumbers[i].value)
      }
    }

    //Run a foreach on AllProNumbers, each will do a fetch call to insert into db.
    //Store any errors in an array.
    // Once complete, clear the form and show any errors

    console.log(allProNumbers);    

  }

  return (
    <form style={{overflowX: 'scroll'}} className="bg-light py-5 " onSubmit={(e) => handleSubmit(e)} >
    <h3 className="text-dark  mb-5 text-center">Insert Inbound Shipments</h3>
      <div className='container '>
        <p>Required**</p>
        
        <div className='form-inline'>
          <div className='form-group'>
            <label htmlFor='proNumber' className='mr-1'>Manifest#</label>
            <input required id='proNumber' name='proNumber' className='form-control border border-danger mr-3'></input>
            <label htmlFor='vendor' className='mr-1'>Vendor:</label>
            <input required id='vendor' defaultValue="EDI" name='vendor' type='text' className='form-control border border-danger  mr-3' ></input>




            <label htmlFor='date' className='mr-1'>Est Arrival Date:</label>
            <input required id='date' type='date' name='date' className='form-control border border-danger'></input>

          </div>
          <div className="mt-3 form-inline">
          
            <button className='btn btn-danger ml-5 mt-4'  onClick={(e) => props.handleBackBtn(e)} >Back</button>
            

          </div>
          <div id='success' style={{width: '100%', paddingleft: '125px', display: 'none'}} className='alert alert-success mt-3'>SUCCESS</div>
          <div id='error' style={{width: '100%', paddingleft: '125px', display: 'none'}} className='alert alert-danger mt-3'>Something Went Wrong</div>
        </div>
      </div>




<hr />
<div className='inbound-pros'>

    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>
    <div className='form-inline'>
      <div className='form-group my-2'>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
        <input type='number' className='mr-4 pros' placeholder="Pro#"></input>
      </div>
    </div>





</div>



    <div className='form-inline mr-5'>
      <input  className='btn btn-success mt-4 ml-auto ' type='submit' ></input>

    </div>
    </form>
  )
}


