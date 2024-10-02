import React, { useState } from 'react';
import { Paper, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Card, CardContent, CardActions } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { FaSeedling, FaImage, FaAppleAlt, FaCarrot, FaTree, FaPepperHot, FaLeaf, FaQuestionCircle, FaInfoCircle, FaStethoscope, FaTrash } from 'react-icons/fa';

const CropDetails = ({ crop, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [helpSubcategory, setHelpSubcategory] = useState('');

  const cropDetails = {
    Vegetables: {
      icon: <FaCarrot />,
      description: 'Includes a variety of vegetables like tomatoes, onions, carrots, etc.',
      benefits: ['Rich in vitamins', 'Good for digestion', 'Low in calories'],
      tips: ['Plant in well-drained soil', 'Water regularly', 'Use organic fertilizers'],
      subcategories: {
        Tomatoes: {
          soil: 'Loamy soil with pH 6.0 - 6.8',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Stake plants to prevent them from sprawling.',
          timeline: [
            { stage: 'Planting', time: 'Day 1', description: 'Sow seeds in starter pots indoors.', icon: <FaSeedling color="green" /> },
            { stage: 'Germination', time: 'Day 7-14', description: 'Seedlings start to emerge.', icon: <FaLeaf color="green" /> },
            { stage: 'Transplanting', time: 'Day 21-30', description: 'Move to outdoor garden beds.', icon: <FaTree color="green" /> },
            { stage: 'Flowering', time: 'Day 45-60', description: 'Flowers start to appear on plants.', icon: <FaAppleAlt color="green" /> },
            { stage: 'Fruit Development', time: 'Day 60-90', description: 'Tomatoes begin to form.', icon: <FaCarrot color="green" /> },
            { stage: 'Harvest', time: 'Day 90-120', description: 'Tomatoes are ready to pick.', icon: <FaPepperHot color="green" /> },
          ],
        },
        Onions: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6 hours/day)',
          notes: 'Space bulbs 4-6 inches apart.',
          timeline: [
            { stage: 'Planting', time: 'Day 1', description: 'Direct sow onion seeds or sets outdoors.', icon: <FaSeedling color="green" /> },
            { stage: 'Germination', time: 'Day 14-21', description: 'Sprouts start to emerge from the soil.', icon: <FaLeaf color="green" /> },
            { stage: 'Bulb Development', time: 'Day 60-90', description: 'Onions begin to form bulbs.', icon: <FaCarrot color="green" /> },
            { stage: 'Harvest', time: 'Day 90-120', description: 'Onions are ready to be harvested.', icon: <FaPepperHot color="green" /> },
          ],
        },
        Carrots: {
          soil: 'Loose, sandy loam with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Thin seedlings for proper spacing.',
        },
        BellPeppers: { 
          soil: 'Well-drained soil with pH 6.0 - 6.8',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Best grown in warm weather.',
        },
        Cucumbers: {
          soil: 'Rich, well-drained soil with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Provide trellis for climbing varieties.',
        },
      },
    },
    Fruits: {
      icon: <FaAppleAlt />,
      description: 'Includes fruits such as apples, bananas, mangoes, etc.',
      benefits: ['High in fiber', 'Rich in antioxidants', 'Boosts immunity'],
      tips: ['Pick when ripe', 'Store in a cool place', 'Avoid bruising'],
      subcategories: {
        Apples: {
          soil: 'Sandy loam with pH 6.0 - 7.0',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Prune annually for better yield.',
        },
        Bananas: {
          soil: 'Well-drained soil with pH 5.5 - 7.0',
          watering: 'At least 2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Use mulch to retain moisture.',
        },
        Oranges: {
          soil: 'Well-drained sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Fertilize in early spring and late summer.',
        },
        Grapes: {
          soil: 'Loamy soil with good drainage and pH 5.5 - 6.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Prune for air circulation.',
        },
        Mangoes: {
          soil: 'Well-drained sandy loam with pH 5.5 - 7.5',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (8-10 hours/day)',
          notes: 'Protect from frost during the early years.',
        },
      },
    },
    Grains: {
      icon: <FaSeedling />,
      description: 'Includes grains like wheat, rice, and maize.',
      benefits: ['Good source of energy', 'Rich in nutrients', 'Supports digestion'],
      tips: ['Keep soil moist', 'Plant in full sunlight', 'Harvest at the right time'],
      subcategories: {
        Wheat: {
          soil: 'Well-drained soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Avoid planting in waterlogged areas.',
        },
        Rice: {
          soil: 'Clayey soil with pH 5.5 - 7.0',
          watering: 'Keep soil flooded during growth',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Transplant when seedlings are 3-4 inches tall.',
        },
        Maize: {
          soil: 'Fertile, well-drained soil with pH 5.8 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Space rows 30-36 inches apart.',
        },
        Barley: {
          soil: 'Loamy soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Use winter varieties in colder climates.',
        },
        Oats: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Can be planted in spring or fall.',
        },
      },
    },
    Legumes: {
      icon: <FaSeedling />,
      description: 'Includes lentils, chickpeas, peas, etc.',
      benefits: ['High in protein', 'Improves heart health', 'Regulates blood sugar'],
      tips: ['Inoculate seeds before planting', 'Provide support for climbing varieties'],
      subcategories: {
        Lentils: {
          soil: 'Sandy loam with pH 6.0 - 7.0',
          watering: 'Moderate, avoid waterlogging',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Rotate with cereals for better yield.',
        },
        Chickpeas: {
          soil: 'Well-drained soil with pH 6.0 - 8.0',
          watering: 'Minimal, drought-tolerant',
          sunlight: 'Full sun (6 hours/day)',
          notes: 'Plant in cooler months.',
        },
        Peas: {
          soil: 'Loamy soil with pH 6.0 - 7.0',
          watering: 'Keep soil consistently moist',
          sunlight: 'Full sun to partial shade',
          notes: 'Support climbing varieties with trellis.',
        },
        Soybeans: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Use as a cover crop for soil health.',
        },
        Beans: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Avoid planting in cool, wet soil.',
        },
      },
    },
    Herbs: {
      icon: <FaTree />,
      description: 'Includes herbs like basil, mint, cilantro, etc.',
      benefits: ['Adds flavor to meals', 'Rich in nutrients', 'Antioxidant properties'],
      tips: ['Harvest regularly', 'Prune to encourage growth'],
      subcategories: {
        Basil: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Pinch off flowers for better leaf growth.',
        },
        Mint: {
          soil: 'Moist, fertile soil with pH 6.0 - 7.0',
          watering: 'Keep soil consistently moist',
          sunlight: 'Partial shade to full sun',
          notes: 'Plant in pots to control spread.',
        },
        Cilantro: {
          soil: 'Well-drained soil with pH 6.0 - 6.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest leaves regularly to promote growth.',
        },
        Oregano: {
          soil: 'Well-drained soil with pH 6.0 - 8.0',
          watering: 'Moderate, avoid overwatering',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Cut back in fall to promote new growth.',
        },
        Parsley: {
          soil: 'Fertile, well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun to partial shade',
          notes: 'Can be grown indoors or outdoors.',
        },
      },
    },
    RootCrops: {
      icon: <FaCarrot />,
      description: 'Includes root crops like potatoes, sweet potatoes, etc.',
      benefits: ['Good source of carbohydrates', 'Rich in vitamins and minerals'],
      tips: ['Plant in loose, well-drained soil', 'Water regularly'],
      subcategories: {
        Potatoes: {
          soil: 'Well-drained, loose soil with pH 4.8 - 5.4',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Hill soil around the base to protect tubers.',
        },
        SweetPotatoes: {
          soil: 'Sandy loam with pH 5.0 - 6.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Use mulch to retain moisture.',
        },
        Carrots: {
          soil: 'Loose, sandy loam with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Thin seedlings for proper spacing.',
        },
        Beets: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when roots are 1-3 inches in diameter.',
        },
        Radishes: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: 'Keep soil moist',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Plant in cooler months for best results.',
        },
      },
    },
    Spices: {
      icon: <FaPepperHot />,
      description: 'Includes spices such as chili, turmeric, etc.',
      benefits: ['Adds flavor', 'Contains health benefits', 'Antioxidant properties'],
      tips: ['Store in a cool, dry place', 'Use fresh when possible'],
      subcategories: {
        ChiliPeppers: {
          soil: 'Well-drained soil with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when they reach desired heat level.',
        },
        Turmeric: {
          soil: 'Loamy, well-drained soil with pH 5.5 - 7.0',
          watering: 'Keep soil moist',
          sunlight: 'Partial shade to full sun',
          notes: 'Harvest roots when leaves turn yellow.',
        },
        Ginger: {
          soil: 'Rich, well-drained soil with pH 5.5 - 6.5',
          watering: 'Keep soil moist but not soggy',
          sunlight: 'Partial shade to full sun',
          notes: 'Harvest after 8-10 months.',
        },
        Cinnamon: {
          soil: 'Fertile, well-drained soil with pH 5.5 - 6.5',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest bark when branches are 2-3 years old.',
        },
        Cardamom: {
          soil: 'Rich, loamy soil with pH 6.0 - 7.0',
          watering: 'Keep soil moist',
          sunlight: 'Partial shade to full sun',
          notes: 'Protect from frost during growth.',
        },
      },
    },
    Oilseeds: {
      icon: <FaSeedling />,
      description: 'Includes oilseeds like sunflower seeds, mustard seeds, etc.',
      benefits: ['Rich in healthy fats', 'Good source of energy'],
      tips: ['Plant in full sun', 'Avoid waterlogged soil'],
      subcategories: {
        SunflowerSeeds: {
          soil: 'Well-drained soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Support tall varieties with stakes.',
        },
        MustardSeeds: {
          soil: 'Loamy soil with pH 5.5 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when seeds are firm and dry.',
        },
        SesameSeeds: {
          soil: 'Sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Plant after the last frost date.',
        },
        FlaxSeeds: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when capsules turn brown.',
        },
        Safflower: {
          soil: 'Sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Drought tolerant; needs minimal water.',
        },
      },
    },
  };

  const handleViewImages = (images) => {
    console.log('Viewing images:', images);
  };

  const handleAnalyze = (crop) => {
    console.log('Analyzing crop:', crop);
  };

  const handleFixIssue = (crop) => {
    console.log('Fixing issues for crop:', crop);
  };

  const handleMarkAsBad = (crop) => {
    console.log('Marking crop as bad:', crop);
  };

  const colorMap = {
    fruit: '#ffcccb',
    vegetable: '#ccffcc',
    grain: '#ffffcc',
    herb: '#e6ccff',
  };
  const handleRequestHelp = (subcategory) => {
    setHelpSubcategory(subcategory);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!cropDetails[crop]) {
    return (
      <Paper style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" color="error">Crop not found</Typography>
      </Paper>
    );
  }

  const cropInfo = cropDetails[crop];
  const cropType = cropInfo.type || 'unknown';
  const backgroundColor = colorMap[cropType] || '#ffffff';

  return (
    <Paper style={{ padding: '20px', maxHeight: '600px', overflowY: 'auto', backgroundColor, width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#0d47a1' }}>
        {cropInfo.icon} {crop}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '20px', color: '#424242' }}>
        {cropInfo.description}
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '10px', color: '#388e3c' }}>Benefits:</Typography>
      <ul style={{ marginLeft: '20px' }}>
        {cropInfo.benefits.map((benefit) => (
          <li key={benefit} style={{ fontSize: '18px' }}>{benefit}</li>
        ))}
      </ul>
      <Typography variant="h5" style={{ marginBottom: '10px', color: '#388e3c' }}>Tips:</Typography>
      <ul style={{ marginLeft: '20px' }}>
        {cropInfo.tips.map((tip) => (
          <li key={tip} style={{ fontSize: '18px' }}>{tip}</li>
        ))}
      </ul>
      <Typography variant="h5" style={{ marginBottom: '10px', color: '#388e3c' }}>Subcategories:</Typography>
      <Grid container spacing={2}>
        {Object.keys(cropInfo.subcategories).map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} key={subcategory}>
            <Card elevation={3} style={{ marginBottom: '16px', transition: '0.3s', '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' } }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>{subcategory}</Typography>
                <Typography variant="body1"><strong>Soil:</strong> {cropInfo.subcategories[subcategory].soil}</Typography>
                <Typography variant="body1"><strong>Watering:</strong> {cropInfo.subcategories[subcategory].watering}</Typography>
                <Typography variant="body1"><strong>Sunlight:</strong> {cropInfo.subcategories[subcategory].sunlight}</Typography>
                <Typography variant="body1"><strong>Notes:</strong> {cropInfo.subcategories[subcategory].notes}</Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <IconButton color="primary" onClick={() => handleRequestHelp(subcategory)} style={{ marginRight: '8px' }}>
                    <FaQuestionCircle />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleViewImages(crop.images)} style={{ marginRight: '8px' }}>
                    <FaImage />
                  </IconButton>
                </div>
                <div>
                  <IconButton color="secondary" onClick={() => handleAnalyze(crop)} style={{ marginRight: '8px' }}>
                    <FaInfoCircle />
                  </IconButton>
                  <IconButton color="warning" onClick={() => handleFixIssue(crop)} style={{ marginRight: '8px' }}>
                    <FaStethoscope />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleMarkAsBad(crop)}>
                    <FaTrash />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle style={{ backgroundColor: '#f5f5f5' }}>Timeline for {helpSubcategory}</DialogTitle>
        <DialogContent style={{ backgroundColor: '#ffffff' }}>
          <Timeline>
            {cropInfo.subcategories[helpSubcategory]?.timeline?.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent>{event.time}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>{event.icon}</TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>{event.stage}: {event.description}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CropDetails;
