import { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, Product } from './data';

function AppContent() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,53,15,0.15),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(146,64,14,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCartToggle={() => setIsCartOpen(true)}
          cartItemCount={totalItems}
        />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-50 mb-4 tracking-tight">
              Crafted with Passion,
              <br />
              <span className="text-amber-400">Roasted to Perfection</span>
            </h2>
            <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Discover our curated selection of specialty coffees from the world's
              finest growing regions. Each bean is carefully sourced and roasted to
              bring out its unique character.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <p className="text-sm text-stone-500">
              {filteredProducts.length} coffee{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block opacity-50">🔍</span>
              <p className="text-stone-400 text-lg mb-2">No coffees found</p>
              <p className="text-stone-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-sm hover:bg-amber-500/20 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-800/50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">☕</span>
                <span className="text-sm font-semibold text-amber-100">Ember & Brew</span>
              </div>
              <p className="text-xs text-stone-500">
                © 2026 Ember & Brew Specialty Coffee. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-stone-500 hover:text-amber-400 cursor-pointer transition-colors">About</span>
                <span className="text-xs text-stone-500 hover:text-amber-400 cursor-pointer transition-colors">Contact</span>
                <span className="text-xs text-stone-500 hover:text-amber-400 cursor-pointer transition-colors">FAQ</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
