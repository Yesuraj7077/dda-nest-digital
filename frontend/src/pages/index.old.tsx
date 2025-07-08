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

const Dashboard = () => {
   const {user, isAdmin, isAuthenticated, loading}=useAuth()
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [query, setQuery] = useState({ search: '', skills: '', location: '', page: 1 });
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete' | 'add'>('view');
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);


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

  const openModal = (dev: Developer | null, mode: 'view' | 'edit' | 'delete' | 'add') => {
    setSelectedDev(dev);
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDev(null);
  };

  const handleSubmit = async ( dev: Developer) => {
    
    const mode = dev.userId ? 'edit' : 'add';
  
      if (mode  === 'edit') {
    
        try {
            await api.put(`${apiUrl}/developers/${dev.userId}`, dev);
            
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // setError(error.response?.data || error.message);
              console.log()
            } else {
              console.error(' Unexpected error:', error);
            }
          }

      } else {
          console.log("dev:", dev);
        await api.post(`${apiUrl}/developers`, dev);
      }
    // });

    closeModal();
    setQuery({ ...query });
  };

  const handleDelete = async ( dev: Developer) => {

    try {
             await api.delete(`${apiUrl}/developers/${dev.userId}`);
            
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // setError(error.response?.data || error.message);
              console.log()
            } else {
              console.error(' Unexpected error:', error);
            }
          }

    closeModal();
    setQuery({ ...query }); 
  };

  return (
    <Container maxWidth="lg">
     {/* {error && <div className="error">{error?.error}</div>} */}

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
        <DeveloperTable
          developers={developers}
          onView={(dev) => openModal(dev, 'view')}
          onEdit={(dev) => openModal(dev, 'edit')}

          onDelete={(dev) => openModal(dev, 'delete')}
            isAdmin={isAdmin}
        />
        <Pagination currentPage={query.page} totalPages={totalPages} setQuery={setQuery} />
      </Grid>

    

      <DeveloperModal
        open={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        developer={selectedDev}

        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Container>
  );
};
//export default Dashboard;
export default withAuth(Dashboard);

