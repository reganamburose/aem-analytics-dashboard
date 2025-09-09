import React from 'react';
import Typography from '@mui/material/Typography';
import DataTable from './DataTable';

const COLUMNS = [
  { field: 'Unique ID', headerName: 'Unique ID' },
  { field: 'Parent Customer', headerName: 'Parent Customer' },
  { field: 'Vertical', headerName: 'Vertical' },
  { field: 'SO GRADE', headerName: 'SO GRADE' },
  { field: 'Requirement Start Date', headerName: 'Requirement Start Date' },
  { field: 'Competency', headerName: 'Competency' },
  { field: 'Primary Skills', headerName: 'Primary Skills' },
  { field: 'Status Grp', headerName: 'Status Grp' },
  { field: 'Remarks', headerName: 'Remarks' },
  { field: 'EDL', headerName: 'EDL' },
  { field: 'Actionable', headerName: 'Actionable' },
  { field: 'Status', headerName: 'Status' },
  { field: 'Fulfilment Type', headerName: 'Fulfilment Type' },
  { field: 'Fulfilment Channel', headerName: 'Fulfilment Channel' },
  { field: 'Project Type', headerName: 'Project Type' },
  { field: "Associate Fulfilled against the SO", headerName: "Associate Fulfilled against the SO" },
  { field: 'Action Date', headerName: 'Action Date' },
  { field: 'SO Billability', headerName: 'SO Billability' },
  { field: 'Billability Start date', headerName: 'Billability Start date' },
];

export default function Demand({ data }) {
  const rows = data.rows || [];
  return (
    <div>
      <Typography variant="h5" component="h5" sx={{ py: 2, fontWeight: 'bold' }}>
        Demand
      </Typography>
      <DataTable columns={COLUMNS} rows={rows} pageSize={10} />
    </div>
  );
}
