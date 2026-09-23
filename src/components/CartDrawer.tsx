import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#7C3AED]" size={24} />
                <h2 className="text-white font-bold text-xl">Your Cart</h2>
                <span className="px-2 py-0.5 bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-600 text-sm mt-2">Add some amazing products!</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 bg-[#080808] rounded-xl p-4 border border-white/5"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.product.image === 'headphones' ? '🎧' :
                       item.product.image === 'speaker' ? '🔊' :
                       item.product.image === 'watch' ? '⌚' :
                       item.product.image === 'camera' ? '📷' :
                       item.product.image === 'drone' ? '🚁' : '🥽'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate">{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor }} />
                        <span className="text-gray-500 text-xs">${item.product.price}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/5">
                    <span className="text-white">Total</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setIsCartOpen(false); onCheckout(); }}
                  className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#7C3AED]/25 transition-shadow"
                >
                  Checkout — ${subtotal.toFixed(2)}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
