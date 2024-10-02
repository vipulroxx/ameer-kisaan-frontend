import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FaLanguage } from 'react-icons/fa';

const LanguageSelector = ({ currentLang, onChange }) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel><FaLanguage /> Language</InputLabel>
      <Select value={currentLang} onChange={onChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hi">Hindi</MenuItem>
        <MenuItem value="ta">Tamil</MenuItem>
        {/* Add more languages */}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
