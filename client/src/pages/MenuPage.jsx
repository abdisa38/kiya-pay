import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SearchX, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { restaurantService } from '../services/restaurantService';
import { useCart } from '../context/CartContext';
import RestaurantHeader from '../components/menu/RestaurantHeader';
import SearchInput from '../components/menu/SearchInput';
import CategoryNav from '../components/menu/CategoryNav';
import FoodCard from '../components/menu/FoodCard';
import FoodItemModal from '../components/menu/FoodItemModal';
import StickyCartBar from '../components/cart/StickyCartBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import '../components/menu/menu.css';

export default function MenuPage() {
  const { restaurantSlug = 'buna-bite' } = useParams();
  const [searchParams] = useSearchParams();

  // Support both ?t= and ?table= for flexible QR table encoding
  const tableParam = searchParams.get('t') || searchParams.get('table') || '';

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  const { addItem, notification } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    restaurantService
      .getRestaurantBySlug(restaurantSlug)
      .then((data) => {
        if (isMounted) {
          setRestaurant(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load restaurant menu.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [restaurantSlug]);

  // Compute item counts by category
  const itemCountsByCategory = useMemo(() => {
    if (!restaurant?.items) return {};
    const counts = {};
    restaurant.items.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, [restaurant]);

  // Filter items by search query and category
  const filteredItems = useMemo(() => {
    if (!restaurant?.items) return [];

    let result = restaurant.items;

    if (activeCategoryId !== 'all') {
      result = result.filter((item) => item.categoryId === activeCategoryId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.dietary?.label && item.dietary.label.toLowerCase().includes(q))
      );
    }

    return result;
  }, [restaurant, activeCategoryId, searchQuery]);

  // Group items by category for structured presentation
  const groupedSections = useMemo(() => {
    if (!restaurant?.categories) return [];

    if (searchQuery.trim() || activeCategoryId !== 'all') {
      return [{ category: null, items: filteredItems }];
    }

    return restaurant.categories
      .map((cat) => ({
        category: cat,
        items: filteredItems.filter((i) => i.categoryId === cat.id),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [restaurant, filteredItems, searchQuery, activeCategoryId]);

  const handleQuickAdd = (item) => {
    addItem(item, [], 1, '');
  };

  const handleOpenDetails = (item) => {
    setSelectedItemForModal(item);
  };

  const handleModalAddToCart = (item, modifiers, quantity, prepNotes) => {
    addItem(item, modifiers, quantity, prepNotes);
  };

  if (loading) {
    return (
      <div className="menu-container" style={{ paddingTop: '80px' }}>
        <LoadingSpinner text="Preparing fresh digital menu..." size="lg" />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="menu-container" style={{ paddingTop: '60px' }}>
        <ErrorMessage
          title="Restaurant Menu Not Found"
          message={error || `Could not find a digital menu for "${restaurantSlug}".`}
        />
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/r/buna-bite?t=DEMO-TABLE-04" className="btn btn-primary btn-md">
            View "Buna &amp; Bite Kitchen" Demo
          </Link>
          <div style={{ marginTop: '12px' }}>
            <Link to="/" className="btn btn-ghost btn-sm">
              <ArrowLeft size={16} /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      {/* Toast Feedback for Cart Adds */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 'var(--z-toast)',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-floating)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'var(--text-xs)',
            fontWeight: '600',
            animation: 'fadeIn 200ms ease-out',
          }}
        >
          <CheckCircle2 size={16} color="var(--color-accent-gold)" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Restaurant Header */}
      <RestaurantHeader restaurant={restaurant} tableNumber={tableParam} />

      {/* Search Input */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder={`Search ${restaurant.name} dishes, drinks...`}
      />

      {/* Category Pills Navigation */}
      <CategoryNav
        categories={restaurant.categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
        itemCountsByCategory={itemCountsByCategory}
      />

      {/* Menu Item Sections */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No dishes found"
          description={
            searchQuery
              ? `No menu items match "${searchQuery}". Try searching for another ingredient or reset the filter.`
              : 'There are no active menu items in this category right now.'
          }
          actionLabel="Clear Search Filter"
          onAction={() => {
            setSearchQuery('');
            setActiveCategoryId('all');
          }}
        />
      ) : (
        <main className="menu-sections-wrapper">
          {groupedSections.map((section, idx) => (
            <section
              key={section.category ? section.category.id : `search_results_${idx}`}
              id={section.category ? section.category.id : undefined}
              className="menu-category-section"
            >
              {section.category && (
                <div className="category-section-header">
                  <h2 className="category-section-title">{section.category.name}</h2>
                  {section.category.description && (
                    <p className="category-section-desc">{section.category.description}</p>
                  )}
                </div>
              )}

              <div className="food-grid">
                {section.items.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onOpenDetails={handleOpenDetails}
                    onQuickAdd={handleQuickAdd}
                    orderingEnabled={restaurant.orderingEnabled}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      {/* Item Detail / Customization Modal */}
      <FoodItemModal
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
        item={selectedItemForModal}
        onAddToCart={handleModalAddToCart}
        orderingEnabled={restaurant.orderingEnabled}
      />

      {/* Sticky Bottom Cart Bar */}
      {restaurant.orderingEnabled && <StickyCartBar restaurantSlug={restaurant.slug} />}
    </div>
  );
}
