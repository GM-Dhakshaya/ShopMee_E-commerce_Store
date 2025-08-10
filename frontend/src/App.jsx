import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Verify from './pages/verify';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Context
import ShopContextProvider, { ShopContext } from './context/ShopContext';

const AppContent = () => {
  const location = useLocation();
  const { showSearch } = useContext(ShopContext);
  const isHomePage = location.pathname === '/';
  const isCollectionPage = location.pathname.includes('collection');

  return (
    <div className={`min-h-screen ${isHomePage ? 'bg-cover bg-center bg-no-repeat bg-fixed' : ''}`}
         style={isHomePage ? {backgroundImage: "url('/src/assets/mainb.png')"} : {}}>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        
        <div className={`${showSearch && isCollectionPage ? 'pt-32' : 'pt-20'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ShopContextProvider>
      <ScrollToTop />
      <AppContent />
    </ShopContextProvider>
  );
};

export default App;
