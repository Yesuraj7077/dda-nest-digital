import { FC, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { Developer } from '../utils/types';

interface Props {
  initialValues?: Developer;
  onSubmit?: (dev: Developer) => void;
  mode?: 'add' | 'edit' | 'view'; // 👈 new prop
}

const DeveloperForm: FC<Props> = ({ initialValues, onSubmit, mode='add' }) => {
  
  const isView = mode === 'view';

  const [form, setForm] = useState<Developer>(
    initialValues ?? {
      name: '',
      email: '',
      skills: [],
      experience: '',
      location: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'skills' ? value.split(',') : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>


      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Auth0 User ID"
              name="userId"
              value={form.userId}
              type="text"
              inputProps={{ min: 0 }}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Skills (comma-separated)"
              name="skills"
              value={form?.skills}
              onChange={handleChange}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Experience (years)"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              type="number"
              inputProps={{ min: 0 }}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={isView}
            />
          </Grid>

          {mode !== 'view' && (
            <Grid item xs={12} textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                {mode === 'edit' ? 'Update' : 'Submit'}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default DeveloperForm;
