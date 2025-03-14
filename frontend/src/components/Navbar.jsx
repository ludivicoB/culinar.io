import { AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "#333"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.001, // Space between logo & text
                cursor: "pointer",
              }}
            onClick={() => navigate("/")}
          >
            <img 
                src="/LOGO.png" // ✅ Make sure this file is inside the public folder
                alt="Culinar.io Logo"
                style={{ height: "40px", width: "auto" }} // ✅ Adjust size as needed
            />
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{ fontWeight: "bold", fontFamily: "Segoe UI", color: "#243A4A", cursor: "pointer" }}
            >

              Culinar<span style={{color:'rgb(225, 168, 64)'}}>.io</span>
            </Typography >
          </Box>
        <div style={{ display: 'flex', gap: '1rem'}}>
          <Button component={Link} to="/" sx={{textTransform: 'none', fontSize: '1rem'}} >Home</Button>
          <Button variant="contained" component={Link} to="/login"   sx={{ bgcolor: "#0076B3", color: "white", "&:hover": { bgcolor: "#243A4A" }, textTransform: 'none', fontSize: '1rem'  }}>
            Log In
          </Button>
          <Button variant="contained" component={Link} to="/register"  sx={{ bgcolor: "#0076B3", color: "white", "&:hover": { bgcolor: "#243A4A" }, textTransform: 'none',  fontSize: '1rem'}}>
            Sign Up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
