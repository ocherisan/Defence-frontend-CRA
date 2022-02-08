import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/Loader/Loader";
import { Navigation } from "./components/Navigation/Navigation";
import { TasksPage } from "./pages/TasksPage/TasksPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

//const history = createBrowserHistory();

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="tasks" element={<TasksPage />}>
            <Route path=":taskNumber" element={<TasksPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
