import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Container, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard component
import { Link } from "react-router-dom";
import PageLoader from "../components/util/PageLoader";
import EditRecipeCard from "../components/EditRecipeCard";
const MyRecipesPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState('Show Recipes')
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/recipe/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.status === "success") {
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <PageLoader message={'Preparing your Kitchen'} />
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <div sx={{textAlign:'center'}}>
        <Container
              maxWidth={false} 
              disableGutters
              sx={{
                  height: "45vh", 
                  backgroundImage: "url('./images/home-herosec-img.jpg')", 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative", 
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  textAlign: "left",
                  color: "white",
              }}
          >
            <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", 
                }}
            />
              <motion.div initial={{x: -30, opacity: 0.5}} animate={{ x: 0, opacity: 1, transition:{duration: 0.5}}}>
                  <Box sx={{ position: "relative", zIndex: 1, maxWidth: "600px", px: 3, ml: '9rem' }}>
                  <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
                    Your{" "}
                    <span style={{ color: "#E1A840" }}> {/* Change color here */}
                      Recipes
                    </span>
                  </Typography>
                      <Typography variant="h6" sx={{ mb: 3 }}>
                          Check out your created recipes
                      </Typography>
                      <Button
                          variant="contained"
                          size="large"
                          sx={{
                              backgroundColor: "#E1A840", color: "black",
                              "&:hover": { bgcolor: "black", color: "#E1A840" },
                          }}
                          component={Link}
                          to="/create-recipe"
                      >
                          {recipes.length > 0 ? "Create New Recipe" : "Create Your First Recipe"}
                      </Button>
                  </Box>
              </motion.div>
        </Container>
      </div>

      {/* CONTROL BUTTONS */}
      <Box>
        <Typography variant='h4' fontWeight={700} sx={{textAlign: 'center', mt: '2rem', mb: '1rem'}}>
          {control === 'Show Recipes' ? (
            <>
              What to <span style={{color:'#E1A840'}}>Cook</span>?
            </>
          ) : (
            <>
              Update<span style={{color:'#E1A840'}}> Recipes</span>?
            </>
          )
          }
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
          {[
            {name: 'Show Recipes', icon:'/images/icons/categoryicon.png'},
            {name: 'Manage Recipes', icon:'/images/icons/manage-recipe.png'}
          ].map((item, index)=>(
            <Button
              key={index}
              startIcon={<img src={item.icon} alt={item.name} style={{ width: "2rem", height: "2rem", }} />}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                backgroundColor: control === item.name ? "#E1A840" : "#E0E0E0",
                padding: "0.5rem 1rem",
                borderRadius: "25px",
                textTransform: "none",
                color: "inherit",
                "&:hover": {
                  backgroundColor: "#E1A840",
                },
              }}
              onClick={() => {
                setControl(item.name)
              }}
            >
              <Typography sx={{fontWeight: control === item.name ? 'bold' : 'normal'}}>{item.name}</Typography>
            </Button>
          ))}
        </Box>
      </Box>

      {/* DISPLAY BODY */}
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(309px,1fr))",
        rowGap: "2rem", // ✅ More space between rows
        columnGap: "1.5rem", // ✅ Less space between columns
        padding: "3rem",
        backgroundColor: "#FFFDFC",
      }}
      >
        {/* SHOW RECIPE MODE */}
        {control === "Show Recipes" && (
          <>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  key={recipe.recipe_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <RecipeCard
                    key={index}
                    title={recipe.recipe_name}
                    image={recipe.recipe_image}
                    id={recipe.recipe_id}
                    recipe={recipe}
                  />
                </motion.div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3rem",
                  gap: "1rem",
                }}
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/048/781/276/non_2x/empty-lunchbox-open-container-food-storage-icon-vector.jpg"
                  alt="No recipes"
                  style={{ width: "200px", height: "auto" }}
                />
                <Typography variant="h5" sx={{ fontWeight: "600", color: "#333" }}>
                  You haven't added any recipes yet!
                </Typography>
                <Typography variant="body1" sx={{ color: "#777", maxWidth: "400px" }}>
                  Start sharing your delicious recipes with the world. Click below to add your first recipe.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    textTransform: "none",
                  }}
                  component={Link}
                  to="/create-recipe"
                >
                  Add Your First Recipe
                </Button>
              </div>
            )}
          </>
        )}

        {/* MANAGE RECIPE MODE */}
        {control === "Manage Recipes" && (
          <>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  key={recipe.recipe_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <EditRecipeCard
                    key={index}
                    title={recipe.recipe_name}
                    image={recipe.recipe_image}
                    id={recipe.recipe_id}
                    recipe={recipe}
                  />
                </motion.div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3rem",
                  gap: "1rem",
                }}
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/048/781/276/non_2x/empty-lunchbox-open-container-food-storage-icon-vector.jpg"
                  alt="No recipes"
                  style={{ width: "200px", height: "auto" }}
                />
                <Typography variant="h5" sx={{ fontWeight: "600", color: "#333" }}>
                  You haven't added any recipes yet!
                </Typography>
                <Typography variant="body1" sx={{ color: "#777", maxWidth: "400px" }}>
                  Start sharing your delicious recipes with the world. Click below to add your first recipe.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    textTransform: "none",
                  }}
                  component={Link}
                  to="/create-recipe"
                >
                  Add Your First Recipe
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
