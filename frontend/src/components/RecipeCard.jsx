import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ title, image, id, recipe }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        width: "309px",
        height: "470px",
        padding: "1rem",
        backgroundColor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Title Container with Fixed Height */}
      <Typography
        variant="h5"
        sx={{
          lineHeight: '1.0',
          fontWeight: "600",
          mt: "1.2rem",
          fontSize: "1.7rem",
          minHeight: "60px", // Ensures consistent height for 2 lines
          display: "-webkit-box",
          WebkitLineClamp: 2, // Allow max 2 lines
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {title}
      </Typography>

      <CardMedia sx={{ height: "299px", borderRadius: "20px" }} component="img" image={image} />

      <CardContent sx={{ padding: 0, pb: 0, "&:last-child": { pb: 0 } }}>
        <Button
          // component={Link}
          // to={`/recipe/${id}`} // Navigate to recipe details
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "50px",
            width: "100%",
            textTransform: "none",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#243A4A",
            }
          }}
          onClick={() => navigate(`/recipe/${id}`, {state:{recipe}})}
        >
          See Complete Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
