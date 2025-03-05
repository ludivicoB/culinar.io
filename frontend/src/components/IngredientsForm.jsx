import React, { useRef } from "react";
import { TextField, Button, Paper, Typography, Box, Card, CardContent, IconButton, Select, MenuItem, InputLabel,FormControl} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "motion/react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const IngredientsForm = ({ ingredients, setIngredients, onNext }) => {
    const lastIngredientRef = useRef(null);
  
    const addIngredient = () => {
      setIngredients((prevIngredients) => {
        const updatedIngredients = [...prevIngredients, { name: "", quantity: "", unit: "" }];
        return updatedIngredients;
      });
  
      setTimeout(() => {
        lastIngredientRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    };
  
    const deleteIngredient = (index) => {
      setIngredients(ingredients.filter((_, i) => i !== index));
    };
  
    const handleChange = (index, field, value) => {
      const updatedIngredients = ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      );
      setIngredients(updatedIngredients);
    };
  
    const isNextDisabled =
      ingredients.length === 0 ||
      ingredients.some((ingredient) => !ingredient.name || !ingredient.quantity || !ingredient.unit);
  
    return (
    <motion.div initial={{y: -50, opacity: 0.5}} animate={{ y: 0, opacity: 1, transition:{duration: 0.6}}}>
      <Box 
        sx={{ 
          textAlign: "center",
          width: '40rem',
          '@media (max-width: 710px)':{
            width: '35rem'
          },
          '@media (max-width: 634px)':{
            width:'30rem'
          },
          '@media (max-width: 512px)':{
            width: '26rem'
          },
          '@media (max-width: 437px)':{
            width: '22rem'
          },
          '@media (max-width: 373px)':{
            width: '19rem'
          },
        }}>
        <Paper sx={{ textAlign: "center", borderRadius: "2rem", boxShadow: 10 }}>
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
              '@media (max-width: 373px)':{
                fontSize: '1.3rem'
              },
            }}
          >
            Add Your Ingredients
            <IconButton 
              onClick={onNext} 
              disabled={isNextDisabled}
              sx={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                '@media (max-width: 373px)':{
                  right: "0.1rem"
                },
              }}
            >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Typography>
          <Box sx={{ px: { xs: "1rem", sm: "2rem", md: "4rem" }, py: "2rem" }}>
            {ingredients.map((ingredient, index) => (
              <Card
                key={index}
                sx={{ marginBottom: 2, position: "relative", paddingTop: "1.5rem" }}
                ref={index === ingredients.length - 1 ? lastIngredientRef : null}
              >
                <CardContent>
                  <TextField
                    label="Ingredient Name"
                    fullWidth
                    variant="outlined"
                    value={ingredient.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="Name of Ingredient"
                    required
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) > 0) {
                        handleChange(index, "quantity", value);
                      }
                    }}
                    placeholder="Quantity of Ingredient"
                    required
                    sx={{ marginBottom: 1 }}
                    inputProps={{ min: 0.1 }}
                  />
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={ingredient.unit}
                      onChange={(e) => handleChange(index, "unit", e.target.value)}
                      displayEmpty
                      label="Unit"
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="g">Grams (g)</MenuItem>
                      <MenuItem value="kg">Kilograms (kg)</MenuItem>
                      <MenuItem value="oz">Ounces (oz)</MenuItem>
                      <MenuItem value="lb">Pounds (lb)</MenuItem>
                      <MenuItem value="cup">Cup</MenuItem>
                      <MenuItem value="tbsp">Tablespoon (tbsp)</MenuItem>
                      <MenuItem value="tsp">Teaspoon (tsp)</MenuItem>
                      <MenuItem value="pcs">Pieces</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    onClick={() => deleteIngredient(index)}
                    sx={{ position: "absolute", top: -4, right: 4 }}
                  >
                    <Delete color="error" />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
            <Button variant="contained" color="primary" onClick={addIngredient} sx={{ margin: 1 }}>
              <img
                src="/images/icons/ingredient-icon.png"
                alt="Add"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              Add Ingredient
            </Button>
          </Box>
        </Paper>
      </Box>
      </motion.div>
    );
  };

  export default IngredientsForm;