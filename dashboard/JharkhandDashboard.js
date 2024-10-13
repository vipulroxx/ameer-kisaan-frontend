import React from 'react';
import { Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart, Agriculture, Grain, EmojiNature } from '@mui/icons-material'; // Import icons

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const paddyData = {
	labels: [
		'2007-08', '2008-09', '2009-10', '2010-11', 
		'2011-12', '2012-13', '2013-14', '2014-15', 
		'2015-16', '2016-17', '2017-18', '2018-19', 
		'2019-20', '2020-21'
	],
	datasets: [
		{
			label: 'Paddy Production (000 tonnes)',
			data: [
				3326.407, 3400.187, 1518.364, 1110.006, 
				5614.931, 3991.222, 3637.447, 4324.456, 
				2569.411, 4988.065, 5131.954, 2894.101, 
				3612.588, 5123.083
			],
			backgroundColor: 'rgba(75, 192, 192, 0.6)',
		},
	],
};
const maizeData = {
	labels: [
		'2007-08', '2008-09', '2009-10', '2010-11', 
		'2011-12', '2012-13', '2013-14', '2014-15', 
		'2016-17', '2017-18', '2018-19', '2019-20', 
		'2020-21'
	],
	datasets: [
		{
			label: 'Maize Production (000 tonnes)',
			data: [
				358.245, 304.002, 217.458, 261.715, 
				408.889, 451.693, 517.029, 384.932, 
				578.066, 596.727, 455.314, 510.928, 
				851.837
			],
			backgroundColor: 'rgba(255, 206, 86, 0.6)',
		},
	],
};
const pulsesData = {
	labels: [
		'2007-08', '2008-09', '2009-10', '2010-11', 
		'2011-12', '2012-13', '2013-14', '2014-15', 
		'2015-16', '2016-17', '2017-18', '2018-19', 
		'2019-20', '2020-21'
	],
	datasets: [
		{
			label: 'Pulses Production (000 tonnes)',
			data: [
				295.181, 280.785, 219.729, 312.422, 
				492.250, 686.219, 578.635, 597.068, 
				495.134, 300.141, 871.475, 735.223, 
				814.841, 920.838
			],
			backgroundColor: 'rgba(153, 102, 255, 0.6)',
		},
	],
};
const oilseedsData = {
	labels: [
		'2007-08', '2008-09', '2009-10', '2010-11', 
		'2011-12', '2012-13', '2013-14', '2014-15', 
		'2015-16', '2016-17', '2017-18', '2018-19', 
		'2019-20', '2020-21'
	],
	datasets: [
		{
			label: 'Oilseeds Production (000 tonnes)',
			data: [
				68.881, 73.306, 78.875, 113.660, 
				174.493, 197.235, 182.852, 180.458, 
				188.448, 21.457, 297.067, 228.491, 
				288.456, 404.762
			],
			backgroundColor: 'rgba(255, 99, 132, 0.6)',
		},
	],
};
			
// Geographical Information
const geographicalInfo = {
	area: '79.70 lakh ha',
	cultivableArea: '38 lakh ha',
	netShownArea: '25 - 26 lakh ha',
	rainfall: '1300 mm (Normal)',
	numberOfDistricts: 24,
	numberOfBlocks: 263,
	majorCrops: ['Paddy', 'Wheat', 'Maize', 'Pulses', 'Oilseeds', 'Horticultural Crops'],
	minorCrops: ['Maize', 'Arhar', 'Urad', 'Moong', 'Wheat', 'Gram', 'Mustard'],
};

// Constraints data
const constraints = [
	'Run-off loss and soil erosion',
	'Low level of irrigation',
	'Mono-cropping',
	'Cultivation of wasteland',
	'Lack of organized marketing facilities',
	'Soil acidity and poor soil condition',
	'Increase in kharif area/area expansion - Coverage of fallow land, increase in pulses, oilseed and coarse cereals area',
	'Inadequate seed',
	'Low farm mechanization',
	'Low credit/insurance',
	'Poor infrastructure for post-harvest and value addition',
];

