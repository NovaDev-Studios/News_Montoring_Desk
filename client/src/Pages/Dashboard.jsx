import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Chip,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ArrowUpward as PositiveIcon,
  ArrowDownward as NegativeIcon,
  TrendingFlat as NeutralIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Mock News Data
const mockNews = [
  { id: 1, title: 'Stock Market Reaches All-Time High', category: 'Business', sentiment: 'Positive', date: '2024-05-01', source: 'Financial Times', views: 15432 },
  { id: 2, title: 'Earthquake Hits Northern Regions', category: 'Disaster', sentiment: 'Negative', date: '2024-05-10', source: 'BBC News', views: 28765 },
  { id: 3, title: 'PM Announces New Education Policy', category: 'Politics', sentiment: 'Neutral', date: '2024-05-15', source: 'Dawn News', views: 12345 },
  { id: 4, title: 'Pakistan Wins Cricket Series', category: 'Sports', sentiment: 'Positive', date: '2024-05-20', source: 'ESPN', views: 34567 },
  { id: 5, title: 'Inflation Rate Rises to 30%', category: 'Economy', sentiment: 'Negative', date: '2024-05-25', source: 'Reuters', views: 23456 },
  { id: 6, title: 'Tech Giant Launches New Smartphone', category: 'Technology', sentiment: 'Positive', date: '2024-05-05', source: 'TechCrunch', views: 18976 },
  { id: 7, title: 'Climate Change Conference Concludes', category: 'Environment', sentiment: 'Neutral', date: '2024-05-18', source: 'The Guardian', views: 15678 },
  { id: 8, title: 'New Medical Breakthrough Announced', category: 'Health', sentiment: 'Positive', date: '2024-05-22', source: 'Medical News', views: 20987 }
];

const COLORS = {
  Positive: '#4CAF50',
  Negative: '#F44336',
  Neutral: '#FFC107'
};

const NewsMonitoringDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setTimeout(() => {
          setNews(mockNews);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter news based on search and filters
  const filteredNews = news.filter(item => {
    const searchMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const sentimentMatch = sentimentFilter === 'All' || item.sentiment === sentimentFilter;
    const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
    const itemDate = new Date(item.date);
    const startDateMatch = !dateRange.start || itemDate >= new Date(dateRange.start);
    const endDateMatch = !dateRange.end || itemDate <= new Date(dateRange.end);

    return searchMatch && sentimentMatch && categoryMatch && startDateMatch && endDateMatch;
  });

  // Prepare data for charts
  const sentimentData = [
    { name: 'Positive', value: news.filter(n => n.sentiment === 'Positive').length },
    { name: 'Negative', value: news.filter(n => n.sentiment === 'Negative').length },
    { name: 'Neutral', value: news.filter(n => n.sentiment === 'Neutral').length }
  ];

  const categoryData = [...new Set(news.map(n => n.category))].map(category => ({
    name: category,
    Positive: news.filter(n => n.category === category && n.sentiment === 'Positive').length,
    Negative: news.filter(n => n.category === category && n.sentiment === 'Negative').length,
    Neutral: news.filter(n => n.category === category && n.sentiment === 'Neutral').length
  }));

  const trendData = [...new Set(news.map(n => n.date))]
    .sort()
    .map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Positive: news.filter(n => n.date === date && n.sentiment === 'Positive').length,
      Negative: news.filter(n => n.date === date && n.sentiment === 'Negative').length,
      Neutral: news.filter(n => n.date === date && n.sentiment === 'Neutral').length
    }));

  const categories = ['All', ...new Set(news.map(n => n.category))];
  const sentiments = ['All', 'Positive', 'Negative', 'Neutral'];

  const columns = [
    {
      field: 'title',
      headerName: 'News Title',
      flex: 2,
      minWidth: 250,
      renderCell: (params) => (
        <Typography variant="body1" fontWeight={500} noWrap>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          variant="outlined" 
          size="small"
          sx={{ 
            width: '100%',
            maxWidth: '150px',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        />
      )
    },
    {
      field: 'sentiment',
      headerName: 'Sentiment',
      flex: 1.2,
      minWidth: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.value === 'Positive' && <PositiveIcon sx={{ color: COLORS.Positive, fontSize: '18px' }} />}
          {params.value === 'Negative' && <NegativeIcon sx={{ color: COLORS.Negative, fontSize: '18px' }} />}
          {params.value === 'Neutral' && <NeutralIcon sx={{ color: COLORS.Neutral, fontSize: '18px' }} />}
          <Typography sx={{ 
            color: params.value === 'Positive' ? COLORS.Positive :
                   params.value === 'Negative' ? COLORS.Negative :
                   COLORS.Neutral,
            fontWeight: 600,
            fontSize: '0.875rem'
          }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 100,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'source',
      headerName: 'Source',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'views',
      headerName: 'Views',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography color="text.secondary" variant="body2">
          {params.value.toLocaleString()}
        </Typography>
      )
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          News Monitoring Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={4}>
          Comprehensive analysis of news trends and sentiment
        </Typography>

        {/* Filters Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Filters
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search news..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sentiment</InputLabel>
                <Select
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                  label="Sentiment"
                >
                  {sentiments.map(s => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  {categories.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <DatePicker
                label="Start Date"
                value={dateRange.start}
                onChange={(newValue) => setDateRange(prev => ({ ...prev, start: newValue }))}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <DatePicker
                label="End Date"
                value={dateRange.end}
                onChange={(newValue) => setDateRange(prev => ({ ...prev, end: newValue }))}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setSentimentFilter('All');
                  setCategoryFilter('All');
                  setDateRange({ start: null, end: null });
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

            {/* Data Grid Section */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            News Articles ({filteredNews.length})
          </Typography>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={filteredNews}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                  padding: '8px 16px',
                  fontSize: '0.875rem'
                },
                '& .MuiDataGrid-virtualScroller': {
                  overflowX: 'hidden'
                }
              }}
              components={{
                NoRowsOverlay: () => (
                  <Box sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                  }}>
                    <Typography color="textSecondary">
                      No news articles found matching your filters
                    </Typography>
                  </Box>
                )
              }}
            />
          </Box>
        </Paper>

        <br/>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Sentiment Pie Chart */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '400px', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Sentiment Distribution
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="110%" height="90%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} articles`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          {/* Sentiment by Category Bar Chart */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '400px', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Sentiment by Category
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="103%" height="90%">
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} articles`, 'Count']}
                    />
                    <Legend />
                    <Bar dataKey="Positive" stackId="a" fill={COLORS.Positive} name="Positive" />
                    <Bar dataKey="Neutral" stackId="a" fill={COLORS.Neutral} name="Neutral" />
                    <Bar dataKey="Negative" stackId="a" fill={COLORS.Negative} name="Negative" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          {/* Trends Line Chart */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '400px', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Sentiment Trends
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="102%" height="90%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} articles`, 'Count']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Positive" 
                      stroke={COLORS.Positive} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Neutral" 
                      stroke={COLORS.Neutral} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Negative" 
                      stroke={COLORS.Negative} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>
        </Grid>

      </Box>
    </LocalizationProvider>
  );
};

export default NewsMonitoringDashboard;