import { useEffect, useState } from 'react'
import { db, auth } from '../../firebase/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { Spin, Empty, Card, List, Row, Col, Typography } from 'antd'

const { Title, Text } = Typography

const PurchasedTickets = () => {
  const [purchasedTickets, setPurchasedTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            setPurchasedTickets(userDoc.data().purchasedTickets || [])
          } else {
            setPurchasedTickets([])
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        setPurchasedTickets([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spin tip="در حال بارگذاری..." />
      </div>
    )
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <Title level={2}>بلیط‌های خریداری شده</Title>
      {purchasedTickets.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          dataSource={purchasedTickets}
          renderItem={(ticket) => (
            <List.Item>
              <Card
                title={ticket.trainName || 'بدون نام'}
                bordered
                className="mb-4"
              >
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text strong>مبدا: </Text>
                    <Text>{ticket.origin}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>مقصد: </Text>
                    <Text>{ticket.destination}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>تاریخ حرکت: </Text>
                    <Text>{ticket.departureDate}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>ظرفیت باقی‌مانده: </Text>
                    <Text>{ticket.availableSeats}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>قیمت: </Text>
                    <Text>{ticket.price} تومان</Text>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          className="my-10"
          description="هیچ بلیط خریداری شده‌ای وجود ندارد."
        />
      )}
    </div>
  )
}

export default PurchasedTickets
