import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Link, Snackbar, Alert, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from "motion/react"
import axios from "axios";
import VerificationModal from "../components/VerificationModal";
const RegisterPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL; 

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bdate: "",
    password: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const handleVerify = async (code) => {
    localStorage.removeItem('email');
    // console.log(code)
    try {
      const res = await axios.post(`${apiUrl}/user/verifycode`, {
        email: formData.email,
        code: code
      })
      if(res.data.status == 'success'){
        setSnackbar({ open: true, message: res.data.message, severity: "success" });
        setModalOpen(false);
        setTimeout(() => {
          location.href = '/login';
        }, 1500)
        
      } else {
        setSnackbar({ open: true, message: res.data.message, severity: "error" });
      }
    } catch(error){
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.firstname) return setSnackbar({ open: true, message: "First name is required", severity: "error" });
    if (!formData.lastname) return setSnackbar({ open: true, message: "Last name is required", severity: "error" });
    if (!formData.email) return setSnackbar({ open: true, message: "Email is required", severity: "error" });
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) 
      return setSnackbar({ open: true, message: "Invalid email address", severity: "error" });
    if (!formData.bdate) return setSnackbar({ open: true, message: "Birthdate is required", severity: "error" });
    if (!formData.password) return setSnackbar({ open: true, message: "Password is required", severity: "error" });
    if (formData.password.length < 6) 
      return setSnackbar({ open: true, message: "Password must be at least 6 characters", severity: "error" });
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/user/register`, {
        ...formData,
      });
      
      if(res.data.status == 'success'){
        // console.log(res)
        localStorage.setItem("email", formData.email);
        setSnackbar({ open: true, message: res.data.message, severity: "success" });
        setModalOpen(true);
        setLoading(false);
      } else {
        // console.log(res)
        setSnackbar({ open: true, message: res.data.message, severity: "error" });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setSnackbar({ open: true, message: "Network error. Please try again later.", severity: "error" });
      console.log(error)
    }
  };

  return (
    <motion.div
    initial={{y: -30, opacity: 0.5}}
    animate={{y: 0, opacity: 1, transition:{duration: 0.5} }}
    >
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: '15%',
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Segoe UI', color: '#0076B3', fontWeight: 'bold' }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
            </Grid>
          </Grid>
          <TextField fullWidth label="Email" name="email" margin="normal" value={formData.email} onChange={handleChange} />
          <TextField fullWidth label="Birthdate" name="bdate" type="date" margin="normal" InputLabelProps={{ shrink: true }} value={formData.bdate} onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={formData.password} onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, height: "56px", backgroundColor: '#0076B3',  "&:hover": { bgcolor: "#243A4A" } }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, }}>
          Already have an account? <Link href="/login" sx={{ color: '#0076B3', }}>Login here</Link>
        </Typography>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <VerificationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onVerify={handleVerify}
            />
    </Container>
    </motion.div>
  );
};

export default RegisterPage;
