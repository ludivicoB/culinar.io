import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/HomePage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AuthNavbar from "./components/AuthNavbar.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"
import Footer from "./components/Footer.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import MyRecipesPage from "./pages/MyRecipesPage.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import ViewRecipePage from "./pages/ViewRecipePage.jsx";
function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isAuthenticated ? <AuthNavbar /> :<Navbar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}/>
          <Route path="/register" element={isAuthenticated ?  <Navigate to="/home" replace /> : <RegisterPage />} />

          <Route element={<PrivateRoute/>}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/create-recipe" element={<CreateRecipePage />} />
            <Route path="/my-recipes" element={<MyRecipesPage />} />
            <Route path="/recipe/:id" element={<ViewRecipePage />} />
          </Route>
        </Routes>
        {isAuthenticated && <Footer />}
      </Router>
      <ScrollToTopButton />
    </ThemeProvider>
  );
}

export default App;
