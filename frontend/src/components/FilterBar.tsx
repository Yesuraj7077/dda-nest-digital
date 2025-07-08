import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper
} from '@mui/material';

interface FilterBarProps {
  query: {
    search: string;
    skills: string;
    location: string;
    experience?: number;
    page: number;
  };
  setQuery: (query: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ query, setQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value, page: 1 });
  };

  const clearFilters = () => {
    setQuery({ search: '', skills: '', location: '', page: 1, experience: undefined });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by name/ skills / Auth0 UserId"
            name="search"
            value={query.search}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Filter by skill"
            name="skills"
            value={query.skills}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Filter by location"
            name="location"
            value={query.location}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Filter by Experience"
            name="experience"
            value={query.experience || ''}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={clearFilters}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
