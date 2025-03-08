import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibilityThreshold = 100;
    const toggleVisibility = () => {
    if (window.scrollY > visibilityThreshold) {
        setVisible(true);
    } else {
        setVisible(false);
    }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="contained"
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        minWidth: "unset",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 3,
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      <KeyboardArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
