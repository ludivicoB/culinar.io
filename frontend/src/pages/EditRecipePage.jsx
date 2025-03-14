import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import PageLoader from "../components/util/PageLoader";
import axios from "axios";
import RecipeEditForm from "../components/RecipeEditForm";
import IngredientsEditForm from "../components/IngredientsEditForm";
import StepsEditForm from "../components/StepsEditForm";
import SnackbarNotification from "../components/util/SnackbarNotification";
import { motion } from "motion/react";
const EditRecipePage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [isRecipeEdit, setIsRecipeEdit] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchRecipe = async () => {
            const res = await axios.get(`${apiUrl}/user/get-recipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data) {
                console.log(res.data);
                setRecipe(res.data.recipe);
                setSteps(res.data.recipe.steps);
                setIngredients(res.data.recipe.ingredients);
                setFetching(false);
            }
        };
        fetchRecipe();
    }, []);

    const handleUpdateRecipeDetails = async () => {
        const formData = new FormData();
        formData.append("recipe_name", recipe.recipe_name);
        formData.append("recipe_description", recipe.recipe_description);
        formData.append("category", recipe.category);
        formData.append("estimated_time", recipe.estimated_time);

        if (recipe.recipe_image_file) {
            formData.append("recipe_image", recipe.recipe_image_file);
        }

        // ✅ Add steps to formData
        formData.append("steps", JSON.stringify(steps));

        try {
            setIsSaving(true);
            const res = await axios.post(`${apiUrl}/recipe/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data?.status === "success") {
                // console.log(res.data);
                setSnackbar({
                    open: true,
                    message: res.data.message,
                    severity: "success",
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Something went wrong",
                severity: "error",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateSteps = async () => {
        try {
            setIsSaving(true);
            const res = await axios.post(`${apiUrl}/recipe/update-steps`, { 
                recipe_id: id, 
                steps 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });
    
            if (res.data?.status === "success") {
                console.log(res.data);
                setSnackbar({
                    open: true,
                    message: res.data.message,
                    severity: "success",
                });
            }
        } catch (error) {
            console.error("Steps update error:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Something went wrong",
                severity: "error",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteIngredient = async (ingredient) => {
        setIsSaving(true)
        try {
            const res = await axios.post(`${apiUrl}/recipe/delete-ingredient`, {
                recipe_id: id,
                ingredient_id: ingredient.ingredient_id
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            if(res.data?.status === 'success'){
                // console.log(res.data)
                setIngredients(res.data.recipe.ingredients)
                setSnackbar({
                    open: true,
                    message: res.data.message,
                    severity: 'success'
                })
            }
        } catch (error) {
            console.log(error.data.message)
            setSnackbar({
                open: true,
                message: 'Something went wrong',
                severity: 'error'
            })
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateIngredient = async () => {
        // console.log('Updated ingredients', ingredients)
        setIsSaving(true)
        try {
            const res = await axios.post(`${apiUrl}/recipe/update-ingredients`, {
                recipe_id: id,
                ingredients: ingredients
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            if(res.data?.status === 'success'){
                console.log(res.data)
                setIngredients(res.data.recipe.ingredients)
                setSnackbar({
                    open: true,
                    message: res.data.message,
                    severity: 'success'
                })
            }
        } catch (error) {
            console.log(error)
            setSnackbar({
                open: true,
                message: 'Something went wrong',
                severity: 'error'
            })
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddIngredient = async (ingredient) => {
        console.log('Added ingredient', ingredient)
        try {
            setIsSaving(true)
            const res = await axios.post(`${apiUrl}/recipe/insert-ingredient`, {
                recipe_id: id,
                ingredient: ingredient
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            if(res.data?.status === 'success'){
                console.log(res.data)
                setIngredients(res.data.recipe.ingredients)
                setSnackbar({
                    open: true,
                    message: res.data.message,
                    severity: 'success'
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSaving(false);
        }
    }
    if (fetching) {
        return <PageLoader message={"Setting Up Recipe"} />;
    }
    return (
        <>
            <motion.div
                initial={{ y: 50, opacity: 0 }} // Start above and invisible
                animate={{ y: 0, opacity: 1 }} // Slide down and become visible
                exit={{ y: -50, opacity: 0 }} // Exit by sliding up
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
            >
                <RecipeEditForm
                    recipe={recipe}
                    isRecipeEdit={isRecipeEdit}
                    setIsRecipeEdit={setIsRecipeEdit}
                    updateRecipe={handleUpdateRecipeDetails}
                    setRecipe={setRecipe}
                />
                <IngredientsEditForm 
                    ingredients={ingredients} 
                    setIngredients={setIngredients} 
                    deleteIngredient={handleDeleteIngredient} 
                    updateIngredient={handleUpdateIngredient} 
                    addIngredient={handleAddIngredient}
                />
                <StepsEditForm 
                    steps={steps} 
                    setSteps={setSteps} 
                    updateSteps={handleUpdateSteps} 
                />
            </motion.div>
            
            {/* UTILS */}
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={isSaving}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <SnackbarNotification snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    );
};

export default EditRecipePage;
