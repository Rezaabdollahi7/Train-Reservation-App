import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Header from './components/Header'
import TravelPoint from './components/TravelPoint'
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Header />
      <TravelPoint />
      <Footer />
    </>
  )
}
