import { Container, Box, Typography, Paper, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import PageLoader from '../components/PageLoader';
import TagBox from '../components/TagBox';
import Fraction from "fraction.js";
import {motion} from 'motion/react'
const ViewRecipePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const {id} = useParams();
  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState({})
  const [creator, setCreator] = useState({})
  const tagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.3 } // Adjust delay timing here
    }),
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
    const fetchRecipe = async () => {
      const res = await axios.get(`${apiUrl}/user/get-recipe/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(res.data){
        console.log(res.data)
        setRecipe(res.data.recipe)
        setCreator(res.data.user)
        setLoading(false)
      }
    }
    fetchRecipe();
  },[])
  if(loading){
    return (
      <PageLoader message={'Preparing Recipe'} />
    )
  }

  const formatQuantity = (quantity, unit) => {
    if (unit === "pcs") {
      return Math.trunc(quantity); // Remove decimals for 'pcs'
    }
    const fraction = new Fraction(quantity);
    return fraction.n % fraction.d === 0 ? fraction.n : fraction.toFraction(true);
  };

  return (
    <>
      {/* HERO SECTION */}
      <Container
        maxWidth="100%" // Ensures spacing around the hero
        sx={{
          mt: 3, // Margin top
          mb: 3, // Margin bottom
        }}
      >
        <Box
          sx={{
            height: "50vh", // Takes most of the screen height
            width: "100%", // Full width within the container
            backgroundImage: `url(${recipe.recipe_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.59)", // Semi-transparent dark overlay
              borderRadius: "20px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              textAlign: "left",
              color: "white",
              padding: "20px",
              width: '90%',
              left: '5%',
              bottom: '15%',
              '@media (max-width: 359px)':{
                left: '-1%'
              }
            }}
          >
            <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}} >
              <Typography variant="h5" sx={{textWrap: 'nowrap'}}>Let's Cook</Typography>
              <Typography variant="h2" fontWeight="bold" 
                sx={{
                  // textWrap: 'nowrap',
                  '@media (max-width: 623px)':{
                    fontSize: '3rem'
                  },
                  '@media (max-width: 505px)':{
                    fontSize: '2.5rem'
                  },
                  '@media (max-width: 433px)':{
                    fontSize: '2rem'
                  }
                }}>
                {recipe.recipe_name}
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* TAGS, DESCRIPTION, AND CREATOR SECTION */}
      <Container maxWidth='100%' sx={{mt: '2rem',mb:'1rem'}}>
        <Grid container spacing={2}>
            <Grid size={9}>
              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '2rem' }}>
                {[ 
                  { img: '/images/icons/categoryicon.png', title: recipe.category, subtitle: 'Category' },
                  { img: '/images/icons/ingredient-icon-black.png', title: `${recipe.ingredients.length} Needed`, subtitle: 'Ingredients' },
                  { img: '/images/icons/steps-icon.png', title: `${recipe.steps.length} Steps`, subtitle: 'No. Steps' }
                ].map((item, index) => (
                  <motion.div key={index} variants={tagVariants} initial="hidden" animate="visible" custom={index}>
                    <TagBox img={item.img} title={item.title} subtitle={item.subtitle} />
                  </motion.div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '50px', marginBottom: '2rem' }}>
                <Typography sx={{fontSize: '1.2rem'}}>
                  {recipe.recipe_description}
                </Typography>
              </div>
              <Paper elevation={2} sx={{padding: '2rem'}}>
                <Typography variant='h5' sx={{mb: '1rem', fontWeight: '500'}}>
                  Ingredients
                </Typography>
                <Box>
                  {recipe.ingredients.map((ingredient, index) => (
                    <Typography key={index} variant="body1" sx={{ color: 'gray' }}>
                      {formatQuantity(ingredient.pivot.quantity, ingredient.unit)} {ingredient.name} {ingredient.unit}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid size={3}>
              <Paper
                elevation={2}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  alignItems: 'center',
                  borderRadius: '20px',
                  backgroundImage: `url(${creator.avatar})`,
                  backgroundColor: `${creator.banner_color}`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain', // or 'cover'
                }}
              >
                <Typography sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
                 <span > Created By:</span>
                 <span style={{fontWeight: '700', textWrap:'nowrap'}}>{creator.fname} {creator.lname}</span>
                </Typography>
              </Paper>
          </Grid>
        </Grid>
      </Container>
     
      {/* INGREDIENTS SECTION */}
      <Container maxWidth="100%" sx={{mb: '2rem'}}>
        
      </Container>

      {/* STEPS SECTION */}
      <Container maxWidth='100%' sx={{mt: '2rem',}}>
        <Box sx={{mb: '1rem'}}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant='h4' fontWeight={500} sx={{mb: '1rem'}}>
                Cooking <span style={{color: '#E1A840'}}>
                  Instructions
                </span>
              </Typography>
                {recipe.steps.map((recipe, index) => (
                   <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.4 }}
                  >
                    <Paper elevation={2} key={index} sx={{ display:'flex', alignItems: 'center', backgroundColor:'#F7F7F7', padding: '2.5rem', mt: '0.6rem'}}>
                      <Typography variant='h4' sx={{color:'#E1A840', mr: '2rem'}} fontWeight={'bold'}>
                        {recipe.step_number < 10 ? '0' + recipe.step_number : recipe.step_number}
                      </Typography>
                      <Typography sx={{fontSize:'1.2rem'}}>
                        {recipe.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ViewRecipePage;