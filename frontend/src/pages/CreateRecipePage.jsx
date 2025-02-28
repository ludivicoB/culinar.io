import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Snackbar, Alert, Stepper, Step, StepLabel, Backdrop } from "@mui/material";
import { Fastfood, ShoppingCart, ListAlt } from "@mui/icons-material";
import IngredientsForm from "../components/IngredientsForm";
import RecipeForm from "../components/RecipeForm";
import RecipeStepsForm from "../components/RecipeStepsForm";
import axios from 'axios'
const steps = [
  { label: "Create Recipe", icon: <Fastfood /> },
  { label: "Add Your Ingredients", icon: <ShoppingCart /> },
  { label: "Add Steps", icon: <ListAlt /> },
];

const CreateRecipePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [recipeData, setRecipeData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const [recipeId, setRecipeId] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleRecipeSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Uploading recipe data:", data);
      setRecipeData(data);
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("category", data.category)
      formData.append("image", data.image)
      const res = await axios.post(`${apiUrl}/recipe`, formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if(res.data){
        setSnackbar({ open: true, message: res.data.message, severity: "success" });
        console.log(res.data);
        setRecipeId(res.data.recipe.recipe_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setCurrentStep(1);
    }
  };

  const handleIngredientsSubmit = () => {
    setCurrentStep(2);
  };

  const handleStepsSubmit = async (stepsData) => {
    setLoading(true);
    try {
      console.log("Uploading steps data:", stepsData);
      console.log("Uploading Ingredients:", ingredients);
      setSnackbar({ open: true, message: "Recipe created successfully!", severity: "success" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: "1rem", sm: "2rem", md: "4rem" },
        pt: "2rem",
        pb: "10rem",
        minHeight: "80vh",
        backgroundColor: "#A3D1E0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stepper activeStep={currentStep} alternativeLabel sx={{ width: "100%", maxWidth: 600, mb: 4 }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              icon={step.icon}
              sx={{
                color: currentStep === index ? "#E1A840" : "inherit",
                "&.MuiStepIcon-root": {
                  color: currentStep === index ? "#E1A840" : "inherit",
                },
                "& .MuiStepLabel-label": {
                  color: currentStep === index ? "#E1A840" : "inherit",
                  fontWeight: currentStep === index ? "bold" : "normal",
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading && 
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}> 
          <CircularProgress />
        </Backdrop>
      }
      {currentStep === 0 && <RecipeForm onSubmit={handleRecipeSubmit} />}
      {currentStep === 1 && <IngredientsForm ingredients={ingredients} setIngredients={setIngredients} onNext={handleIngredientsSubmit} />}
      {currentStep === 2 && <RecipeStepsForm steps={stepsData} setSteps={setStepsData} onSubmit={handleStepsSubmit} onBack={() => setCurrentStep(1)} />}
      
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateRecipePage;
