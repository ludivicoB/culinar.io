import React from 'react';
import {Box, Typography} from '@mui/material';
const TapBox = ({img, title, subtitle}) => {
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap:'0.5rem', border: '1px solid black', padding: '0.4rem', borderRadius:'25px', paddingLeft: '0.5rem', paddingRight: '0.5rem'}}>
        <img src={img} style={{width: '3rem', height:'3rem',}} />
        <Box 
            sx={{
                display: 'flex', 
                // alignItems: 'center', 
                flexDirection: 'column', 
                // backgroundColor: 'red'
            }}
        >
            <Typography align="left" sx={{color: 'gray', fontWeight: '500'}}>
            {subtitle}
            </Typography>
            <Typography variant='h5' sx={{my: '1rem', fontWeight: '500', margin: '0px', textWrap: 'nowrap'}}>
            {title}
            </Typography>
        </Box>
    </div>
  );
};

export default TapBox;