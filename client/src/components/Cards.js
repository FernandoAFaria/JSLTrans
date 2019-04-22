import React from 'react'
import forkliftDriver from '../assets/imgs/forklift-driver.jpg'
import trailers from '../assets/imgs/trailers.jpg'
import containers from '../assets/imgs/containers.jpg'

export default function Cards() {
  const cardStyle = {
    
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: '95px 25px'
  }
  return (
    <div style={cardStyle}>
        <div className="card shadow" style={{width: '24rem'}}>
          <img className="card-img-top" src={trailers} alt="forklift-driver" style={{height: '14rem'}}  />
          <div className="card-body">
            <p className="card- font-weight-bold text-dark " style={{fontSize: '1rem'}}>We work with multiple carriers to fullfill your needs and get you the best price possible. We provide 3 - 5 day delivery, coast to coast.</p>
            <div style={{textAlign: 'center'}}><button className='btn btn-success'>Get a Quote</button></div>
          </div>
        </div>
        
        <div className="card shadow" style={{width: '24rem'}}>
          <img className="card-img-top" src={forkliftDriver} alt="forklift-driver" style={{height: '14rem'}}  />
          <div className="card-body">
            <p className="card-text font-weight-bold text-dark" style={{fontSize: '1rem'}}>Need trailer rates or pallet rates?  No problem, we got you covered.  Need a scheduled pickup or same day?  We'll do our best to accommodate you.</p>
            <div style={{textAlign: 'center'}}><button className='btn btn-success'>Contact Us</button></div>
          </div>
        </div>

        <div className="card shadow" style={{width: '24rem'}}>
          <img className="card-img-top" src={containers} alt="forklift-driver" style={{height: '14rem'}}  />
          <div className="card-body">
            <p className="card-text font-weight-bold text-dark" style={{fontSize: '1rem'}}>Need some context here</p>
            <div style={{textAlign: 'center'}}><button className='btn btn-success'>Contact Us</button></div>
          </div>
        </div>

    </div>
  )
}
