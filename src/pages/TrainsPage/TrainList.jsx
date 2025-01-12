import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import TrainFilter from './TrainFilter'
import TrainCard from './TrainCard'
import { auth } from '../../firebase/firebase-config'
const TrainList = () => {
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] = useState([])
  const [companies, setCompanies] = useState([])
  const [favorites, setFavorites] = useState([])

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
      const matchesAmenities = filters.amenities.length
        ? filters.amenities.every((amenity) =>
            train.amenities.includes(amenity)
          )
        : true
      const matchesRating = filters.minRating
        ? train.rating >= filters.minRating
        : true
      const matchesDiscount = filters.maxDiscount
        ? train.discount <= filters.maxDiscount
        : true

      return (
        matchesOrigin &&
        matchesDestination &&
        matchesDate &&
        matchesPassengers &&
        matchesCompany &&
        matchesAmenities &&
        matchesRating &&
        matchesDiscount
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
    } else if (filters.sortBy === 'ratingDesc') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (filters.sortBy === 'discountDesc') {
      filtered.sort((a, b) => b.discount - a.discount)
    }

    setFilteredTrains(filtered)
  }

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          setFavorites(doc.data().favorites || [])
        }
      })
    }
  }, [])

  return (
    <>
      <div className="p-4 container">
        <TrainFilter onFilter={handleFilter} companies={companies} />
        <div className="grid lg:w-7/12">
          {filteredTrains.map((train) => (
            <TrainCard
              key={train.id}
              train={train}
              isFavorite={favorites.includes(train.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TrainList
