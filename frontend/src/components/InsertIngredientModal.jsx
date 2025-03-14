import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// ✅ Predefined unit options
const unitOptions = [
    { value: "g", label: "g - grams" },
    { value: "kg", label: "kg - kilograms" },
    { value: "ml", label: "ml - milliliters" },
    { value: "L", label: "L - liters" },
    { value: "cup", label: "cup - cups" },
    { value: "tbsp", label: "tbsp - tablespoons" },
    { value: "tsp", label: "tsp - teaspoons" },
    { value: "pcs", label: "pcs - pieces" }
];

const InsertIngredientModal = ({ open, onClose, onSubmit, setSnackbar }) => {
    const [ingredient, setIngredient] = useState({
        name: "",
        quantity: "", // ✅ Allow empty input initially
        unit: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // ✅ Allow only numbers and decimal points for quantity
        if (name === "quantity" && !/^\d*\.?\d*$/.test(value)) return;

        setIngredient((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission with validation
    const handleSubmit = () => {
        const { name, quantity, unit } = ingredient;

        if (!name.trim() || !unit.trim()) {
            setSnackbar({
                open: true,
                message: "Please fill in all fields.",
                severity: 'error'
            })
            return;
        }

        const numericQuantity = parseFloat(quantity);
        if (isNaN(numericQuantity) || numericQuantity < 0.1) {
            setSnackbar({
                open: true,
                message: "Quantity must be greater than 0",
                severity: 'error'
            })
            return;
        }

        // ✅ Pass validated data to parent
        onSubmit({ ...ingredient, quantity: numericQuantity });
        onClose();

        // ✅ Reset form
        setIngredient({ name: "", quantity: "", unit: "" });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "8px",
                    width: "350px",
                    textAlign: "center",
                }}
            >
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Add New Ingredient</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>

                {/* Form Fields */}
                <TextField
                    label="Ingredient Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    value={ingredient.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="text" // ✅ Allows user to freely type before validation
                    fullWidth
                    variant="outlined"
                    value={ingredient.quantity}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    select
                    label="Unit"
                    name="unit"
                    fullWidth
                    variant="outlined"
                    value={ingredient.unit}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                >
                    {unitOptions.map((unit) => (
                        <MenuItem key={unit.value} value={unit.value}>
                            {unit.label}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Action Buttons */}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    <img
                        src="/images/icons/ingredient-icon.png"
                        alt="Add"
                        style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    Add Ingredient
                </Button>
            </Box>
        </Modal>
    );
};

export default InsertIngredientModal;
