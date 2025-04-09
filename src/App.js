import {useState} from 'react'
import Header from './components/Header'
import RestaurantMenu from './components/RestaurantMenu'
import './App.css'

const App = () => {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <RestaurantMenu setCartCount={setCartCount} />
    </div>
  )
}

export default App
