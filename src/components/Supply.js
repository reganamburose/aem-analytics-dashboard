import React from 'react';
import Typography from '@mui/material/Typography';
import DataTable from './DataTable';

const COLUMNS = [
  { field: 'Associate ID', headerName: 'Associate ID' },
  { field: 'Associate Name', headerName: 'Associate Name' },
  { field: 'Grade', headerName: 'Grade' },
  { field: 'Competency Cluster', headerName: 'Competency Cluster' },
  { field: 'Competency', headerName: 'Competency' },
  { field: 'Skill Category', headerName: 'Skill Category' },
  { field: 'TSC Grouping', headerName: 'TSC Grouping' },
  { field: 'Remarks', headerName: 'Remarks' },
  { field: "SO# Details", headerName: "SO# Details" },
  { field: "Associate's current Department", headerName: "Associate's current Department" },
  { field: 'Allocation Start Date', headerName: 'Allocation Start Date' },
  { field: 'Ageing', headerName: 'Ageing' },
  { field: 'Releasing Project Name', headerName: 'Releasing Project Name' },
];

export default function Supply({ data }) {
  const rows = data.rows || [];
  return (
    <div>
      <Typography variant="h5" component="h5" sx={{ py: 2, fontWeight: 'bold' }}>
        Supply
      </Typography>
      <DataTable columns={COLUMNS} rows={rows} pageSize={10} />
    </div>
  );
}
