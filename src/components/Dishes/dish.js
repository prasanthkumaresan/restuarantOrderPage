import {Component} from 'react'
import './dish.css'

class Dish extends Component {
  state = {quantity: 0}

  countDecrease = () => {
    const {quantity} = this.state
    const {cartListChange} = this.props
    if (quantity > 0) {
      this.setState(
        prev => ({quantity: prev.quantity - 1}),
        cartListChange('-'),
      )
    }
  }

  countIncrease = () => {
    const {cartListChange} = this.props
    this.setState(prev => ({quantity: prev.quantity + 1}), cartListChange('+'))
  }

  renderCartdet = () => {
    const {quantity} = this.state
    const decreaser = () => {
      this.countDecrease()
    }
    const increaser = () => {
      this.countIncrease()
    }
    return (
      <div className="cart-adder">
        <button className="dish_btn" onClick={decreaser} type="button">
          -
        </button>
        <p className="counter">{quantity}</p>
        <button className="dish_btn" onClick={increaser} type="button">
          +
        </button>
      </div>
    )
  }

  render() {
    const {dish} = this.props
    return (
      <li className="dish_type">
        <img
          src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
          alt="veg"
        />
        <div className="dish_desc">
          <h1 className="dish_name">{dish.dishName}</h1>
          <p>
            {dish.dishCurrency} {dish.dishPrice}
          </p>
          <p className="about_dish">{dish.dishDescription}</p>
          {dish.dishAvailability && this.renderCartdet()}
          {!dish.dishAvailability && <p className="not_avail">Not available</p>}
          <p className="custom_dish">
            {dish.addonCat.length > 0 ? `Customizations Available` : ''}
          </p>
        </div>
        <p className="calories_dish">{dish.dishCalories} calories</p>
        <img className="dish_jpg" src={dish.dishImage} alt="dish.img" />
      </li>
    )
  }
}

export default Dish
