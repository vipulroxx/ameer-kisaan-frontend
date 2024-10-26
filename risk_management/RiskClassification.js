import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Dialog } from '@mui/material';
import { FaBug, FaMoneyBillWave, FaToolbox, FaUsers, FaCloudRain, FaGlobeAsia, FaBiohazard, FaTractor, FaGavel, FaTree, FaFire, FaWater } from 'react-icons/fa';
import PestDetection from './PestDetection';
import EconomicIssues from './EconomicIssues';
import ToolsAndMachineryIssues from './ToolsAndMachineryIssues';
import LocalPeopleProblem from './LocalPeopleProblem';
import WeatherRelatedProblems from './WeatherRelatedProblems';
import SoilClimateIssues from './SoilClimateIssues';
import BiohazardIssues from './BiohazardIssues';
import BriberyIssues from './BriberyIssues'; // Import the BriberyIssues component
import VehicleIssues from './VehicleIssues'; // Import the VehicleIssues component
import WildfireRisks from './WildfireRisks'; // Import Wildfire Risks component
import ForestManagementIssues from './ForestManagementIssues'; // Import Forest Management Issues component
import NaturalCalamityIssues from './NaturalCalamityIssues'; // Import the Natural Calamity Issues component

const RiskClassification = () => {
  const [showPestDetection, setShowPestDetection] = useState(false);
  const [showEconomicIssues, setShowEconomicIssues] = useState(false);
  const [showToolsIssues, setShowToolsIssues] = useState(false);
  const [showLocalPeopleProblems, setShowLocalPeopleProblems] = useState(false);
  const [showWeatherProblems, setShowWeatherProblems] = useState(false);
  const [showSoilClimateIssues, setShowSoilClimateIssues] = useState(false);
  const [showBioHazardIssues, setShowBioHazardIssues] = useState(false);
  const [showBriberyIssues, setShowBriberyIssues] = useState(false);
  const [showVehicleIssues, setShowVehicleIssues] = useState(false); // State for Vehicle Issues dialog
  const [showNaturalCalamityIssues, setShowNaturalCalamityIssues] = useState(false); // State for Natural Calamity Issues dialog
  const [showWildfireRisks, setShowWildfireRisks] = useState(false); // State for Wildfire Risks dialog
  const [showForestManagementIssues, setShowForestManagementIssues] = useState(false); // State for Forest Management Issues dialog

  const risks = [
    { name: 'Pest Issues', icon: <FaBug />, learnMore: () => setShowPestDetection(true) },
    { name: 'Economic Issues', icon: <FaMoneyBillWave />, learnMore: () => setShowEconomicIssues(true) },
    { name: 'Tools Issues', icon: <FaToolbox />, learnMore: () => setShowToolsIssues(true) },
    { name: 'Local People Problems', icon: <FaUsers />, learnMore: () => setShowLocalPeopleProblems(true) },
    { name: 'Weather Problems', icon: <FaCloudRain />, learnMore: () => setShowWeatherProblems(true) },
    { name: 'Soil Climate Issues', icon: <FaGlobeAsia />, learnMore: () => setShowSoilClimateIssues(true) },
    { name: 'Bio Hazard Issues', icon: <FaBiohazard />, learnMore: () => setShowBioHazardIssues(true) },
    { name: 'Transport Issues', icon: <FaTractor />, learnMore: () => setShowVehicleIssues(true) }, // Add learnMore function for Vehicle Issues
    { name: 'Bribery Issues', icon: <FaGavel />, learnMore: () => setShowBriberyIssues(true) },
    { name: 'Natural Calamity Issues', icon: <FaWater />, learnMore: () => setShowNaturalCalamityIssues(true) }, // Updated for Natural Calamity Issues
    { name: 'Wildfire Risks', icon: <FaFire />, learnMore: () => setShowWildfireRisks(true) }, // Add learnMore for Wildfire Risks
    { name: 'Forest Management Issues', icon: <FaTree />, learnMore: () => setShowForestManagementIssues(true) }, // Add learnMore for Forest Management Issues
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>Risk Classification</Typography>
      <Grid container spacing={2}>
        {risks.map((risk, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" align="center">
                  {risk.icon} {risk.name}
                </Typography>
                <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={risk.learnMore}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pest Detection Dialog */}
      <Dialog open={showPestDetection} onClose={() => setShowPestDetection(false)}>
        <PestDetection onClose={() => setShowPestDetection(false)} />
      </Dialog>

      {/* Economic Issues Dialog */}
      <Dialog open={showEconomicIssues} onClose={() => setShowEconomicIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Economic Issues</Typography>
          <EconomicIssues />
          <Button onClick={() => setShowEconomicIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Tools Issues Dialog */}
      <Dialog open={showToolsIssues} onClose={() => setShowToolsIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Tools Issues</Typography>
          <ToolsAndMachineryIssues />
          <Button onClick={() => setShowToolsIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Local People Problems Dialog */}
      <Dialog open={showLocalPeopleProblems} onClose={() => setShowLocalPeopleProblems(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Local People Problems</Typography>
          <LocalPeopleProblem />
          <Button onClick={() => setShowLocalPeopleProblems(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Weather Related Problems Dialog */}
      <Dialog open={showWeatherProblems} onClose={() => setShowWeatherProblems(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Weather Related Problems</Typography>
          <WeatherRelatedProblems />
          <Button onClick={() => setShowWeatherProblems(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Soil Climate Issues Dialog */}
      <Dialog open={showSoilClimateIssues} onClose={() => setShowSoilClimateIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Soil Climate Issues</Typography>
          <SoilClimateIssues />
          <Button onClick={() => setShowSoilClimateIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Biohazard Issues Dialog */}
      <Dialog open={showBioHazardIssues} onClose={() => setShowBioHazardIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Biohazard Issues</Typography>
          <BiohazardIssues />
          <Button onClick={() => setShowBioHazardIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Vehicle Issues Dialog */}
      <Dialog open={showVehicleIssues} onClose={() => setShowVehicleIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Vehicle Issues</Typography>
          <VehicleIssues /> {/* Render the VehicleIssues component */}
          <Button onClick={() => setShowVehicleIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Bribery Issues Dialog */}
      <Dialog open={showBriberyIssues} onClose={() => setShowBriberyIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Bribery Issues</Typography>
          <BriberyIssues />
          <Button onClick={() => setShowBriberyIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Natural Calamity Issues Dialog */}
      <Dialog open={showNaturalCalamityIssues} onClose={() => setShowNaturalCalamityIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Natural Calamity Issues</Typography>
          <NaturalCalamityIssues /> {/* Render the Natural Calamity Issues component */}
          <Button onClick={() => setShowNaturalCalamityIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Wildfire Risks Dialog */}
      <Dialog open={showWildfireRisks} onClose={() => setShowWildfireRisks(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Wildfire Risks</Typography>
          <WildfireRisks />
          <Button onClick={() => setShowWildfireRisks(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>

      {/* Forest Management Issues Dialog */}
      <Dialog open={showForestManagementIssues} onClose={() => setShowForestManagementIssues(false)} maxWidth="md" fullWidth>
        <Box p={2}>
          <Typography variant="h6" align="center">Forest Management Issues</Typography>
          <ForestManagementIssues />
          <Button onClick={() => setShowForestManagementIssues(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default RiskClassification;
