import React, { useState } from 'react'
import ActionForm from './ActionForm'
import {
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent
} from '@mui/lab'
import {
  FaSeedling,
  FaImage,
  FaAppleAlt,
  FaCarrot,
  FaTree,
  FaPepperHot,
  FaLeaf,
  FaQuestionCircle,
  FaInfoCircle,
  FaStethoscope,
  FaTrash
} from 'react-icons/fa'
import PhotoViewer from './PhotoViewer'
import ReportDialog from './ReportDialog'
import IssueRectification from './IssueRectification'
import TomatoImage from '../Agricultural-crops/tomato/tomato.jpeg'
import timeLineImg1 from '../Agricultural-crops/tomato/image (11).jpeg'
import timeLineImg2 from '../Agricultural-crops/tomato/image (6).jpg'
import timeLineImg3 from '../Agricultural-crops/tomato/image (10).jpg'
import timeLineImg4 from '../Agricultural-crops/tomato/image (12).jpeg'
import timeLineImg5 from '../Agricultural-crops/tomato/image (13).jpeg'
import timeLineImg6 from '../Agricultural-crops/tomato/image (9).jpeg'

import { sub } from '@tensorflow/tfjs'
import { Upload, UploadFileSharp } from '@mui/icons-material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CropDetails = ({ crop, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [helpSubcategory, setHelpSubcategory] = useState('')
  const [openAnalyze, setOpenAnalyze] = useState(false)
  const [openFix, setOpenFix] = useState(false)
  const [openMarkBad, setOpenMarkBad] = useState(false)
  const [images, setImages] = useState([])
  const [dialogState, setDialogState] = useState({
    analyze: false,
    fix: false,
    markBad: false
  })
  const [reportData, setReportData] = useState(null)
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const [openRectification, setOpenRectification] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisReport, setAnalysisReport] = useState([]);

  const cropDetails = {
    Vegetables: {
      icon: <FaCarrot />,
      description: 'A diverse range of vegetables that provide essential nutrients and flavors to your meals.',
      benefits: [
        'Rich in vitamins and minerals',
        'Boosts immunity and digestion',
        'Low in calories for weight management',
      ],
      tips: [
        'Plant in well-drained soil to avoid rot',
        'Water regularly but avoid overwatering',
        'Incorporate organic fertilizers for healthier plants',
      ],
      subcategories: {
        Tomatoes: {
          soil: 'Loamy soil with pH 6.0 - 6.8',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Stake plants to prevent sprawling and encourage upright growth.',
          timeline: [
            { stage: 'Planting', time: 'Day 1', description: 'Sow seeds in starter pots indoors.', icon: <FaSeedling color="green" /> },
            { stage: 'Germination', time: 'Day 7-14', description: 'Seedlings begin to emerge.', icon: <FaLeaf color="green" /> },
            { stage: 'Transplanting', time: 'Day 21-30', description: 'Move seedlings to outdoor garden beds.', icon: <FaTree color="green" /> },
            { stage: 'Flowering', time: 'Day 45-60', description: 'Flowers appear, indicating fruit development.', icon: <FaAppleAlt color="green" /> },
            { stage: 'Fruit Development', time: 'Day 60-90', description: 'Tomatoes start to form and ripen.', icon: <FaCarrot color="green" /> },
            { stage: 'Harvest', time: 'Day 90-120', description: 'Tomatoes are ripe and ready for picking.', icon: <FaPepperHot color="green" /> },
          ],
        },
        Onions: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6 hours/day)',
          notes: 'Space bulbs 4-6 inches apart to promote growth.',
          timeline: [
            { stage: 'Planting', time: 'Day 1', description: 'Sow onion seeds or sets directly in the ground.', icon: <FaSeedling color="green" /> },
            { stage: 'Germination', time: 'Day 14-21', description: 'Sprouts start to emerge, signaling growth.', icon: <FaLeaf color="green" /> },
            { stage: 'Bulb Development', time: 'Day 60-90', description: 'Onions develop into mature bulbs.', icon: <FaCarrot color="green" /> },
            { stage: 'Harvest', time: 'Day 90-120', description: 'Onions are ready for harvest when tops start to fall over.', icon: <FaPepperHot color="green" /> },
          ],
        },
        Carrots: {
          soil: 'Loose, sandy loam with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Thin seedlings for proper spacing to allow roots to develop.',
          timeline: [
            { stage: 'Planting', time: 'Day 1', description: 'Sow seeds directly in well-prepared soil.', icon: <FaSeedling color="green" /> },
            { stage: 'Germination', time: 'Day 14-21', description: 'Seedlings will emerge after 2-3 weeks.', icon: <FaLeaf color="green" /> },
            { stage: 'Growth', time: 'Day 30-60', description: 'Roots grow longer and develop sweetness.', icon: <FaCarrot color="green" /> },
            { stage: 'Harvest', time: 'Day 70-80', description: 'Carrots are ready to be pulled from the ground.', icon: <FaPepperHot color="green" /> },
          ],
        },
        BellPeppers: {
          soil: 'Well-drained soil with pH 6.0 - 6.8',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Best grown in warm weather, protect from cold snaps.',
        },
        Cucumbers: {
          soil: 'Rich, well-drained soil with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Provide a trellis for climbing varieties to maximize space.',
        },
      },
    },
    Fruits: {
      icon: <FaAppleAlt />,
      description: 'A selection of juicy and nutritious fruits that enhance your diet.',
      benefits: [
        'High in fiber and water content',
        'Rich in antioxidants and vitamins',
        'Supports digestive health and immunity',
      ],
      tips: [
        'Pick when ripe for the best flavor',
        'Store in a cool, dry place to prolong freshness',
        'Avoid bruising to maintain quality',
      ],
      subcategories: {
        Apples: {
          soil: 'Sandy loam with pH 6.0 - 7.0',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Prune annually to promote airflow and fruit production.',
        },
        Bananas: {
          soil: 'Well-drained soil with pH 5.5 - 7.0',
          watering: 'At least 2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Apply mulch to retain moisture and suppress weeds.',
        },
        Oranges: {
          soil: 'Well-drained sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Fertilize in early spring and late summer for optimal growth.',
        },
        Grapes: {
          soil: 'Loamy soil with good drainage and pH 5.5 - 6.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Prune for better air circulation and sun exposure.',
        },
        Mangoes: {
          soil: 'Well-drained sandy loam with pH 5.5 - 7.5',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (8-10 hours/day)',
          notes: 'Protect young plants from frost until established.',
        },
      },
    },
    Grains: {
      icon: <FaSeedling />,
      description: 'Staple grains that provide essential carbohydrates and nutrients.',
      benefits: [
        'Excellent source of energy and nutrients',
        'Supports digestive health and metabolic function',
        'Versatile in cooking and meal preparation',
      ],
      tips: [
        'Keep soil consistently moist for optimal germination',
        'Plant in full sunlight to ensure strong growth',
        'Harvest at the right time for best yield and quality',
      ],
      subcategories: {
        Wheat: {
          soil: 'Well-drained soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Avoid planting in waterlogged areas to prevent root rot.',
        },
        Rice: {
          soil: 'Clayey soil with pH 5.5 - 7.0',
          watering: 'Keep soil flooded during growth phase',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Transplant seedlings when they reach 3-4 inches tall for best results.',
        },
        Maize: {
          soil: 'Fertile, well-drained soil with pH 5.8 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Space rows 30-36 inches apart for adequate air circulation.',
        },
        Barley: {
          soil: 'Loamy soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Use winter varieties in colder climates for better yield.',
        },
        Oats: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Can be planted in spring or fall depending on climate.',
        },
      },
    },
    Legumes: {
      icon: <FaSeedling />,
      description: 'Protein-rich legumes that are essential for a balanced diet.',
      benefits: [
        'High in protein and fiber',
        'Improves heart health and regulates blood sugar',
        'Supports soil health through nitrogen fixation',
      ],
      tips: [
        'Inoculate seeds before planting to enhance growth',
        'Provide support for climbing varieties to thrive',
      ],
      subcategories: {
        Lentils: {
          soil: 'Sandy loam with pH 6.0 - 7.0',
          watering: 'Moderate, avoid waterlogging',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Rotate with cereals for better soil health and yield.',
        },
        Chickpeas: {
          soil: 'Well-drained soil with pH 6.0 - 8.0',
          watering: 'Minimal; drought-tolerant once established',
          sunlight: 'Full sun (6 hours/day)',
          notes: 'Best planted in cooler months for optimal growth.',
        },
        Peas: {
          soil: 'Loamy soil with pH 6.0 - 7.0',
          watering: 'Keep soil consistently moist for healthy growth',
          sunlight: 'Full sun to partial shade',
          notes: 'Support climbing varieties with a trellis for better yield.',
        },
        Soybeans: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Plant as a cover crop to improve soil health.',
        },
        Beans: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Avoid planting in cool, wet soil for best results.',
        },
      },
    },
    Herbs: {
      icon: <FaTree />,
      description: 'Aromatic herbs that enhance flavors and add nutrition to meals.',
      benefits: [
        'Adds flavor without extra calories',
        'Rich in antioxidants and nutrients',
        'Promotes overall health and wellness',
      ],
      tips: [
        'Harvest regularly to encourage new growth',
        'Prune to prevent flowering and extend the harvest season',
      ],
      subcategories: {
        Basil: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Pinch off flowers to encourage bushier growth.',
        },
        Mint: {
          soil: 'Moist, fertile soil with pH 6.0 - 7.0',
          watering: 'Keep soil consistently moist',
          sunlight: 'Partial shade to full sun',
          notes: 'Best grown in pots to control its spread.',
        },
        Cilantro: {
          soil: 'Well-drained soil with pH 6.0 - 6.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest leaves regularly to promote continued growth.',
        },
        Oregano: {
          soil: 'Well-drained soil with pH 6.0 - 8.0',
          watering: 'Moderate, avoid overwatering',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Cut back in fall to stimulate new growth in spring.',
        },
        Parsley: {
          soil: 'Fertile, well-drained soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun to partial shade',
          notes: 'Can be grown indoors or outdoors for year-round use.',
        },
      },
    },
    RootCrops: {
      icon: <FaCarrot />,
      description: 'Nutritious root crops that are staples in many diets around the world.',
      benefits: [
        'Good source of carbohydrates and energy',
        'Rich in vitamins and minerals',
        'Versatile for various culinary uses',
      ],
      tips: [
        'Plant in loose, well-drained soil for best root development',
        'Water regularly to ensure healthy growth',
      ],
      subcategories: {
        Potatoes: {
          soil: 'Well-drained, loose soil with pH 4.8 - 5.4',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Hill soil around the base to protect developing tubers.',
        },
        SweetPotatoes: {
          soil: 'Sandy loam with pH 5.0 - 6.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Mulch to retain moisture and suppress weeds.',
        },
        Carrots: {
          soil: 'Loose, sandy loam with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Thin seedlings for proper spacing to encourage growth.',
        },
        Beets: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when roots are 1-3 inches in diameter for best flavor.',
        },
        Radishes: {
          soil: 'Well-drained soil with pH 6.0 - 7.0',
          watering: 'Keep soil moist for optimal growth',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Best planted in cooler months for quicker growth.',
        },
      },
    },
    Spices: {
      icon: <FaPepperHot />,
      description: 'Flavorful spices that enhance culinary dishes and provide health benefits.',
      benefits: [
        'Adds unique flavors to meals',
        'Contains various health benefits',
        'Rich in antioxidants and anti-inflammatory properties',
      ],
      tips: [
        'Store in a cool, dry place to maintain potency',
        'Use fresh whenever possible for maximum flavor',
      ],
      subcategories: {
        ChiliPeppers: {
          soil: 'Well-drained soil with pH 6.0 - 6.8',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when they reach desired heat level for peak flavor.',
        },
        Turmeric: {
          soil: 'Loamy, well-drained soil with pH 5.5 - 7.0',
          watering: 'Keep soil moist for healthy growth',
          sunlight: 'Partial shade to full sun',
          notes: 'Harvest roots when leaves begin to yellow for best flavor.',
        },
        Ginger: {
          soil: 'Rich, well-drained soil with pH 5.5 - 6.5',
          watering: 'Keep soil moist but not soggy',
          sunlight: 'Partial shade to full sun',
          notes: 'Harvest after 8-10 months for optimal flavor and texture.',
        },
        Cinnamon: {
          soil: 'Fertile, well-drained soil with pH 5.5 - 6.5',
          watering: '1-2 inches per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest bark from branches that are 2-3 years old for best flavor.',
        },
        Cardamom: {
          soil: 'Rich, loamy soil with pH 6.0 - 7.0',
          watering: 'Keep soil moist for healthy growth',
          sunlight: 'Partial shade to full sun',
          notes: 'Protect from frost during growth for successful yield.',
        },
      },
    },
    Oilseeds: {
      icon: <FaSeedling />,
      description: 'Healthy oilseeds that provide essential fatty acids and nutrients.',
      benefits: [
        'Rich in healthy fats and oils',
        'Good source of energy and protein',
      ],
      tips: [
        'Plant in full sun for optimal growth',
        'Avoid waterlogged soil to prevent root diseases',
      ],
      subcategories: {
        SunflowerSeeds: {
          soil: 'Well-drained soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Support tall varieties with stakes to prevent bending.',
        },
        MustardSeeds: {
          soil: 'Loamy soil with pH 5.5 - 7.0',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when seeds are firm and dry for best quality.',
        },
        SesameSeeds: {
          soil: 'Sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Plant after the last frost date for successful germination.',
        },
        FlaxSeeds: {
          soil: 'Well-drained, fertile soil with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Harvest when capsules turn brown for best results.',
        },
        Safflower: {
          soil: 'Sandy loam with pH 6.0 - 7.5',
          watering: '1 inch per week',
          sunlight: 'Full sun (6-8 hours/day)',
          notes: 'Drought-tolerant; requires minimal water for growth.',
        },
      },
    },
  };
  
  const problems = []

  const colorMap = {
    fruit: '#ffcccb',
    vegetable: '#ccffcc',
    grain: '#ffffcc',
    herb: '#e6ccff'
  }

  const cropInfo = cropDetails[crop]
  const cropType = cropInfo.type || 'unknown'
  const backgroundColor = colorMap[cropType] || '#ffffff'

  const handleViewImages = () => {
    console.log('Viewing images:', images)
  }

  const handleAnalyze = data => {
    console.log('Analyzing crop:', crop, 'Data:', data)
    setReportData(data)
    setOpenReportDialog(true)
    setDialogState(prev => ({ ...prev, analyze: false }))
  }

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false)
  }

  const handleFixIssue = data => {
    console.log('Fixing issues for crop:', crop, 'Data:', data)
    setDialogState(prev => ({ ...prev, fix: false }))
  }

  const handleRectificationClose = () => {
    setOpenRectification(false)
  }

  const handleMarkAsBad = data => {
    console.log('Marking crop as bad:', crop, 'Data:', data)
    setDialogState(prev => ({ ...prev, markBad: false }))
  }

  const handleRequestHelp = subcategory => {
    setHelpSubcategory(subcategory)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const [uploadStatus, setUploadStatus] = useState(
    cropInfo.subcategories[helpSubcategory]?.timeline?.map(() => 'incomplete') || []
  );

  const handleTimelineAnalyze = () => {
    const report = uploadStatus.map((status, index) => ({
      time: cropInfo.subcategories[cropInfo.helpSubcategory].timeline[index].time,
      status,
      error: status === 'error' ? 'Potential issue with image quality.' : '',
    }));
    setAnalysisReport(report);
    setAnalysisOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAnalysisDialogClose = () => {
    setAnalysisOpen(false);
  };

  const handleFileUpload = (index) => {
    const newStatus = [...uploadStatus];
    const isSuccess = Math.random() > 0.5; // Simulate success or failure
    newStatus[index] = isSuccess ? 'success' : 'error';
    setUploadStatus(newStatus);
    showSnackbar(isSuccess ? 'Upload successful!' : 'Upload failed. Please try again.', isSuccess ? 'success' : 'error');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseAnalysis = () => {
    setAnalysisOpen(false);
  };

  if (!cropInfo) {
    return (
      <Paper style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Typography variant='h4' color='error'>
          Crop not found
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper
      style={{
        padding: '20px',
        maxHeight: '600px',
        overflowY: 'auto',
        backgroundColor,
        width: '80%',
        margin: '0 auto'
      }}
    >
      <PhotoViewer />
      <Typography
        variant='h4'
        style={{ marginBottom: '20px', fontWeight: 'bold', color: '#0d47a1' }}
      >
        {cropInfo.icon} {crop}
      </Typography>
      <Typography
        variant='h6'
        style={{ marginBottom: '20px', color: '#424242' }}
      >
        {cropInfo.description}
      </Typography>
      <Typography
        variant='h5'
        style={{ marginBottom: '10px', color: '#388e3c' }}
      >
        Benefits:
      </Typography>
      <ul style={{ marginLeft: '20px' }}>
        {cropInfo.benefits.map(benefit => (
          <li key={benefit} style={{ fontSize: '18px' }}>
            {benefit}
          </li>
        ))}
      </ul>
      <Typography
        variant='h5'
        style={{ marginBottom: '10px', color: '#388e3c' }}
      >
        Tips:
      </Typography>
      <ul style={{ marginLeft: '20px' }}>
        {cropInfo.tips.map(tip => (
          <li key={tip} style={{ fontSize: '18px' }}>
            {tip}
          </li>
        ))}
      </ul>
      <Typography
        variant='h5'
        style={{ marginBottom: '10px', color: '#388e3c' }}
      >
        Subcategories:
      </Typography>
      <Grid container spacing={1}>
        {Object.keys(cropInfo.subcategories).map(subcategory => (
          <Grid item xs={12} sm={6} md={4} key={subcategory}>
            <Card elevation={3} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                  {subcategory}
                </Typography>
                {/* Image for the Subcategory */}
                {cropInfo.subcategories[subcategory].image && (
                  <img
                    src={cropInfo.subcategories[subcategory].image}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '150px',
                      marginBottom: '10px'
                    }}
                  />
                )}{' '}
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                  {subcategory}
                </Typography>
                <Typography variant='body1'>
                  <strong>Soil:</strong>{' '}
                  {cropInfo.subcategories[subcategory].soil}
                </Typography>
                <Typography variant='body1'>
                  <strong>Watering:</strong>{' '}
                  {cropInfo.subcategories[subcategory].watering}
                </Typography>
                <Typography variant='body1'>
                  <strong>Sunlight:</strong>{' '}
                  {cropInfo.subcategories[subcategory].sunlight}
                </Typography>
                <Typography variant='body1'>
                  <strong>Notes:</strong>{' '}
                  {cropInfo.subcategories[subcategory].notes}
                </Typography>
              </CardContent>

              {/* Action Forms */}
              <ActionForm
                open={dialogState.analyze}
                onClose={() =>
                  setDialogState(prev => ({ ...prev, analyze: false }))
                }
                onSubmit={handleAnalyze}
                actionType='Analysis'
              />
              <ActionForm
                open={dialogState.fix}
                onClose={() =>
                  setDialogState(prev => ({ ...prev, fix: false }))
                }
                onSubmit={handleFixIssue}
                actionType='Issue Fix'
              />
              <CardActions
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <IconButton
                    title='Request Help'
                    onClick={() => handleRequestHelp(subcategory)}
                  >
                    <FaQuestionCircle />
                  </IconButton>
                  <IconButton title='View Images' onClick={handleViewImages}>
                    <FaImage />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    color='secondary'
                    onClick={() =>
                      setDialogState(prev => ({ ...prev, analyze: true }))
                    }
                  >
                    <FaInfoCircle />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleMarkAsBad(subcategory)}
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ReportDialog
        open={openReportDialog}
        onClose={handleCloseReportDialog}
        data={reportData}
      />

      <IssueRectification
        open={openRectification}
        onClose={() => setOpenRectification(false)}
        problems={problems}
      />

<>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { padding: '16px' } }}
      >
        <DialogTitle style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
          Timeline for {helpSubcategory}
        </DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Timeline style={{ width: '100%' }}>
            {cropInfo.subcategories[helpSubcategory]?.timeline?.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent style={{ textAlign: 'right' }}>
                  {event.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>{event.icon}</TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.description}
                        style={{ width: '100px', height: 'auto', marginRight: '8px' }}
                      />
                    )}
                    <span>{event.description}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={() => handleFileUpload(index)}
                      style={{ marginLeft: '8px' }}
                    />
                    {uploadStatus[index] === 'success' ? (
                      <span style={{ marginLeft: '8px', color: 'green' }}>✔️</span>
                    ) : uploadStatus[index] === 'error' ? (
                      <span style={{ marginLeft: '8px', color: 'red' }}>❌</span>
                    ) : null}
                  </div>
                </TimelineContent>
              </TimelineItem>
            )) || (
              <Typography>No timeline data available for this subcategory.</Typography>
            )}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          <Button onClick={handleAnalyze} color="primary">Analyze Timeline</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={uploadStatus.includes('error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={analysisOpen}
        onClose={handleAnalysisDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Analysis Report</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {analysisReport || 'No analysis available.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnalysisDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>

    </Paper>
  )
}

export default CropDetails