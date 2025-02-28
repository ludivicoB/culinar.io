import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordUpdateForm = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "New passwords do not match!",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrl}/user/update-password`,
        { old_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.status) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setIsEditing(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update password",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{ backgroundColor: "#243A4A", marginBottom: "1rem" }}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          backgroundColor: "#243A4A",
          padding: { xs: "2rem", md: "3rem" },
          paddingBottom: { xs: "4rem", md: "6rem" },
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            Change Password
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            Update your account password here
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        sx={{
          backgroundColor: "#EFF8FF",
          padding: { xs: "2rem", md: "3rem" },
          paddingBottom: { xs: "4rem", md: "6rem" },
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Current Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            disabled={!isEditing}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!isEditing} onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            disabled={!isEditing}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!isEditing} onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            disabled={!isEditing}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!isEditing} onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "center", mt: 3 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PasswordUpdateForm;
