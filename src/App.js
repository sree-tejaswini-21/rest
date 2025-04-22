import {useState} from 'react'
import Header from './components/Header'
import RestaurantMenu from './components/RestaurantMenu'
import './App.css'

const App = () => {
  const [cartCount, setCartCount] = useState(0)
  const [restaurantName, setRestaurantName] = useState('')

  return (
    <div className="app">
      <Header restaurantName={restaurantName} cartCount={cartCount} />
      <RestaurantMenu
        setCartCount={setCartCount}
        setRestaurantName={setRestaurantName}
      />
    </div>
  )
}

export default App
