import React, { useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function DataTable({ columns = [], rows = [], pageSize = 10 }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return rows || [];
    const q = query.toLowerCase();
    return (rows || []).filter((r) =>
      Object.values(r || {}).some((v) => (v || '').toString().toLowerCase().includes(q))
    );
  }, [rows, query]);

  const pageCount = Math.max(1, Math.ceil((filtered || []).length / pageSize));
  const visible = (filtered || []).slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" style={{ marginBottom: 12 }}>
        <div>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 220, maxWidth: 360 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>
          {filtered.length === 0 ? 'No results' : `Showing ${visible.length} of ${filtered.length}`}
        </div>
      </Stack>

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small" sx={{ '& .MuiTableCell-root': { fontSize: '12px' } }}>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.field} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: '12px' }}>
                  {c.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((row, ri) => (
              <TableRow key={ri} hover>
                {columns.map((c) => (
                  <TableCell key={c.field + ri}>{row[c.field] ?? ''}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack alignItems="center" sx={{ marginTop: 1, marginBottom: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, p) => setPage(p)}
          color="primary"
        />
      </Stack>
    </div>
  );
}
