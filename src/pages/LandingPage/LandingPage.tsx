import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Header from './components/Header'
import TravelPoint from './components/TravelPoint'
// import SignUp from './components/SignUp'
export default function LandingPage() {
  return (
    <>
      {/* <SignUp /> */}
      <Navbar />
      <Header />
      <TravelPoint />
      <Footer />
    </>
  )
}
