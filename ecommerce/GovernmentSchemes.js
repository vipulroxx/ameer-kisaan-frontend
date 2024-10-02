import React from 'react';
import { Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';

const schemes = [
  {
    title: "National Horticulture Board",
    description: "Official site for horticulture resources and schemes.",
    link: "https://www.nhb.gov.in",
  },
  {
    title: "Agriculture Welfare",
    description: "Information on agricultural welfare schemes.",
    link: "https://agriwelfare.gov.in",
  },
  {
    title: "Ministry of Agriculture & Farmers Welfare",
    description: "Website of the Ministry of Agriculture.",
    link: "https://www.india.gov.in/website-ministry-agriculture-farmers-welfare",
  },
  {
    title: "Data.gov.in - Agriculture Sector",
    description: "Open data portal for agriculture-related datasets.",
    link: "https://www.data.gov.in/catalogs?sector=Agriculture",
  },
  {
    title: "Ministry of Food Processing Industries",
    description: "Resources and schemes for food processing industries.",
    link: "https://www.mofpi.gov.in",
  },
  {
    title: "PM India Webcast",
    description: "Live webcasts of various government initiatives.",
    link: "https://pmindiawebcast.nic.in",
  },
];

const GovernmentSchemes = () => {
  return (
    <Container sx={{ backgroundColor: '#f9f9f9', padding: 4, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Government Schemes & Resources
      </Typography>
      <Grid container spacing={2}>
        {schemes.map((scheme, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{scheme.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {scheme.description}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" href={scheme.link} target="_blank" sx={{ marginBottom: 2 }}>
                Learn More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GovernmentSchemes;
