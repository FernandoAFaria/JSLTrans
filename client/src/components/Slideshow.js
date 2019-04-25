import React from 'react'

//image imports
import wh1 from '../assets/imgs/warehouse1.jpg'
import wh2 from '../assets/imgs/warehouse2.jpg'
import wh3 from '../assets/imgs/warehouse3.jpg'
import wh4 from '../assets/imgs/warehouse4.jpg'
import wh5 from '../assets/imgs/warehouse5.jpg'
import wh6 from '../assets/imgs/warehouse6.jpg'

export default function Slideshow() {
  return (
    <div style={{padding: '75px 20vw'}} id="carouselControls" className="carousel slide bg-info text-center" data-ride="carousel">
    <h4 className='text-white mb-4'>View our warehouse</h4>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={wh1} className="d-block w-100" alt="warehouse dock" />
    </div>
    <div className="carousel-item">
      <img src={wh2} className="d-block w-100" alt="warehouse dock" />
    </div>
    <div className="carousel-item">
      <img src={wh3} className="d-block w-100" alt="warehouse freight" />
    </div>
    <div className="carousel-item">
      <img src={wh4} className="d-block w-100" alt="JSL trucks" />
    </div>
    <div className="carousel-item">
      <img src={wh5} className="d-block w-100" alt="forklift driver" />
    </div>
    <div className="carousel-item">
      <img src={wh6} className="d-block w-100" alt="front of building" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
  )
}
