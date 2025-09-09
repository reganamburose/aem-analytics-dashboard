import React from 'react';
import Typography from '@mui/material/Typography';
import DataTable from './DataTable';

const COLUMNS = [
  { field: 'Account Name', headerName: 'Account Name' },
  { field: 'Competency', headerName: 'Competency' },
  { field: 'Candidate ID', headerName: 'Candidate ID' },
  { field: 'Candidate Name', headerName: 'Candidate Name' },
  { field: 'Primary Skill', headerName: 'Primary Skill' },
  { field: 'Level of Hire', headerName: 'Level of Hire' },
  { field: 'Notice Period', headerName: 'Notice Period' },
  { field: 'Offer RR', headerName: 'Offer RR' },
];

export default function OfferMapping({ data }) {
  const rows = data.rows || [];
  return (
    <div>
      <Typography variant="h5" component="h5" sx={{ py: 2, fontWeight: 'bold' }}>
        Offer mapping
      </Typography>
      <DataTable columns={COLUMNS} rows={rows} pageSize={10} />
    </div>
  );
}
