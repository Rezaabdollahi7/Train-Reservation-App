import { useEffect, useState } from 'react'
import { db, auth } from '../../firebase/firebase-config'
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'
import {
  Spin,
  Empty,
  Card,
  List,
  Row,
  Col,
  Typography,
  message,
  Button,
} from 'antd'
import Navbar from '../../components/common/Navbar'
const { Title, Text } = Typography

const Cart = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            setTickets(userDoc.data().tickets || [])
          } else {
            setTickets([])
          }
        } catch (error) {
          console.error(error)
          message.error('خطایی در گرفتن اطلاعات سبد خرید رخ داد.')
        }
      } else {
        setTickets([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const removeTicket = async (ticketToRemove) => {
    const user = auth.currentUser
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          tickets: arrayRemove(ticketToRemove),
        })
        message.success('بلیط با موفقیت حذف شد!')
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket !== ticketToRemove)
        )
      } catch (error) {
        console.error('Error removing ticket:', error)
        message.error('خطایی در حذف بلیط رخ داد.')
      }
    } else {
      message.error('لطفاً ابتدا وارد شوید.')
    }
  }

  const confirmPurchase = async () => {
    const user = auth.currentUser
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid)

        // اضافه کردن بلیط‌ها به purchasedTickets
        await updateDoc(userRef, {
          purchasedTickets: arrayUnion(...tickets), // اضافه کردن تمام بلیط‌ها
          tickets: [], // خالی کردن سبد خرید
        })

        message.success('خرید با موفقیت انجام شد!')
        setTickets([]) // به‌روزرسانی UI
      } catch (error) {
        console.error('Error confirming purchase:', error)
        message.error('خطایی در انجام خرید رخ داد.')
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
        <Title level={2}>سبد خرید شما</Title>
        {tickets.length > 0 ? (
          <>
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
              dataSource={tickets}
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
                        onClick={() => removeTicket(ticket)}
                        key="remove"
                      >
                        حذف بلیط
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
            <Button
              type="primary"
              onClick={confirmPurchase}
              disabled={tickets.length === 0}
              className="mt-4"
            >
              تایید نهایی و خرید
            </Button>
          </>
        ) : (
          <Empty className="my-10" description="سبد خرید شما خالی است." />
        )}
      </div>
    </>
  )
}

export default Cart