// Achievements data
const achievements = [
	'Increase in paddy productivity (from 20 q/ha to 30 q/ha)',
	'Increase in paddy production (32 lakh ton to 44 lakh ton)',
	'Increase in area under pulses from 4.66 lakh ha to 5.90 lakh ha',
	'Increase in production under pulses from 4.12 lakh ton to 5.90 lt',
	'Increase in Rabi area from 5.92 lakh ha to 6.12 lakh ha',
	'Promotion of notified hybrid – 60000 qtl paddy seed distributed',
	'Construction of 6000 MT godown in each district',
	'Agriculture Technology Information Center (ATIC) in each block',
	'Participation of 2.400 lakh farmers of Jharkhand in Krishi Mahotsov ratha yatra from 27 May - 12 June, 2015',
	'Massive Seed treatment campaign in each block and panchayat',
	'Renovation of Govt. tank - 861 no.',
	'Construction of new pond and check dam - 1982 no.',
];

// Thrust Areas data
const thrustAreas = [
	'Soil water conservation and increase in irrigation potential',
	'Irrigation infrastructure tie-up with other departments',
	'Promotion of soil amendment for acidic soil and Soil Health Card',
	'Increase in Rabi area and promotion of solar power',
	'Area expansion in Kharif - coverage of fallow land',
	'Promotion of oilseed and pulses',
	'Enhancement of area under cashew production',
	'Rainfed horticulture and quality seed production and distribution',
	'Seed production in seed multiplication farms and seed villages',
	'Promotion of SRI and hybrid rice program',
	'Promotion of Kisan Credit Card to farmers',
	'Coverage under National Agriculture Insurance Scheme',
	'Farm mechanization (Equipment bank for custom hiring)',
];

const styles = {
  container: {
    padding: '20px',
  },
  paper: {
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  card: {
    marginBottom: '20px',
  },
  icon: {
    marginRight: '8px',
  },
};

const JharkhandDashboard = () => {
  return (
    <div style={styles.container}>
      <Typography variant="h4" align="center" style={styles.title}>
        Jharkhand Agricultural Dashboard
      </Typography>
			
      <Grid container spacing={2}>
				<Grid item xs={12} md={6}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h6">Paddy Production Over Years</Typography>
            <Bar data={paddyData} options={{ scales: { y: { beginAtZero: true } } }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h6">Maize Production Over Years</Typography>
            <Bar data={maizeData} options={{ scales: { y: { beginAtZero: true } } }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h6">Pulses Production Over Years</Typography>
            <Bar data={pulsesData} options={{ scales: { y: { beginAtZero: true } } }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h6">Oilseeds Production Over Years</Typography>
            <Bar data={oilseedsData} options={{ scales: { y: { beginAtZero: true } } }} />
          </Paper>
        </Grid>
				<Grid item xs={12} md={6}>
          <Card elevation={3} style={styles.card}>
            <CardContent>
              <Typography variant="h6" align="center">
                <Agriculture style={styles.icon} /> Key Achievements
              </Typography>
              {achievements.map((achievement, index) => (
                <Typography key={index} variant="body1" style={{ margin: '5px 0' }}>
                  • {achievement}
                </Typography>
              ))}
            </CardContent>
          </Card>
					</Grid>
					
					<Grid item xs={4} md={6}>
          <Card elevation={3} style={styles.card}>
            <CardContent>
              <Typography variant="h6" align="center">
                <Grain style={styles.icon} /> Thrust Areas
              </Typography>
              {thrustAreas.map((area, index) => (
                <Typography key={index} variant="body1" style={{ margin: '5px 0' }}>
                  • {area}
                </Typography>
              ))}
            </CardContent>
          </Card>
					</Grid>

					<Grid item xs={12} md={6}>
          <Card elevation={3} style={styles.card}>
            <CardContent>
              <Typography variant="h6" align="center">
                <EmojiNature style={styles.icon} /> Constraints
              </Typography>
              {constraints.map((constraint, index) => (
                <Typography key={index} variant="body1" style={{ margin: '5px 0' }}>
                  • {constraint}
                </Typography>
              ))}
            </CardContent>
          </Card>
					</Grid>
					
        </Grid>
    </div>
  );
};

export default JharkhandDashboard;