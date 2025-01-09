import { useEffect, useState } from 'react'
import { db, auth } from '../../firebase/firebase-config'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import {
  Spin,
  Empty,
  Card,
  List,
  Row,
  Col,
  Typography,
  Button,
  message,
} from 'antd'
import dayjs from 'dayjs'
import Navbar from '../../components/common/Navbar'
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

  const handleRefund = async (ticketToRefund) => {
    const user = auth.currentUser
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)

        // بررسی زمان باقی‌مانده تا حرکت قطار
        const departureTime = dayjs(
          ticketToRefund.departureDate + ' ' + ticketToRefund.departureTime
        )
        const currentTime = dayjs()
        const hoursRemaining = departureTime.diff(currentTime, 'hour')

        if (hoursRemaining > 2) {
          // حذف بلیط از purchasedTickets
          await updateDoc(userRef, {
            purchasedTickets: arrayRemove(ticketToRefund),
          })

          message.success('بلیط با موفقیت استرداد شد!')
          setPurchasedTickets((prevTickets) =>
            prevTickets.filter((ticket) => ticket !== ticketToRefund)
          )
        } else {
          message.error('زمان استرداد بلیط به پایان رسیده است.')
        }
      } catch (error) {
        console.error('Error refunding ticket:', error)
        message.error('خطایی در استرداد بلیط رخ داد.')
      }
    } else {
      message.error('لطفاً ابتدا وارد شوید.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spin tip="در حال بارگذاری..." />
      </div>
    )
  }

  return (
    <>
      <Navbar />
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
                  actions={[
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleRefund(ticket)}
                      disabled={
                        dayjs(
                          ticket.departureDate + ' ' + ticket.departureTime
                        ).diff(dayjs(), 'hour') <= 2
                      }
                      key="refund"
                    >
                      استرداد بلیط
                    </Button>,
                  ]}
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
                      <Text strong>ساعت حرکت: </Text>
                      <Text>{ticket.departureTime}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>قیمت: </Text>
                      <Text>{ticket.price} تومان</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>تاریخ خرید: </Text>
                      <Text>
                        {dayjs(ticket.purchaseDate).format('YYYY-MM-DD HH:mm')}
                      </Text>
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
    </>
  )
}

export default PurchasedTickets
