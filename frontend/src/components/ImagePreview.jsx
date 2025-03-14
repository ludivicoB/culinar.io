import React, { useState } from "react";
import { Paper, Box, Modal, Typography } from "@mui/material";

const ImagePreview = ({ recipe }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Image with Hover Effect */}
            <Paper
                sx={{
                    width: "100%",
                    height: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    backgroundImage: `url(${recipe.recipe_image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    cursor: "pointer",
                    overflow: "hidden",
                    "&:hover .overlay": {
                        opacity: 1, // Show overlay on hover
                    }
                }}
                onClick={() => setOpen(true)}
            >
                {/* Dark Overlay on Hover */}
                <Box
                    className="overlay"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Black transparent overlay
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        opacity: 0, // Initially hidden
                        transition: "opacity 0.3s ease-in-out",
                    }}
                >
                    View Full Image
                </Box>
            </Paper>

            {/* Modal to Show Full Image */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        backdropFilter: 'blur(5px)',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        outline: "none"
                    }}
                >
                    <img
                        src={recipe.recipe_image}
                        alt="Full Preview"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "80vh",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default ImagePreview;
