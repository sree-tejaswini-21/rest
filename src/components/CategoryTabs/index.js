import './index.css'

const CategoryTabs = ({categories, activeCategory, onCategoryChange}) => (
  <div className="tabs">
    {categories.map(category => (
      <button
        key={category.menu_category_id}
        type="button"
        className={category.menu_category === activeCategory ? 'active' : ''}
        onClick={() => onCategoryChange(category.menu_category)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
