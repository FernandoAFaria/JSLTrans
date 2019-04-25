import React from 'react'

export default function Contact() {

    const submitForm = (e) => {
        e.preventDefault();
        console.log(document.getElementById('email-form1-2w').value)
        document.getElementById('submitted-modal').style.display = 'block'
    }

  return (
    <section id="contact" className="bg-dark py-5"  style={{position: 'relative'}}>

    <div id='submitted-modal' className="bg-dark text-center " style={{position: 'absolute', zIndex: '1', width: '100vw', height: '85%', paddingTop: '250px', display: 'none'}}><h1 style={{color: '#eee'}}>Thanks for your submission!</h1></div>

    <div className="mbr-overlay" style={{opacity: '0.9', backgroundColor: 'rgb(189, 224, 235)'}}>
    </div>
    <div className="container">
        <div className="row justify-content-center">
            <div className="title col-12 col-lg-8">
                <h2 className="text-white"><strong>
                    Contact Us</strong></h2>
                <h6 className="my-5 text-white">
                    Questions?  Please fill out the form below and we'll get back to you as soon as we can!
                </h6>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row justify-content-center">
            <div className="media-container-column col-lg-8" data-form-type="formoid">
                    
            
                    <form className="mbr-form" action="https://mobirise.com/" method="post" data-form-title="Mobirise Form">
                        <div className="row row-sm-offset">
                            <div className="col-md-4 multi-horizontal" data-for="name">
                                <div className="form-group">
                                    <label className="form-control-label mbr-fonts-style display-7" htmlFor="name-form1-2w">Name</label>
                                    <input type="text" className="form-control" name="name" data-form-field="Name" required="" id="name-form1-2w" />
                                </div>
                            </div>
                            <div className="col-md-4 multi-horizontal" data-for="email">
                                <div className="form-group">
                                    <label className="form-control-label mbr-fonts-style display-7" htmlFor="email-form1-2w">Email</label>
                                    <input type="email" className="form-control" name="email" data-form-field="Email" required="" id="email-form1-2w" />
                                </div>
                            </div>
                            <div className="col-md-4 multi-horizontal" data-for="phone">
                                <div className="form-group">
                                    <label className="form-control-label mbr-fonts-style display-7" htmlFor="phone-form1-2w">Phone</label>
                                    <input type="tel" className="form-control" name="phone" data-form-field="Phone" id="phone-form1-2w" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group" data-for="message">
                            <label className="form-control-label mbr-fonts-style display-7" htmlFor="message-form1-2w">Message</label>
                            <textarea type="text" className="form-control" name="message" rows="7" data-form-field="Message" id="message-form1-2w"></textarea>
                        </div>
            
                        <span className="input-group-btn">
                            <button href="" type="submit" className="btn btn-primary btn-form display-4" onClick={(e) => submitForm(e)}>SEND FORM</button>
                        </span>
                    </form>
            </div>
        </div>
    </div>
</section>
  )
}
