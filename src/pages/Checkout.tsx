import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Check, Package, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
  });

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] flex items-center justify-center"
          >
            <Check size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
          <p className="text-gray-400 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-500 text-sm mb-8">
            Order #NX{Math.random().toString(36).substr(2, 8).toUpperCase()} • Confirmation sent to your email
          </p>
          <div className="p-6 bg-[#111111] rounded-2xl border border-white/5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Estimated Delivery</span>
              <span className="text-white font-medium">3-5 Business Days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Total Paid</span>
              <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Checkout</h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { num: 1, label: 'Information', icon: MapPin },
            { num: 2, label: 'Shipping', icon: Truck },
            { num: 3, label: 'Payment', icon: CreditCard },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step >= s.num
                  ? 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30'
                  : 'bg-[#111111] text-gray-500 border border-white/5'
              }`}>
                <s.icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.num}</span>
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${step > s.num ? 'bg-[#7C3AED]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-[#111111] rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <Package size={18} className="text-[#7C3AED]" /> Contact Information
                    </h3>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-[#111111] rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-[#7C3AED]" /> Shipping Address
                    </h3>
                    <input
                      type="text"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP/Postal code"
                        value={formData.zip}
                        onChange={(e) => updateField('zip', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                      <select
                        value={formData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl"
                  >
                    Continue to Shipping
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-[#111111] rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <Truck size={18} className="text-[#7C3AED]" /> Shipping Method
                    </h3>
                    {[
                      { name: 'Standard Shipping', time: '5-7 business days', price: 'Free', selected: true },
                      { name: 'Express Shipping', time: '2-3 business days', price: '$14.99', selected: false },
                      { name: 'Next Day Delivery', time: '1 business day', price: '$29.99', selected: false },
                    ].map((option, i) => (
                      <label key={i} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors mb-3 ${
                        option.selected ? 'border-[#7C3AED]/50 bg-[#7C3AED]/5' : 'border-white/5 hover:border-white/20'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            option.selected ? 'border-[#7C3AED]' : 'border-gray-500'
                          }`}>
                            {option.selected && <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{option.name}</p>
                            <p className="text-gray-500 text-xs">{option.time}</p>
                          </div>
                        </div>
                        <span className={`font-medium text-sm ${option.price === 'Free' ? 'text-green-400' : 'text-white'}`}>
                          {option.price}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium">
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl"
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-[#111111] rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <CreditCard size={18} className="text-[#7C3AED]" /> Payment Details
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={(e) => updateField('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={formData.nameOnCard}
                        onChange={(e) => updateField('nameOnCard', e.target.value)}
                        className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => updateField('expiry', e.target.value)}
                          className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => updateField('cvv', e.target.value)}
                          className="px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
                      <Lock size={12} />
                      <span>Your payment info is encrypted and secure</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium">
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="flex-1 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Lock size={16} />
                      Place Order — ${total.toFixed(2)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 p-6 bg-[#111111] rounded-2xl border border-white/5">
              <h3 className="text-white font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center text-lg flex-shrink-0">
                      {item.product.image === 'headphones' ? '🎧' :
                       item.product.image === 'speaker' ? '🔊' :
                       item.product.image === 'watch' ? '⌚' :
                       item.product.image === 'camera' ? '📷' :
                       item.product.image === 'drone' ? '🚁' : '🥽'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/5">
                  <span className="text-white">Total</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
