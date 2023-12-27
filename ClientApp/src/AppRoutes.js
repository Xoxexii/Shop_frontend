import  Category  from "./components/Category/Category";
import { Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Admin from "./components/Admin"
import Manage from "./components/Manage/Manage";
import EditCategory from "./components/Category/EditCategory";
import Products from "./components/Products/Products";

const login = sessionStorage.getItem("login")

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/products',
    element: <Products />
    },
    
    {
    path: '/products/:productsName',
    element: <Products />
    },
  {
    path: '/category',
      element: login ? <Category /> : <Navigate to="/" />
  },
  {
      path: '/admin',
      element:  login ? <Navigate to="/manage" /> : <Admin /> 
  },
  {
      path: '/manage',
      element: !login ? <Navigate to="/admin" /> : <Manage />
    },
    {
      path: '/category/edit/:id',
      element: <EditCategory />
    }
];

export default AppRoutes;
