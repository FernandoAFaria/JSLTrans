import React from 'react'



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

 submitTracking = (e) => {
    e.preventDefault()
    let pro = document.getElementById('tracking-num').value;
    if(pro === ""){
      document.getElementById('track-btn').focus();
    } else {
      window.location.assign(`/track/${pro}`)
    }
 }


  render(){

  
  return (
    <div id='top-nav-bar'>

      <div className="info-bar bg-primary" >
        <h6 className='text-white'>48 3rd Street, Kearny, NJ</h6>
        <h6 className='text-white'>201-999-9999</h6>
        <h6 className='text-white'>email@jsltransportation.com</h6>
      </div>
      {/* second navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-info   mt-5" >
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
              <a className="nav-link" href="/#team">Our Team</a>
            </li>
          
            <li className="nav-item">
              <a className="nav-link" href="/#contact">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Login</a>
            </li>

          </ul>
          <form onSubmit={(e) => this.submitTracking(e)}  className="form-inline my-2 my-lg-0">
          <div style={{width: '400px'}}>
            <input required id='tracking-num' className="form-control mr-sm-3" type="search" placeholder="Pro#"  />
            <button id='track-btn' className="btn btn-danger my-2 my-sm-0" type="submit">Track</button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  )
}
}
