import './index.css'

const DishCard = ({dish, quantity, onIncrease, onDecrease}) => (
  <div className="dish-card">
    <img src={dish.dish_image} alt={dish.dish_name} className="dish-image" />
    <div className="dish-details">
      <h3 className="dish-name">{dish.dish_name}</h3>
      <p className="dish-price">
        {dish.dish_currency} {dish.dish_price}
      </p>

      <p className="dish-description">{dish.dish_description}</p>
      <p className="dish-calories">{dish.dish_calories} calories</p>

      {dish.addonCat.length > 0 && (
        <p className="dish-addon">Customizations available</p>
      )}

      {dish.dish_Availability ? (
        <div className="quantity-controls">
          <button type="button" onClick={onDecrease} className="quantity-btn">
            -
          </button>
          <p className="quantity-count" data-testid="dish-quantity">
            {quantity}
          </p>

          <button type="button" onClick={onIncrease} className="quantity-btn">
            +
          </button>
        </div>
      ) : (
        <>
          <p className="not-available">Not available</p>
          <p className="quantity-count" data-testid="dish-quantity">
            {quantity}
          </p>
        </>
      )}
    </div>
  </div>
)

export default DishCard
