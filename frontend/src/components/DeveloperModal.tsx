import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import DeveloperForm from './DeveloperForm';
import { Developer } from '../utils/types';

type Mode = 'add' | 'view' | 'edit' | 'delete';

interface DeveloperModalProps {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  developer: Developer | null;
  onSubmit?: (dev: Developer) => void;
  onDelete?: (dev: Developer) => void;
}

const DeveloperModal: React.FC<DeveloperModalProps> = ({
  open,
  onClose,
  mode,
  developer,
  onSubmit,
  onDelete
}) => {
  //  if (!developer) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {mode === 'add' && 'Add Profile'}
        {mode === 'view' && 'View Profile'}
        {mode === 'edit' && 'Edit Profile'}
        {mode === 'delete' && 'Delete Profile'}
      </DialogTitle>

      <DialogContent dividers>

         {mode === 'add' && (
         <DeveloperForm
            initialValues={developer}
            onSubmit={(updatedDev) => {
              onSubmit(updatedDev);
              
            }}
            mode='add'
          />
        )}
        {mode === 'view' && (
         <DeveloperForm
            initialValues={developer}
            onSubmit={(updatedDev) => {
              onSubmit(updatedDev);
              
            }}
            mode='view'
          />
        )}

        {mode === 'edit' && onSubmit && (
          <DeveloperForm
            initialValues={developer}
            onSubmit={(updatedDev) => {
              onSubmit(updatedDev);
              onClose();
            }}
             mode = 'edit'
          />
        )}

        {mode === 'delete' && (
          <Typography>
            Are you sure you want to delete <strong>{developer?.name}</strong>?
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {mode === 'delete' && (
          <Button color="error" onClick={() => onDelete?.(developer)}>
            Confirm Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeveloperModal;
