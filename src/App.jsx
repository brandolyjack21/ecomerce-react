import './App.css'
import 'bootswatch/dist/litera/bootstrap.min.css'
import NavBar from './components/NavBar'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/esm/Container'
import ProductDetail from '../src/pages/ProductDetail'
import { ProtectedRoutes } from './components/ProtectedRoutes'


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      { isLoading && <Loader/> }
      <NavBar/>
      
      <Container fluid>
          <Routes>
            <Route 
            element={ <Home/> }
            path='/'
            />
    
          <Route
          element={<Login/>}
          path='/login'
          />
    

          <Route
          element={<ProtectedRoutes/>}
          >
          <Route
          element={<Purchases/>}
          path='/login/purchases'
          />

          </Route>

          <Route
          element={<ProductDetail/>}
          path='/productdetail/:id'
          />
    
          </Routes>
      </Container>
      
    </HashRouter>
  )
}

export default App
