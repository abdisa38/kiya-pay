import { Flame, Sun, Utensils, Coffee, GlassWater, Cake, Sparkles } from 'lucide-react';
import './menu.css';

// Map icon string names to Lucide icons
const ICON_MAP = {
  Flame,
  Sun,
  Utensils,
  Coffee,
  GlassWater,
  Cake,
};

export default function CategoryNav({
  categories = [],
  activeCategoryId,
  onSelectCategory,
  itemCountsByCategory = {},
}) {
  return (
    <nav className="category-nav-sticky" aria-label="Menu categories">
      <div className="category-scroll-container">
        <button
          type="button"
          className={`category-pill ${activeCategoryId === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          <Sparkles size={15} />
          <span>All Items</span>
        </button>

        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Utensils;
          const count = itemCountsByCategory[cat.id];
          const isActive = activeCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <IconComponent size={15} />
              <span>{cat.name}</span>
              {typeof count === 'number' && <span className="cat-count">({count})</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
