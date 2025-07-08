'use client';
import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  Button,
  Container
} from '@mui/material';

import DeveloperTable from '../components/DeveloperTable';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import DeveloperModal from '../components/DeveloperModal';
import { Developer } from '../utils/types';
import api from '../utils/api';
import axios from 'axios';
import React from 'react';
import { useAuth } from 'src/context/AuthContext';
import withAuth from 'src/pages/withAuth';
import {  DeveloperModalProvider, useDeveloperModal } from 'src/context/ModalContext';


const Dashboard = () => {
  const { openModal } = useDeveloperModal();
   const {user, isAdmin, isAuthenticated, loading}=useAuth()
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [query, setQuery] = useState({ search: '', skills: '', location: '', page: 1 });
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState();


const apiUrl = process.env.API_URL

const fetchDevelopers = useCallback(async () => {
  const params = new URLSearchParams({
    ...query,
    page: query.page.toString(),
  }).toString();

  try {
    const res = await api.get(`${apiUrl}/developers?${params}`);
    const data = res.data;
    setDevelopers(data?.docs);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error('Error fetching developers:', error);
  }
}, [query, apiUrl]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return (
    <Container maxWidth="lg">
     {/* {error && <div className="error">{error?.error}</div>} */}
 
     {isAdmin ? 'Welcome Admin' : 'Welcome User'}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <FilterBar query={query} setQuery={setQuery} />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(null, 'add')}
        >
          Add Profile
        </Button>
      </Box>

      <Grid container spacing={2}>
        <DeveloperModalProvider setQuery={setQuery} >
          <DeveloperTable
          developers={developers}
          onView={(dev) => openModal(dev, 'view')}
          onEdit={(dev) => openModal(dev, 'edit')}

          onDelete={(dev) => openModal(dev, 'delete')}
            isAdmin={isAdmin}
        />
          <Pagination currentPage={query.page} totalPages={totalPages} setQuery={setQuery} />
        </DeveloperModalProvider>
      </Grid>

    

    </Container>
  );
};
//export default Dashboard;
export default Dashboard;

