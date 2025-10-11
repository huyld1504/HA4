import { Outlet } from 'react-router-dom'
import NavBar from '../common/navigation/NavBar'
import ScrollToTop from '../common/ScrollToTop'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Outlet />
    </>
  )
}

export default MainLayout