import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MenuProvider } from './context/menuContext';
import HomePage from './pages/Home/HomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/navBar/navBar';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AuthProvider from './context/authContext';
import PrivateRoute from './components/login/privateRoute';


function App() {

  return (
      <BrowserRouter>
          <AuthProvider>
            <MenuProvider>
              <NavBar/>
                  <Routes>
                      <Route path="/">
                        <Route 
                          index 
                          element={
                            <PrivateRoute>
                              <HomePage/> 
                            </PrivateRoute>
                        }/>
                        <Route 
                          path="search" 
                          element={
                          <PrivateRoute>
                            <SearchPage/> 
                          </PrivateRoute>
                        }/>
                        </Route>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="*" 
                          element={
                            <PrivateRoute>
                              <HomePage/> 
                            </PrivateRoute>
                          }/>
                  </Routes>
            </MenuProvider>
          </AuthProvider>
      </BrowserRouter>


  );
}

export default App;
