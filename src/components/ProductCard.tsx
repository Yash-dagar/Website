import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (product: Product) => void;
}

const colorMap: Record<string, string> = {
  headphones: 'from-purple-600/20 to-cyan-600/20',
  speaker: 'from-pink-600/20 to-purple-600/20',
  watch: 'from-cyan-600/20 to-blue-600/20',
  camera: 'from-amber-600/20 to-red-600/20',
  drone: 'from-green-600/20 to-cyan-600/20',
  vr: 'from-indigo-600/20 to-purple-600/20',
};

const emojiMap: Record<string, string> = {
  headphones: '🎧',
  speaker: '🔊',
  watch: '⌚',
  camera: '📷',
  drone: '🚁',
  vr: '🥽',
};

export default function ProductCard({ product, index, onView }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#7C3AED]/30 transition-all duration-500"
    >
      {/* Image Area */}
      <div className={`relative h-56 bg-gradient-to-br ${colorMap[product.image] || 'from-purple-600/20 to-cyan-600/20'} flex items-center justify-center overflow-hidden`}>
        <motion.div
          className="text-7xl"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {emojiMap[product.image] || '📦'}
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold rounded-full">
            {product.badge}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onView(product)}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product, product.colors[0])}
            className="p-3 bg-[#7C3AED] rounded-full text-white hover:bg-[#6D28D9] transition-colors"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-white font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#7C3AED] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-xs text-green-400 font-medium">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
