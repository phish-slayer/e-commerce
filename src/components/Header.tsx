import { Search, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartToggle: () => void;
  cartItemCount: number;
}

export default function Header({
  searchQuery,
  onSearchChange,
  onCartToggle,
  cartItemCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-amber-50 tracking-tight">
                Ember & Brew
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-400/80 tracking-widest uppercase hidden sm:block">
                Specialty Coffee Roasters
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-stone-800/80 border border-amber-900/30 rounded-full text-sm text-amber-50 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartToggle}
            className="relative p-2 sm:p-3 rounded-full bg-stone-800/80 border border-amber-900/30 hover:bg-stone-700/80 hover:border-amber-700/40 transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-amber-100 group-hover:text-amber-300 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-amber-500 text-stone-900 text-xs font-bold rounded-full animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
