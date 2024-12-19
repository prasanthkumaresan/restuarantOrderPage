import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header/header'
import Menu from './components/Menu/menu'
import Dishes from './components/Dishes/dish'
import './App.css'

// write your code here
class App extends Component {
  state = {resData: [], activeTab: '', cartList: 0, isLoading: true}

  componentDidMount() {
    this.getRestuarantData()
  }

  renderLoader = () => (
    <div className="products-loader-container load-spin">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  cartListChange = value => {
    if (value === '+') {
      this.setState(prev => ({cartList: prev.cartList + 1}))
    } else {
      this.setState(prev => ({cartList: prev.cartList - 1}))
    }
  }

  onActiveChange = tab => {
    this.setState({activeTab: tab})
  }

  getRestuarantData = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const menuData = data[0].table_menu_list
    const formatedData = menuData.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
    }))
    this.setState({
      activeTab: formatedData[0].menuCategory,
      resData: formatedData,
      isLoading: false,
    })
  }

  render() {
    const {resData, activeTab, cartList, isLoading} = this.state
    const filteredData = resData.filter(each => each.menuCategory === activeTab)
    const dishList = filteredData.map(each => each.categoryDishes)
    const dishFormat = dishList.map(each =>
      each.map(eachV => ({
        addonCat: eachV.addonCat,
        dishAvailability: eachV.dish_Availability,
        dishType: eachV.dish_Type,
        dishCalories: eachV.dish_calories,
        dishCurrency: eachV.dish_currency,
        dishDescription: eachV.dish_description,
        dishId: eachV.dish_id,
        dishImage: eachV.dish_image,
        dishName: eachV.dish_name,
        dishPrice: eachV.dish_price,
      })),
    )
    const menuList = resData.map(each => each.menuCategory)
    if (isLoading) {
      return this.renderLoader()
    }
    return (
      <>
        <Header cartList={cartList} />
        <div className="menu">
          {menuList.map(each => (
            <Menu
              menu={each}
              key={each}
              isActive={activeTab === each}
              tabChange={this.onActiveChange}
            />
          ))}
        </div>
        <ul className="dish_ul">
          {dishFormat.map(each =>
            each.map(eachDish => (
              <Dishes
                dish={eachDish}
                key={eachDish.dishId}
                cartListChange={this.cartListChange}
              />
            )),
          )}
        </ul>
      </>
    )
  }
}

export default App
