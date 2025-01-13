import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import TrainFilter from './TrainFilter'
import TrainCard from './TrainCard'
import { auth } from '../../firebase/firebase-config'
import Aside from './Aside'
import { Spin } from 'antd'

const TrainList = () => {
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] = useState([])
  const [companies, setCompanies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: null,
    passengers: 1,
    sortBy: 'departureDate',
    company: '',
    amenities: [],
    minRating: null,
    maxDiscount: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setLoading(true)
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
      } catch (error) {
        console.error('Error fetching trains:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrains()
  }, [])

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value })
  }

  const handleFilter = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    let filtered = trains.filter((train) => {
      const matchesOrigin = updatedFilters.origin
        ? train.origin
            .toLowerCase()
            .includes(updatedFilters.origin.toLowerCase())
        : true
      const matchesDestination = updatedFilters.destination
        ? train.destination
            .toLowerCase()
            .includes(updatedFilters.destination.toLowerCase())
        : true
      const matchesDate = updatedFilters.departureDate
        ? train.departureDate ===
          updatedFilters.departureDate.format('YYYY-MM-DD')
        : true
      const matchesPassengers =
        train.availableSeats >= updatedFilters.passengers
      const matchesCompany = updatedFilters.company
        ? train.company === updatedFilters.company
        : true
      const matchesAmenities = updatedFilters.amenities.length
        ? updatedFilters.amenities.every((amenity) =>
            train.amenities.includes(amenity)
          )
        : true
      const matchesRating = updatedFilters.minRating
        ? train.rating >= updatedFilters.minRating
        : true
      const matchesDiscount = updatedFilters.maxDiscount
        ? train.discount <= updatedFilters.maxDiscount
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
    if (updatedFilters.sortBy === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (updatedFilters.sortBy === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (updatedFilters.sortBy === 'departureDate') {
      filtered.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      )
    } else if (updatedFilters.sortBy === 'ratingDesc') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (updatedFilters.sortBy === 'discountDesc') {
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
    <div className="p-4 container flex gap-6">
      {/* Aside (Filters) */}
      <div className="w-1/4">
        <Aside
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilter={() => handleFilter({})}
          companies={companies}
        />
      </div>

      {/* Train List */}
      <div className="w-3/4">
        <TrainFilter onFilter={handleFilter} />
        {loading ? (
          <div className="flex justify-center items-center h-64 ">
            <Spin size="large" />
          </div>
        ) : filteredTrains.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>متاسفانه هیچ قطاری با فیلترهای انتخاب‌شده یافت نشد.</p>
          </div>
        ) : (
          <div className="">
            {filteredTrains.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                isFavorite={favorites.includes(train.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrainList
