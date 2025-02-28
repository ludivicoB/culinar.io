import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, CircularProgress, Container, Paper, Typography, Box, Card, CardContent, IconButton, Select, MenuItem, InputLabel,FormControl, Snackbar, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "motion/react";
const RecipeStepsForm = ({ steps, setSteps, onSubmit, onBack }) => {
    const addStep = () => {
      setSteps([...steps, { stepNumber: steps.length + 1, description: "" }]);
    };
  
    const deleteStep = (index) => {
      const updatedSteps = steps
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, stepNumber: i + 1 }));
      setSteps(updatedSteps);
    };
  
    const handleChange = (index, value) => {
      const updatedSteps = steps.map((step, i) =>
        i === index ? { ...step, description: value } : step
      );
      setSteps(updatedSteps);
    };
  
    return (
      <Box sx={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Recipe Steps
        </Typography>
        {steps.map((step, index) => (
          <Card key={index} sx={{ marginBottom: 2, position: "relative" }}>
            <CardContent>
              <Typography variant="h6">Step {step.stepNumber}</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={step.description}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Describe this step"
                required
              />
              <IconButton
                onClick={() => deleteStep(index)}
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <Delete color="error" />
              </IconButton>
            </CardContent>
          </Card>
        ))}
        <Button variant="contained" color="primary" onClick={addStep} sx={{ margin: 1 }}>
          Add Step
        </Button>
        <Button variant="contained" color="secondary" onClick={onBack} sx={{ margin: 1 }}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={() => onSubmit(steps)}>
          Submit Steps
        </Button>
      </Box>
    );
  };
export default RecipeStepsForm