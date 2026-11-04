import { Plus, Eye } from 'lucide-react';
import { Product } from '../data';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const intensityDots = Array.from({ length: 5 }, (_, i) => i < product.intensity);

  return (
    <div className="group bg-stone-800/60 backdrop-blur-sm border border-amber-900/20 rounded-2xl overflow-hidden hover:border-amber-700/40 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-stone-700/50 to-stone-800/80 flex items-center justify-center overflow-hidden">
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </span>
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-amber-900/60 backdrop-blur-sm text-amber-200 text-xs font-medium rounded-full border border-amber-700/30">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-stone-900/60 backdrop-blur-sm text-stone-300 text-xs font-medium rounded-full">
            {product.weight}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-2 bg-amber-500/90 hover:bg-amber-400 text-stone-900 font-semibold text-sm rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-amber-50 group-hover:text-amber-200 transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-amber-400 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-stone-400 mb-3">{product.origin} · {product.roast} Roast</p>

        {/* Tasting Notes */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 bg-amber-900/20 text-amber-300/80 text-[11px] rounded-full border border-amber-800/20"
            >
              {note}
            </span>
          ))}
          {product.notes.length > 3 && (
            <span className="px-2 py-0.5 text-stone-500 text-[11px]">
              +{product.notes.length - 3}
            </span>
          )}
        </div>

        {/* Intensity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-stone-500 mr-1">Intensity</span>
            {intensityDots.map((active, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  active ? 'bg-amber-400' : 'bg-stone-700'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:border-amber-500 text-amber-400 hover:text-stone-900 transition-all duration-200"
            title="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
