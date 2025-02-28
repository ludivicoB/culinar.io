import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "#333"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" onClick={() => window.location.href = "/"} sx={{ fontWeight: "bold", fontFamily: 'Segoe UI', color: '#243A4A', cursor: 'pointer' }}>
          Culinar.io
        </Typography>
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
