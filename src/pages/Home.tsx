import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, RotateCcw, Star, Sparkles } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import ProductCard from '../components/ProductCard';
import { products, categories, reviews } from '../data/products';
import { Product } from '../data/products';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function HomePage({ onNavigate, onViewProduct }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Hero3D />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808] z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent z-[1]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-[#7C3AED]" />
              <span className="text-[#7C3AED] text-sm font-medium">New Collection 2026</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Experience Tech
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#EC4899] bg-clip-text text-transparent">
                In Another Dimension
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
              Explore premium technology products in immersive 3D. Rotate, zoom, and interact before you buy.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('shop')}
                className="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#7C3AED]/25 transition-all flex items-center gap-2"
              >
                Explore Products <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: '3D Preview', desc: 'Interactive product views' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: Shield, title: '2-Year Warranty', desc: 'Full coverage included' },
              { icon: RotateCcw, title: '30-Day Returns', desc: 'No questions asked' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#7C3AED]/30 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon size={22} className="text-[#7C3AED]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-[#7C3AED] text-sm font-medium uppercase tracking-wider">Curated Selection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Featured Products</h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="hidden sm:flex items-center gap-2 text-[#7C3AED] hover:text-[#06B6D4] transition-colors font-medium"
            >
              View All <ArrowRight size={16} />
            </button>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onView={onViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#06B6D4] text-sm font-medium uppercase tracking-wider">Browse By</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Categories</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(c => c.id !== 'all').map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => onNavigate('shop')}
                className="p-6 bg-[#111111] rounded-2xl border border-white/5 hover:border-[#7C3AED]/30 transition-all text-center group"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <span className="text-white text-sm font-medium group-hover:text-[#7C3AED] transition-colors">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-[#EC4899] text-sm font-medium uppercase tracking-wider">Hot Right Now</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Trending Products</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onView={onViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#7C3AED] text-sm font-medium uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#111111] rounded-2xl border border-white/5 hover:border-[#7C3AED]/20 transition-colors"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{review.avatar}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED]/20 via-[#111111] to-[#06B6D4]/20 border border-white/5 p-10 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Subscribe to get exclusive deals, early access to new products, and tech insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#7C3AED]/25 transition-shadow"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
