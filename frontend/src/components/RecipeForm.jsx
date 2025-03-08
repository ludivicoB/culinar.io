import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { motion } from "motion/react";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ImageIcon from '@mui/icons-material/Image';

const RecipeForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ name: "", image: null, description: "", category: "" });
    const [fileName, setFileName] = useState(""); // Stores the selected file name
    const [imagePreview, setImagePreview] = useState(null); // Stores the image preview URL

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData({ ...formData, [name]: file });
                setFileName(file.name);
                setImagePreview(URL.createObjectURL(file)); // Create preview URL
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
                    <Box sx={{ padding: 3 }}>
                        <TextField fullWidth margin="normal" label="Recipe Name" name="name" onChange={handleChange} required />

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
                                <Button variant="contained" component="span" fullWidth startIcon={<ImageIcon />} 
                                sx={{
                                    backgroundColor: '#2772A0',
                                    '&:hover': {
                                        backgroundColor: '#243A4A'
                                    }
                                }} >
                                    Upload Image
                                </Button>
                            </label>
                        </Box>

                        <TextField fullWidth margin="normal" multiline rows={3} label="Description" name="description" onChange={handleChange} required />
                        <TextField fullWidth margin="normal" label="Category" name="category" onChange={handleChange} required />

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <motion.div initial={{ y: 100, opacity: 0.5 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}>
                                <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#2772A0','&:hover': {
                                        backgroundColor: '#243A4A'
                                    } }} startIcon={<LocalDiningIcon />}>
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
