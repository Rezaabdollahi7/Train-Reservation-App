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
    const totalFields = 11 // Total number of fields in the form (including seatType)
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
        </Form>
      </div>
    </div>
  )
}

export default AddTrain
