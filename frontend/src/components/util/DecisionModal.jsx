import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DecisionModal = ({ open, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="decision-modal-title" aria-describedby="decision-modal-description">
            <Box 
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "8px",
                    minWidth: "300px",
                    textAlign: "center"
                }}
            >
                <Typography id="decision-modal-title" variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Typography id="decision-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                    <Button variant="outlined" color="error" onClick={onClose}>
                        {cancelText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DecisionModal;
