import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Developer } from '../utils/types';

interface DeveloperTableProps {
  developers: Developer[];
  onView: (dev: Developer) => void;
  onEdit: (dev: Developer) => void;
  onDelete: (dev: Developer) => void;
  isAdmin?: boolean;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ developers, onView, onEdit, onDelete, isAdmin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    // Mobile view: cards
    return (
      <Stack spacing={2}>
        {developers.map((dev, index) => (
          <Card key={dev._id ?? index} variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">{dev.name}</Typography>
              <Typography variant="body2">Email: {dev.email}</Typography>
              <Typography variant="body2">Skills: {dev.skills}</Typography>
              <Typography variant="body2">Location: {dev.location}</Typography>
              <Typography variant="body2">Experience: {dev.experience}</Typography>
              <Typography variant="body2">Created At: {dev.createdAt}</Typography>
              <Box mt={1}>
                <IconButton color="primary" onClick={() => onView(dev)}>
                  <VisibilityIcon />
                </IconButton>
                {isAdmin && (
                  <>
                    {/* <IconButton color="primary" onClick={() => onEdit(dev)}>
                      <EditIcon />
                    </IconButton> */}
                    <IconButton color="error" onClick={() => onDelete(dev)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  // Desktop/tablet view
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', boxShadow: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Auth ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {developers.map((dev, index) => (
              <TableRow key={dev._id ?? index}>
                <TableCell>{dev.userId}</TableCell>
                <TableCell>{dev.name}</TableCell>
                <TableCell>{dev.email}</TableCell>
                <TableCell>{dev.skills}</TableCell>
                <TableCell>{dev.location}</TableCell>
                <TableCell>{dev.experience}</TableCell>
                <TableCell>{dev.createdAt}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onView(dev)}>
                    <VisibilityIcon />
                  </IconButton>
                  {isAdmin && (
                    <>
                      {/* <IconButton color="primary" onClick={() => onEdit(dev)}>
                        <EditIcon />
                      </IconButton> */}
                      <IconButton color="error" onClick={() => onDelete(dev)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeveloperTable;
