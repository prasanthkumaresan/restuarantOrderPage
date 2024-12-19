import './menu.css'

const Menu = props => {
  const {menu, isActive, tabChange} = props
  const menuClass = isActive ? 'active_bar' : 'inActive_bar'
  const changer = () => {
    tabChange(menu)
  }
  return (
    <button type="button" className={menuClass} onClick={changer}>
      {menu}
    </button>
  )
}

export default Menu
