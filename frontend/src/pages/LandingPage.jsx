import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as motion from "motion/react-client"
const LandingPage = () => {
  return (
    <div style={{}}>
      <Container maxWidth="md" 
        sx={{ 
          display: "flex",
          flexDirection: 'row',
          "@media (max-width: 992px)":{
            flexDirection: 'column',
            paddingTop: '40%',
            paddingBottom: '20%'
            // height: "105vh"
          },
          "@media (max-width: 795px)":{
            paddingTop: '45%'
          },
          "@media (max-width: 572px)":{
            paddingTop: '60%'
          },
          "@media (max-width: 459px)":{
            paddingTop: '80%'
          },
          justifyContent: "center", 
          alignItems: "center", 
          gap: 4, 
          height: "90vh", 
          textAlign: "center",
        }}>
          <motion.div
          initial={{x: -60, opacity: 0.5}}
          animate={{ x: 0, opacity: 1, transition:{duration: 0.5} }}
          // whileInView={{opacity: 1 }}
        >
        <Box sx={{
          textAlign:'left', 
          "@media (max-width: 993px)":{
              textAlign:'center'
            },
            "@media (max-width: 470px)":{
              scale: 0.8
            },
        }}>
          <Typography variant="h3" gutterBottom 
          sx={{
            textWrap: 'nowrap', 
            fontWeight: 'bold', 
            fontFamily: 'Segoe UI',
            color: '#243A4A',
            
          }}>
            Cook with Culinar.io
          </Typography>
          <Typography variant="h6" 
          sx={{ 
            mb: 3, 
            color: "gray", 
            fontSize: '1.5rem',
            fontFamily: 'Segoe UI'
          }}>
          Discover, create, and share amazing recipes with Culinar.io. Your ultimate digital recipe book!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" component={Link} to="/register" 
            sx={{
              backgroundColor: '#0076B3',
              textTransform: 'none', 
              fontSize: '1.2rem', 
              fontFamily: 'Segoe UI', 
              fontWeight: 'bold',
              "&:hover": { bgcolor: "#243A4A" }
            }}>
              Start Cooking
            </Button>
          </Box>
        </Box>
        </motion.div>
        <motion.div
          initial={{x: 60, opacity: 0.5,}}
          animate={{ x: 0, opacity: 1, transition:{duration: 0.5} }}
          sx={{
            "@media (max-width:448px)":{
              width: '500px'
            }
          }}
          // whileInView={{opacity: 1 }}
        >
          <Box sx={{
            "@media (max-width:448px)":{
              scale: 0.8
            },
          }}>
            <img src="landing-heroimage.png" 
            style={{
              width: '30rem', 
              height: '',
              filter: "drop-shadow(20px 30px 10px rgba(0, 0, 0, 0.63))"
            }}>
            </img>
          </Box>
        </motion.div>
      </Container>
    </div>
    
  );
};

export default LandingPage;