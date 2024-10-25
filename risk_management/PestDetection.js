import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Card, CardContent, List, ListItem, ListItemText, Input, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl'; 
import * as tf from '@tensorflow/tfjs';

const PestCard = ({ title, description, summary, backgroundColor }) => (
  <Accordion style={{ backgroundColor }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" style={{ color: '#333' }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails style={{ backgroundColor: '#f9f9f9' }}>
      <Typography variant="body2" style={{ color: '#555' }}>{description}</Typography>
      <div style={{ marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Summary:</Typography>
        {summary.map((text, index) => (
          <Typography key={index} variant="body2" style={{ fontSize: '0.8em', color: '#555' }}>
            - {text}
          </Typography>
        ))}
      </div>
    </AccordionDetails>
  </Accordion>
);

// Pest Information Data
const ricePests = [
  {
    title: "Rice Leaf Folder (Cnaphalocrocis medinalocis)",
    description: "An outbreak occurred in Haryana with damage levels from 10-80%.",
    summary: [
      "Sensitive bands for assessing damage were identified.",
      "Impact on yield and health of rice crops."
    ]
  },
  {
    title: "Brown Planthopper (Nilaparvata lugens)",
    description: "Caused significant damage with levels from 10-100%.",
    summary: [
      "Reflectance spectra indicated declines in visible and NIR regions.",
      "Associated with severe crop losses."
    ]
  },
  {
    title: "Rice Stem Borer (Scirpophaga excerptalis)",
    description: "Common pest causing damage to rice plants.",
    summary: [
      "Feeding on stems can lead to reduced crop yield.",
      "Monitoring and management practices are essential."
    ]
  },
  {
    title: "Rice Gall Midge (Orseolia oryzae)",
    description: "A major pest that can cause significant yield losses.",
    summary: [
      "Larvae feed inside the plant, causing stunted growth.",
      "Requires timely pest management strategies."
    ]
  },
];

const cottonPests = [
  {
    title: "Cotton Leafhopper",
    description: "Emerging key pest in Bt cotton.",
    summary: [
      "New indices (LHI 2 and LHI 4) have shown potential for detecting leafhopper severity.",
      "Widespread impact on cotton production."
    ]
  },
  {
    title: "Cotton Mealybug (Phenacoccus solenopsis)",
    description: "Significant pest on cotton globally.",
    summary: [
      "Sensitive wavelengths identified for damage assessment.",
      "New MSIs were developed for early detection."
    ]
  },
  {
    title: "Mirid Bugs",
    description: "Economic significance has increased with Bt cotton.",
    summary: [
      "Damage fruiting structures leading to yield loss."
    ]
  },
  {
    title: "Jassid",
    description: "A widespread sucking pest that injects toxins into leaves.",
    summary: [
      "Causing chlorosis and reddening.",
      "Can affect overall plant health."
    ]
  },
];

const PestDetection = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [model, setModel] = useState(null);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend('webgl');
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target.result);
        setFile(uploadedFile);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const detectPest = async () => {
    if (model && imgSrc) {
      const img = new Image();
      img.src = imgSrc;
      img.onload = async () => {
        const predictions = await model.classify(img);
        setPredictions(predictions);
      };
    }
  };

  const getHighestPrediction = () => {
    if (predictions.length === 0) return null;
    return predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
  };

  const highestPrediction = getHighestPrediction();

  return (
    <Container style={styles.container}>
      <Button variant="outlined" onClick={onClose} style={{ marginBottom: '20px' }}>Close</Button>
      <Typography variant="h4" style={styles.title}>Pest Detection</Typography>

      <div style={styles.uploadContainer}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={styles.uploadInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={detectPest}
          disabled={!file}
          style={styles.detectButton}
        >
          Detect
        </Button>
      </div>

      {imgSrc && (
        <div style={styles.imagePredictionContainer}>
          <Card style={styles.imageCard}>
            <CardContent>
              <img id="uploaded-image" src={imgSrc} alt="Uploaded" style={styles.image} />
            </CardContent>
          </Card>

          <Card style={styles.predictionCard}>
            <CardContent>
              <Typography variant="h6" style={styles.categoryTitle}>Predictions:</Typography>
              <List>
                {predictions.map((prediction, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={
                        <span style={{ color: highestPrediction && prediction.className === highestPrediction.className ? '#3f51b5' : '#000' }}>
                          {prediction.className}: {Math.round(prediction.probability * 100)}%
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      )}

      <Typography variant="h5" style={styles.categoryTitle}>Rice Pests</Typography>
      <div style={styles.grid}>
        {ricePests.map((pest, index) => (
          <PestCard 
            key={index} 
            title={pest.title} 
            description={pest.description} 
            summary={pest.summary}
            backgroundColor="#fff3cd"
          />
        ))}
      </div>

      <Typography variant="h5" style={styles.categoryTitle}>Cotton Pests</Typography>
      <div style={styles.grid}>
        {cottonPests.map((pest, index) => (
          <PestCard 
            key={index} 
            title={pest.title} 
            description={pest.description} 
            summary={pest.summary}
            backgroundColor="#d1ecf1"
          />
        ))}
      </div>
    </Container>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  uploadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  uploadInput: {
    marginRight: '10px',
  },
  detectButton: {
    height: '56px',
    marginLeft: '10px',
  },
  imagePredictionContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginTop: '20px',
  },
  imageCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  predictionCard: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '2em',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  categoryTitle: {
    marginTop: '40px',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
};

export default PestDetection;
