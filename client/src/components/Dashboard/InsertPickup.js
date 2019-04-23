import React from 'react'

export default function InsertPickup() {
  return (
    <section className="bg-dark" style={{minWidth: '1100px'}}>
      <nav id="sidebar" className="bg-primary">
        <ul className='list-group'>
          <li className='list-group-item bg-info text-white' >Insert Pickup</li>
          <li className='list-group-item' >Insert Inbound</li>
          <li className='list-group-item' >Update Status</li>
          <li className='list-group-item' >Create Outbound</li>
        </ul>
      </nav>



      <div style={{ minHeight: '100vh', paddingTop: '25px', marginLeft: '50%', position: 'relative', transform: 'translatex(-30%)' }} className='container-fluid'>
        <div className='col border border-primary' style={{
          padding: '50px',
          background: 'transparent',
          width: '900px'

        }}>
          <div className='row'>
            <input id='tracking-number' style={{ maxWidth: '68%' }} className='form-control border border-danger mr-3' placeholder="Tracking number" />
            <input  id='vendor' style={{ maxWidth: '25%' }} className='form-control border border-danger' placeholder="Vendor" />
          </div>

          <div className='row mt-4'>

            <input id='piece-count' style={{ maxWidth: '25%' }} className='form-control mr-3 border border-danger' type='number' placeholder='Pieces'></input>
            <input id='pallet-count' style={{ maxWidth: '25%' }} className='form-control mr-3 border border-danger' type='number' placeholder='Pallets'></input>
            <input id='weight' style={{ maxWidth: '25%' }} className='form-control  border border-danger' type='number' placeholder='Weight'></input>
            <input id='submitpickup' type='submit' className='btn btn-success ml-3'></input>



          </div>




          <div style={{ display: 'hidden' }} className="alert  my-5 text-center text-black"></div>

          <h5 className="my-5">Pickup:</h5>
          <div className='row'>
            <input style={{ maxWidth: '98%' }} className='form-control  mb-3' placeholder="Customer Name" />
          </div>
          <div className='row'>
            <input style={{ maxWidth: '98%' }} className='form-control  mb-3 ' placeholder="Address - Street" />
          </div>
          <div className='row'>
            <input style={{ maxWidth: '42%' }} className='form-control  mb-3 mr-4' placeholder="City" />
            <input style={{ maxWidth: '22%' }} className='form-control  mb-3 mr-4' placeholder="State" />
            <input style={{ maxWidth: '28%' }} className='form-control  mb-3' placeholder="Zipcode" />

          </div>

        </div>

        {/* Ship To */}

        <div className='col border border-primary' style={{
          marginRight: '50px',
          background: 'transparent',
          padding: ' 0 50px 50px 50px',
          width: '900px'

        }}>

          <h5 className="my-5">SHIP TO:</h5>
          <div className='row'>
            <input style={{ maxWidth: '98%' }} className='form-control  mb-3' placeholder="Customer Name" />
          </div>
          <div className='row'>
            <input style={{ maxWidth: '98%' }} className='form-control  mb-3 ' placeholder="Address - Street" />
          </div>
          <div className='row'>
            <input style={{ maxWidth: '42%' }} className='form-control  mb-3 mr-4' placeholder="City" />
            <input style={{ maxWidth: '22%' }} className='form-control  mb-3 mr-4' placeholder="State" />
            <input style={{ maxWidth: '28%' }} className='form-control  mb-3' placeholder="Zipcode" />
          </div>

        </div>




      </div>
    </section>
  )
}
