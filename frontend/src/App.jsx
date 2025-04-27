import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AppNavbar from "../components/AppNavbar";
import Auth from "../screens/Auth";
import Records from "../screens/Records";
import ProtectedRoute from "../components/ProtectedRoutes";
import RecordDetail from "../screens/RecordDetail";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NewRecord from "../screens/NewRecord";
import { useEffect } from "react";
import {isTokenExpired} from "../utils/utils";
import {logout} from "../slices/authSlice"
import NotFound from "../screens/NotFound";
import Footer from "../components/Footer";

function AppContent() {
  const { isAuthenticated,token } = useSelector((state) => state.auth);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const dispatch=useDispatch()

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [dispatch,token]);

  return (
    <>
      {isAuthenticated && !isLoginPage && <AppNavbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/records" /> : <Auth />}
        />
        <Route
          path="/records/:id"
          element={
            <ProtectedRoute>
              <RecordDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/create"
          element={
            <ProtectedRoute>
              <NewRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/recordDetail/:id"
          element={
            <ProtectedRoute>
              <RecordDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isAuthenticated && !isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
