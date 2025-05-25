import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Card, 
  CardContent, 
  Typography, 
  Divider,
  LinearProgress
} from '@mui/material';
// import axios from 'axios'; // Uncomment when backend ready

// 🔸 Static asset data for News Monitoring Desk
const mockAssets = [
  { id: 1, title: 'Camera', category: 'Electronics', location: 'News Monitoring Desk', assignee: 'Ali', status: 'in use' },
  { id: 2, title: 'Tripod', category: 'Accessories', location: 'News Monitoring Desk', assignee: 'Sara', status: 'available' },
  { id: 3, title: 'Microphone', category: 'Electronics', location: 'News Monitoring Desk', assignee: '-', status: 'under repair' },
  { id: 4, title: 'Monitor', category: 'Electronics', location: 'News Monitoring Desk', assignee: 'Hamza', status: 'in use' },
];

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔌 Integration Ready API Fetch (uncomment when using API)
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // const response = await axios.get('/api/assets/news-monitoring-desk');
        // setAssets(response.data);

        // Static data for now
        setTimeout(() => {
          setAssets(mockAssets);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  // 🔢 Card Stats (calculated from assets)
  const totalAssets = assets.length;
  const availableAssets = assets.filter(a => a.status === 'available').length;
  const inUseAssets = assets.filter(a => a.status === 'in use').length;
  const underRepairAssets = assets.filter(a => a.status === 'under repair').length;

  const getPercentage = (count) => totalAssets ? Math.round((count / totalAssets) * 100) : 0;

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'assignee', headerName: 'Assignee', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h4" component="h1">
          Asset Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Overview of News Monitoring Desk assets
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Assets', count: totalAssets, percent: 100, color: '#28a745' },
          { title: 'Available', count: availableAssets, percent: getPercentage(availableAssets), color: '#17a2b8' },
          { title: 'In Use', count: inUseAssets, percent: getPercentage(inUseAssets), color: '#ffc107' },
          { title: 'Under Repair', count: underRepairAssets, percent: getPercentage(underRepairAssets), color: '#dc3545' }
        ].map((stat, idx) => (
          <Card key={idx} className="shadow" style={{ borderRadius: '10px' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {stat.title}
              </Typography>
              <div className="flex items-end justify-between">
                <Typography variant="h4">{stat.count}</Typography>
                <Typography variant="body2" style={{ color: stat.color }}>
                  {stat.percent}%
                </Typography>
              </div>
              <LinearProgress 
                variant="determinate" 
                value={stat.percent} 
                sx={{
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: '#e9ecef',
                  '& .MuiLinearProgress-bar': { backgroundColor: stat.color }
                }}
                style={{ marginTop: 12 }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Divider style={{ margin: '24px 0' }} />

      {/* Recent Assets Table */}
      <div>
        <Typography variant="h5" gutterBottom>
          Recent Assets
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          From News Monitoring Desk
        </Typography>

        <div className="bg-white rounded-lg shadow">
          <DataGrid
            rows={assets}
            columns={columns}
            loading={loading}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e9ecef',
                fontSize: '1rem',
                padding: '12px 16px'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e9ecef',
                fontSize: '1rem'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 600
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #e9ecef',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
