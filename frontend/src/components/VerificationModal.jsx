import React, { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

const VerificationModal = ({ open, onClose, onVerify }) => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    // Handle input change for each digit/letter
    const handleChange = (index, value) => {
        if (!/^[A-Z0-9]?$/i.test(value)) return; // Allow only alphanumeric (A-Z, 0-9)
        
        const newCode = [...code];
        newCode[index] = value.toUpperCase(); // Convert to uppercase
        setCode(newCode);

        // Move to the next input field if it's not empty
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle key events (Backspace navigation)
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newCode = [...code];

            if (code[index]) {
                // Clear the current input first
                newCode[index] = "";
            } else if (index > 0) {
                // Move to previous input if current is already empty
                newCode[index - 1] = "";
                inputRefs.current[index - 1]?.focus();
            }

            setCode(newCode);
        }
    };

    // Handle verification submission
    const handleSubmit = () => {
        console.log(code)
        const verificationCode = code.join("");
        if (verificationCode.length === 6) {
            onVerify(verificationCode);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Enter Verification Code</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                    {code.map((char, index) => (
                        <TextField
                            key={index}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            value={char}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            variant="outlined"
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: "center", fontSize: "20px", width: "40px" },
                            }}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" disabled={code.includes("")}>
                    Verify
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VerificationModal;
