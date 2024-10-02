import React, { useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Dialog, Button, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageIcon from '@mui/icons-material/Image';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import BugReportIcon from '@mui/icons-material/BugReport';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CropTimeline = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = [
    { name: 'Week 1', Growth: 10 },
    { name: 'Week 2', Growth: 20 },
    { name: 'Week 3', Growth: 15 },
    { name: 'Week 4', Growth: 25 },
    { name: 'Week 5', Growth: 30 },
    { name: 'Week 6', Growth: 40 },
  ];

  return (
    <div>
      <Timeline>
        {/* Planting Timeline Item */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <IconButton title="View Images">
                  <ImageIcon />
                </IconButton>
                <IconButton title="Analyze">
                  <AnalyticsIcon />
                </IconButton>
                <IconButton title="Fix Issue">
                  <BugReportIcon />
                </IconButton>
                <IconButton title="Mark as Bad">
                  <ThumbDownIcon />
                </IconButton>
              </div>
              <span>Planting</span>
            </div>
          </TimelineContent>
        </TimelineItem>

        {/* Growth Phase Timeline Item */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <IconButton title="View Images">
                  <ImageIcon />
                </IconButton>
                <IconButton title="Analyze">
                  <AnalyticsIcon />
                </IconButton>
                <IconButton title="Fix Issue">
                  <BugReportIcon />
                </IconButton>
                <IconButton title="Mark as Bad">
                  <ThumbDownIcon />
                </IconButton>
              </div>
              <span>Growth Phase</span>
            </div>
          </TimelineContent>
        </TimelineItem>

        {/* Get Help Timeline Item */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpen} title="Get Help">
                  <HelpOutlineIcon />
									
                </IconButton>
                Get Help
              </span>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <div style={{ padding: '20px' }}>
          <h2>Growth Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Growth" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CropTimeline;