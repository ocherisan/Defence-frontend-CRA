import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { LinkPage } from './pages/LinkPage';
import { CreatePage } from './pages/CreatePage';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Loader } from './components/Loader';

//const history = createBrowserHistory();

const HomePage = (()=>{
  return <div>HOME PAGE</div>
})

export const NotFound = () => {
  return <div>This is a 404 page</div>
}


function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  if (!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
    <Router>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/links' element={<LinkPage/>}/>
            <Route path='create' element={<CreatePage/>}/>
            <Route path='login'  element={<AuthPage/>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
