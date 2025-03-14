import React, { useState } from "react";
import { Box, TextField, Button, Paper, IconButton, Typography } from "@mui/material";
import { Delete, Add, BorderColor as EditIcon, Save, Cancel } from "@mui/icons-material";

const StepsEditForm = ({ steps, setSteps, updateSteps }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [originalSteps, setOriginalSteps] = useState([]); // Store backup of steps only when editing starts

    const handleEdit = () => {
        setOriginalSteps(JSON.parse(JSON.stringify(steps))); // Deep copy to prevent mutation
        setIsEditing(true);
    };

    const handleInputChange = (index, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index].description = value;
        setSteps(updatedSteps);
    };

    const handleRemoveStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleAddStep = () => {
        setSteps([...steps, { step_number: steps.length + 1, description: "" }]);
    };

    const handleSave = () => {
        console.log("Updated Steps:", steps);
        updateSteps();
        setIsEditing(false);
    };

    const handleCancel = () => {
        console.log("Restoring Original Steps:", originalSteps);
        setSteps(JSON.parse(JSON.stringify(originalSteps))); // ✅ Restore previous steps
        setIsEditing(false);
    };

    return (
        <Box sx={{ bgcolor: "#243A4A", m: "2rem", padding: "2rem", pb: "1rem", mx: "4rem", }}>
            <Typography variant="h4" sx={{color:'white', fontWeight:'500'}}>
                Modify <span style={{ color: "#E1A840" }}>Steps</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row-reverse" }}>
                {!isEditing ? (
                    <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#2772A0", color: "white", textTransform: "none", borderRadius: "15px", width: "6rem" }}
                            startIcon={<EditIcon />}
                            onClick={handleEdit} // ✅ Store backup before allowing edits
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
                            onClick={handleCancel} // ✅ Restore original steps
                        >
                            Cancel
                        </Button>
                    </Box>
                )}
            </Box>

            {steps.map((step, index) => (
                <Paper
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        mb: 2,
                        bgcolor: "#FFF",
                        borderRadius: 2,
                    }}
                >
                    <TextField
                        label={`Step ${index + 1}`}
                        fullWidth
                        multiline
                        minRows={1}
                        maxRows={5}
                        value={step.description}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                    />

                    {isEditing && (
                        <IconButton onClick={() => handleRemoveStep(index)} color="error">
                            <Delete />
                        </IconButton>
                    )}
                </Paper>
            ))}

            {isEditing && (
                <Button startIcon={<Add />} variant="contained" sx={{ mt: 2, bgcolor: "#E1A840" }} onClick={handleAddStep}>
                    Add Step
                </Button>
            )}
        </Box>
    );
};

export default StepsEditForm;
