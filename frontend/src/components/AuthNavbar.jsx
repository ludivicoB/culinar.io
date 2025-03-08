import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";

const AuthNavbar = () => {
  const location = useLocation()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuEl, setMobileMenuEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    setLoading(true);

    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("tokenType");

    try {
      const res = await axios.post(`${apiUrl}/user/logout`, {}, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (res.data) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenType");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white", color: "#333", px: { xs: 2, md: 4 } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{ fontWeight: "bold", fontFamily: "Segoe UI", color: "#243A4A", cursor: "pointer" }}
          >
            Culinar.io
          </Typography >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              sx={{
                fontSize: "1rem",
                color: '#2772A0',
                fontWeight: location.pathname === "/home" ? "bold" : "normal" // Bold if active
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/my-recipes"
              sx={{
                fontSize: "1rem",
                color: '#2772A0',
                fontWeight: location.pathname === "/my-recipes" ? "bold" : "normal"
              }}
            >
              Recipes
            </Button>
            <Button
              component={Link}
              to="/create-recipe"
              sx={{
                fontSize: "1rem",
                color: '#2772A0',
                fontWeight: location.pathname === "/create-recipe" ? "bold" : "normal"
              }}
            >
            Create
            </Button>

            {user ? (
              <>
                <IconButton onClick={handleMenuClick}>
                  <AccountCircleIcon sx={{ fontSize: "2rem", color: "#2772A0" }} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Typography variant="body1">Loading...</Typography>
            )}
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleMobileMenuClick}>
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu anchorEl={mobileMenuEl} open={Boolean(mobileMenuEl)} onClose={handleClose}>
            <MenuItem component={Link} to="/">Home</MenuItem>
            {user ? (
              [
                <MenuItem component={Link} to="/profile" key="profile">Profile</MenuItem>,
                <MenuItem onClick={handleLogout} key="logout">Logout</MenuItem>
              ]
            ) : (
              <Typography variant="body1" sx={{ px: 2 }}>Loading...</Typography>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Loading Spinner */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AuthNavbar;
