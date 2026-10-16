import { Search, X } from 'lucide-react';
import './menu.css';

export default function SearchInput({ value, onChange, onClear, placeholder = 'Search dishes, drinks, fastings...' }) {
  return (
    <div className="search-input-wrapper">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search menu items"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClear}
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
