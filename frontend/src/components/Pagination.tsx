import React from 'react';
import { Pagination as MuiPagination, Stack, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setQuery: (query: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
 
  setQuery,
}) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setQuery((prev: any) => ({ ...prev, page }));
  };

  return (
    <Stack spacing={1} alignItems="center" sx={{ mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        {/* Total Records: {totalDocs} */}
      </Typography>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Stack>
  );
};

export default Pagination;
