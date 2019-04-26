import React from 'react'
import CallToAction from './CallToAction'
import AboutUs from './AboutUs'
import OurTeam from './OurTeam'
import Slideshow from './Slideshow'
import Contact from './Contact'
import Footer from './Footer'


import Cards from './Cards'

export default function Landing() {
  return (
    <div>
      <CallToAction />
      <Cards />
      <AboutUs />
      <OurTeam />
      <Slideshow />
      
      <Contact />
      <Footer />
    </div>
  )
}
