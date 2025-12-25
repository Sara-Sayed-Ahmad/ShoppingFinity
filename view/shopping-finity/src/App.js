import './App.css';
import './style/navbar.css';
import './style/styleWebsite.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './PagesUser/Login';
import Register from './PagesUser/Register';
import Home from './PagesUser/Home';
import { AuthProvider, useAuthContext } from './Context/AuthProvider';
import Dashboard from './PagesAdmin/Dashboard';
import Header from './Components/Website/Header';
import SidebarLeft from './Components/SidebarLeft';
import SideRight from './Components/SideRight';
import Footer from './Components/Website/Footer';
import New from './PagesUser/New';
import Category from './PagesUser/Category';
import Products from './PagesAdmin/Products';
import Orders from './PagesAdmin/Orders';
import Customers from './PagesAdmin/Customers';
import ManageReview from './PagesAdmin/ManageReview';
import Favorite from './PagesUser/Favorite';
import Cart from './PagesUser/Cart';
import { Provider } from 'react-redux';
import Store from './Components/Website/Cart/Store';

function App() {
  const {userRole } = useAuthContext();

  const routes = [
    <Route path='/login' element={<Login />} />,
    <Route path="/register" element={<Register />}/>,
  ];

  const renderHeader = userRole ? (userRole === 'Admin' ? (<div><SidebarLeft /><SideRight/></div>) : (<Header />)) : null;
  const renderFooter = userRole ? (userRole=== 'Admin' ?  (<></>) : <Footer />) : null;

  if(userRole  === 'Admin'){
    routes.push(
    <Route>
      <Route path='/admin' element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
      <Route path="ManageReview" element={<ManageReview />} />
    </Route>)
  }
  else{
    routes.push(
    <Route>
      <Route path="/home/:userId" element={<Home />} />
      <Route path="new/:userId" element={<New />} />
      <Route path="category/:category/:userId" element={<Category />} />
      <Route path="favorite/:userId" element={<Favorite />} />
      <Route path="cart/:userId" element={<Cart />} />
    </Route>)
  }

  return (
  <>
    <Provider store={Store}>
    {renderHeader}
    <Routes>
      {routes}
    </Routes>
    {renderFooter}
    </Provider>
  </>
  );
}

export default App;