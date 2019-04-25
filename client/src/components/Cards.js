import React from 'react'
import forkliftDriver from '../assets/imgs/forklift-driver.jpg'
import trailers from '../assets/imgs/trailers.jpg'
import containers from '../assets/imgs/containers.jpg'
import {Link} from 'react-router-dom'

export default function Cards() {

  return (
    <div className="cards-section">
        <div className="mx-2 my-4 cs-card">
          <img className="card-img-top" src={trailers} alt="forklift-driver"  />
          <div className="card-body">
            <p className="card- font-weight-bold text-dark my-5" style={{fontSize: '1rem'}}>We work with multiple carriers to fullfill your needs and get you the best price possible. We provide 3 - 5 day delivery, coast to coast.</p>
            <div style={{textAlign: 'center'}}><button onClick={window.scrollTo(0,0)} className='btn btn-success'>Get a Quote</button></div>
          </div>
        </div>
        
        <div className="mx-2 my-4 cs-card">
          <img className="card-img-top" src={forkliftDriver} alt="forklift-driver"   />
          <div className="card-body">
            <p className="card-text font-weight-bold text-dark my-5" style={{fontSize: '1rem'}}>Need trailer rates or pallet rates?  No problem, we got you covered.  Need a scheduled pickup or same day? </p>
            <div style={{textAlign: 'center'}}><Link to="/contact" className='btn btn-success'>Contact Us</Link></div>
          </div>
        </div>

        <div className="mx-2 my-4 cs-card">
          <img className="card-img-top" src={containers} alt="forklift-driver"   />
          <div className="card-body">
            <p className="card-text font-weight-bold text-dark my-5" style={{fontSize: '1rem'}}>We also segregate and sort container loads, please reach out for more information.  Need some more context</p>
            <div style={{textAlign: 'center'}}><Link to="/contact" className='btn btn-success'>Contact Us</Link></div>
          </div>
        </div>

    </div>
  )
}
