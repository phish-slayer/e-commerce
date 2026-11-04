import { categories } from '../data';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === category
              ? 'bg-amber-500 text-stone-900 shadow-lg shadow-amber-500/20'
              : 'bg-stone-800/60 text-stone-300 border border-stone-700/50 hover:bg-stone-700/60 hover:text-amber-200 hover:border-amber-800/30'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
