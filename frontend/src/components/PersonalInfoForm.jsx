import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const PersonalInfoForm = ({user, setUser}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const handleSubmit = async (event) => {
    console.log(fname, lname);
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrl}/user/update-info`,
        { fname, lname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status) {
        setSnackbar({ open: true, message: response.data.message, severity: "success" });
        setUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    // <form onSubmit={handleSubmit}>
      <Grid container spacing={0} sx={{ backgroundColor: "#243A4A", marginBottom: "1rem", marginTop:'1rem' }}>
        <Grid item xs={12} md={4} sx={{ backgroundColor: "#243A4A", padding: { xs: "2rem", md: "3rem" }, paddingBottom: { xs: "4rem", md: "6rem" } }}>
          <Box>
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              Personal Information
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              Update your personal information here
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} sx={{ backgroundColor: "#EFF8FF", padding: { xs: "2rem", md: "3rem" }, paddingBottom: { xs: "4rem", md: "6rem" } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", alignItems: "center", gap: "1rem" }}>
            <TextField
              label="First Name"
              variant="outlined"
              value={fname}
              disabled={!isEditing}
              onChange={(e) => setFname(e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lname}
              disabled={!isEditing}
              onChange={(e) => setLname(e.target.value)}
              fullWidth
            />
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            {!isEditing ? (
              <Button variant="contained" onClick={onEdit} sx={{ mr: 2, }}>
                Edit
              </Button>
            ) : (
              <>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Grid>

         <Snackbar 
                open={snackbar.open} 
                autoHideDuration={3000} 
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                  {snackbar.message}
                </Alert>
        </Snackbar>
      </Grid>
    // </form>
  );
};

export default PersonalInfoForm;
