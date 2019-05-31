import React from 'react'
import forkliftDriver from '../assets/imgs/forklift-driver.jpg'
import trailers from '../assets/imgs/trailers.jpg'
import containers from '../assets/imgs/containers.jpg'
import truck from '../assets/imgs/9305380.gif';
import {Link} from 'react-router-dom'


export default function Cards() {

  return (
    <div className="cards-section">


{/* NEW CARDS */}

        <div className=" cs-card">
          <div className="card-body pt-5" style={{background: `linear-gradient(rgba(30, 144, 255,.8),rgba(30, 144, 255,.8)),url(${trailers})`, height: '350px', color: 'white', backgroundSize: 'cover'}}>
            <p className="card-text font-weight-bold  my-5" style={{fontSize: '1.4em'}}>We work with multiple carriers to fullfill your needs and get you the best price possible. We provide 3 - 5 day delivery, coast to coast.</p>
            <div className='hidden-btn' style={{textAlign: 'center'}}><Link to="/contact" className='btn btn-outline-light'>Contact Us</Link></div>
          </div>
        </div>

        <div className=" cs-card">
          <div className="card-body pt-5" style={{background: `linear-gradient(rgba(0, 148, 50,.80),rgba(0, 148, 50,.80)),url(${forkliftDriver})`, height: '350px', color: 'white',backgroundSize: 'cover'}}>
            <p className="card-text font-weight-bold  my-5" style={{fontSize: '1.4rem'}}>Need trailer rates or pallet rates?  No problem, we got you covered.  Need a scheduled pickup or same day?</p>
            <div className='hidden-btn' style={{textAlign: 'center'}}><Link to="/contact" className='btn btn-outline-light'>Contact Us</Link></div>
          </div>
        </div>

        <div className=" cs-card">
          <div className="card-body pt-5" style={{background: `linear-gradient(rgba(87, 88, 187,.8),rgba(87, 88, 187,.8)),url(${containers})`, height: '350px', color: 'white',backgroundSize: 'cover'}}>
            <p className="card-text font-weight-bold  my-5" style={{fontSize: '1.4rem'}}>We also segregate and sort container loads, please reach out for more information.  Need some more context</p>
            <div className='hidden-btn' style={{textAlign: 'center'}}><Link to="/contact" className='btn btn-outline-light'>Contact Us</Link></div>
          </div>
        </div>

{/* END NEW CARDS */}

{/* <div className='moving-truck'><img src={truck} alt="moving-truck"></img></div> */}
    </div>
  )
}
