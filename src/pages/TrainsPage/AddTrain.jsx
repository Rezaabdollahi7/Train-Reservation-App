import { useState } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  message,
  Result,
  TimePicker,
  Progress,
} from 'antd'
import { db } from '../../firebase/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { faker } from '@faker-js/faker' // Import faker

const { Option } = Select
const timeFormat = 'HH:mm'

const AddTrain = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  // Calculate progress based on filled fields
  const calculateProgress = (values) => {
    const totalFields = 14 // Total number of fields in the form (including new fields)
    const filledFields = Object.values(values).filter(
      (value) => value !== undefined && value !== ''
    ).length
    let newProgress = (filledFields / totalFields) * 100
    newProgress = Math.floor(newProgress)
    setProgress(newProgress)
  }

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Format the date to YYYY-MM-DD
      values.departureDate = values.departureDate.format('YYYY-MM-DD')

      // Format the time to HH:mm
      values.departureTime = values.departureTime.format(timeFormat)

      // Add the train to Firestore
      await addDoc(collection(db, 'trains'), values)
      message.success('Train added successfully!')
      form.resetFields() // Reset the form
      setIsSuccess(true) // Show success result
      setProgress(0) // Reset progress to 0
    } catch (error) {
      message.error('Failed to add train: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const onValuesChange = (_, allValues) => {
    calculateProgress(allValues)
  }

  const addMultipleTrains = async () => {
    setLoading(true)
    try {
      const trains = generateTrainData() // Generate 30 train records
      for (const train of trains) {
        await addDoc(collection(db, 'trains'), train)
      }
      message.success('30 trains added successfully!')
    } catch (error) {
      message.error('Failed to add trains: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const generateTrainData = () => {
    const trains = []
    const cities = [
      'Tehran',
      'Mashhad',
      'Isfahan',
      'Shiraz',
      'Tabriz',
      'Qom',
      'Ahvaz',
      'Kermanshah',
      'Urmia',
      'Rasht',
      'Zahedan',
      'Hamadan',
      'Yazd',
      'Ardabil',
      'Bandar Abbas',
      'Kerman',
      'Sari',
      'Gorgan',
      'Birjand',
      'Sanandaj',
    ]

    const companies = [
      'Raja',
      'Fadak',
      'Iran Rail',
      'Persian Express',
      'Safir',
      'Parsian',
      'Zagros',
      'Alborz',
      'Caspian',
      'Kourosh',
    ]

    const amenitiesOptions = [
      'Wi-Fi',
      'Food',
      'Power Outlet',
      'Air Conditioning',
      'TV',
      'Luggage Storage',
      'Reclining Seats',
      'USB Charger',
      'Reading Light',
      'Blanket',
    ]

    for (let i = 1; i <= 30; i++) {
      const origin = faker.helpers.arrayElement(cities)
      const destination = faker.helpers.arrayElement(
        cities.filter((city) => city !== origin)
      )

      trains.push({
        trainName: faker.lorem.words(2), // Random train name
        company: faker.helpers.arrayElement(companies), // Random company
        origin: origin,
        destination: destination,
        departureDate: faker.date.future().toISOString().split('T')[0], // Random future date
        departureTime: faker.date.future().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }), // Random time
        capacity: faker.number.int({ min: 50, max: 200 }), // Random capacity
        availableSeats: faker.number.int({ min: 10, max: 100 }), // Random available seats
        price: faker.number.int({ min: 100000, max: 500000 }), // Random price
        duration: faker.number.int({ min: 2, max: 12 }), // Random duration
        seatType: faker.helpers.arrayElement([
          'Economy',
          'Business',
          'First Class',
        ]), // Random seat type
        amenities: faker.helpers.arrayElements(amenitiesOptions, {
          min: 1,
          max: 5,
        }), // Random amenities
        rating: faker.number.int({ min: 1, max: 5 }), // Random rating
        discount: faker.number.int({ min: 0, max: 20 }), // Random discount
      })
    }
    return trains
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Result
          status="success"
          title="Successfully Added New Train!"
          subTitle="The new train has been added to the database."
          extra={[
            <Button
              type="primary"
              key="addAnother"
              onClick={() => setIsSuccess(false)}
            >
              Add Another Train
            </Button>,
            <Button key="goToTrains" onClick={() => navigate('/trains')}>
              Go to Trains List
            </Button>,
          ]}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Add New Train
        </h1>
        <Progress
          percent={progress}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          status={progress === 100 ? 'success' : 'active'}
          className="mb-6"
        />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          className="space-y-6"
          aria-label="Add Train Form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Train Name"
              name="trainName"
              rules={[
                { required: true, message: 'Please enter the train name!' },
              ]}
            >
              <Input placeholder="Enter train name" />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: 'Please enter the company name!' },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Origin"
              name="origin"
              rules={[{ required: true, message: 'Please enter the origin!' }]}
            >
              <Input placeholder="Enter origin" />
            </Form.Item>

            <Form.Item
              label="Destination"
              name="destination"
              rules={[
                { required: true, message: 'Please enter the destination!' },
              ]}
            >
              <Input placeholder="Enter destination" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Departure Date"
              name="departureDate"
              rules={[
                {
                  required: true,
                  message: 'Please select the departure date!',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Departure Time"
              name="departureTime"
              rules={[
                {
                  required: true,
                  message: 'Please select the departure time!',
                },
              ]}
            >
              <TimePicker
                style={{ width: '100%' }}
                format={timeFormat}
                defaultValue={dayjs('00:00', timeFormat)}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                { required: true, message: 'Please enter the capacity!' },
              ]}
            >
              <Input type="number" placeholder="Enter capacity" min={1} />
            </Form.Item>

            <Form.Item
              label="Available Seats"
              name="availableSeats"
              rules={[
                {
                  required: true,
                  message: 'Please enter the available seats!',
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter available seats"
                min={0}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price!' }]}
            >
              <Input type="number" placeholder="Enter price" min={0} />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                { required: true, message: 'Please enter the duration!' },
              ]}
            >
              <Input placeholder="Enter duration (e.g., 6 hours)" />
            </Form.Item>
          </div>

          <Form.Item
            label="Seat Type"
            name="seatType"
            rules={[{ required: true, message: 'Please enter the seat type!' }]}
          >
            <Select placeholder="Select seat type">
              <Option value="Economy">Economy</Option>
              <Option value="Business">Business</Option>
              <Option value="First Class">First Class</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Amenities"
            name="amenities"
            rules={[
              { required: true, message: 'Please select the amenities!' },
            ]}
          >
            <Select mode="multiple" placeholder="Select amenities">
              <Option value="Wi-Fi">Wi-Fi</Option>
              <Option value="Food">Food</Option>
              <Option value="Power Outlet">Power Outlet</Option>
              <Option value="Air Conditioning">Air Conditioning</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please enter the rating!' }]}
          >
            <Input
              type="number"
              placeholder="Enter rating (1-5)"
              min={1}
              max={5}
            />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please enter the discount!' }]}
          >
            <Input
              type="number"
              placeholder="Enter discount (%)"
              min={0}
              max={100}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              Add Train
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="dashed"
              onClick={addMultipleTrains}
              loading={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add 30 Trains Automatically
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AddTrain
