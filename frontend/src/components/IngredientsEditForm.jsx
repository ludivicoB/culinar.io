import React, { useState } from "react";
import { Box, TextField, Button, Paper, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Add, BorderColor as EditIcon, Save, Cancel } from "@mui/icons-material";
import DecisionModal from "./util/DecisionModal";
import InsertIngredientModal from "./InsertIngredientModal";
import SnackbarNotification from "../components/util/SnackbarNotification"
const IngredientsEditForm = ({ ingredients, setIngredients, deleteIngredient,updateIngredient, addIngredient }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [originalIngredients, setOriginalIngredients] = useState([]); // Backup original ingredients
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [indexDelete, setIndexDelete] = useState(null);
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleConfirm = () => {
        // console.log("Confirmed action!");
        // console.log("Index to delete:", indexDelete);
        // console.log('Element to delete', ingredients[indexDelete]);
        deleteIngredient(ingredients[indexDelete])
        setDeleteModalOpen(false);
        setIsEditing(false);
    };
    // ✅ Store original ingredients before editing
    const handleEdit = () => {
        setOriginalIngredients(JSON.parse(JSON.stringify(ingredients))); // Deep copy to prevent mutation
        setIsEditing(true);
    };

    // ✅ Handle Input Change
    const handleInputChange = (index, field, value) => {
        setIngredients(prevIngredients => {
            const updatedIngredients = [...prevIngredients];
    
            if (field === "quantity") {
                // ✅ Update nested pivot.quantity
                updatedIngredients[index] = {
                    ...updatedIngredients[index], // Keep other ingredient data
                    pivot: {
                        ...updatedIngredients[index].pivot, // Keep other pivot data
                        quantity: value // Update quantity inside pivot
                    }
                };
            } else {
                // ✅ Update top-level ingredient fields like "name"
                updatedIngredients[index] = {
                    ...updatedIngredients[index],
                    [field]: value
                };
            }
    
            return updatedIngredients;
        });
    };

    // ✅ Handle Ingredient Deletion
    const handleRemoveIngredient = (index) => {
        setDeleteModalOpen(true);
        setIndexDelete(index);
        // setIngredients(ingredients.filter((_, i) => i !== index));
    };

    // ✅ Handle Adding a New Ingredient
    const handleAddIngredient = (newIngredient) => {
        addIngredient(newIngredient)
        setIsEditing(false);
    };
    // ✅ Handle Update
    const handleSave = () => {
        console.log("Updated Ingredients:", ingredients);
        updateIngredient();
        setIsEditing(false);
    };

    // ✅ Handle Cancel - Restore original ingredients
    const handleCancel = () => {
        setIngredients(JSON.parse(JSON.stringify(originalIngredients))); // Restore backup
        setIsEditing(false);
    };

    return (
        <Box sx={{ bgcolor: "#243A4A", m: "2rem", padding: "2rem", pb: "1rem", mx: "4rem" }}>
            <Typography variant="h4" sx={{pb: '1.5rem', color: 'white', fontWeight:'500'}}>
                Update <span style={{ color: "#E1A840" }}>Ingredients</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row-reverse" }}>
                {!isEditing ? (
                    <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#2772A0", color: "white", textTransform: "none", borderRadius: "15px", width: "6rem" }}
                            startIcon={<EditIcon />}
                            onClick={handleEdit} 
                        >
                            Edit
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#2772A0", color: "white", textTransform: "none", borderRadius: "15px", width: "6rem" }}
                            startIcon={<Save />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ color: "#2772A0", textTransform: "none", borderRadius: "15px", bgcolor: "white", width: "6rem" }}
                            startIcon={<Cancel />}
                            onClick={handleCancel} // ✅ Restore original ingredients
                        >
                            Cancel
                        </Button>
                    </Box>
                )}
            </Box>

            {ingredients.map((ingredient, index) => (
                <Paper
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent:'center',
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        mb: 2,
                        bgcolor: "#FFF",
                        borderRadius: 2,
                    }}
                >
                    <TextField
                        sx={{width:'60%'}}
                        label="Ingredient Name"
                        value={ingredient.name}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        sx={{ width: "25%", }}
                        value={ingredient.pivot.quantity}
                        onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true, }}
                    />
                    <Tooltip title="The unit is fixed for this ingredient" placement="top" arrow>
                        <TextField

                            label="Unit"
                            sx={{ width: "15%" }}
                            value={ingredient.unit}
                            onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                            disabled
                            InputLabelProps={{ shrink: true }}
                        />
                    </Tooltip>
                    {isEditing && (
                        <IconButton onClick={() => handleRemoveIngredient(index)} color="error">
                            <Delete />
                        </IconButton>
                    )}
                </Paper>
            ))}
            <DecisionModal 
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirm}
                title="Delete Ingredient?"
                message="This action cannot be undone."
                confirmText="Delete Ingredient"
                cancelText="Cancel"
            />
            {isEditing && (
                <Button startIcon={<Add />} variant="contained" sx={{ mt: 2, bgcolor: "#E1A840" }} onClick={() => setInsertModalOpen(true)} >
                    Add Ingredient
                </Button>
            )}
            <InsertIngredientModal 
                open={insertModalOpen}
                onClose={() => setInsertModalOpen(false)}
                onSubmit={handleAddIngredient}
                setSnackbar={setSnackbar}
            />
            <SnackbarNotification snackbar={snackbar} setSnackbar={setSnackbar} />
        </Box>
    );
};

export default IngredientsEditForm;
