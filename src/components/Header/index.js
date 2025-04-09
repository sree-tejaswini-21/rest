import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

const Header = ({cartCount}) => (
  <div className="header">
    <h1>UNI Resto Cafe</h1>
    <h1>My Orders</h1>
    <div className="cart-container">
      <FaShoppingCart className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
    </div>
  </div>
)

export default Header
