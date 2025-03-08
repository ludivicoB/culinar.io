import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "motion/react";

const StyledCard = styled(Card)({
    position: "relative",
    width: 300,
    height: 400,
    backgroundColor: "transparent",
    color: "#fff",
    overflow: "hidden",
    boxShadow: "none",
    "&:hover .bgImage": {
      filter: "blur(0px)",
    },
    "&:hover .description": {
      opacity: 1,
      transform: "translateY(0)",
    },
});

const backgrounds = {
  share: "/images/share-img.jpg", 
  discover: "/images/discover-img.jpg",
  enjoy: "/images/enjoy-img.jpg",
};

const cardData = [
  { title: "Share", desc: "Share your favorite recipes with the world.", bg: backgrounds.share },
  { title: "Discover", desc: "Find new and exciting dishes to try.", bg: backgrounds.discover },
  { title: "Enjoy", desc: "Savor every bite with family and friends.", bg: backgrounds.enjoy },
];

const HeroCards = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={4}
      sx={{ backgroundColor: "#CCDDEA", py: '5rem', cursor: "pointer" }}
    >
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        //   animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.4 }}
        >
          <StyledCard>
            <Box
              className="bgImage"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${card.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(1.5px)",
                transition: "filter 0.4s ease-in-out",
              }}
            />
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
                {card.title}
              </Typography>
              <Box
                className="description"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transform: "translateY(100%)",
                  transition: "all 0.4s ease-in-out",
                }}
              >
                <Typography variant="h6" sx={{ color: "#fff", textAlign: "center", p: 2 }}>
                  {card.desc}
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </motion.div>
      ))}
    </Box>
  );
};

export default HeroCards;
