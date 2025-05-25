import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import { Download, PictureAsPdf, TableChart } from '@mui/icons-material';
import { styled } from '@mui/system';

// Mock API data
const mockApiData = {
  reports: [
    { id: 1, title: 'Breaking News 1', sentiment: 'Positive', category: 'Politics', date: '2025-02-08', status: 'processed' },
    { id: 2, title: 'Tech Update', sentiment: 'Neutral', category: 'Technology', date: '2025-02-07', status: 'pending' },
    { id: 3, title: 'Sports Highlight', sentiment: 'Negative', category: 'Sports', date: '2025-02-06', status: 'failed' }
  ]
};

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: theme.palette.mode === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
    : '0 4px 6px rgba(0, 0, 0, 0.3)',
  marginBottom: theme.spacing(4)
}));

const StatusChip = styled(Chip)(({ status, theme }) => {
  const statusColors = {
    processed: { bg: theme.palette.success.light, text: theme.palette.success.dark },
    pending: { bg: theme.palette.warning.light, text: theme.palette.warning.dark },
    failed: { bg: theme.palette.error.light, text: theme.palette.error.dark }
  };

  return {
    backgroundColor: statusColors[status]?.bg || theme.palette.grey[300],
    color: statusColors[status]?.text || theme.palette.grey[800],
    fontWeight: 'bold',
    minWidth: '100px'
  };
});

const NewsMonitoringDesk = () => {
  const [format, setFormat] = useState('pdf');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        // const response = await fetch('your-api-endpoint/reports');
        // const data = await response.json();
        
        setTimeout(() => {
          setData(mockApiData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        showSnackbar('Failed to load report data', 'error');
      }
    };

    fetchData();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleExport = () => {
    // In a real app, this would call your API to generate the report
    showSnackbar(`Generating ${format.toUpperCase()} report...`, 'info');
    
    // Simulate report generation
    setTimeout(() => {
      showSnackbar(`${format.toUpperCase()} report generated successfully!`, 'success');
      // Here you would typically download the file
      // For demo purposes, we're just showing a success message
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        News Monitoring Desk - Reports & Data Export
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Generate customizable reports in PDF or CSV format.
      </Typography>

      <StyledCard>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Select Report Format:
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            row
            aria-label="report format"
            name="report-format"
            value={format}
            onChange={handleFormatChange}
          >
            <FormControlLabel
              value="pdf"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PictureAsPdf sx={{ mr: 1 }} />
                  <span>PDF</span>
                </Box>
              }
            />
            <FormControlLabel
              value="csv"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TableChart sx={{ mr: 1 }} />
                  <span>CSV</span>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExport}
            disabled={loading}
            sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
          >
            Generate Report
          </Button>
        </Box>
      </StyledCard>

      <StyledCard>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Report Data:
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="report data table">
              <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sentiment</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.reports.map((report) => (
                  <TableRow
                    key={report.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.sentiment}
                        sx={{
                          backgroundColor:
                            report.sentiment === 'Positive'
                              ? '#e8f5e9'
                              : report.sentiment === 'Negative'
                              ? '#ffebee'
                              : '#e3f2fd',
                          color:
                            report.sentiment === 'Positive'
                              ? '#2e7d32'
                              : report.sentiment === 'Negative'
                              ? '#c62828'
                              : '#1565c0'
                        }}
                      />
                    </TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <StatusChip label={report.status} status={report.status.toLowerCase()} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </StyledCard>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsMonitoringDesk;