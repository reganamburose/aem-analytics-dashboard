import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../src/styles/style.scss';
import Demand from './components/Demand';
import Supply from './components/Supply';
import TagPipeline from './components/TagPipeline';
import OfferMapping from './components/OfferMapping';

const SHEET_ID = '11aXth9WfMX-tuJIaanqYD7tI5jxE00kIRQRIQQT1c0U';

const OPTIONS = [
  { key: 'Demand', label: 'Demand' },
  { key: 'Supply', label: 'Supply' },
  { key: 'TAG Pipeline', label: 'TAG Pipeline' },
  { key: 'Offer mapping', label: 'Offer mapping' },
];

function parseGviz(text) {
  const m = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\)/);
  let jsonText = null;
  if (m) {
    jsonText = m[1];
  } else {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) jsonText = text.slice(start, end + 1);
  }

  if (!jsonText) {
    const snippet = text ? text.slice(0, 800) : '';
    throw new Error('Unexpected GViz response (not JSON). Response snippet: ' + snippet);
  }

  let obj;
  try {
    obj = JSON.parse(jsonText);
  } catch (err) {
    const snippet = jsonText.slice(0, 800);
    throw new Error('Failed to parse GViz JSON. Snippet: ' + snippet + ' --- ' + err.message);
  }
  const cols = (obj.table.cols || []).map((c) => (c.label || c.id || '').toString());
  const rows = (obj.table.rows || []).map((r) => {
    const out = {};
    (r.c || []).forEach((cell, i) => {
      const key = cols[i] || `col_${i}`;
      out[key] = cell ? cell.v : null;
    });
    return out;
  });
  return { cols, rows };
}

async function fetchSheetJson(sheetName) {
  const url = `/google-sheets/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const text = await res.text();
  // Quick heuristic: if the response looks like HTML, it's likely a login/redirect page
  const t = text.trim();
  if (t.startsWith('<') || /<html|<!doctype html/i.test(t)) {
    const snippet = t.slice(0, 800);
    throw new Error('Google Sheets returned HTML (likely a login page). Make sure the sheet is public. Snippet: ' + snippet);
  }
  return parseGviz(text);
}

function App() {
  const [selected, setSelected] = useState('Demand');
  const [data, setData] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchSheetJson(selected)
      .then((d) => {
        if (mounted) setData(d);
      })
      .catch((err) => {
        if (mounted) setError(err.message || String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, [selected]);

  const renderComponent = () => {
    const props = { data };
    switch (selected) {
      case 'Demand':
        return <Demand {...props} />;
      case 'Supply':
        return <Supply {...props} />;
      case 'TAG Pipeline':
        return <TagPipeline {...props} />;
      case 'Offer mapping':
        return <OfferMapping {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Box
        className="app-header"
        sx={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          borderRadius: 0,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={'bold'}>
          AEM Analytics Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5',  py: 1.5, }}>
        <Paper sx={{ bgcolor: '#f5f5f5', px: 2, py: 1.5, borderRadius: 1, width: '100%', maxWidth: 520 }} elevation={0}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="sheet-select-label">Select sheet</InputLabel>
              <Select
                labelId="sheet-select-label"
                id="sheetSelect"
                value={selected}
                label="Select sheet"
                onChange={(e) => setSelected(e.target.value)}
                sx={{ fontSize: '0.875rem' }}
                MenuProps={{
                  PaperProps: { sx: { '& .MuiMenuItem-root': { fontSize: '0.875rem' } } },
                }}
              >
                {OPTIONS.map((o) => (
                  <MenuItem key={o.key} value={o.key} sx={{ fontSize: '0.875rem' }}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Box>

      <div style={{ marginTop: 12 }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress color="inherit" />
            <Typography variant="subtitle1">Loading {selected}...</Typography>
          </Stack>
        </Backdrop>

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && renderComponent()}
      </div>
    </div>
  );
}

export default App;
