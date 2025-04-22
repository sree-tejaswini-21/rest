import {useEffect, useState, useCallback} from 'react'
import CategoryTabs from '../CategoryTabs'
import DishCard from '../DishCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RestaurantMenu = ({setCartCount, setRestaurantName}) => {
  const [menuData, setMenuData] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [dishQuantities, setDishQuantities] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getMenu = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      if (response.ok) {
        const data = await response.json()
        const restaurant = data[0]

        setRestaurantName(restaurant.restaurant_name)
        setMenuData(restaurant.table_menu_list)
        setActiveCategory(restaurant.table_menu_list[0].menu_category)

        const initialQuantities = {}
        restaurant.table_menu_list.forEach(category => {
          category.category_dishes.forEach(dish => {
            initialQuantities[dish.dish_id] = 0
          })
        })
        setDishQuantities(initialQuantities)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setApiStatus(apiStatusConstants.failure)
    }
  }, [setRestaurantName])

  useEffect(() => {
    getMenu()
  }, [getMenu])

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

  const renderDishes = () => {
    const currentCategory = menuData.find(
      category => category.menu_category === activeCategory,
    )

    const currentDishes = currentCategory ? currentCategory.category_dishes : []

    return (
      <>
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
      </>
    )
  }

  const renderLoader = () => <p className="loader">Loading...</p>

  const renderFailure = () => (
    <div className="error-container">
      <p className="error-text">Failed to load menu. Please try again.</p>
      <button type="button" className="retry-btn" onClick={getMenu}>
        Retry
      </button>
    </div>
  )

  const renderMenu = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderDishes()
      case apiStatusConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return <div>{renderMenu()}</div>
}

export default RestaurantMenu
