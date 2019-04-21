import React from 'react'
import blueSwatch from '../assets/imgs/blueswatch.png'

export default class Navbar extends React.Component {

 componentDidMount() {
   const infoBar = document.querySelector('.info-bar');
   window.addEventListener('scroll', () => {
     if(window.pageYOffset > 0) {
        infoBar.style.height = '75px'
        infoBar.style.opacity = '.97'
     } if (window.pageYOffset === 0) {
        infoBar.style.height = '50px';
        infoBar.style.opacity = '1'
     }
   })
 }
  render(){

  
  return (
    <div>

      <div className="info-bar bg-dark" >
        <h6 className='text-white'>48 3rd Street, Kearny, NJ</h6>
        <h6 className='text-white'>201-999-9999</h6>
        <h6 className='text-white'>email@jsltransportation.com</h6>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-5">
        <a className="navbar-brand" href="/">JSL Transportation</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Our Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Login</a>
            </li>

          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Pro#" aria-label="Search" />
            <button className="btn btn-danger my-2 my-sm-0" type="submit">Track</button>
          </form>
        </div>
      </nav>
    </div>
  )
}
}
