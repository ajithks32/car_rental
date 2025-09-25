import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Loading from "./component/Loading";
import Container from "./component/Container";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Contact from "./component/Contact";
import AboutPage from "./component/About";
import TaxiList from "./component/TaxiList";
import CarList from "./component/CarList";
import Dashboard from "./component/Dashboard/Dashboard";
import AllCars from "./component/Dashboard/pages/AllCars";
import AddCar from "./component/Dashboard/pages/AddCar";
import DeleteCar from "./component/Dashboard/pages/DeleteCar";
import Bookings from "./component/Dashboard/pages/Bookings";
import Users from "./component/Dashboard/pages/Users";
import Analytics from "./component/Dashboard/pages/Analytics";
import Offers from "./component/Dashboard/pages/Offers";
import CarRental from "./component/Dashboard/pages/CarRental";
import ProtectedRoute from "./component/ProtectedRoute ";
import SelfDriveCar from "./component/SelfDriveCar";
import BookUrTaxi from "./component/BookUrTaxi";
import BannerImage from "./component/Dashboard/pages/BannerImage";
import VendorPage from "./component/VendorPage";
import VendorAddcar from "./component/VendorAddcar";
import VehicleList from "./component/VehicleList";
import SelfDriveBike from "./component/SelfDriveBike";
import Alert from "./component/Dashboard/pages/Alert";

const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Container />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/taxilist" element={<TaxiList />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/selfdrivecar" element={<SelfDriveCar />} />
          <Route path="/selfdrivebike" element={<SelfDriveBike />} />
          <Route path="/bookurtaxi" element={<BookUrTaxi />} />
          <Route path="/vendor" element={<VendorPage />}>
            <Route path="vendor-add-car" element={<VendorAddcar />} />
            <Route path="vendor-car-list" element={<VehicleList />} />
          </Route>

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="cars" element={<AllCars />} />
              <Route path="add-car" element={<AddCar />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="edit-car" element={<DeleteCar />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="carrental" element={<CarRental />} />
              <Route path="users" element={<Users />} />
              <Route path="offerimage" element={<Offers />} />
              <Route path="bannerimage" element={<BannerImage />} />
              <Route path="alert" element={<Alert />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
