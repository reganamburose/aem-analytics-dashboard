import React from 'react';
import Typography from '@mui/material/Typography';
import DataTable from './DataTable';

const COLUMNS = [
  { field: 'RequisitionID', headerName: 'RequisitionID' },
  { field: 'CID', headerName: 'CID' },
  { field: 'Name', headerName: 'Name' },
  { field: 'Level', headerName: 'Level' },
  { field: 'Joining Date', headerName: 'Joining Date' },
  { field: 'Joining Month', headerName: 'Joining Month' },
  { field: 'PrimarySkills', headerName: 'PrimarySkills' },
  { field: 'Integrated Practice', headerName: 'Integrated Practice' },
  { field: 'Account', headerName: 'Account' },
];

export default function TagPipeline({ data }) {
  const rows = data.rows || [];
  return (
    <div>
      <Typography variant="h5" component="h5" sx={{ py: 2, fontWeight: 'bold' }}>
        TAG Pipeline
      </Typography>
      <DataTable columns={COLUMNS} rows={rows} pageSize={10} />
    </div>
  );
}
