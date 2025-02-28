import React, { useState, useEffect } from "react";
import { Avatar, Button, Box, Snackbar, Alert, IconButton, Modal } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { ColorPicker } from "antd";
import axios from "axios";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import zIndex from "@mui/material/styles/zIndex";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const AvatarComponent = ({ color,updateProfilePicture, avatarimg, setLoading }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const fullAvatarUrl = avatarimg ? `${apiUrl}/${avatarimg}` : "/default-avatar.png";
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(avatarimg);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [colorr, setColorr] = useState(color)
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (avatarimg) {
      setPreview(avatarimg);
    }
  }, [avatarimg]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSnackbar({ open: true, message: "File must be an image (max 10MB).", severity: "warning" });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setLoading(true);
      setSnackbar({ open: true, message: "Updating profile picture...", severity: "info" });

      const response = await axios.post(`${apiUrl}/profile/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data) {
        updateProfilePicture(response.data.avatar);
        setSnackbar({ open: true, message: "Profile picture updated!", severity: "success" });
        setSelectedFile(null);
      } else {
        setSnackbar({ open: true, message: "Failed to update profile picture.", severity: "error" });
      }
      
    } catch (error) {
      console.error("Upload failed:", error);
      setSnackbar({ open: true, message: "Failed to upload. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (colorObject) => {
    const newColor = colorObject.toHexString();
    setColorr(newColor);
    setIsEditing(true)
  };
  const updateBannerColor = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`${apiUrl}/user/update-banner-color`,
        {bannercolor: colorr},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      if(response.data){
        setSnackbar({ open: true, message: response.data.message, severity: "success" });
        setLoading(false);
        setIsEditing(false)
      }
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, message: error.message, severity: "error" });
      setLoading(false)
      setIsEditing(false)
    }
  }

  return (
    <Box textAlign="center" sx={{ backgroundColor: `${colorr}`, boxShadow: 5 ,padding: { xs: "2rem", md: "3rem" }, position: "relative" }}>
      <Box position="relative" display="inline-block">
        <Avatar 
          src={preview || fullAvatarUrl} 
          sx={{ width: { xs: "6rem", md: "10rem" }, height: { xs: "6rem", md: "10rem" }, border: "3px solid #ccc" }}
        />

        <label htmlFor="upload-avatar">
          <IconButton
            component="span"
            sx={{
              position: "absolute",
              bottom: "-10%",
              left: "80%",
              transform: "translateX(-50%)",
              backgroundColor: '#1976d2',
              color: "white",
              scale: { xs: "60%", md: "70%" },
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            <PhotoCameraIcon />
          </IconButton>
         
        </label>
      </Box>

      <input 
        type="file" 
        accept="image/jpeg, image/png" 
        onChange={handleFileChange} 
        style={{ display: "none" }} 
        id="upload-avatar"
      />

      {selectedFile && (
        <Button 
          variant="contained" 
          onClick={handleUpload} 
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#1565c0" },
            position: "absolute",
            bottom: { xs: "85%", md: "75%" },
            left: "90%",
            "@media (max-width: 1151px)":{
              left: "88%"
            },
            "@media (max-width: 981px)":{
              left: "85%"
            },
            "@media (max-width: 900px)":{
              bottom: "65%",
              left: "90%"
            },
            "@media (max-width: 779px)":{
              bottom: "65%",
              left: "87%"
            },
            "@media (max-width: 620px)":{
              left: "83%"
            },
            "@media (max-width: 447px)":{
              left: "79%",
              scale: 0.7
            },
            "@media (max-width: 320px)":{
              left: "72%",
              bottom: "73%",
              scale:0.6
            },
            transform: "translateX(-50%)",
            whiteSpace: "nowrap"
          }}
        >
          Save Avatar
        </Button>
      )}

      {isEditing && (
        <Button 
          variant="contained" 
          onClick={updateBannerColor} 
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#1565c0" },
            position: "absolute",
            bottom: { xs: "85%", md: "75%" },
            left: "90%",
            "@media (max-width: 1151px)":{
              left: "88%"
            },
            "@media (max-width: 981px)":{
              left: "85%"
            },
            "@media (max-width: 900px)":{
              bottom: "65%",
              left: "90%"
            },
            "@media (max-width: 779px)":{
              bottom: "65%",
              left: "87%"
            },
            "@media (max-width: 620px)":{
              left: "83%"
            },
            "@media (max-width: 447px)":{
              left: "79%",
              scale: 0.7
            },
            "@media (max-width: 320px)":{
              left: "72%",
              bottom: "73%",
              scale:0.6
            },
            transform: "translateX(-50%)",
            whiteSpace: "nowrap"
          }}
        >
          Save Banner
        </Button>
      )}
       
      <ColorPicker value={colorr} onChangeComplete={handleColorChange}>
        <IconButton
        component="span"
        sx={{
          position: "absolute",
          bottom: "4%",
          left: "2%",
          transform: "translateX(-50%)",
          backgroundColor: "#1976d2",
          color: "white",
          scale: { xs: "60%", md: "70%" },
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
        >
          <ColorLensIcon />   
        </IconButton>
      </ColorPicker>
          
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


    </Box>
  );
};

export default AvatarComponent;
