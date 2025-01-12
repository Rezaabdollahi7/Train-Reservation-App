import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/LandingPage/components/SignUp'
import Login from '../pages/LandingPage/components/Login'
import TrainList from '../pages/TrainsPage/TrainList'
import AddTrain from '../pages/TrainsPage/AddTrain'
import EditProfile from '../components/common/EditProfile'
import NotFound from '../pages/404/404'
import Support from '../pages/Support/Support'
import Cart from '../pages/TrainsPage/Cart'
import PurchasedTickets from '../pages/TrainsPage/PurchasedTickets'
import FavoritesPage from '../pages/TrainsPage/FavoritesPage'
import Layout from '../components/Layout'

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout fullWidth>
            <LandingPage />
          </Layout>
        }
      />
      <Route
        path="/tickets"
        element={
          <Layout>
            <TrainList />
          </Layout>
        }
      />
      <Route
        path="/TrainList"
        element={
          <Layout>
            <TrainList />
          </Layout>
        }
      />
      <Route
        path="/AddTrain"
        element={
          <Layout>
            <AddTrain />
          </Layout>
        }
      />
      <Route
        path="/EditProfile"
        element={
          <Layout>
            <EditProfile />
          </Layout>
        }
      />
      <Route
        path="/Support"
        element={
          <Layout>
            <Support />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/purchased-tickets"
        element={
          <Layout>
            <PurchasedTickets />
          </Layout>
        }
      />
      <Route
        path="/favorites"
        element={
          <Layout>
            <FavoritesPage />
          </Layout>
        }
      />

      <Route
        path="/signUp"
        element={
          <Layout fullWidth>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout fullWidth>
            <Login />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  )
}

export default AppRouter
