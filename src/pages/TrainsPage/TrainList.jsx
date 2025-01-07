import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import TrainFilter from './TrainFilter'
import TrainCard from './TrainCard'

const TrainList = () => {
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchTrains = async () => {
      const querySnapshot = await getDocs(collection(db, 'trains'))
      const trainsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTrains(trainsList)
      setFilteredTrains(trainsList)

      // Extract unique companies
      const uniqueCompanies = [
        ...new Set(trainsList.map((train) => train.company)),
      ]
      setCompanies(uniqueCompanies)
    }

    fetchTrains()
  }, [])

  const handleFilter = (filters) => {
    let filtered = trains.filter((train) => {
      const matchesOrigin = filters.origin
        ? train.origin.toLowerCase().includes(filters.origin.toLowerCase())
        : true
      const matchesDestination = filters.destination
        ? train.destination
            .toLowerCase()
            .includes(filters.destination.toLowerCase())
        : true
      const matchesDate = filters.departureDate
        ? train.departureDate === filters.departureDate.format('YYYY-MM-DD')
        : true
      const matchesPassengers = train.availableSeats >= filters.passengers
      const matchesCompany = filters.company
        ? train.company === filters.company
        : true

      return (
        matchesOrigin &&
        matchesDestination &&
        matchesDate &&
        matchesPassengers &&
        matchesCompany
      )
    })

    // Apply sorting
    if (filters.sortBy === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'departureDate') {
      filtered.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      )
    }

    setFilteredTrains(filtered)
  }

  return (
    <div className="p-4">
      <TrainFilter onFilter={handleFilter} companies={companies} />
      <div>
        {filteredTrains.map((train) => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>
    </div>
  )
}

export default TrainList
