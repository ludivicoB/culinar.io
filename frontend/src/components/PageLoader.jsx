import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const PageLoader = ({message}) => {
  return (
    <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", height: "90vh" }}>
        <CircularProgress />{message}
    </div>
  );
};

export default PageLoader;