import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography, Dialog } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();

      newRecognition.continuous = false; 
      newRecognition.interimResults = false; 
      newRecognition.lang = 'en-IN'; // Change as needed to 'hi-IN' for Hindi or 'en-US' for US English

      newRecognition.onresult = (event) => {
        const result = event.results[event.results.length - 1]; // Get the latest result
        if (result.isFinal) {
          console.log('Recognized:', result[0].transcript); // Debugging output
          setTranscript(result[0].transcript);
        }
      };

      newRecognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        if (event.error === 'not-allowed') {
          alert("Microphone access denied. Please allow microphone permissions.");
        }
      };

      newRecognition.onend = () => {
        setIsListening(false);
        setDialogOpen(false);
      };

      setRecognition(newRecognition);
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  }, []);

  const handleStart = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
      setDialogOpen(true);
    }
  };

  const handleStop = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleReset = () => {
    setTranscript('');
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Tooltip title="Start Voice Command">
          <IconButton onClick={handleStart} style={{ margin: '0 10px' }}>
            <MicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Stop Voice Command">
          <IconButton onClick={handleStop} style={{ margin: '0 10px' }}>
            <StopIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset Voice Command">
          <IconButton onClick={handleReset} style={{ margin: '0 10px' }}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog open={dialogOpen}>
        <Box padding={2}>
          <Typography variant="h6">Transcribing...</Typography>
          <Typography variant="body1">
            Recognized Speech: {transcript || "No speech recognized yet."}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default VoiceCommand;
