import React from 'react'
import CallToAction from './CallToAction'
import AboutUs from './AboutUs'
import OurTeam from './OurTeam'
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
    <Contact />
    <Footer />
    </div>
  )
}
