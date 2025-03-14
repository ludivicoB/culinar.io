import { useState, useRef } from "react";
import { Box, Paper, TextField, Button, InputAdornment, IconButton, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Grid from "@mui/material/Grid2";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Cancel } from "@mui/icons-material";
const RecipeEditForm = ({ recipe, isRecipeEdit, setIsRecipeEdit, updateRecipe, setRecipe }) => {
    const fileInputRef = useRef(null);
    
    // Store the initial recipe values
    const [initialRecipe, setInitialRecipe] = useState(recipe);

    // Handle Image Upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setRecipe(prevRecipe => ({
                    ...prevRecipe,
                    recipe_image: reader.result, // For preview
                    recipe_image_file: file // For Laravel upload
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    return (
        <Box sx={{ bgcolor: '#243A4A', m: '2rem', padding: '2rem', pb: '1rem', mx:'4rem'}}>
            <Typography variant="h4" sx={{pb: '1.5rem', color: 'white', fontWeight:'500'}}>
                Edit <span style={{ color: "#E1A840" }}>Recipe</span>
            </Typography>
            <Grid container spacing={2} sx={{ mb: '1.5rem' }}>
                {/* IMAGE AND RECIPE NAME */}
                <Grid size={5}>
                    <Paper elevation={2} sx={{ p: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', pb: '2rem' }}>
                        <Box sx={{ position: "relative", width: "98%", height: "15rem" }}>
                            <img
                                src={recipe.recipe_image || "/placeholder.jpg"}
                                alt="Recipe"
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                            />
                            
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />

                            {!isRecipeEdit && (
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                        bgcolor: "white",
                                        boxShadow: 2,
                                        "&:hover": { bgcolor: "#f0f0f0" }
                                    }}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <CameraAltIcon color="primary" />
                                </IconButton>
                            )}
                        </Box>
                        <TextField
                            disabled={isRecipeEdit}
                            id="recipe_name"
                            label="Recipe Name"
                            variant="outlined"
                            value={recipe.recipe_name}
                            name="recipe_name"
                            onChange={handleChange}
                            sx={{
                                width: '80%',
                                textAlign: 'center'
                            }}
                            inputProps={{
                                style: { fontSize: '1.5rem', textAlign: "center" },
                            }}
                        />
                    </Paper>
                </Grid>

                {/* RECIPE DESCRIPTION, CATEGORY, AND TIME */}
                <Grid size={7}>
                    <Paper elevation={2} sx={{ p: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2.2rem', pb: '2rem' }}>
                        <TextField
                            disabled={isRecipeEdit}
                            multiline
                            variant="outlined"
                            label="Recipe Description"
                            value={recipe.recipe_description}
                            name="recipe_description"
                            onChange={handleChange}
                            inputProps={{
                                style: { fontSize: '1.1rem' },
                            }}
                            sx={{
                                width: '80%',
                                height: '15rem',
                                "& .MuiInputBase-root": { height: '100%', alignItems: "flex-start" },
                                "& .MuiInputBase-input": { height: '100%', overflowY: 'auto', paddingTop: '10px' }
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '80%' }}>
                            <TextField
                                disabled={isRecipeEdit}
                                id="category"
                                label="Category"
                                variant="outlined"
                                value={recipe.category}
                                name="category"
                                onChange={handleChange}
                                inputProps={{
                                    style: { fontSize: '1.1rem' },
                                }}
                            />
                            <TextField
                                value={recipe.estimated_time}
                                disabled={isRecipeEdit}
                                id="estimated_time"
                                label="Cooking Time (Minutes)"
                                variant="outlined"
                                type="number"
                                name="estimated_time"
                                onChange={handleChange}
                                sx={{
                                    width: '10rem'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccessTimeIcon />
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        style: { textAlign: 'center', fontSize: '1.1rem' },
                                        min: 1
                                    }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* CONTROL BUTTONS */}
            <Box sx={{ padding: '1rem', display: 'flex', width: '100%', justifyContent: 'center' }}>
                {isRecipeEdit === false ? (
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '1rem' }}>
                        <Button variant="contained"
                            sx={{
                                bgcolor: '#2772A0',
                                color: 'white',
                                textTransform: 'none',
                                width: '10rem',
                                borderRadius: '15px',
                                p: '0.5rem'
                            }}
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                updateRecipe();
                                setInitialRecipe(recipe); // Update initial recipe after saving
                                setIsRecipeEdit(true);
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="contained"
                            sx={{
                                bgcolor: 'white',
                                color: '#2772A0',
                                textTransform: 'none',
                                width: '10rem',
                                borderRadius: '15px',
                                p: '0.5rem'
                            }}
                            onClick={() => {
                                setRecipe(initialRecipe); // Reset to original values
                                setIsRecipeEdit(true);
                            }}
                            startIcon={<Cancel />}
                        >
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <Button variant="contained"
                        sx={{
                            bgcolor: '#2772A0',
                            color: 'white',
                            textTransform: 'none',
                            width: '10rem',
                            borderRadius: '15px',
                            p: '0.5rem'
                        }}
                        startIcon={<BorderColorIcon />}
                        onClick={() => setIsRecipeEdit(false)}
                    >
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default RecipeEditForm;
