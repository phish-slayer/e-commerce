import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../data';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const intensityDots = Array.from({ length: 5 }, (_, i) => i < product.intensity);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900 border border-amber-900/30 rounded-3xl shadow-2xl shadow-amber-900/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-800/80 border border-amber-900/30 hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="h-56 sm:h-72 bg-gradient-to-br from-amber-900/30 via-stone-800 to-stone-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.1),transparent_70%)]" />
          <span className="text-8xl sm:text-9xl">{product.image}</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-amber-900/40 text-amber-300 text-xs font-medium rounded-full border border-amber-700/30 mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-50">
                {product.name}
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                {product.origin} · {product.roast} Roast · {product.weight}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-stone-500">per {product.weight}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tasting Notes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider mb-3">
              Tasting Notes
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-amber-900/20 text-amber-200 text-sm rounded-full border border-amber-800/30"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-amber-200 uppercase tracking-wider mb-3">
              Intensity
            </h4>
            <div className="flex items-center gap-2">
              {intensityDots.map((active, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-colors ${
                    active
                      ? 'bg-amber-400 shadow-sm shadow-amber-400/50'
                      : 'bg-stone-700'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-stone-400">
                {product.intensity}/5
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t border-stone-800">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-stone-800 rounded-full border border-stone-700 px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 rounded-full hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-amber-50 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 rounded-full hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
