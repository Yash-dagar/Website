import { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/Checkout';
import { Product } from './data/products';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#080808] flex items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#7C3AED] border-r-[#06B6D4]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#EC4899] border-l-[#7C3AED]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Loading Nexa3D...</p>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <CartDrawer onCheckout={() => navigate('checkout')} />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage + (selectedProduct?.id || '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && (
            <HomePage onNavigate={navigate} onViewProduct={viewProduct} />
          )}
          {currentPage === 'shop' && (
            <ShopPage onViewProduct={viewProduct} />
          )}
          {currentPage === 'product' && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={() => navigate('shop')}
              onViewProduct={viewProduct}
            />
          )}
          {currentPage === 'checkout' && (
            <CheckoutPage onBack={() => navigate('shop')} />
          )}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Suspense>
  );
}
