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
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NewRecord from "../screens/NewRecord";

function AppContent() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

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
      </Routes>
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
