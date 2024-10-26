import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardMedia, Box, IconButton, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import img1 from './IMG_5771.jpeg';
import img2 from './IMG_5772.jpeg';
import img3 from './IMG_5773.jpeg';
import img4 from './IMG_5774.jpeg';
import img5 from './IMG_5775.jpeg';
import img6 from './IMG_5776.jpeg';
import img7 from './IMG_5777.jpeg';
import img8 from './IMG_5778.jpeg';
import img9 from './IMG_5779.jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '50%',
  padding: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const PhotoViewer = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '10px', position: 'relative', overflow: 'hidden' }}>
      <SwipeableViews
        index={index}
        onChangeIndex={setIndex}
        enableMouseEvents
        interval={3000}
        style={{ width: '100%' }}
      >
        {images.map((img, i) => (
          <Card key={i} sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={img}
              alt={`Slide ${i + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }} // Wider image
            />
          </Card>
        ))}
      </SwipeableViews>
      <StyledIconButton onClick={handleNext}>
        <ArrowForwardIcon fontSize="large" />
      </StyledIconButton>
    </Box>
  );
};

export default PhotoViewer;
