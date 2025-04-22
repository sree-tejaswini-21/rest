import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

const Header = ({restaurantName, cartCount}) => (
  <div className="header">
    <h1>{restaurantName}</h1>
    <p>My Orders</p>
    <div className="cart-container">
      <FaShoppingCart className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
    </div>
  </div>
)

export default Header
