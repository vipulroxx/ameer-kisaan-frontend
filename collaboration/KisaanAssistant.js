import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Chip, ToggleButton, ToggleButtonGroup, Alert, CircularProgress,
} from '@mui/material';
import { assistantApi } from '../services/api';

const SUGGESTIONS = [
  'What soil and watering does wheat need?',
  'How do I manage brown planthopper in rice?',
  'Which government schemes can help farmers?',
  'What should I do when humidity is very high?',
];

const KisaanAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('en');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    assistantApi.history()
      .then(({ items }) => setMessages(items.reverse().flatMap((i) => [
        { role: 'user', text: i.question },
        { role: 'assistant', text: i.answer, grounded: i.grounded, sources: i.sources.map((t) => ({ title: t })) },
      ])))
      .catch(() => {});
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const ask = async (q) => {
    const text = (q ?? question).trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setQuestion('');
    setBusy(true);
    setError('');
    try {
      const res = await assistantApi.ask(text, language);
      setMessages((m) => [...m, { role: 'assistant', text: res.answer, grounded: res.grounded, sources: res.sources }]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
        <Typography variant="h5">Kisaan AI</Typography>
        <ToggleButtonGroup size="small" exclusive value={language} onChange={(e, v) => v && setLanguage(v)}>
          <ToggleButton value="en">English</ToggleButton>
          <ToggleButton value="hi">हिन्दी</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Answers come only from the Ameer Kisaan crop, pest, weather and scheme guides, with the sources shown.
        Always confirm chemical use with your local agriculture officer.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, height: 380, overflowY: 'auto', backgroundColor: '#fafafa' }}>
        {messages.length === 0 && (
          <Box display="flex" gap={1} flexWrap="wrap">
            {SUGGESTIONS.map((s) => <Chip key={s} label={s} onClick={() => ask(s)} clickable />)}
          </Box>
        )}
        {messages.map((m, i) => (
          <Box key={i} display="flex" justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'} mb={1.5}>
            <Box sx={{
              maxWidth: '80%', p: 1.5, borderRadius: 2, whiteSpace: 'pre-wrap',
              backgroundColor: m.role === 'user' ? 'primary.main' : '#fff', color: m.role === 'user' ? '#fff' : 'inherit',
              border: m.role === 'user' ? 'none' : '1px solid #e0e0e0',
            }}>
              <Typography variant="body2">{m.text}</Typography>
              {m.role === 'assistant' && m.sources?.length > 0 && (
                <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
                  {m.sources.map((s, j) => <Chip key={j} size="small" variant="outlined" label={`[${j + 1}] ${s.title}`} />)}
                </Box>
              )}
            </Box>
          </Box>
        ))}
        {busy && <CircularProgress size={20} />}
        <div ref={endRef} />
      </Paper>

      {error && <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>{error}</Alert>}
      <Box component="form" display="flex" gap={1} mt={2} onSubmit={(e) => { e.preventDefault(); ask(); }}>
        <TextField fullWidth size="small" placeholder="Ask about your crops..." value={question}
          onChange={(e) => setQuestion(e.target.value)} inputProps={{ maxLength: 1000 }} />
        <Button type="submit" variant="contained" disabled={busy || !question.trim()}>Ask</Button>
      </Box>
    </Box>
  );
};

export default KisaanAssistant;
