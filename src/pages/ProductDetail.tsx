import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductViewer3D from '../components/ProductViewer3D';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductDetail({ product, onBack, onViewProduct }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Shop</span>
        </motion.button>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-[#111111] rounded-3xl border border-white/5 overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Loading 3D Model...</p>
                  </div>
                </div>
              }>
                <ProductViewer3D color={selectedColor} type={product.image} />
              </Suspense>
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-400">
                  🖱️ Drag to rotate • Scroll to zoom
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-bold rounded-full w-fit mb-4">
                <Check size={12} /> {product.badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm font-bold rounded-lg">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Color</h4>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-[#7C3AED] scale-110 shadow-lg shadow-[#7C3AED]/30'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h4 className="text-white font-medium mb-3">Quantity</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
              >
                <Heart size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#111111] rounded-2xl border border-white/5">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: '2-Year Warranty' },
                { icon: RotateCcw, text: '30-Day Returns' },
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <badge.icon size={18} className="text-[#7C3AED] mx-auto mb-1" />
                  <span className="text-gray-400 text-xs">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex gap-1 p-1 bg-[#111111] rounded-xl border border-white/5 w-fit mb-8">
            {['description', 'specs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            {activeTab === 'description' && (
              <div className="prose prose-invert">
                <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
                <p className="text-gray-400 mt-4">
                  Designed with precision engineering and premium materials, the {product.name} represents the pinnacle of modern technology. Every detail has been carefully crafted to deliver an unparalleled user experience.
                </p>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Material', 'Premium Alloy'],
                  ['Weight', '250g'],
                  ['Connectivity', 'Bluetooth 5.3'],
                  ['Battery', '36 Hours'],
                  ['Water Resistance', 'IPX7'],
                  ['Warranty', '2 Years'],
                ].map(([key, value], i) => (
                  <div key={i} className="p-4 bg-[#111111] rounded-xl border border-white/5">
                    <span className="text-gray-500 text-sm">{key}</span>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[
                  { name: 'Alex M.', rating: 5, text: 'Absolutely incredible product. The 3D preview helped me make the perfect choice!', date: '3 days ago' },
                  { name: 'Sarah K.', rating: 5, text: 'Best purchase I have made this year. Premium quality and fast shipping.', date: '1 week ago' },
                  { name: 'James L.', rating: 4, text: 'Great product overall. The interactive 3D view was super helpful.', date: '2 weeks ago' },
                ].map((review, i) => (
                  <div key={i} className="p-5 bg-[#111111] rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs">{review.date}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onView={onViewProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
