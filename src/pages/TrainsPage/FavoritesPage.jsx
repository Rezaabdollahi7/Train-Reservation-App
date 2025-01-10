import { useEffect, useState } from 'react'
import { db, auth } from '../../firebase/firebase-config'
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'
import { Card, List, Typography, Button, message, Skeleton } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import Navbar from '../../components/common/Navbar'

const { Title, Text } = Typography

const FavoritesPage = () => {
  const [favoriteTrains, setFavoriteTrains] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingTrainId, setRemovingTrainId] = useState(null)
  const [purchasingTrainId, setPurchasingTrainId] = useState(null)
  const user = auth.currentUser

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            const favorites = userDoc.data().favorites || []

            const trainsData = await Promise.all(
              favorites.map(async (trainId) => {
                const trainRef = doc(db, 'trains', trainId)
                const trainDoc = await getDoc(trainRef)
                if (trainDoc.exists()) {
                  return { id: trainId, ...trainDoc.data() }
                }
                return null
              })
            )

            const validTrains = trainsData.filter((train) => train !== null)

            setTimeout(() => {
              setFavoriteTrains(validTrains)
              setLoading(false)
            }, 1000)
          }
        } catch (error) {
          console.error('Error fetching favorites:', error)
          message.error('خطایی در دریافت لیست علاقه‌مندی‌ها رخ داد.')
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  const removeFromFavorites = async (trainId) => {
    setRemovingTrainId(trainId)
    try {
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        favorites: arrayRemove(trainId),
      })
      setFavoriteTrains((prev) => prev.filter((train) => train.id !== trainId))
      message.success('قطار از لیست علاقه‌مندی‌ها حذف شد!')
    } catch (error) {
      console.error('Error removing from favorites:', error)
      message.error('خطایی در حذف قطار از لیست علاقه‌مندی‌ها رخ داد.')
    } finally {
      setRemovingTrainId(null)
    }
  }

  const confirmPurchase = async (trainId) => {
    setPurchasingTrainId(trainId)
    try {
      const userRef = doc(db, 'users', user.uid)
      const trainRef = doc(db, 'trains', trainId)
      const trainDoc = await getDoc(trainRef)

      if (trainDoc.exists()) {
        const trainData = trainDoc.data()

        await updateDoc(userRef, {
          purchasedTickets: arrayUnion({ ...trainData, id: trainId }),
        })

        await updateDoc(userRef, {
          favorites: arrayRemove(trainId),
        })

        setFavoriteTrains((prev) =>
          prev.filter((train) => train.id !== trainId)
        )
        message.success('قطار با موفقیت خریداری شد!')
      } else {
        message.error('قطار مورد نظر یافت نشد.')
      }
    } catch (error) {
      console.error('Error confirming purchase:', error)
      message.error('خطایی در خرید قطار رخ داد.')
    } finally {
      setPurchasingTrainId(null)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Title level={3}>لطفاً ابتدا وارد شوید!</Title>
      </div>
    )
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto my-8 px-4">
          <Title level={2}>لیست علاقه‌مندی‌های شما</Title>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
            dataSource={[...Array(3).keys()]}
            renderItem={() => (
              <List.Item>
                <Card bordered className="mb-4">
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </>
    )
  }

  if (favoriteTrains.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center mt-10">
          <Title level={3}>لیست علاقه‌مندی‌های شما خالی است.</Title>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-4">
        <Title level={2}>لیست علاقه‌مندی‌های شما</Title>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          dataSource={favoriteTrains}
          renderItem={(train) => (
            <List.Item key={train.id}>
              <Card
                title={train.trainName || `قطار ${train.id}`}
                bordered
                className="mb-4"
                actions={[
                  <Button
                    key="remove"
                    type="primary"
                    danger
                    icon={<HeartFilled />}
                    onClick={() => removeFromFavorites(train.id)}
                    loading={removingTrainId === train.id}
                  >
                    حذف از علاقه‌مندی‌ها
                  </Button>,
                  <Button
                    key="purchase"
                    type="primary"
                    onClick={() => confirmPurchase(train.id)}
                    loading={purchasingTrainId === train.id}
                  >
                    تایید نهایی و خرید
                  </Button>,
                ]}
              >
                <Text strong>مبدا: </Text>
                <Text>{train.origin}</Text>
                <br />
                <Text strong>مقصد: </Text>
                <Text>{train.destination}</Text>
                <br />
                <Text strong>تاریخ حرکت: </Text>
                <Text>{train.departureDate}</Text>
                <br />
                <Text strong>ساعت حرکت: </Text>
                <Text>{train.departureTime}</Text>
                <br />
                <Text strong>قیمت: </Text>
                <Text>{train.price.toLocaleString()} تومان</Text>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}

export default FavoritesPage
