import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { db } from '../../firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import TrainFilter from './TrainFilter'

const TrainList = () => {
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] = useState([])

  useEffect(() => {
    const fetchTrains = async () => {
      const querySnapshot = await getDocs(collection(db, 'trains'))
      const trainsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTrains(trainsList)
      setFilteredTrains(trainsList)
    }

    fetchTrains()
  }, [])

  const handleFilter = (filters) => {
    const filtered = trains.filter((train) => {
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

      return (
        matchesOrigin && matchesDestination && matchesDate && matchesPassengers
      )
    })

    setFilteredTrains(filtered)
  }

  const uniqueCompanies = [...new Set(trains.map((train) => train.company))]

  const columns = [
    {
      title: 'Train Name',
      dataIndex: 'trainName',
      key: 'trainName',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      filters: uniqueCompanies.map((company) => ({
        text: company,
        value: company,
      })),
      onFilter: (value, record) => record.company === value,
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departureDate',
      sorter: (a, b) => new Date(a.departureDate) - new Date(b.departureDate),
    },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: 'Available Seats',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Seat Type',
      dataIndex: 'seatType',
      key: 'seatType',
    },
  ]

  return (
    <div className="p-4">
      <TrainFilter onFilter={handleFilter} />
      <Table
        dataSource={filteredTrains}
        columns={columns}
        rowKey="id"
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    </div>
  )
}

export default TrainList
