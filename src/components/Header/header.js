import {IoCartOutline} from 'react-icons/io5'
import './header.css'

const Header = props => {
  const {cartList} = props
  return (
    <div className="navbar">
      <h1 className="logo">UNI Resto Cafe</h1>
      <div className="cart_cont">
        <p className="my-ord">My Orders</p>
        <IoCartOutline className="log-cart" color="black" size="2rem" />
        <p className="cartTag">{cartList}</p>
      </div>
    </div>
  )
}

export default Header
