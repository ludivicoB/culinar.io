import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, Link, Snackbar, Alert, FormControlLabel, Checkbox } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from "motion/react";
import axios from 'axios';

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  useEffect(() => {
    // Check if there's a remembered email
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    if (!email) {
      setSnackbar({ open: true, message: "Email is required", severity: "error" });
      return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setSnackbar({ open: true, message: "Invalid email address", severity: "error" });
      return false;
    }
    if (!password) {
      setSnackbar({ open: true, message: "Password is required", severity: "error" });
      return false;
    } else if (password.length < 6) {
      setSnackbar({ open: true, message: "Password must be at least 6 characters", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/user/login`, { email, password });

        if (res.data.status === "success") {
          setSnackbar({ open: true, message: 'Welcome Back', severity: "success" });
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("tokenType", res.data.token_type);

          // Remember Me Logic
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          location.href = '/home';
          setLoading(false);
        } else {
          setSnackbar({ open: true, message: res.data.message, severity: "error" });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: "Login failed. Try again!", severity: "error" });
        setLoading(false);
      }
    }
  };

  return (
    <motion.div initial={{ y: -30, opacity: 0.5 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}>
      <Container maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: '15%', p: 3, border: "1px solid #ccc", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Segoe UI', color: '#0076B3', fontWeight: 'bold' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember Me"
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, height: "56px", backgroundColor: '#0076B3', "&:hover": { bgcolor: "#243A4A" } }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/register">Sign up here</Link>
          </Typography>
        </Box>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
