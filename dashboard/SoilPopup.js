import React, { useState } from 'react';
import './SoilMapDialog.css';
import { Dialog, DialogTitle, DialogContent, Typography, Chip, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SoilPopup = ({ isOpen, onClose }) => {
  const [selectedSoil, setSelectedSoil] = useState(null);

  const soilData = {
    "Sandy Soil": {
      description: "Sandy soil is light, warm, dry, and tends to be acidic and low in nutrients. Quick drainage but can dry out quickly in summer.",
      traits: ["Light", "Quick draining", "Low nutrients"],
      color: '#F4A460', // Sandy Brown
    },
    "Clay Soil": {
      description: "Clay soil is heavy and rich in nutrients but drains slowly. Tends to dry out in summer and can crack.",
      traits: ["High nutrients", "Poor drainage", "Cracks in summer"],
      color: '#A68B64', // Clay Brown
    },
    "Silt Soil": {
      description: "Silt soil retains moisture well and has high fertility. However, it can be easily compacted.",
      traits: ["Moisture-retentive", "High fertility", "Prone to washing away"],
      color: '#696969', // Dark Gray - Darkened from #808080
    },
    "Peat Soil": {
      description: "Peat soil is high in organic matter and retains moisture, often imported for planting.",
      traits: ["High organic matter", "Retains moisture"],
      color: '#6B4423', // Dark Brown
    },
    "Chalk Soil": {
      description: "Chalk soil is highly alkaline and may not support acid-loving plants.",
      traits: ["Alkaline", "May show white lumps"],
      color: '#DCDCDC', // Gainsboro - Darkened from #F5F5DC
      textColor: 'black', // Force text color to black
    },
    "Loam Soil": {
      description: "Loam is a mixture of sand, silt, and clay, ideal for most plants and well-draining.",
      traits: ["Fertile", "Good drainage", "Easy to work with"],
      color: '#C2B280', // Tan
    },
    "Alluvial Soil": {
      description: "Found in northern plains, rich in potash, and supports crops like wheat and maize.",
      traits: ["Fertile", "Varies from sandy loam to clay"],
      color: '#E9DABB',
    },
    "Black Soil": {
      description: "Found in Deccan Plateau, clayey and rich in iron; ideal for cotton.",
      traits: ["Moisture-retaining", "Rich in iron"],
      color: '#708238',
    },
    "Red and Yellow Soil": {
      description: "Located in the Deccan Plateau, rich in iron but generally less fertile.",
      traits: ["Deficient in nitrogen", "Supports millets and oilseeds"],
      color: '#E41B17',
    },
    "Laterite Soil": {
      description: "Typical of monsoon climates; low in fertility but suitable for cashew cultivation.",
      traits: ["Rich in iron and aluminum", "Responsive to fertilizers"],
      color: '#CD7F32',
    },
    "Mountain Soil": {
      description: "Found in forested areas, varies in texture; fertile in lower valleys.",
      traits: ["Acidic in snowbound areas", "Fertile in lower regions"],
      color: '#A0522D',
    },
    "Peaty and Marshy Soil": {
      description: "Found in heavy rainfall regions, rich in organic matter.",
      traits: ["Heavy and black", "Supports vegetation"],
      color: '#463E3F',
    },
    "Desert Soil": {
      description: "Sandy and low moisture; found in western Rajasthan.",
      traits: ["Saline", "Low water retention"],
      color: '#F0E68C',
    },
    "Saline and Alkaline Soil": {
      description: "High in salts, mainly found in arid regions.",
      traits: ["Infertile", "Requires reclamation"],
      color: '#D3D3D3', // LightGray - Darkened from #FAF9F6
      textColor: 'black', // Force text color to black
    },
  };

  const handleChipClick = (type) => {
    setSelectedSoil(soilData[type]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          overflow: 'hidden', // Prevent scrolling within the dialog
          backgroundColor: '#f0f0f0', // Pale green background
        },
      }}
    >
      <DialogTitle style={{ backgroundColor: '#f0f0f0' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Soil Types</Typography>
          <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
        </Box>
      </DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#f0f0f0' }}>
        <Typography variant="body1">
          Soil is a natural resource categorized into different types, each with distinct characteristics.
        </Typography>
        <Box mt={2}>
          {Object.keys(soilData).map((type) => (
            <Chip
              key={type}
              label={type}
              onClick={() => handleChipClick(type)}
              style={{
                margin: '4px',
                cursor: 'pointer',
                backgroundColor: soilData[type].color,
                color: soilData[type].textColor || 'white', // Use textColor if defined, otherwise default to white
              }}
            />
          ))}
        </Box>

        {selectedSoil && (
          <Box mt={2} style={{ backgroundColor: selectedSoil.color, padding: '10px', color: selectedSoil.textColor || 'white' }}>
            <Typography variant="h6">{selectedSoil.description}</Typography>
            <Typography variant="body2">
              <strong>Traits:</strong> {selectedSoil.traits.join(', ')}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SoilPopup;