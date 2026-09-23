import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, Product } from '../data/products';

interface ShopPageProps {
  onViewProduct: (product: Product) => void;
}

export default function ShopPage({ onViewProduct }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Shop All Products</h1>
          <p className="text-gray-400 text-lg">Discover our collection of premium tech products</p>
        </motion.div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-[#111111] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-[#7C3AED] appearance-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors flex items-center gap-2 ${
                showFilters ? 'bg-[#7C3AED]/20 border-[#7C3AED]/50 text-[#7C3AED]' : 'bg-[#111111] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="hidden md:flex items-center bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setGridCols(3)}
                className={`p-3 ${gridCols === 3 ? 'text-[#7C3AED] bg-[#7C3AED]/10' : 'text-gray-500 hover:text-white'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={`p-3 ${gridCols === 2 ? 'text-[#7C3AED] bg-[#7C3AED]/10' : 'text-gray-500 hover:text-white'}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-[#111111] rounded-2xl border border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Price Range</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#7C3AED]"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#7C3AED]"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#7C3AED] text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Quick Filters</h4>
                <div className="space-y-2">
                  {['On Sale', 'In Stock', 'Top Rated', 'New Arrivals'].map(filter => (
                    <label key={filter} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#7C3AED]" />
                      <span className="text-gray-400 text-sm">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20'
                  : 'bg-[#111111] border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onView={onViewProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
