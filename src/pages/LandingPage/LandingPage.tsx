import React from 'react'
import Footer from '../../components/common/Footer'
import Header from './components/Header'
import TravelPoint from './components/TravelPoint'
import CompaniesSection from './components/CompaniesSection'
export default function LandingPage() {
  return (
    <>
      <Header />
      <CompaniesSection />
      <TravelPoint />
      <Footer />
    </>
  )
}
