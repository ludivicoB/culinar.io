import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, CircularProgress, Container, Paper, Typography, Box, Card, CardContent, IconButton, Select, MenuItem, InputLabel,FormControl, Snackbar, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "motion/react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
       <motion.div initial={{y: -50, opacity: 0.5}} animate={{ y: 0, opacity: 1, transition:{duration: 0.6}}}>
        <Box 
          sx={{  
              textAlign: "center", 
              width: '50rem',
              "@media (max-width: 900px)":{
                width: '40rem',
              },
              "@media (max-width: 723px)":{
                width: '35rem',
              },
              "@media (max-width: 625px)":{
                width: '30rem',
              },
              "@media (max-width: 538px)":{
                width: '25rem'
              },
              "@media (max-width: 450px)":{
                width: '20rem'
              },
              "@media (max-width: 356px)":{
                width: '19rem'
              }
              
            }}>
           <Paper sx={{ textAlign: "center", borderRadius: "2rem", boxShadow: 10, width:'100%' }}>
           <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: "#E1A840",
                padding: "1rem",
                color: "#243A4A",
                position: "relative",
              }}
            >
              <IconButton
                variant="contained"
                onClick={onBack}
                sx={{
                  position: "absolute",
                  left: "1rem", 
                  top: "50%",
                  transform: "translateY(-50%)", 
                  minWidth: "40px", // Ensures it's not too wide
                  padding: "8px", // Adjust padding for a compact look
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              Recipe Steps
            </Typography>
            <Box sx={{ 
                px: '2rem',
                py:'1rem'
              }}>
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
                     multiline
                     maxRows={5} // Allows growing up to 5 lines
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
            
            <Button variant="contained" color="success" onClick={() => onSubmit(steps)}>
              Submit Steps
            </Button>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    );
  };
export default RecipeStepsForm