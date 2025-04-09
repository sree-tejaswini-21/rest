import {useEffect, useState} from 'react'
import CategoryTabs from '../CategoryTabs'
import DishCard from '../DishCard'
import './index.css'

const RestaurantMenu = ({setCartCount}) => {
  const [menuData, setMenuData] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [dishQuantities, setDishQuantities] = useState({})

  useEffect(() => {
    const getMenu = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      setMenuData(data[0].table_menu_list)
      setActiveCategory(data[0].table_menu_list[0].menu_category)

      const initialQuantities = {}
      data[0].table_menu_list.forEach(category => {
        category.category_dishes.forEach(dish => {
          initialQuantities[dish.dish_id] = 0
        })
      })
      setDishQuantities(initialQuantities)
    }

    getMenu()
  }, [])

  useEffect(() => {
    const totalCount = Object.values(dishQuantities).reduce(
      (acc, curr) => acc + curr,
      0,
    )
    setCartCount(totalCount)
  }, [dishQuantities, setCartCount])

  const handleCategoryChange = category => setActiveCategory(category)

  const handleIncrease = dishId => {
    setDishQuantities(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const handleDecrease = dishId => {
    setDishQuantities(prev => {
      const currentQty = prev[dishId] || 0
      if (currentQty === 0) return prev
      return {...prev, [dishId]: currentQty - 1}
    })
  }

  const currentCategory = menuData.find(
    category => category.menu_category === activeCategory,
  )

  const currentDishes = currentCategory ? currentCategory.category_dishes : []

  return (
    <div>
      <CategoryTabs
        categories={menuData}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="dishes-container">
        {currentDishes.map(dish => (
          <DishCard
            key={dish.dish_id}
            dish={dish}
            quantity={dishQuantities[dish.dish_id] || 0}
            onIncrease={() => handleIncrease(dish.dish_id)}
            onDecrease={() => handleDecrease(dish.dish_id)}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
