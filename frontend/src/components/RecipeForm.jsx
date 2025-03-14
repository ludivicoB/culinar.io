import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Slider } from "@mui/material";
import { motion } from "framer-motion"; // Fixed import from "framer-motion"
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ImageIcon from '@mui/icons-material/Image';

const RecipeForm = ({ onSubmit, setSnackbar }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        description: "",
        category: "",
    });
    const [estimatedTime, setEstimatedTime] = useState(30); // Initialized with default value
    const [fileName, setFileName] = useState(""); // Stores the selected file name
    const [imagePreview, setImagePreview] = useState(null); // Stores the image preview URL

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData((prev) => ({ ...prev, image: file }));
                setFileName(file.name);
                setImagePreview(URL.createObjectURL(file)); // Create preview URL
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.image){
          setSnackbar({ open: true, message: 'Please select an image', severity: "error" });
          return
        }
        onSubmit({ ...formData, estimatedTime }); // Include estimatedTime in submission
        // setFormData({ name: "", image: null, description: "", category: "" }); // Reset form
        setEstimatedTime(30);
        setFileName("");
        setImagePreview(null);
    };

    return (
        <motion.div initial={{ y: -50, opacity: 0.5 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}>
            <Paper elevation={3} sx={{ padding: 0, maxWidth: 500, borderRadius: '2rem', boxShadow: 10 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#E1A840',
                        padding: '1rem',
                        color: '#243A4A'
                    }}
                >
                    Create a Recipe
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ padding: 3 }}>
                        <TextField fullWidth margin="normal" label="Recipe Name" name="name" onChange={handleChange} value={formData.name} required />

                        {/* File Input with Preview */}
                        <Box sx={{ marginTop: 2, marginBottom: 2, textAlign: 'center' }}>
                            <input
                                accept="image/*"
                                type="file"
                                id="file-upload"
                                name="image"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            {/* Image Preview */}
                            {imagePreview && (
                                <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: '1rem' }} />
                                </Box>
                            )}
                            <label htmlFor="file-upload">
                                <Button
                                    variant="contained"
                                    component="span"
                                    fullWidth
                                    startIcon={<ImageIcon />}
                                    sx={{
                                        backgroundColor: '#2772A0',
                                        '&:hover': { backgroundColor: '#243A4A' }
                                    }}
                                >
                                    Upload Image
                                </Button>
                            </label>
                        </Box>

                        <TextField
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            required
                        />
                        <TextField fullWidth margin="normal" label="Category" name="category" onChange={handleChange} value={formData.category} required />

                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Typography gutterBottom>Estimated Time (mins)</Typography>
                            <Slider
                                value={estimatedTime || 5} // Ensure valid state
                                onChange={(e, newValue) => setEstimatedTime(newValue)}
                                step={5}
                                marks
                                min={5}
                                max={180} // Keep the slider limited
                            />
                            <TextField
                                type="number"
                                label="Custom Time (mins)"
                                value={estimatedTime === 0 ? "" : estimatedTime} // Allow clearing input
                                onChange={(e) => {
                                    const time = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                                    if (time === "" || time > 0) setEstimatedTime(time); // Allow empty value
                                }}
                                onBlur={() => {
                                    if (!estimatedTime || estimatedTime <= 0) {
                                        setEstimatedTime(5); // Default to 5 if invalid
                                    }
                                }}
                                fullWidth
                                margin="normal"
                                inputProps={{ min: 1 }} // Prevents negative values
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <motion.div initial={{ y: 100, opacity: 0.5 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginTop: 2,
                                        backgroundColor: '#2772A0',
                                        '&:hover': { backgroundColor: '#243A4A' }
                                    }}
                                    startIcon={<LocalDiningIcon />}
                                >
                                    Create Recipe
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </motion.div>
    );
};

export default RecipeForm;
