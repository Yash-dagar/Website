import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white font-bold text-xl">
                Nexa<span className="text-[#7C3AED]">3D</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The future of tech shopping. Experience products in 3D before you buy. Premium technology for premium people.
            </p>
            <div className="flex gap-3 mt-6">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  href="#"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-[#7C3AED]/20 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Headphones', 'Speakers', 'Smart Watches', 'Cameras', 'VR Headsets'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-[#7C3AED] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press', 'Blog', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-[#7C3AED] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Shipping Info', 'Returns', 'Warranty', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-[#7C3AED] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Nexa3D. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-xs">Accepted Payments</span>
            <div className="flex gap-2">
              {['💳', '🏦', '📱', '🪙'].map((emoji, i) => (
                <span key={i} className="text-lg">{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
